<script setup lang="ts">
  import { useTheme } from '@/composables/useTheme'

  const { isDark, toggleTheme } = useTheme()
</script>

<template>
  <button
    class="theme-toggle"
    :aria-label="isDark ? 'Ativar modo claro' : 'Ativar modo escuro'"
    @click="toggleTheme"
  >
    [ {{ isDark ? 'Light Mode' : 'Dark Mode' }} ]
  </button>
</template>

<style scoped>
  .theme-toggle {
    display: inline-block;
    margin-top: 1.5rem;
    padding: 8px 12px;
    background: var(--toggle-bg);
    border: 2px solid var(--toggle-color);
    color: var(--toggle-color);
    font-family: 'Press Start 2P', monospace;
    font-size: 8px;
    cursor: pointer;
    transition: all 0.1s ease;
    box-shadow: 4px 4px 0 var(--shadow-color);
  }

  .theme-toggle:hover {
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0 var(--shadow-color);
  }

  .theme-toggle:active {
    transform: translate(2px, 2px);
    box-shadow: none;
  }

  .theme-toggle:focus-visible {
    outline: 2px solid var(--toggle-bg);
    outline-offset: 3px;
  }
</style>
