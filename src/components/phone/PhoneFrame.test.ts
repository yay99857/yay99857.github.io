import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import PhoneFrame from './PhoneFrame.vue'
import AppGrid from './AppGrid.vue'
import AppView from './AppView.vue'
import DockBar from './DockBar.vue'
import DockView from './DockView.vue'
import StatusBar from './StatusBar.vue'
import type { AppItem, AppSection, DockApp } from '@/types/portfolio'

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
  { id: 'about', name: 'About', icon: 'mdi:account' },
  { id: 'contact', name: 'Contact', icon: 'mdi:email' },
]

describe('PhoneFrame', () => {
  let wrapper: VueWrapper<InstanceType<typeof PhoneFrame>>

  /** Abre um app do grid e espera o Vue processar a troca de view. */
  const openApp = async (app: AppItem) => {
    await wrapper.findComponent(AppGrid).vm.$emit('app-click', app)
    await wrapper.vm.$nextTick()
  }

  /** Abre um app do dock e espera o Vue processar a troca de view. */
  const openDockApp = async (app: DockApp) => {
    await wrapper.findComponent(DockBar).vm.$emit('app-click', app)
    await wrapper.vm.$nextTick()
  }

  beforeEach(() => {
    wrapper = mount(PhoneFrame, {
      props: {
        sections: mockSections,
        dockApps: mockDockApps,
      },
      global: {
        stubs: { 'v-icon': true },
      },
    })
  })

  afterEach(() => {
    // StatusBar mantém um setInterval; desmontar evita timer vazando entre testes
    wrapper.unmount()
  })

  describe('tela inicial', () => {
    it('mostra o grid de apps e o dock, e nenhuma view aberta', () => {
      expect(wrapper.findComponent(AppGrid).exists()).toBe(true)
      expect(wrapper.findComponent(DockBar).isVisible()).toBe(true)
      expect(wrapper.find('.home-screen').isVisible()).toBe(true)
      expect(wrapper.findComponent(AppView).exists()).toBe(false)
      expect(wrapper.findComponent(DockView).exists()).toBe(false)
    })

    it('repassa as seções recebidas para o AppGrid', () => {
      expect(wrapper.findComponent(AppGrid).props('sections')).toEqual(mockSections)
      expect(wrapper.findComponent(DockBar).props('apps')).toEqual(mockDockApps)
    })

    it('desabilita o botão home quando nada está aberto', () => {
      expect(wrapper.find('.home-button').attributes('disabled')).toBeDefined()
    })

    it('esconde o indicador de páginas quando há só uma página', () => {
      expect(wrapper.find('.page-indicator').exists()).toBe(false)
    })
  })

  describe('abrindo um app do grid', () => {
    it('mostra o AppView com o app clicado', async () => {
      await openApp(mockSections[0].apps[0])

      const appView = wrapper.findComponent(AppView)
      expect(appView.exists()).toBe(true)
      expect(appView.props('app')).toEqual(mockSections[0].apps[0])
    })

    it('esconde a tela inicial e o dock', async () => {
      await openApp(mockSections[0].apps[0])

      expect(wrapper.find('.home-screen').isVisible()).toBe(false)
      expect(wrapper.findComponent(DockBar).isVisible()).toBe(false)
    })

    it('habilita o botão home', async () => {
      await openApp(mockSections[0].apps[0])

      expect(wrapper.find('.home-button').attributes('disabled')).toBeUndefined()
    })

    it('troca de app quando outro é aberto em seguida', async () => {
      await openApp(mockSections[0].apps[0])
      await openApp(mockSections[0].apps[1])

      expect(wrapper.findComponent(AppView).props('app')).toEqual(mockSections[0].apps[1])
    })
  })

  describe('abrindo um app do dock', () => {
    it('mostra o DockView com o app clicado', async () => {
      await openDockApp(mockDockApps[0])

      const dockView = wrapper.findComponent(DockView)
      expect(dockView.exists()).toBe(true)
      expect(dockView.props('app')).toEqual(mockDockApps[0])
      expect(wrapper.findComponent(AppView).exists()).toBe(false)
    })
  })

  describe('voltando para a tela inicial', () => {
    it('fecha o AppView pelo botão de voltar do próprio app', async () => {
      await openApp(mockSections[0].apps[0])

      await wrapper.findComponent(AppView).find('.back-btn').trigger('click')
      await wrapper.vm.$nextTick()

      expect(wrapper.findComponent(AppView).exists()).toBe(false)
      expect(wrapper.find('.home-screen').isVisible()).toBe(true)
    })

    it('fecha o DockView pelo botão de voltar do próprio app', async () => {
      await openDockApp(mockDockApps[0])

      await wrapper.findComponent(DockView).find('.back-btn').trigger('click')
      await wrapper.vm.$nextTick()

      expect(wrapper.findComponent(DockView).exists()).toBe(false)
      expect(wrapper.find('.home-screen').isVisible()).toBe(true)
    })

    it('fecha qualquer view pelo botão home do aparelho', async () => {
      await openApp(mockSections[0].apps[0])

      await wrapper.find('.home-button').trigger('click')
      await wrapper.vm.$nextTick()

      expect(wrapper.findComponent(AppView).exists()).toBe(false)
      expect(wrapper.find('.home-screen').isVisible()).toBe(true)
      expect(wrapper.find('.home-button').attributes('disabled')).toBeDefined()
    })
  })

  it('mantém a moldura do aparelho em todos os estados', async () => {
    const chromeIsIntact = () =>
      wrapper.find('.phone-frame').exists() &&
      wrapper.find('.phone-screen').exists() &&
      wrapper.find('.phone-notch').exists() &&
      wrapper.findComponent(StatusBar).exists()

    expect(chromeIsIntact()).toBe(true)

    await openApp(mockSections[0].apps[0])
    expect(chromeIsIntact()).toBe(true)

    await openDockApp(mockDockApps[0])
    expect(chromeIsIntact()).toBe(true)

    await wrapper.find('.home-button').trigger('click')
    await wrapper.vm.$nextTick()
    expect(chromeIsIntact()).toBe(true)
  })
})
