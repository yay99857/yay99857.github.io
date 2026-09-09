import { ref } from 'vue'

export type Theme = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'theme'

/**
 * Estado do tema, compartilhado por toda a aplicação.
 *
 * A classe `dark` no <html> já foi aplicada pelo script inline do index.html,
 * antes do primeiro paint — aqui só lemos o que ele decidiu, para não haver
 * divergência entre o que está na tela e o que o componente acha que está.
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
    // localStorage pode estar indisponível (modo privado, cookies bloqueados);
    // o tema ainda funciona nesta sessão, só não é lembrado na próxima.
  }
}

export function useTheme() {
  const toggleTheme = () => apply(isDark.value ? 'light' : 'dark')

  return { isDark, toggleTheme }
}
