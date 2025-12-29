<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue'
  import { Icon } from '@iconify/vue'

  const currentTime = ref('')

  const updateTime = () => {
    const now = new Date()
    currentTime.value = now.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  let intervalId: number | undefined

  onMounted(() => {
    updateTime()
    intervalId = window.setInterval(updateTime, 1000)
  })

  onUnmounted(() => {
    if (intervalId) {
      clearInterval(intervalId)
    }
  })
</script>

<template>
  <div class="status-bar">
    <div class="status-left">
      <Icon icon="mdi:signal-cellular-3" class="status-icon" />
      <span class="network-type">4G</span>
    </div>
    <div class="status-center">
      <span class="time">{{ currentTime }}</span>
    </div>
    <div class="status-right">
      <Icon icon="mdi:battery" class="status-icon" />
    </div>
  </div>
</template>

<style scoped>
  .status-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 8px;
    background-color: var(--status-bar-bg);
    color: var(--status-bar-text);
    font-size: 8px;
    font-weight: 400;
    font-family: 'Press Start 2P', monospace;
    border-bottom: 2px solid var(--status-bar-border);
    transition: all 0.3s ease;
  }

  .status-left,
  .status-right {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .status-center {
    letter-spacing: 1px;
  }

  .status-icon {
    width: 12px;
    height: 12px;
  }

  .network-type {
    font-size: 6px;
  }

  .time {
    font-variant-numeric: tabular-nums;
  }
</style>
