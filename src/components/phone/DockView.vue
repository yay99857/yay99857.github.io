<script setup lang="ts">
  import { computed, ref } from 'vue'
  import type { DockApp } from '@/types/portfolio'
  import { appSections } from '@/data/mockProjects'
  import ImageViewer from '@/components/ui/ImageViewer.vue'
  import { useTypewriter } from '@/composables/useTypewriter'

  interface Props {
    app: DockApp
  }

  defineProps<Props>()
  defineEmits<{
    close: []
  }>()

  // Every project that has a preview, flattened into a single gallery
  const galleryItems = computed(() =>
    appSections
      .flatMap((section) => section.apps)
      .filter((item): item is typeof item & { screenshot: string } => Boolean(item.screenshot))
      .map((item) => ({ name: item.name, screenshot: item.screenshot }))
  )

  // -1 keeps the viewer closed; any other index drives the gallery carousel
  const openedIndex = ref(-1)
  const openedItem = computed(() => galleryItems.value[openedIndex.value] ?? null)

  const stepGallery = (offset: number) => {
    const total = galleryItems.value.length
    if (total === 0) return
    openedIndex.value = (openedIndex.value + offset + total) % total
  }

  // Content for each dock section
  const dockContent = {
    about: {
      title: 'Sobre Mim',
      initials: 'JM',
      name: 'João Marco',
      role: 'Desenvolvedor',
      content: `Escrevo software há alguns anos. Passo a maior parte do tempo no frontend, mas desço para o backend quando o problema pede.`,
      aside: 'Fora do editor: Linux, osu! e café passado na hora.',
    },
    gallery: {
      title: 'Galeria',
    },
    skills: {
      title: 'Skills',
      categories: [
        {
          name: 'Frontend',
          skills: ['React.js', 'Vue.js', 'TypeScript', 'Tailwind CSS'],
        },
        {
          name: 'Backend',
          skills: ['Node.js', 'PostgreSQL', 'Go', 'Redis'],
        },
        {
          name: 'Tools',
          skills: ['Git', 'Docker', 'VS Code'],
        },
      ],
    },
    contact: {
      title: 'Contato',
      links: [
        { icon: 'bi-linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/moaojarco/' },
        { icon: 'md-email', label: 'Email', url: 'mailto:moaojarco@gmail.com' },
      ],
    },
  }

  // The bio types itself out; everything below it fades in once that finishes,
  // so the panel reads top to bottom instead of landing all at once.
  const {
    typed: typedAbout,
    isDone: isAboutTyped,
    finish: finishAbout,
  } = useTypewriter(dockContent.about.content, { speed: 16, delay: 420 })
</script>

