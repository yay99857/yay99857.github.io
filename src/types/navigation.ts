import type { AppItem, DockApp } from './portfolio'

// Navigation state interfaces
export interface NavigationHistoryItem {
  view: 'home' | 'app-detail'
  app?: AppItem | DockApp
  timestamp: number
}

export interface NavigationState {
  currentView: 'home' | 'app-detail'
  currentApp: AppItem | DockApp | null
  history: NavigationHistoryItem[]
}

// Event interfaces
export interface HomeNavigationEvent {
  type: 'home-click'
  timestamp: number
}

export interface BackNavigationEvent {
  type: 'back-click'
  timestamp: number
}

export interface AppNavigationEvent {
  type: 'app-open'
  app: AppItem | DockApp
  timestamp: number
}

export type NavigationEvent = HomeNavigationEvent | BackNavigationEvent | AppNavigationEvent
