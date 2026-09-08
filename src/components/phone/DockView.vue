<script setup lang="ts">
  import type { DockApp } from '@/types/portfolio'

  interface Props {
    app: DockApp
  }

  defineProps<Props>()
  defineEmits<{
    close: []
  }>()

  // Dados de cada seção do dock
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
        { icon: 'bi-image', label: 'Projeto 1' },
        { icon: 'bi-image', label: 'Projeto 2' },
        { icon: 'bi-image', label: 'Projeto 3' },
        { icon: 'bi-image', label: 'Projeto 4' },
        { icon: 'bi-image', label: 'Projeto 5' },
        { icon: 'bi-image', label: 'Projeto 6' },
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
        <p class="about-text">{{ dockContent.about.content }}</p>
      </div>

      <!-- Gallery -->
      <div v-else-if="app.id === 'gallery'" class="gallery-section">
        <div class="gallery-grid">
          <div v-for="item in dockContent.gallery.items" :key="item.label" class="gallery-item">
            <v-icon :name="item.icon" />
            <span>{{ item.label }}</span>
          </div>
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
  .about-text {
    margin: 0;
    font-size: 11px;
    line-height: 1.6;
    color: var(--text-secondary);
    white-space: pre-line;
    font-family: var(--font-body);
  }

  /* Gallery */
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
    padding: 12px 8px;
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
    width: 28px;
    height: 28px;
    color: var(--text-muted);
  }

  .gallery-item span {
    font-size: 6px;
    color: var(--text-primary);
    font-family: 'Press Start 2P', monospace;
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
    transition: all 0.1s ease;
  }

  .skill-badge:hover {
    transform: translate(-1px, -1px);
    box-shadow: 2px 2px 0 var(--icon-border-dark);
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
