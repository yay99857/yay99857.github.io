<script setup lang="ts">
  import { ref } from 'vue'
  import { Icon } from '@iconify/vue'
  import type { AppItem, DockApp } from '@/types/portfolio'
  import TechBadge from './TechBadge.vue'
  import ImageViewer from '@/components/ui/ImageViewer.vue'

  interface AppDetailViewProps {
    app: AppItem | DockApp
  }

  interface AppDetailViewEmits {
    close: []
    back: []
  }

  const props = defineProps<AppDetailViewProps>()
  const emit = defineEmits<AppDetailViewEmits>()

  const isImageViewerOpen = ref(false)

  const openImageViewer = () => {
    if (isAppItem(props.app) && props.app.screenshot) {
      isImageViewerOpen.value = true
    }
  }

  const closeImageViewer = () => {
    isImageViewerOpen.value = false
  }

  const handleBackClick = () => {
    emit('back')
  }

  // Type guard to check if app is AppItem (has extended properties)
  const isAppItem = (app: AppItem | DockApp): app is AppItem => {
    return 'description' in app || 'technologies' in app || 'screenshot' in app
  }

  // Dock content data (moved from DockModal)
  const dockContent = {
    about: {
      title: 'Sobre Mim',
      content: `Olá! Me chamo João Marco , sou um desenvolvedor apaixonado por criar experiências digitais únicas e memoráveis.

Com experiência em desenvolvimento web, busco sempre combinar design criativo com código limpo e eficiente.

Quando não estou programando, gosto de explorar novas tecnologias e tomar um bom café.`,
    },
    gallery: {
      title: 'Galeria',
      items: [
        { icon: 'mdi:image', label: 'Projeto 1' },
        { icon: 'mdi:image', label: 'Projeto 2' },
        { icon: 'mdi:image', label: 'Projeto 3' },
        { icon: 'mdi:image', label: 'Projeto 4' },
        { icon: 'mdi:image', label: 'Projeto 5' },
        { icon: 'mdi:image', label: 'Projeto 6' },
      ],
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
          skills: ['Git', 'Docker', 'Figma', 'Linux'],
        },
      ],
    },
    contact: {
      title: 'Contato',
      links: [
        { icon: 'mdi:linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/moaojarco/' },
        { icon: 'mdi:email', label: 'Email', url: 'mailto:moaojarco@gmail.com' },
      ],
    },
  }
</script>

<template>
  <div class="app-detail-view">
    <!-- App Detail Content -->
    <div class="detail-content">
      <!-- App Header with Back Button -->
      <div class="app-header">
        <button 
          class="back-button"
          aria-label="Go back"
          type="button"
          @click="handleBackClick"
        >
          <Icon icon="mdi:arrow-left" class="back-icon" />
        </button>
        <div class="app-icon-large">
          <Icon :icon="app.icon" />
        </div>
        <h1 class="app-name">{{ app.name }}</h1>
      </div>

      <!-- App Body -->
      <div class="app-body">
        <!-- Description (only for AppItem) -->
        <div v-if="isAppItem(app) && app.description" class="description-section">
          <p class="description">{{ app.description }}</p>
        </div>

        <!-- Technologies (only for AppItem) -->
        <div v-if="isAppItem(app) && app.technologies?.length" class="tech-section">
          <h3 class="section-title">Tecnologias</h3>
          <div class="tech-list">
            <TechBadge v-for="tech in app.technologies" :key="tech" :name="tech" />
          </div>
        </div>

        <!-- Screenshot (only for AppItem) -->
        <div v-if="isAppItem(app)" class="screenshot-section">
          <h3 v-if="app.screenshot" class="section-title">Preview</h3>
          <img
            v-if="app.screenshot"
            :src="app.screenshot"
            :alt="app.name"
            class="screenshot"
            @click="openImageViewer"
          />
          <div v-else class="screenshot-placeholder">
            <Icon icon="mdi:image-off" />
            <span>Preview não disponível</span>
          </div>
        </div>

        <!-- Dock App Content -->
        <div v-if="!isAppItem(app)" class="dock-app-content">
          <!-- About Content -->
          <div v-if="app.id === 'about'" class="about-content">
            <p class="about-text">{{ dockContent.about.content }}</p>
          </div>

          <!-- Gallery Content -->
          <div v-else-if="app.id === 'gallery'" class="gallery-content">
            <div class="gallery-grid">
              <div v-for="item in dockContent.gallery.items" :key="item.label" class="gallery-item">
                <Icon :icon="item.icon" />
                <span>{{ item.label }}</span>
              </div>
            </div>
          </div>

          <!-- Skills Content -->
          <div v-else-if="app.id === 'skills'" class="skills-content">
            <div
              v-for="category in dockContent.skills.categories"
              :key="category.name"
              class="skill-category"
            >
              <h3 class="category-title">{{ category.name }}</h3>
              <div class="skill-list">
                <span v-for="skill in category.skills" :key="skill" class="skill-badge">
                  {{ skill }}
                </span>
              </div>
            </div>
          </div>

          <!-- Contact Content -->
          <div v-else-if="app.id === 'contact'" class="contact-content">
            <div class="contact-links">
              <a
                v-for="link in dockContent.contact.links"
                :key="link.label"
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer"
                class="contact-link"
              >
                <Icon :icon="link.icon" />
                <span>{{ link.label }}</span>
              </a>
            </div>
          </div>

          <!-- Default placeholder for unknown dock apps -->
          <div v-else class="placeholder-content">
            <Icon icon="mdi:apps" class="placeholder-icon" />
            <p class="placeholder-text">Conteúdo do aplicativo em desenvolvimento</p>
          </div>
        </div>
      </div>

      <!-- App Footer (only for AppItem with links) -->
      <div v-if="isAppItem(app) && (app.demoUrl || app.githubUrl)" class="app-footer">
        <a
          v-if="app.demoUrl"
          :href="app.demoUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-primary"
        >
          <Icon icon="mdi:open-in-new" />
          Acessar
        </a>
        <a
          v-if="app.githubUrl"
          :href="app.githubUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-secondary"
        >
          <Icon icon="mdi:github" />
          Ver Código
        </a>
      </div>
    </div>

    <!-- Image Viewer -->
    <ImageViewer
      v-if="isAppItem(app) && app.screenshot"
      :src="app.screenshot"
      :alt="app.name"
      :is-open="isImageViewerOpen"
      @close="closeImageViewer"
    />
  </div>