<template>
  <div class="dock-view">
    <!-- View Header -->
    <div class="view-header">
      <button class="back-btn" aria-label="Voltar" @click="$emit('close')">
        <v-icon name="md-chevronleft" />
      </button>
      <div class="view-title">
        <v-icon :name="app.icon" class="view-icon" />
        <span>{{ app.name }}</span>
      </div>
      <div class="header-spacer"></div>
    </div>

    <!-- View Content -->
    <div class="view-content">
      <!-- About -->
      <div v-if="app.id === 'about'" class="about-section">
        <div class="about-card">
          <span class="about-avatar" aria-hidden="true">{{ dockContent.about.initials }}</span>
          <span class="about-id">
            <span class="about-name">{{ dockContent.about.name }}</span>
            <span class="about-role">{{ dockContent.about.role }}</span>
          </span>
        </div>

        <!-- Tapping the bio skips ahead for anyone who does not want to wait. -->
        <p class="about-text" :class="{ typing: !isAboutTyped }" @click="finishAbout">
          {{ typedAbout }}<span v-if="!isAboutTyped" class="caret" aria-hidden="true"></span>
        </p>

        <!-- Reads from the skills categories so the stack is stated in one place only. -->
        <dl class="about-stack" :class="{ revealed: isAboutTyped }">
          <template v-for="category in dockContent.skills.categories" :key="category.name">
            <dt>{{ category.name }}</dt>
            <dd>{{ category.skills.join(' · ') }}</dd>
          </template>
        </dl>

        <p class="about-aside" :class="{ revealed: isAboutTyped }">{{ dockContent.about.aside }}</p>
      </div>

      <!-- Gallery -->
      <div v-else-if="app.id === 'gallery'" class="gallery-section">
        <div class="gallery-grid">
          <button
            v-for="(item, index) in galleryItems"
            :key="item.name"
            type="button"
            class="gallery-item"
            :aria-label="`Ampliar captura de tela do projeto ${item.name}`"
            @click="openedIndex = index"
          >
            <img
              :src="item.screenshot"
              :alt="`Captura de tela do projeto ${item.name}`"
              loading="lazy"
              decoding="async"
            />
            <span>{{ item.name }}</span>
          </button>
        </div>
      </div>

      <!-- Skills -->
      <div v-else-if="app.id === 'skills'" class="skills-section">
        <div
          v-for="category in dockContent.skills.categories"
          :key="category.name"
          class="skill-category"
        >
          <h3>{{ category.name }}</h3>
          <div class="skill-list">
            <span v-for="skill in category.skills" :key="skill" class="skill-badge">
              {{ skill }}
            </span>
          </div>
        </div>
      </div>

      <!-- Contact -->
      <div v-else-if="app.id === 'contact'" class="contact-section">
        <div class="contact-links">
          <a
            v-for="link in dockContent.contact.links"
            :key="link.label"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="contact-link"
          >
            <v-icon :name="link.icon" />
            <span>{{ link.label }}</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Image Viewer -->
    <ImageViewer
      v-if="openedItem"
      :src="openedItem.screenshot"
      :alt="openedItem.name"
      :is-open="Boolean(openedItem)"
      :has-navigation="galleryItems.length > 1"
      @close="openedIndex = -1"
      @prev="stepGallery(-1)"
      @next="stepGallery(1)"
    />
  </div>
</template>

