<script setup lang="ts">
  import { ref, computed } from 'vue'
  import type { AppSection, DockApp, AppItem } from '@/types/portfolio'
  import StatusBar from './StatusBar.vue'
  import AppGrid from './AppGrid.vue'
  import PageIndicator from './PageIndicator.vue'
  import DockBar from './DockBar.vue'
  import AppView from './AppView.vue'
  import DockView from './DockView.vue'

  interface Props {
    sections: AppSection[]
    dockApps: DockApp[]
    totalPages?: number
  }

  withDefaults(defineProps<Props>(), {
    totalPages: 1,
  })

  const currentPage = ref(1)

  // Estado para app/dock selecionado
  const selectedApp = ref<AppItem | null>(null)
  const selectedDockApp = ref<DockApp | null>(null)
  const isAppOpen = ref(false)
  const isDockOpen = ref(false)
  
  // Controle do tipo de fechamento (swipe ou scale)
  const closeType = ref<'swipe' | 'scale'>('scale')

  // Computed para verificar se alguma view está aberta
  const isAnyViewOpen = computed(() => isAppOpen.value || isDockOpen.value)

  const handleAppClick = (app: AppItem) => {
    selectedApp.value = app
    isAppOpen.value = true
  }

  const handleDockClick = (app: DockApp) => {
    selectedDockApp.value = app
    isDockOpen.value = true
  }

  // Fechar com swipe (botão back)
  const closeWithSwipe = () => {
    closeType.value = 'swipe'
    isAppOpen.value = false
    isDockOpen.value = false
    setTimeout(() => {
      selectedApp.value = null
      selectedDockApp.value = null
    }, 300)
  }

  // Fechar com scale (botão home)
  const closeWithScale = () => {
    closeType.value = 'scale'
    isAppOpen.value = false
    isDockOpen.value = false
    setTimeout(() => {
      selectedApp.value = null
      selectedDockApp.value = null
    }, 300)
  }
</script>

<template>
  <div class="phone-frame">
    <div class="phone-notch"></div>
    <div class="phone-screen">
      <StatusBar />
      <div class="phone-content" :class="{ 'close-swipe': closeType === 'swipe' }">
        <!-- Home Screen -->
        <Transition :name="closeType === 'swipe' ? 'home-swipe' : 'home-scale'">
          <div v-show="!isAnyViewOpen" class="home-screen">
            <AppGrid :sections="sections" @app-click="handleAppClick" />
          </div>
        </Transition>

        <!-- App View -->
        <Transition :name="closeType === 'swipe' ? 'app-swipe' : 'app-scale'">
          <AppView
            v-if="isAppOpen && selectedApp"
            :app="selectedApp"
            @close="closeWithSwipe"
          />
        </Transition>

        <!-- Dock View -->
        <Transition :name="closeType === 'swipe' ? 'app-swipe' : 'app-scale'">
          <DockView
            v-if="isDockOpen && selectedDockApp"
            :app="selectedDockApp"
            @close="closeWithSwipe"
          />
        </Transition>
      </div>
      <PageIndicator
        v-if="totalPages > 1 && !isAnyViewOpen"
        :total="totalPages"
        :current="currentPage"
        @update:current="currentPage = $event"
      />
      <DockBar v-show="!isAnyViewOpen" :apps="dockApps" @app-click="handleDockClick" />
    </div>
    
    <!-- Phone Footer com Home Button -->
    <div class="phone-footer">
      <button 
        class="home-button" 
        :class="{ active: isAnyViewOpen }"
        @click="closeWithScale"
        :disabled="!isAnyViewOpen"
        aria-label="Voltar para início"
      >
        <v-icon name="md-home" scale="1.2" class="home-icon" />
      </button>
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
    position: relative;
  }

  .home-screen {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  /* Phone Footer */
  .phone-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px 0 8px;
    background-color: var(--phone-frame-bg);
  }

  .home-button {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--phone-notch);
    border: 3px solid var(--home-button-border);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    opacity: 0.5;
  }

  .home-button:not(:disabled) {
    opacity: 1;
  }

  .home-button:not(:disabled):hover {
    transform: scale(1.01);
    box-shadow: 0 0 0 1px var(--phone-screen-border);
  }

  .home-button:not(:disabled):active {
    transform: scale(0.95);
  }

  .home-icon {
    width: 20px;
    height: 20px;
    color: var(--home-icon-color);
    transition: all 0.2s ease;
    fill: currentColor;
  }

  .home-button.active .home-icon {
    color: var(--home-icon-color);
  }

  /* ========== SCALE ANIMATIONS (Home Button) ========== */
  
  /* Home Screen - Scale */
  .home-scale-enter-active,
  .home-scale-leave-active {
    transition: all 0.4s ease;
  }

  .home-scale-enter-from {
    opacity: 0;
    transform: scale(0.95);
  }

  .home-scale-leave-to {
    opacity: 0;
    transform: scale(1.05);
  }

  /* App - Scale */
  .app-scale-enter-active {
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .app-scale-leave-active {
    transition: all 0.35s ease-out;
  }

  .app-scale-enter-from {
    opacity: 0;
    transform: scale(0.5);
  }

  .app-scale-leave-to {
    opacity: 0;
    transform: scale(0.7);
  }

  /* ========== SWIPE ANIMATIONS (Back Button) ========== */
  
  /* Home Screen - Swipe */
  .home-swipe-enter-active {
    transition: all 0.4s ease-out;
  }

  .home-swipe-leave-active {
    transition: all 0.3s ease-in;
  }

  .home-swipe-enter-from {
    opacity: 0;
    transform: translateX(-20%);
  }

  .home-swipe-leave-to {
    opacity: 0;
    transform: translateX(-20%);
  }

  /* App - Swipe */
  .app-swipe-enter-active {
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .app-swipe-leave-active {
    transition: all 0.3s ease-in;
  }

  .app-swipe-enter-from {
    opacity: 0;
    transform: scale(0.5);
  }

  .app-swipe-leave-to {
    opacity: 0;
    transform: translateX(100%);
  }
</style>
