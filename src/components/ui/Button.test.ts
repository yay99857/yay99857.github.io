import { render, screen, fireEvent } from '@testing-library/vue'
import { describe, it, expect, vi } from 'vitest'
import Button from './Button.vue'

describe('Button', () => {
  it('renders slot content', () => {
    render(Button, { slots: { default: 'Click me' } })
    expect(screen.getByRole('button').textContent).toContain('Click me')
  })

  it('applies primary variant classes by default', () => {
    render(Button, { slots: { default: 'Primary' } })
    const button = screen.getByRole('button')
    expect(button.className).toContain('bg-blue-600')
  })

  it('applies secondary variant classes', () => {
    render(Button, { props: { variant: 'secondary' }, slots: { default: 'Secondary' } })
    const button = screen.getByRole('button')
    expect(button.className).toContain('bg-gray-600')
  })

  it('applies outline variant classes', () => {
    render(Button, { props: { variant: 'outline' }, slots: { default: 'Outline' } })
    const button = screen.getByRole('button')
    expect(button.className).toContain('border-blue-600')
  })

  it('emits click event when clicked', async () => {
    const onClick = vi.fn()
    render(Button, {
      props: { onClick },
      slots: { default: 'Click' },
    })
    await fireEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('does not emit click when disabled', async () => {
    const onClick = vi.fn()
    render(Button, {
      props: { disabled: true, onClick },
      slots: { default: 'Disabled' },
    })
    await fireEvent.click(screen.getByRole('button'))
    expect(onClick).not.toHaveBeenCalled()
  })

  it('applies disabled styles when disabled', () => {
    render(Button, { props: { disabled: true }, slots: { default: 'Disabled' } })
    const button = screen.getByRole('button') as HTMLButtonElement
    expect(button.disabled).toBe(true)
    expect(button.className).toContain('opacity-50')
  })
})
