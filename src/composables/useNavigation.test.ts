import { describe, it, expect, beforeEach } from 'vitest'
import { useNavigation } from './useNavigation'
import type { AppItem, DockApp } from '@/types/portfolio'

describe('useNavigation', () => {
  let navigation: ReturnType<typeof useNavigation>

  const mockApp: AppItem = {
    id: 'test-app',
    name: 'Test App',
    icon: 'mdi:test',
    category: 'test',
    description: 'Test description',
    technologies: ['Vue', 'TypeScript'],
    screenshot: '/test.png',
    demoUrl: 'https://test.com',
    githubUrl: 'https://github.com/test',
  }

  const mockDockApp: DockApp = {
    id: 'dock-app',
    name: 'Dock App',
    icon: 'mdi:dock',
  }

  beforeEach(() => {
    navigation = useNavigation()
    navigation.resetNavigation()
  })

  it('starts with home view', () => {
    expect(navigation.currentView.value).toBe('home')
    expect(navigation.currentApp.value).toBe(null)
    expect(navigation.isOnHomeScreen.value).toBe(true)
    expect(navigation.isViewingApp.value).toBe(false)
  })

  it('navigates to app correctly', () => {
    navigation.navigateToApp(mockApp)

    expect(navigation.currentView.value).toBe('app-detail')
    expect(navigation.currentApp.value).toStrictEqual(mockApp)
    expect(navigation.isOnHomeScreen.value).toBe(false)
    expect(navigation.isViewingApp.value).toBe(true)
  })

  it('navigates home correctly', () => {
    navigation.navigateToApp(mockApp)
    navigation.navigateHome()

    expect(navigation.currentView.value).toBe('home')
    expect(navigation.currentApp.value).toBe(null)
    expect(navigation.isOnHomeScreen.value).toBe(true)
    expect(navigation.isViewingApp.value).toBe(false)
  })

  it('maintains navigation history', () => {
    navigation.navigateToApp(mockApp)
    expect(navigation.history.value).toHaveLength(1)
    expect(navigation.history.value[0].view).toBe('home')

    navigation.navigateToApp(mockDockApp)
    expect(navigation.history.value).toHaveLength(2)
    expect(navigation.history.value[1].view).toBe('app-detail')
    expect(navigation.history.value[1].app).toStrictEqual(mockApp)
  })

  it('navigates back correctly', () => {
    navigation.navigateToApp(mockApp)
    navigation.navigateToApp(mockDockApp)

    expect(navigation.currentApp.value).toStrictEqual(mockDockApp)

    navigation.navigateBack()
    expect(navigation.currentApp.value).toStrictEqual(mockApp)
    expect(navigation.currentView.value).toBe('app-detail')

    navigation.navigateBack()
    expect(navigation.currentView.value).toBe('home')
    expect(navigation.currentApp.value).toBe(null)
  })

  it('handles back navigation with empty history', () => {
    expect(navigation.history.value).toHaveLength(0)

    navigation.navigateBack()
    expect(navigation.currentView.value).toBe('home')
    expect(navigation.currentApp.value).toBe(null)
  })

  it('handles event handlers correctly', () => {
    const homeEvent = navigation.handleHomeClick()
    expect(homeEvent.type).toBe('home-click')
    expect(homeEvent.timestamp).toBeTypeOf('number')

    const backEvent = navigation.handleBackClick()
    expect(backEvent.type).toBe('back-click')
    expect(backEvent.timestamp).toBeTypeOf('number')

    const appEvent = navigation.handleAppOpen(mockApp)
    expect(appEvent.type).toBe('app-open')
    expect(appEvent.app).toBe(mockApp)
    expect(appEvent.timestamp).toBeTypeOf('number')
  })

  it('prevents duplicate history entries', () => {
    navigation.navigateToApp(mockApp)
    const historyLength = navigation.history.value.length

    // Navigating to the same app again should not add duplicate entry
    navigation.navigateToApp(mockApp)

    // The history should not have grown because we're navigating to the same app
    expect(navigation.history.value).toHaveLength(historyLength)

    // But the current app should still be the same
    expect(navigation.currentApp.value).toStrictEqual(mockApp)
  })

  it('limits history size', () => {
    // Add more than 10 entries
    for (let i = 0; i < 12; i++) {
      const app = { ...mockApp, id: `app-${i}`, name: `App ${i}` }
      navigation.navigateToApp(app)
    }

    expect(navigation.history.value.length).toBeLessThanOrEqual(10)
  })

  it('handles invalid app gracefully', () => {
    const invalidApp = null as unknown as AppItem
    const event = navigation.handleAppOpen(invalidApp)

    expect(event.type).toBe('app-open')
    // Should not crash or change current state
    expect(navigation.currentView.value).toBe('home')
  })
})
