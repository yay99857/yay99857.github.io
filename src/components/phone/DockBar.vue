<script setup lang="ts">
  import type { DockApp } from '@/types/portfolio'
  import AppIcon from './AppIcon.vue'

  interface Props {
    apps: DockApp[]
  }

  defineProps<Props>()

  const emit = defineEmits<{
    'app-click': [app: DockApp, origin: DOMRect | undefined]
  }>()

  const openApp = (app: DockApp, origin: DOMRect | undefined) => {
    emit('app-click', app, origin)
  }
</script>

<template>
  <div class="dock-bar">
    <div class="dock-container">
      <AppIcon
        v-for="app in apps"
        :key="app.id"
        :icon="app.icon"
        :name="app.name"
        :show-name="false"
        :show-tooltip="true"
        @click="(origin) => openApp(app, origin)"
      />
    </div>
  </div>
</template>

<style scoped>
  .dock-bar {
    padding: 6px;
    background: var(--section-bg);
    border-top: 2px solid var(--section-border-dark);
  }

  .dock-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: var(--icon-bg);
    padding: 8px;
    border: 2px solid var(--section-border-dark);
    transition: all 0.3s ease;
  }
</style>
