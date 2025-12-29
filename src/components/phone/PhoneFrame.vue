<script setup lang="ts">
  import { ref } from 'vue'
  import type { AppSection, DockApp, AppItem } from '@/types/portfolio'
  import { useNavigation } from '@/composables/useNavigation'
  import StatusBar from './StatusBar.vue'
  import AppGrid from './AppGrid.vue'
  import PageIndicator from './PageIndicator.vue'
  import DockBar from './DockBar.vue'
  import AppDetailView from './AppDetailView.vue'

  interface Props {
    sections: AppSection[]
    dockApps: DockApp[]
    totalPages?: number
  }

  withDefaults(defineProps<Props>(), {
    totalPages: 1,
  })

  const currentPage = ref(1)

  // Navigation state management
  const {
    currentApp,
    isOnHomeScreen,
    isViewingApp,
    handleHomeClick,
    handleAppOpen,
  } = useNavigation()

  const emit = defineEmits<{
    'app-click': [app: AppItem]
    'dock-click': [app: DockApp]
  }>()

  const handleAppClick = (app: AppItem) => {
    handleAppOpen(app)
    emit('app-click', app)
  }

  const handleDockClick = (app: DockApp) => {
    handleAppOpen(app)
    emit('dock-click', app)
  }

  const onBackClick = () => {
    handleHomeClick() // Vai direto para home
  }
</script>

<template>
  <div class="phone-frame">
    <div class="phone-notch"></div>
    <div class="phone-screen">
      <StatusBar />

      <!-- Home View -->
      <div v-if="isOnHomeScreen" class="phone-content">
        <AppGrid :sections="sections" @app-click="handleAppClick" />
      </div>

      <!-- App Detail View -->
      <AppDetailView
        v-if="isViewingApp && currentApp"
        :app="currentApp"
        @back="onBackClick"
      />

      <!-- Page Indicator (only on home screen) -->
      <PageIndicator
        v-if="isOnHomeScreen && totalPages > 1"
        :total="totalPages"
        :current="currentPage"
        @update:current="currentPage = $event"
      />

      <!-- Dock Bar (only on home screen) -->
      <DockBar v-if="isOnHomeScreen" :apps="dockApps" @app-click="handleDockClick" />

    </div>
  </div>
</template>

<style scoped>
  .phone-frame {
    position: relative;
    width: 340px;
    max-width: 100%;
    background-color: var(--phone-frame-bg);
    border: 4px solid var(--phone-frame-border);
    padding: 8px;
    box-shadow: 8px 8px 0 var(--shadow-color);
    transition: all 0.3s ease;
  }

  .phone-notch {
    position: absolute;
    top: 4px;
    left: 52%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background-color: var(--phone-notch);
  }

  .phone-screen {
    display: flex;
    flex-direction: column;
    background-color: var(--phone-screen-bg);
    overflow: hidden;
    height: 580px;
    border: 4px solid var(--phone-screen-border);
    transition: all 0.3s ease;
  }

  .phone-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
</style>
