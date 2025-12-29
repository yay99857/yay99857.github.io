import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PhoneNavigation from './PhoneNavigation.vue'

describe('PhoneNavigation', () => {
  it('renders only back button by default', () => {
    const wrapper = mount(PhoneNavigation)

    const backButton = wrapper.find('.back-button')
    const homeButton = wrapper.find('.home-button')

    expect(backButton.exists()).toBe(true)
    expect(homeButton.exists()).toBe(false) // Home button removed
  })

  it('hides back button when showBackButton is false', () => {
    const wrapper = mount(PhoneNavigation, {
      props: { showBackButton: false },
    })

    const backButton = wrapper.find('.back-button')
    const homeButton = wrapper.find('.home-button')

    expect(backButton.exists()).toBe(false)
    expect(homeButton.exists()).toBe(false) // Home button removed
  })

  it('displays title when provided', () => {
    const title = 'Test App'
    const wrapper = mount(PhoneNavigation, {
      props: { title },
    })

    const titleElement = wrapper.find('.nav-title')
    expect(titleElement.exists()).toBe(true)
    expect(titleElement.text()).toBe(title)
  })

  it('emits back-click event when back button is clicked', async () => {
    const wrapper = mount(PhoneNavigation)

    const backButton = wrapper.find('.back-button')
    await backButton.trigger('click')

    expect(wrapper.emitted('back-click')).toBeTruthy()
    expect(wrapper.emitted('back-click')).toHaveLength(1)
  })

  it('has proper accessibility attributes', () => {
    const wrapper = mount(PhoneNavigation)

    const backButton = wrapper.find('.back-button')

    expect(backButton.attributes('aria-label')).toBe('Go back')
    expect(backButton.attributes('type')).toBe('button')
  })

  it('applies correct CSS classes', () => {
    const wrapper = mount(PhoneNavigation)

    expect(wrapper.find('.phone-navigation').exists()).toBe(true)
    expect(wrapper.find('.nav-content').exists()).toBe(true)
    expect(wrapper.find('.back-button').exists()).toBe(true)
    expect(wrapper.find('.home-button').exists()).toBe(false) // Home button removed
  })

  it('provides visual feedback on button interactions', () => {
    const wrapper = mount(PhoneNavigation)

    const backButton = wrapper.find('.back-button')

    // Check that buttons have hover and active states via CSS classes
    expect(backButton.classes()).toContain('nav-button')
  })
})
