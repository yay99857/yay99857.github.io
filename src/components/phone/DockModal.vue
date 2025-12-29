<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'
import type { DockApp } from '@/types/portfolio'

interface Props {
  app: DockApp | null
  isOpen: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
}>()

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.isOpen) {
    emit('close')
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

const handleOverlayClick = (e: MouseEvent) => {
  if (e.target === e.currentTarget) {
    emit('close')
  }
}

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
        skills: ['Git', 'Docker', 'VS Code'],
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
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen && app" class="modal-overlay" @click="handleOverlayClick">
        <div class="modal-content">
          <button class="close-btn" @click="$emit('close')" aria-label="Fechar modal">
            <span>✕</span>
          </button>

          <!-- Modal Header -->
          <div class="modal-header">
            <div class="app-icon-large">
              <Icon :icon="app.icon" />
            </div>
            <h2>{{ app.name }}</h2>
          </div>

          <!-- Modal Body - About -->
          <div v-if="app.id === 'about'" class="modal-body">
            <p class="about-text">{{ dockContent.about.content }}</p>
          </div>

          <!-- Modal Body - Gallery -->
          <div v-else-if="app.id === 'gallery'" class="modal-body">
            <div class="gallery-grid">
              <div v-for="item in dockContent.gallery.items" :key="item.label" class="gallery-item">
                <Icon :icon="item.icon" />
                <span>{{ item.label }}</span>
              </div>
            </div>
          </div>

          <!-- Modal Body - Skills -->
          <div v-else-if="app.id === 'skills'" class="modal-body">
            <div v-for="category in dockContent.skills.categories" :key="category.name" class="skill-category">
              <h3>{{ category.name }}</h3>
              <div class="skill-list">
                <span v-for="skill in category.skills" :key="skill" class="skill-badge">
                  {{ skill }}
                </span>
              </div>
            </div>
          </div>

          <!-- Modal Body - Contact -->
          <div v-else-if="app.id === 'contact'" class="modal-body">
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
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  position: relative;
  background-color: var(--modal-bg);
  border: 4px solid var(--modal-border);
  width: 90%;
  max-width: 380px;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 8px 8px 0 #000;
  font-family: 'Press Start 2P', monospace;
  transition: all 0.3s ease;
}

@media (min-width: 768px) {
  .modal-content {
    max-width: 420px;
  }
}

@media (min-width: 1024px) {
  .modal-content {
    max-width: 450px;
  }
}

.close-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--icon-bg);
  border: 2px solid var(--icon-border-dark);
  cursor: pointer;
  color: var(--text-primary);
  font-size: 12px;
  font-family: 'Press Start 2P', monospace;
  line-height: 1;
  z-index: 10;
  transition: all 0.1s ease;
}

.close-btn:hover {
  background-color: var(--icon-bg-hover);
  transform: translate(-1px, -1px);
  box-shadow: 2px 2px 0 var(--icon-border-dark);
}

.close-btn:active {
  transform: translate(1px, 1px);
  box-shadow: none;
}

.modal-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 12px 12px;
  border-bottom: 2px solid var(--modal-border);
  background-color: var(--modal-header-bg);
  transition: all 0.3s ease;
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
  margin-bottom: 8px;
  transition: all 0.3s ease;
}

.app-icon-large svg {
  width: 24px;
  height: 24px;
  color: var(--icon-color);
  transition: color 0.3s ease;
}

.modal-header h2 {
  margin: 0;
  font-size: 10px;
  color: var(--text-primary);
  transition: color 0.3s ease;
}

.modal-body {
  padding: 12px;
  background-color: var(--modal-body-bg);
  transition: all 0.3s ease;
}

/* About */
.about-text {
  margin: 0;
  font-size: 11px;
  line-height: 1.6;
  color: var(--text-secondary);
  white-space: pre-line;
  font-family: var(--font-body);
  transition: color 0.3s ease;
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

/* Skills */
.skill-category {
  margin-bottom: 12px;
}

.skill-category:last-child {
  margin-bottom: 0;
}

.skill-category h3 {
  margin: 0 0 6px;
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
  gap: 8px;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
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

/* Modal Transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.92);
}
</style>
