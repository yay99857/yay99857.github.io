<script setup lang="ts">
  import { ref, onMounted } from 'vue'

  const isDark = ref(false)

  const toggleTheme = () => {
    isDark.value = !isDark.value
    applyTheme()
  }

  const applyTheme = () => {
    if (isDark.value) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  onMounted(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    isDark.value = savedTheme === 'dark' || (!savedTheme && prefersDark)
    applyTheme()
  })
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
</style>
