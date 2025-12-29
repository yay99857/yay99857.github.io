<script setup lang="ts">
  import type { AppSection, AppItem } from '@/types/portfolio'
  import AppIcon from './AppIcon.vue'

  interface Props {
    sections: AppSection[]
  }

  defineProps<Props>()

  const emit = defineEmits<{
    'app-click': [app: AppItem]
  }>()

  const openApp = (app: AppItem) => {
    emit('app-click', app)
  }
</script>

<template>
  <div class="app-grid">
    <div v-for="section in sections" :key="section.title" class="app-section">
      <h3 class="section-title">{{ section.title }}</h3>
      <div class="section-apps">
        <AppIcon
          v-for="app in section.apps"
          :key="app.id"
          :icon="app.icon"
          :name="app.name"
          @click="openApp(app)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .app-grid {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 8px;
    overflow-y: auto;
    flex: 1;
  }

  .app-section {
    display: flex;
    flex-direction: column;
    gap: 0;
    background-color: var(--section-bg);
    overflow: hidden;
    border: 2px solid var(--section-border-dark);
    transition: all 0.3s ease;
  }

  .section-title {
    font-size: 7px;
    font-weight: 400;
    color: var(--section-title-text);
    letter-spacing: 0.5px;
    margin: 0;
    padding: 4px 6px;
    background-color: var(--section-title-bg);
    font-family: 'Press Start 2P', monospace;
    text-align: left;
    border-bottom: 2px solid var(--section-border-dark);
    transition: all 0.3s ease;
  }

  .section-apps {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 6px;
    padding: 8px;
    justify-items: center;
  }
</style>
