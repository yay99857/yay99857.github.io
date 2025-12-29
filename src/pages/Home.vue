<script setup lang="ts">
  import PhoneFrame from '@/components/phone/PhoneFrame.vue'
  import ThemeToggle from '@/components/ui/ThemeToggle.vue'
  import { appSections, dockApps } from '@/data/mockProjects'
</script>

<template>
  <div class="home">
    <div class="content-wrapper">
      <PhoneFrame :sections="appSections" :dock-apps="dockApps" :total-pages="1" />
      <ThemeToggle />
    </div>
  </div>
</template>

<style scoped>
  .home {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    width: 100%;
    min-width: 100vw;
    padding: 2rem;
    background: var(--bg-gradient-1);
    box-sizing: border-box;
    transition: background 0.3s ease;
    position: relative;
  }

  /* Scanlines effect */
  .home::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
      0deg,
      rgba(0, 0, 0, var(--scanline-opacity)) 0px,
      rgba(0, 0, 0, var(--scanline-opacity)) 1px,
      transparent 1px,
      transparent 2px
    );
    pointer-events: none;
    z-index: 1;
  }

  .content-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 2;
    transform: scale(0.85);
    transform-origin: center center;
  }

  @media (min-width: 640px) {
    .content-wrapper {
      transform: scale(0.95);
    }
  }

  @media (min-width: 768px) {
    .content-wrapper {
      transform: scale(1);
    }
  }

  @media (min-width: 1024px) {
    .content-wrapper {
      transform: scale(1.15);
    }
  }

  @media (min-width: 1280px) {
    .content-wrapper {
      transform: scale(1.25);
    }
  }
</style>
