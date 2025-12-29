<script setup lang="ts">
import { ref } from 'vue'
import type { AppItem } from '@/types/portfolio'
import TechBadge from './TechBadge.vue'
import ImageViewer from '@/components/ui/ImageViewer.vue'
import AppIcon from './AppIcon.vue'

interface Props {
  app: AppItem
}

const props = defineProps<Props>()
defineEmits<{
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
</script>

<template>
  <div class="app-view">
    <!-- App Header -->
    <div class="app-header">
      <button class="back-btn" @click="$emit('close')" aria-label="Voltar">
        <v-icon name="md-chevronleft" />
      </button>
      <div class="app-title">
        <AppIcon :icon="app.icon" :name="app.name" :show-name="false" class="header-icon" />
        <span>{{ app.name }}</span>
      </div>
      <div class="header-spacer"></div>
    </div>

    <!-- App Content -->
    <div class="app-content">
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
          <v-icon name="md-imagenotsupported" />
          <span>Preview não disponível</span>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="action-buttons">
        <a
          v-if="app.demoUrl"
          :href="app.demoUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-primary"
        >
          <v-icon name="md-openinnew" />
          Acessar
        </a>
        <a
          v-if="app.githubUrl"
          :href="app.githubUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-secondary"
        >
          <v-icon name="bi-github" />
          Código
        </a>
      </div>
    </div>

    <!-- Image Viewer -->
    <ImageViewer
      v-if="app.screenshot"
      :src="app.screenshot"
      :alt="app.name"
      :is-open="isImageViewerOpen"
      @close="closeImageViewer"
    />
  </div>
</template>

<style scoped>
.app-view {
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

.app-header {
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

.app-title {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 10px;
  color: var(--text-primary);
  font-family: 'Press Start 2P', monospace;
}

.app-icon {
  color: var(--icon-color);
}

.header-icon {
  transform: scale(0.5);
  margin: -8px;
  pointer-events: none;
}

.header-icon :deep(.icon-container) {
  cursor: default;
  box-shadow: 4px 4px 0 var(--shadow-color);
  background-color: var(--icon-bg);
}

.header-spacer {
  width: 28px;
}

.app-content {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
}

.description {
  margin: 0 0 12px;
  font-size: 11px;
  line-height: 1.6;
  color: var(--text-secondary);
  font-family: var(--font-body);
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
}

.tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.screenshot-section {
  margin-bottom: 12px;
}

.screenshot {
  width: 100%;
  border: 2px solid var(--section-border-dark);
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
}

.screenshot-placeholder svg {
  width: 24px;
  height: 24px;
  margin-bottom: 4px;
}

.screenshot-placeholder span {
  font-size: 6px;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 10px 12px;
  font-size: 7px;
  text-decoration: none;
  cursor: pointer;
  font-family: 'Press Start 2P', monospace;
  transition: all 0.1s ease;
}

.btn svg {
  width: 14px;
  height: 14px;
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
}

.btn-secondary:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 var(--icon-border-dark);
}

.btn-secondary:active {
  transform: translate(2px, 2px);
  box-shadow: none;
}
</style>
