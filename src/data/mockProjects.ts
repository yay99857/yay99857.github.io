// data/mockProjects.ts
import type { AppSection, DockApp } from '@/types/portfolio'

export const appSections: AppSection[] = [
  {
    title: 'Projetos Web',
    apps: [
      {
        id: '1',
        name: 'JogaJunto',
        icon: 'mdi:gamepad-variant',
        category: 'web',
        description:
          'Plataforma de matchmaking para encontrar duos e parceiros de jogo. Uma rede social, chat em tempo real e integração com pagamentos para apoiadores.',
        technologies: ['Next.js', 'Stripe', 'GoLang', 'Redis', 'Supabase'],
        screenshot: '/jogajunto.png',
        demoUrl: 'https://juntojoga.vercel.app/',
      },
      {
        id: '2',
        name: 'Calme',
        icon: 'mdi:music',
        category: 'web',
        description:
          'Player de música simples e minimalista. Reproduz músicas do YouTube com interface limpa e controles intuitivos.',
        technologies: ['React', 'YouTube API', 'Redux'],
        screenshot: '/calme.png',
        demoUrl: 'https://calme.vercel.app/',
      },
      {
        id: '3',
        name: 'Hello',
        icon: 'mdi:post',
        category: 'web',
        description:
          'Você está olhando para ele! Um portfólio interativo com estética retrô, simulando a interface de um cetigo para apresentar meus projetos de forma criativa.',
        technologies: ['Vue.js'],
        screenshot: '/hello.png',
      },
    ],
  },
  //   {
  //     title: 'Apps Mobile',
  //     apps: [
  //       {
  //         id: '5',
  //         name: 'Fitness App',
  //         icon: 'mdi:run',
  //         category: 'mobile',
  //         description:
  //           'Aplicativo de fitness com tracking de exercícios, planos de treino personalizados e integração com wearables. Inclui gamificação e desafios sociais.',
  //         technologies: ['React Native', 'Redux', 'Node.js', 'MongoDB'],
  //         demoUrl: 'https://demo.example.com/fitness',
  //         githubUrl: 'https://github.com/user/fitness-app',
  //       },
  //       {
  //         id: '6',
  //         name: 'Weather',
  //         icon: 'mdi:weather-sunny',
  //         category: 'mobile',
  //         description:
  //           'App de previsão do tempo com dados em tempo real, alertas meteorológicos e widgets personalizáveis. Interface minimalista e intuitiva.',
  //         technologies: ['Flutter', 'Dart', 'OpenWeather API'],
  //         githubUrl: 'https://github.com/user/weather-app',
  //       },
  //     ],
  //   },
  {
    title: 'Ferramentas',
    apps: [
      {
        id: '7',
        name: 'Skuld',
        icon: 'mdi:note-edit',
        category: 'tools',
        description:
          'Editor de notas minimalista com suporte a Markdown. Interface limpa e focada na escrita, com preview em tempo real.',
        technologies: ['React.js', 'Tauri', 'SQLite'],
        screenshot: '/skuld.png',
        githubUrl: 'https://github.com/yay99857/skuld',
        downloadUrl: 'https://github.com/yay99857/skuld/releases/tag/0.1.0',
      },
    ],
  },
]

export const dockApps: DockApp[] = [
  { id: 'about', name: 'Sobre Mim', icon: 'mdi:account-circle', route: '/about' },
  { id: 'gallery', name: 'Galeria', icon: 'mdi:image-multiple', route: '/gallery' },
  { id: 'skills', name: 'Skills', icon: 'mdi:code-tags', route: '/skills' },
  { id: 'contact', name: 'Contato', icon: 'mdi:email', route: '/contact' },
]
