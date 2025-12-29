<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'
import type { AppItem } from '@/types/portfolio'
import TechBadge from './TechBadge.vue'
import ImageViewer from '@/components/ui/ImageViewer.vue'

interface Props {
  app: AppItem | null
  isOpen: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
}>()

const isImageViewerOpen = ref(false)

const openImageViewer = () => {
  if (props.app?.screenshot) {
    isImageViewerOpen.value = true
  }
}

const closeImageViewer = () => {
  isImageViewerOpen.value = false
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.isOpen && !isImageViewerOpen.value) {
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

          <!-- Modal Body -->
          <div class="modal-body">
            <p class="description">{{ app.description || 'Sem descrição disponível.' }}</p>

            <div v-if="app.technologies?.length" class="tech-section">
              <h3>Tecnologias</h3>
              <div class="tech-list">
                <TechBadge v-for="tech in app.technologies" :key="tech" :name="tech" />
              </div>
            </div>

            <div class="screenshot-section">
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
          </div>

          <!-- Modal Footer -->
          <div class="modal-footer">
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
      </div>
    </Transition>

    <!-- Image Viewer -->
    <ImageViewer
      v-if="app?.screenshot"
      :src="app.screenshot"
      :alt="app.name"
      :is-open="isImageViewerOpen"
      @close="closeImageViewer"
    />
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
  font-family: 'Press Start 2P', monospace;
  transition: color 0.3s ease;
}

.modal-body {
  padding: 12px;
  background-color: var(--modal-body-bg);
  transition: all 0.3s ease;
}

.description {
  margin: 0 0 12px;
  font-size: 11px;
  line-height: 1.6;
  color: var(--text-secondary);
  font-family: var(--font-body);
  transition: color 0.3s ease;
}

.tech-section {
  margin-bottom: 12px;
}

.tech-section h3 {
  margin: 0 0 6px;
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
  gap: 4px;
}

.screenshot-section {
  margin-top: 12px;
}

.screenshot {
  width: 100%;
  border: 2px solid var(--modal-border);
  cursor: pointer;
  transition: all 0.1s ease;
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
  height: 80px;
  background-color: var(--icon-bg);
  border: 2px dashed var(--text-muted);
  color: var(--text-muted);
  transition: all 0.3s ease;
}

.screenshot-placeholder svg {
  width: 24px;
  height: 24px;
  margin-bottom: 4px;
}

.screenshot-placeholder span {
  font-size: 6px;
}

.modal-footer {
  display: flex;
  gap: 6px;
  padding: 12px;
  border-top: 2px solid var(--modal-border);
  background-color: var(--modal-header-bg);
  transition: all 0.3s ease;
}

.btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 8px 10px;
  font-size: 6px;
  text-decoration: none;
  cursor: pointer;
  font-family: 'Press Start 2P', monospace;
  transition: all 0.1s ease;
}

.btn svg {
  width: 12px;
  height: 12px;
}

.btn-primary {
  background-color: var(--toggle-bg);
  color: var(--toggle-color);
  border: 2px solid var(--toggle-color);
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
  border: 2px solid var(--icon-border-dark);
  box-shadow: 4px 4px 0 var(--icon-border-dark);
  transition: all 0.1s ease;
}

.btn-secondary:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 var(--icon-border-dark);
}

.btn-secondary:active {
  transform: translate(2px, 2px);
  box-shadow: none;
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
