<script setup lang="ts">
  import { Icon } from '@iconify/vue'

  interface Props {
    icon: string
    name: string
    showName?: boolean
    showTooltip?: boolean
  }

  withDefaults(defineProps<Props>(), {
    showName: true,
    showTooltip: false,
  })

  defineEmits<{
    click: []
  }>()
</script>

<template>
  <div class="app-icon" @click="$emit('click')">
    <div class="icon-container">
      <Icon :icon="icon" class="icon" />
      <span v-if="showTooltip" class="tooltip">{{ name }}</span>
    </div>
    <span v-if="showName" class="app-name">{{ name }}</span>
  </div>
</template>

<style scoped>
  .app-icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    transition: transform 0.1s ease;
  }

  .app-icon:hover {
    transform: translate(-2px, -2px);
  }

  .app-icon:active {
    transform: translate(2px, 2px);
  }

  .app-icon:active .icon-container {
    box-shadow: none;
  }

  .icon-container {
    position: relative;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--icon-bg);
    border: 2px solid var(--icon-border-dark);
    box-shadow: 4px 4px 0 var(--shadow-color);
    transition: all 0.1s ease;
  }

  .app-icon:hover .icon-container {
    background-color: var(--icon-bg-hover);
  }

  .icon {
    width: 24px;
    height: 24px;
    color: var(--icon-color);
    transition: color 0.3s ease;
  }

  .app-name {
    font-size: 6px;
    color: var(--text-primary);
    text-align: center;
    max-width: 54px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: 'Press Start 2P', monospace;
    transition: color 0.3s ease;
  }

  /* Tooltip estilo pixel */
  .tooltip {
    position: absolute;
    bottom: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--tooltip-bg);
    color: var(--tooltip-text);
    padding: 4px 6px;
    font-size: 6px;
    font-family: 'Press Start 2P', monospace;
    white-space: nowrap;
    border: 2px solid var(--tooltip-border);
    box-shadow: 4px 4px 0 var(--shadow-color);
    opacity: 0;
    visibility: hidden;
    transition:
      opacity 0.15s ease,
      visibility 0.15s ease;
    z-index: 100;
    pointer-events: none;
  }

  .app-icon:hover .tooltip {
    opacity: 1;
    visibility: visible;
  }
</style>
