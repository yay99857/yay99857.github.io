import { describe, it, expect, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import PhoneFrame from './PhoneFrame.vue'
import type { AppSection, DockApp } from '@/types/portfolio'

describe('Navigation Flow Integration', () => {
  let wrapper: VueWrapper<InstanceType<typeof PhoneFrame>>

  const mockSections: AppSection[] = [
    {
      title: 'Test Section',
      apps: [
        {
          id: 'test-app-1',
          name: 'Test App 1',
          icon: 'mdi:test',
          category: 'test',
          description: 'Test app description',
          technologies: ['Vue', 'TypeScript'],
          screenshot: '/test1.png',
          demoUrl: 'https://test1.com',
          githubUrl: 'https://github.com/test1',
        },
        {
          id: 'test-app-2',
          name: 'Test App 2',
          icon: 'mdi:test-2',
          category: 'test',
          description: 'Another test app',
          technologies: ['React', 'JavaScript'],
          screenshot: '/test2.png',
        },
      ],
    },
  ]

  const mockDockApps: DockApp[] = [
    {
      id: 'dock-app-1',
      name: 'About',
      icon: 'mdi:account',
    },
    {
      id: 'dock-app-2',
      name: 'Contact',
      icon: 'mdi:email',
    },
  ]

  beforeEach(() => {
    wrapper = mount(PhoneFrame, {
      props: {
        sections: mockSections,
        dockApps: mockDockApps,
        totalPages: 1,
      },
    })
  })

  it('starts on home screen with all home components visible', () => {
    // Should show home screen components
    expect(wrapper.find('.phone-content').exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'AppGrid' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'DockBar' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'PageIndicator' }).exists()).toBe(false) // totalPages = 1

    // Should not show app detail view
    expect(wrapper.findComponent({ name: 'AppDetailView' }).exists()).toBe(false)
  })

  it('transitions to app view when app is clicked', async () => {
    // Simulate app click
    const appGrid = wrapper.findComponent({ name: 'AppGrid' })
    await appGrid.vm.$emit('app-click', mockSections[0].apps[0])

    await wrapper.vm.$nextTick()

    // Should hide home screen components
    expect(wrapper.find('.phone-content').exists()).toBe(false)
    expect(wrapper.findComponent({ name: 'DockBar' }).exists()).toBe(false)

    // Should show app detail view
    expect(wrapper.findComponent({ name: 'AppDetailView' }).exists()).toBe(true)

    // Verify the correct app is displayed
    const appDetailView = wrapper.findComponent({ name: 'AppDetailView' })
    expect(appDetailView.props('app')).toEqual(mockSections[0].apps[0])
  })

  it('transitions to app view when dock app is clicked', async () => {
    // Simulate dock app click
    const dockBar = wrapper.findComponent({ name: 'DockBar' })
    await dockBar.vm.$emit('app-click', mockDockApps[0])

    await wrapper.vm.$nextTick()

    // Should hide home screen components
    expect(wrapper.find('.phone-content').exists()).toBe(false)
    expect(wrapper.findComponent({ name: 'DockBar' }).exists()).toBe(false)

    // Should show app detail view
    expect(wrapper.findComponent({ name: 'AppDetailView' }).exists()).toBe(true)

    // Verify the correct dock app is displayed
    const appDetailView = wrapper.findComponent({ name: 'AppDetailView' })
    expect(appDetailView.props('app')).toEqual(mockDockApps[0])
  })

  it('returns to home when back button is clicked from app view', async () => {
    // First navigate to app
    const appGrid = wrapper.findComponent({ name: 'AppGrid' })
    await appGrid.vm.$emit('app-click', mockSections[0].apps[0])
    await wrapper.vm.$nextTick()

    // Verify we're in app view
    expect(wrapper.findComponent({ name: 'AppDetailView' }).exists()).toBe(true)

    // Click back button in app detail view (now goes to home)
    const appDetailView = wrapper.findComponent({ name: 'AppDetailView' })
    await appDetailView.vm.$emit('back')
    await wrapper.vm.$nextTick()

    // Should return to home screen
    expect(wrapper.find('.phone-content').exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'AppGrid' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'DockBar' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'AppDetailView' }).exists()).toBe(false)
  })

  it('returns to home when back button is clicked from app view (with empty history)', async () => {
    // First navigate to app
    const appGrid = wrapper.findComponent({ name: 'AppGrid' })
    await appGrid.vm.$emit('app-click', mockSections[0].apps[0])
    await wrapper.vm.$nextTick()

    // Verify we're in app view
    expect(wrapper.findComponent({ name: 'AppDetailView' }).exists()).toBe(true)

    // Click back button in app detail view
    const appDetailView = wrapper.findComponent({ name: 'AppDetailView' })
    await appDetailView.vm.$emit('back')
    await wrapper.vm.$nextTick()

    // Should return to home screen (since history is empty)
    expect(wrapper.find('.phone-content').exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'AppGrid' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'DockBar' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'AppDetailView' }).exists()).toBe(false)
  })

  it('navigates between multiple apps using back button', async () => {
    // Navigate to first app
    const appGrid = wrapper.findComponent({ name: 'AppGrid' })
    await appGrid.vm.$emit('app-click', mockSections[0].apps[0])
    await wrapper.vm.$nextTick()

    // Verify first app is displayed
    const appDetailView = wrapper.findComponent({ name: 'AppDetailView' })
    expect(appDetailView.props('app')).toEqual(mockSections[0].apps[0])

    // Go back to home using back button
    await appDetailView.vm.$emit('back')
    await wrapper.vm.$nextTick()

    // Should be back on home screen
    expect(wrapper.find('.phone-content').exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'AppDetailView' }).exists()).toBe(false)
  })

  it('maintains visual consistency across navigation states', async () => {
    // Check initial phone frame structure
    expect(wrapper.find('.phone-frame').exists()).toBe(true)
    expect(wrapper.find('.phone-screen').exists()).toBe(true)
    expect(wrapper.find('.phone-notch').exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'StatusBar' }).exists()).toBe(true)

    // Navigate to app
    const appGrid = wrapper.findComponent({ name: 'AppGrid' })
    await appGrid.vm.$emit('app-click', mockSections[0].apps[0])
    await wrapper.vm.$nextTick()

    // Phone frame structure should remain consistent
    expect(wrapper.find('.phone-frame').exists()).toBe(true)
    expect(wrapper.find('.phone-screen').exists()).toBe(true)
    expect(wrapper.find('.phone-notch').exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'StatusBar' }).exists()).toBe(true)

    // Navigate back to home using back button
    const appDetailView = wrapper.findComponent({ name: 'AppDetailView' })
    await appDetailView.vm.$emit('back')
    await wrapper.vm.$nextTick()

    // Phone frame structure should still be consistent
    expect(wrapper.find('.phone-frame').exists()).toBe(true)
    expect(wrapper.find('.phone-screen').exists()).toBe(true)
    expect(wrapper.find('.phone-notch').exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'StatusBar' }).exists()).toBe(true)
  })

  it('emits correct events for external handling', async () => {
    // Test app-click event emission
    const appGrid = wrapper.findComponent({ name: 'AppGrid' })
    await appGrid.vm.$emit('app-click', mockSections[0].apps[0])

    expect(wrapper.emitted('app-click')).toBeTruthy()
    expect(wrapper.emitted('app-click')![0]).toEqual([mockSections[0].apps[0]])

    // Go back to home to access dock bar
    const appDetailView = wrapper.findComponent({ name: 'AppDetailView' })
    await appDetailView.vm.$emit('back')
    await wrapper.vm.$nextTick()

    // Test dock-click event emission
    const dockBar = wrapper.findComponent({ name: 'DockBar' })
    await dockBar.vm.$emit('app-click', mockDockApps[0])

    expect(wrapper.emitted('dock-click')).toBeTruthy()
    expect(wrapper.emitted('dock-click')![0]).toEqual([mockDockApps[0]])
  })
})
