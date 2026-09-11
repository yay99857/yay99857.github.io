import { ref } from 'vue'

export type Theme = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'theme'

/**
 * Application-wide theme state.
 *
 * The `dark` class on <html> has already been set by the inline script in
 * index.html, before first paint. We only read back what it decided, so the
 * toggle never disagrees with what is actually rendered.
 */
const isDark = ref(
  typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
)

function apply(theme: Theme) {
  isDark.value = theme === 'dark'
  document.documentElement.classList.toggle('dark', isDark.value)
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // localStorage may be unavailable (private mode, blocked cookies). The
    // theme still applies for this session, it just is not remembered.
  }
}

export function useTheme() {
  const toggleTheme = () => apply(isDark.value ? 'light' : 'dark')

  return { isDark, toggleTheme }
}
