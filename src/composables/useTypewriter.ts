import { onUnmounted, ref } from 'vue'

interface Options {
  /** Milliseconds between characters. */
  speed?: number
  /** Milliseconds to wait before the first character, e.g. to let a view finish opening. */
  delay?: number
}

/**
 * Reveals a string one character at a time.
 *
 * Readers who asked for less motion get the whole string on the first frame:
 * a typewriter is decoration, never the only way to reach the text.
 */
export function useTypewriter(text: string, { speed = 18, delay = 0 }: Options = {}) {
  const typed = ref('')
  const isDone = ref(false)

  let timer: ReturnType<typeof setTimeout> | undefined

  const finish = () => {
    typed.value = text
    isDone.value = true
  }

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true

  if (prefersReducedMotion) {
    finish()
  } else {
    const step = () => {
      if (typed.value.length >= text.length) {
        isDone.value = true
        return
      }
      typed.value = text.slice(0, typed.value.length + 1)
      timer = setTimeout(step, speed)
    }

    timer = setTimeout(step, delay)
  }

  onUnmounted(() => clearTimeout(timer))

  return { typed, isDone, finish }
}