<style scoped>
  .dock-view {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    background-color: var(--phone-screen-bg);
    overflow: hidden;
  }

  .view-header {
    display: flex;
    align-items: center;
    padding: 8px;
    background-color: var(--section-title-bg);
    border-bottom: 2px solid var(--section-border-dark);
    min-height: 40px;
  }

  .back-btn {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    cursor: pointer;
    color: var(--text-primary);
    transition: all 0.1s ease;
  }

  .back-btn:hover {
    color: var(--icon-color);
    transform: translateX(-2px);
  }

  .back-btn:active {
    transform: translateX(0);
  }

  .back-btn svg {
    width: 22px;
    height: 22px;
  }

  .view-title {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-size: 8px;
    color: var(--text-primary);
    font-family: 'Press Start 2P', monospace;
  }

  .view-icon {
    width: 16px;
    height: 16px;
    color: var(--icon-color);
  }

  .header-spacer {
    width: 28px;
  }

  .view-content {
    flex: 1;
    overflow-y: auto;
    padding: 12px;
  }

  /* About */
  .about-card {
    display: flex;
    animation: rise-in 0.35s ease-out both;
    align-items: center;
    gap: 12px;
    padding-bottom: 14px;
    border-bottom: 2px solid var(--section-border-dark);
  }

  .about-avatar {
    flex: none;
    width: 42px;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--icon-bg);
    border: 2px solid var(--icon-border-dark);
    box-shadow: 4px 4px 0 var(--icon-border-dark);
    font-family: var(--font-pixel);
    font-size: 12px;
    color: var(--text-primary);
  }

  .about-id {
    display: flex;
    flex-direction: column;
    gap: 7px;
    min-width: 0;
  }

  .about-name {
    font-family: var(--font-pixel);
    font-size: 10px;
    line-height: 1.3;
    color: var(--text-primary);
    /* Compensate the pixel font left side bearing so the name lines up with the role */
    margin-left: -1px;
  }

  .about-role {
    font-family: var(--font-body);
    font-size: 9px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  .about-text {
    margin: 16px 0 0;
    /* Reserves the bio's final height so the blocks below do not shift while it types */
    min-height: 6.8em;
    font-size: 11px;
    line-height: 1.7;
    color: var(--text-secondary);
    white-space: pre-line;
    font-family: var(--font-body);
  }

  .about-text.typing {
    cursor: pointer;
  }

  /* Block caret, sized off the current font so it matches the pixel type */
  .caret {
    display: inline-block;
    width: 0.55em;
    height: 1em;
    margin-left: 1px;
    vertical-align: text-bottom;
    background-color: var(--text-secondary);
    animation: caret-blink 0.7s steps(1, end) infinite;
  }

  .about-stack {
    display: grid;
    gap: 12px;
    margin: 20px 0 0;
  }

  /* Held back until the bio finishes typing, then staggered in */
  .about-stack,
  .about-aside {
    opacity: 0;
  }

  .about-stack.revealed {
    animation: rise-in 0.35s ease-out 0.05s both;
  }

  .about-aside.revealed {
    animation: rise-in 0.35s ease-out 0.2s both;
  }

  @keyframes rise-in {
    from {
      opacity: 0;
      transform: translateY(6px);
    }

    to {
      opacity: 1;
      transform: none;
    }
  }

  @keyframes caret-blink {
    50% {
      opacity: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .about-card,
    .about-stack.revealed,
    .about-aside.revealed {
      animation: none;
      opacity: 1;
    }

    .caret {
      animation: none;
    }
  }

  .about-stack dt {
    font-family: var(--font-pixel);
    font-size: 6px;
    line-height: 1.4;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  .about-stack dd {
    margin: 5px 0 0;
    padding-left: 9px;
    border-left: 2px solid var(--icon-border-dark);
    font-size: 11px;
    line-height: 1.5;
    color: var(--text-primary);
    font-family: var(--font-body);
  }

  .about-aside {
    margin: 20px 0 0;
    padding-top: 14px;
    border-top: 2px solid var(--section-border-dark);
    font-size: 10px;
    line-height: 1.6;
    color: var(--text-muted);
    font-family: var(--font-body);
  }

  /* Gallery */
  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }

  .gallery-item {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 6px;
    padding: 6px;
    background-color: var(--icon-bg);
    border: 2px solid var(--icon-border-dark);
    box-shadow: 4px 4px 0 var(--icon-border-dark);
    cursor: pointer;
    transition: all 0.1s ease;
  }

  .gallery-item:hover {
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0 var(--icon-border-dark);
  }

  .gallery-item:active {
    transform: translate(2px, 2px);
    box-shadow: none;
  }

  .gallery-item img {
    display: block;
    width: 100%;
    aspect-ratio: 16 / 10;
    object-fit: cover;
    object-position: top center;
    border: 2px solid var(--section-border-dark);
  }

  .gallery-item span {
    font-size: 6px;
    line-height: 1.4;
    color: var(--text-primary);
    font-family: 'Press Start 2P', monospace;
    text-align: center;
  }

  /* Skills */
  .skill-category {
    margin-bottom: 16px;
  }

  .skill-category:last-child {
    margin-bottom: 0;
  }

  .skill-category h3 {
    margin: 0 0 8px;
    font-size: 8px;
    color: var(--text-primary);
    text-transform: uppercase;
    letter-spacing: 1px;
    font-family: 'Press Start 2P', monospace;
  }

  .skill-list {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .skill-badge {
    padding: 6px 10px;
    background-color: var(--icon-bg);
    border: 2px solid var(--icon-border-dark);
    font-size: 10px;
    color: var(--text-primary);
    font-family: var(--font-body);
  }

  /* Contact */
  .contact-links {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .contact-link {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 14px;
    background-color: var(--icon-bg);
    border: 2px solid var(--icon-border-dark);
    box-shadow: 4px 4px 0 var(--icon-border-dark);
    text-decoration: none;
    color: var(--text-primary);
    font-size: 11px;
    font-family: var(--font-body);
    transition: all 0.1s ease;
  }

  .contact-link:hover {
    background-color: var(--icon-bg-hover);
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0 var(--icon-border-dark);
  }

  .contact-link:active {
    transform: translate(2px, 2px);
    box-shadow: none;
  }

  .contact-link svg {
    width: 18px;
    height: 18px;
  }
</style>
