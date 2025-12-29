<script setup lang="ts">
  interface Props {
    total: number
    current: number
  }

  defineProps<Props>()

  defineEmits<{
    'update:current': [page: number]
  }>()
</script>

<template>
  <div class="page-indicator">
    <button
      v-for="page in total"
      :key="page"
      class="dot"
      :class="{ active: page === current }"
      :aria-label="`Página ${page}`"
      :aria-current="page === current ? 'page' : undefined"
      @click="$emit('update:current', page)"
    />
  </div>
</template>

<style scoped>
  .page-indicator {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    padding: 8px 0;
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #ccc;
    border: 1px solid #999;
    padding: 0;
    cursor: pointer;
    transition: all 0.2s ease;
    opacity: 0.6;
  }

  .dot:hover {
    opacity: 0.9;
  }

  .dot.active {
    opacity: 1;
    background-color: #000;
    border-color: #000;
    transform: scale(1.2);
  }
</style>
