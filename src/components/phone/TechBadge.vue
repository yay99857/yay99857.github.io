<script setup lang="ts">
  defineProps<{
    name: string
  }>()
</script>

<template>
  <span class="tech-badge">{{ name }}</span>
</template>

<style scoped>
  .tech-badge {
    display: inline-block;
    padding: 2px 6px;
    background-color: var(--icon-bg);
    border: 2px solid var(--icon-border-dark);
    font-size: 10px;
    color: var(--text-primary);
    font-family: var(--font-body);
    transition: all 0.3s ease;
  }

  .tech-badge:hover {
    background-color: var(--icon-bg-hover);
    transform: translate(-1px, -1px);
    box-shadow: 2px 2px 0 var(--icon-border-dark);
  }
</style>
