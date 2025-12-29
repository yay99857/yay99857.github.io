import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)

  const doubleCount = computed(() => count.value * 2)
  const isPositive = computed(() => count.value > 0)
  const isNegative = computed(() => count.value < 0)

  function increment() {
    count.value++
  }

  function decrement() {
    count.value--
  }

  function reset() {
    count.value = initialValue
  }

  function set(value: number) {
    count.value = value
  }

  return {
    count,
    doubleCount,
    isPositive,
    isNegative,
    increment,
    decrement,
    reset,
    set,
  }
}