</template>

<style scoped>
  .app-detail-view {
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: var(--phone-screen-bg);
    overflow: hidden;
  }

  .detail-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    padding: 16px;
    gap: 16px;
  }

  .app-header {
    display: flex;
    align-items: center;
    padding: 16px;
    border-bottom: 2px solid var(--section-border-dark);
    background-color: var(--section-bg);
    margin: -16px -16px 0 -16px;
    gap: 16px;
  }

  .back-button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
    background: transparent;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    flex-shrink: 0;
  }

  .back-button:hover {
    transform: translateX(-2px);
  }

  .back-button:active {
    transform: translateX(0);
  }

  .back-button:focus {
    outline: 1px solid var(--text-primary);
    outline-offset: 2px;
  }

  .back-icon {
    width: 24px;
    height: 24px;
    color: var(--text-primary);
    transition: all 0.2s ease;
  }

  .back-button:hover .back-icon {
    transform: translateX(-1px);
  }

  .app-icon-large {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--icon-bg);
    border: 2px solid var(--icon-border-dark);
    box-shadow: 4px 4px 0 var(--icon-border-dark);
    transition: all 0.3s ease;
    flex-shrink: 0;
  }

  .app-icon-large svg {
    width: 24px;
    height: 24px;
    color: var(--icon-color);
    transition: color 0.3s ease;
  }

  .app-name {
    margin: 0;
    font-size: 14px;
    color: var(--text-primary);
    font-family: 'Press Start 2P', monospace;
    line-height: 1.4;
    transition: color 0.3s ease;
  }

  .app-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .description-section {
    background-color: var(--section-bg);
    border: 2px solid var(--section-border-dark);
    padding: 12px;
  }

  .description {
    margin: 0;
    font-size: 11px;
    line-height: 1.6;
    color: var(--text-secondary);
    font-family: var(--font-body);
    transition: color 0.3s ease;
  }

  .tech-section {
    background-color: var(--section-bg);
    border: 2px solid var(--section-border-dark);
    padding: 12px;
  }

  .section-title {
    margin: 0 0 8px;
    font-size: 8px;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 1px;
    font-family: var(--font-pixel);
    transition: color 0.3s ease;
  }

  .tech-list {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .screenshot-section {
    background-color: var(--section-bg);
    border: 2px solid var(--section-border-dark);
    padding: 12px;
  }

  .screenshot {
    width: 100%;
    border: 2px solid var(--section-border-dark);
    cursor: pointer;
    transition: all 0.1s ease;
    display: block;
  }

  .screenshot:hover {
    transform: translate(-2px, -2px);
    box-shadow: 4px 4px 0 var(--shadow-color);
  }

  .screenshot-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 120px;
    background-color: var(--icon-bg);
    border: 2px dashed var(--text-muted);
    color: var(--text-muted);
    transition: all 0.3s ease;
  }

  .screenshot-placeholder svg {
    width: 32px;
    height: 32px;
    margin-bottom: 8px;
  }

  .screenshot-placeholder span {
    font-size: 8px;
    font-family: var(--font-pixel);
  }

  .dock-app-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: var(--section-bg);
    border: 2px solid var(--section-border-dark);
    padding: 16px;
  }

  /* About Content */
  .about-content {
    flex: 1;
  }

  .about-text {
    margin: 0;
    font-size: 11px;
    line-height: 1.6;
    color: var(--text-secondary);
    white-space: pre-line;
    font-family: var(--font-body);
    transition: color 0.3s ease;
  }

  /* Gallery Content */
  .gallery-content {
    flex: 1;
  }

  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }

  .gallery-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 10px 6px;
    background-color: var(--icon-bg);
    border: 2px solid var(--icon-border-dark);
    box-shadow: 4px 4px 0 var(--icon-border-dark);
    cursor: pointer;
    transition: all 0.1s ease;
  }

  .gallery-item:hover {
    background-color: var(--icon-bg-hover);
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0 var(--icon-border-dark);
  }

  .gallery-item:active {
    transform: translate(2px, 2px);
    box-shadow: none;
  }

  .gallery-item svg {
    width: 24px;
    height: 24px;
    color: var(--text-muted);
    transition: color 0.3s ease;
  }

  .gallery-item span {
    font-size: 6px;
    color: var(--text-primary);
    transition: color 0.3s ease;
  }

  /* Skills Content */
  .skills-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .skill-category {
    background-color: var(--icon-bg);
    border: 2px solid var(--icon-border-dark);
    padding: 12px;
  }

  .category-title {
    margin: 0 0 8px;
    font-size: 8px;
    color: var(--text-primary);
    text-transform: uppercase;
    letter-spacing: 1px;
    font-family: var(--font-pixel);
    transition: color 0.3s ease;
  }

  .skill-list {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }

  .skill-badge {
    padding: 4px 8px;
    background-color: var(--section-bg);
    border: 2px solid var(--section-border-dark);
    font-size: 10px;
    color: var(--text-primary);
    font-family: var(--font-body);
    transition: all 0.1s ease;
  }

  .skill-badge:hover {
    transform: translate(-1px, -1px);
    box-shadow: 2px 2px 0 var(--section-border-dark);
  }

  /* Contact Content */
  .contact-content {
    flex: 1;
  }

  .contact-links {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .contact-link {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 16px;
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
    width: 16px;
    height: 16px;
  }

  /* Placeholder Content */
  .placeholder-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 120px;
    color: var(--text-muted);
  }

  .placeholder-icon {
    width: 48px;
    height: 48px;
    margin-bottom: 12px;
    opacity: 0.6;
  }

  .placeholder-text {
    margin: 0;
    font-size: 10px;
    font-family: var(--font-pixel);
    line-height: 1.4;
  }

  .app-footer {
    display: flex;
    gap: 8px;
    padding: 16px 0 0;
    border-top: 2px solid var(--section-border-dark);
    margin-top: auto;
  }

  .btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 12px 16px;
    font-size: 8px;
    text-decoration: none;
    cursor: pointer;
    font-family: 'Press Start 2P', monospace;
    transition: all 0.1s ease;
    border: 2px solid;
  }

  .btn svg {
    width: 14px;
    height: 14px;
  }

  .btn-primary {
    background-color: var(--toggle-bg);
    color: var(--toggle-color);
    border-color: var(--toggle-color);
    box-shadow: 4px 4px 0 var(--toggle-color);
  }

  .btn-primary:hover {
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0 var(--toggle-color);
  }

  .btn-primary:active {
    transform: translate(2px, 2px);
    box-shadow: none;
  }

  .btn-secondary {
    background-color: var(--icon-bg);
    color: var(--text-primary);
    border-color: var(--icon-border-dark);
    box-shadow: 4px 4px 0 var(--icon-border-dark);
  }

  .btn-secondary:hover {
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0 var(--icon-border-dark);
  }

  .btn-secondary:active {
    transform: translate(2px, 2px);
    box-shadow: none;
  }

  /* Responsive adjustments */
  @media (max-width: 480px) {
    .detail-content {
      padding: 12px;
      gap: 12px;
    }

    .app-header {
      padding: 12px;
      margin: -12px -12px 0 -12px;
    }

    .app-icon-large {
      width: 56px;
      height: 56px;
    }

    .app-icon-large svg {
      width: 28px;
      height: 28px;
    }

    .app-name {
      font-size: 10px;
    }

    .btn {
      padding: 10px 12px;
      font-size: 7px;
    }
  }

  /* Smooth transitions for content changes */
  .app-detail-view {
    transition: all 0.3s ease;
  }

  .detail-content > * {
    transition: all 0.3s ease;
  }
</style>
