<script setup lang="ts">
  import { Icon } from '@iconify/vue'

  interface PhoneNavigationProps {
    showBackButton?: boolean
    title?: string
  }

  interface PhoneNavigationEmits {
    'back-click': []
  }

  withDefaults(defineProps<PhoneNavigationProps>(), {
    showBackButton: true,
    title: '',
  })

  const emit = defineEmits<PhoneNavigationEmits>()

  const handleBackClick = () => {
    emit('back-click')
  }
</script>

<template>
  <div class="phone-navigation">
    <div class="nav-content">
      <!-- Back Button -->
      <button
        v-if="showBackButton"
        class="nav-button back-button"
        aria-label="Go back"
        type="button"
        @click="handleBackClick"
      >
        <Icon icon="mdi:arrow-left" class="nav-icon" />
      </button>

      <!-- Title (optional) -->
      <div v-if="title" class="nav-title">
        {{ title }}
      </div>
    </div>
  </div>
</template>

<style scoped>
  .phone-navigation {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    background-color: var(--section-bg);
    border-bottom: 2px solid var(--section-border-dark);
    min-height: 56px;
    position: relative;
  }

  .nav-content {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 12px;
  }

  .nav-button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
    background: transparent;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
    flex-shrink: 0;
  }

  .nav-button:hover {
    transform: translateX(-2px);
  }

  .nav-button:active {
    transform: translateX(0);
  }

  .nav-button:focus {
    outline: 1px solid var(--text-primary);
    outline-offset: 2px;
  }

  .back-button {
    order: 1;
  }

  .nav-title {
    order: 2;
    flex: 1;
    text-align: center;
    font-weight: 600;
    font-size: 16px;
    color: var(--text-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0 8px;
  }

  .nav-icon {
    width: 24px;
    height: 24px;
    color: var(--text-primary);
    transition: all 0.2s ease;
  }

  .nav-button:hover .nav-icon {
    transform: translateX(-1px);
  }

  /* Responsive adjustments */
  @media (max-width: 480px) {
    .phone-navigation {
      padding: 8px 12px;
      min-height: 48px;
    }

    .nav-icon {
      width: 20px;
      height: 20px;
    }

    .nav-title {
      font-size: 14px;
    }
  }

  /* Visual feedback states */
  .nav-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  .nav-button:disabled:hover {
    transform: none;
  }
</style>
