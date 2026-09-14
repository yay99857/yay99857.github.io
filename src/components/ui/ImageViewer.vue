<script setup lang="ts">
  import { onMounted, onUnmounted } from 'vue'

  interface Props {
    src: string
    alt: string
    isOpen: boolean
    // Shows the previous/next arrows when the caller drives a gallery
    hasNavigation?: boolean
  }

  const props = withDefaults(defineProps<Props>(), { hasNavigation: false })
  const emit = defineEmits<{
    close: []
    prev: []
    next: []
  }>()

  const handleKeydown = (e: KeyboardEvent) => {
    if (!props.isOpen) return

    if (e.key === 'Escape') {
      emit('close')
    } else if (props.hasNavigation && e.key === 'ArrowLeft') {
      emit('prev')
    } else if (props.hasNavigation && e.key === 'ArrowRight') {
      emit('next')
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
    <Transition name="viewer">
      <div v-if="isOpen" class="viewer-overlay" @click="handleOverlayClick">
        <div class="viewer-content">
          <button class="close-btn" aria-label="Fechar" @click="$emit('close')">
            <span>✕</span>
          </button>
          <button
            v-if="hasNavigation"
            class="nav-btn nav-prev"
            aria-label="Imagem anterior"
            @click="$emit('prev')"
          >
            <span>‹</span>
          </button>
          <img :src="src" :alt="alt" class="viewer-image" />
          <button
            v-if="hasNavigation"
            class="nav-btn nav-next"
            aria-label="Próxima imagem"
            @click="$emit('next')"
          >
            <span>›</span>
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
  .viewer-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    padding: 20px;
  }

  .viewer-content {
    position: relative;
    max-width: 90vw;
    max-height: 90vh;
  }

  .close-btn {
    position: absolute;
    top: -40px;
    right: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--icon-bg);
    border: 2px solid var(--icon-border-dark);
    box-shadow: 4px 4px 0 var(--shadow-color);
    cursor: pointer;
    color: var(--text-primary);
    font-size: 14px;
    font-family: 'Press Start 2P', monospace;
    line-height: 1;
    transition: all 0.1s ease;
  }

  .close-btn:hover {
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0 var(--shadow-color);
  }

  .close-btn:active {
    transform: translate(2px, 2px);
    box-shadow: none;
  }

  .nav-btn {
    position: absolute;
    top: 50%;
    width: 40px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--icon-bg);
    border: 2px solid var(--icon-border-dark);
    box-shadow: 4px 4px 0 var(--shadow-color);
    cursor: pointer;
    color: var(--text-primary);
    font-size: 28px;
    font-family: 'Press Start 2P', monospace;
    line-height: 1;
    transition: all 0.1s ease;
    z-index: 1;
  }

  .nav-prev {
    left: -56px;
    transform: translateY(-50%);
  }

  .nav-next {
    right: -56px;
    transform: translateY(-50%);
  }

  .nav-btn:hover {
    box-shadow: 6px 6px 0 var(--shadow-color);
  }

  .nav-prev:hover {
    transform: translate(-2px, -50%) translateY(-2px);
  }

  .nav-next:hover {
    transform: translate(-2px, -50%) translateY(-2px);
  }

  .nav-btn:active {
    box-shadow: none;
  }

  .nav-prev:active,
  .nav-next:active {
    transform: translate(2px, -50%) translateY(2px);
  }

  /* Not enough room outside the image on narrow screens: overlay the arrows */
  @media (max-width: 720px) {
    .nav-prev {
      left: 8px;
    }

    .nav-next {
      right: 8px;
    }
  }

  .viewer-image {
    max-width: 100%;
    max-height: 85vh;
    border: 4px solid var(--modal-border);
    box-shadow: 8px 8px 0 var(--shadow-color);
    image-rendering: auto;
    -webkit-font-smoothing: antialiased;
  }

  /* Transition */
  .viewer-enter-active,
  .viewer-leave-active {
    transition: opacity 0.2s ease;
  }

  .viewer-enter-active .viewer-content,
  .viewer-leave-active .viewer-content {
    transition: transform 0.2s ease;
  }

  .viewer-enter-from,
  .viewer-leave-to {
    opacity: 0;
  }

  .viewer-enter-from .viewer-content,
  .viewer-leave-to .viewer-content {
    transform: scale(0.9);
  }
</style>
