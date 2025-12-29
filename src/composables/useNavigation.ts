import { ref, computed } from 'vue'
import type { AppItem, DockApp } from '@/types/portfolio'
import type {
  NavigationHistoryItem,
  NavigationState,
  HomeNavigationEvent,
  BackNavigationEvent,
  AppNavigationEvent,
} from '@/types/navigation'

export function useNavigation() {
  // Reactive navigation state
  const currentView = ref<'home' | 'app-detail'>('home')
  const currentApp = ref<AppItem | DockApp | null>(null)
  const history = ref<NavigationHistoryItem[]>([])

  // Computed properties
  const navigationState = computed<NavigationState>(() => ({
    currentView: currentView.value,
    currentApp: currentApp.value,
    history: history.value,
  }))

  const canGoBack = computed(() => history.value.length > 0)
  const isOnHomeScreen = computed(() => currentView.value === 'home')
  const isViewingApp = computed(() => currentView.value === 'app-detail')

  // Navigation functions
  function navigateToApp(app: AppItem | DockApp) {
    // Don't add to history if we're already viewing the same app (by id)
    if (currentView.value === 'app-detail' && currentApp.value?.id === app.id) {
      return // Already viewing this app, no need to navigate
    }

    // Add current state to history before navigating
    addToHistory(currentView.value, currentApp.value)

    // Update current state
    currentView.value = 'app-detail'
    currentApp.value = app
  }

  function navigateHome() {
    // Only add to history if not already on home
    if (currentView.value !== 'home') {
      addToHistory(currentView.value, currentApp.value)
    }

    // Reset to home state
    currentView.value = 'home'
    currentApp.value = null
  }

  function navigateBack() {
    if (history.value.length === 0) {
      // If no history, go to home
      navigateHome()
      return
    }

    // Get the last item from history
    const previousState = history.value.pop()
    if (previousState) {
      currentView.value = previousState.view
      currentApp.value = previousState.app || null
    } else {
      // Fallback to home if history item is invalid
      navigateHome()
    }
  }

  function addToHistory(view: 'home' | 'app-detail', app?: AppItem | DockApp | null) {
    // Don't add invalid or duplicate entries
    if (!view) return

    const lastEntry = history.value[history.value.length - 1]
    if (lastEntry && lastEntry.view === view && lastEntry.app === app) {
      return // Don't add duplicate entries
    }

    const historyItem: NavigationHistoryItem = {
      view,
      app: app || undefined,
      timestamp: Date.now(),
    }

    // Limit history size to prevent memory issues
    if (history.value.length >= 10) {
      history.value.shift() // Remove oldest entry
    }

    history.value.push(historyItem)
  }

  function clearHistory() {
    history.value = []
  }

  function resetNavigation() {
    currentView.value = 'home'
    currentApp.value = null
    clearHistory()
  }

  // Event handlers
  function handleHomeClick(): HomeNavigationEvent {
    try {
      navigateHome()
      return {
        type: 'home-click',
        timestamp: Date.now(),
      }
    } catch (error) {
      console.warn('Error handling home click:', error)
      // Force reset to home state
      currentView.value = 'home'
      currentApp.value = null
      return {
        type: 'home-click',
        timestamp: Date.now(),
      }
    }
  }

  function handleBackClick(): BackNavigationEvent {
    try {
      navigateBack()
      return {
        type: 'back-click',
        timestamp: Date.now(),
      }
    } catch (error) {
      console.warn('Error handling back click:', error)
      // Fallback to home
      navigateHome()
      return {
        type: 'back-click',
        timestamp: Date.now(),
      }
    }
  }

  function handleAppOpen(app: AppItem | DockApp): AppNavigationEvent {
    try {
      if (!app) {
        throw new Error('Invalid app provided to handleAppOpen')
      }
      navigateToApp(app)
      return {
        type: 'app-open',
        app,
        timestamp: Date.now(),
      }
    } catch (error) {
      console.warn('Error handling app open:', error)
      // Stay on current view if app opening fails
      return {
        type: 'app-open',
        app,
        timestamp: Date.now(),
      }
    }
  }

  return {
    // State
    currentView,
    currentApp,
    history,
    navigationState,

    // Computed
    canGoBack,
    isOnHomeScreen,
    isViewingApp,

    // Navigation functions
    navigateToApp,
    navigateHome,
    navigateBack,
    clearHistory,
    resetNavigation,

    // Event handlers
    handleHomeClick,
    handleBackClick,
    handleAppOpen,
  }
}
