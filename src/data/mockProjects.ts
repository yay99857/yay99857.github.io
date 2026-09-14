// data/mockProjects.ts
import type { AppSection, DockApp } from '@/types/portfolio'

export const appSections: AppSection[] = [
  {
    title: 'Projetos Web',
    apps: [
      {
        id: '1',
        name: 'Dora',
        icon: 'md-gamepad',
        category: 'web',
        description:
          'Plataforma de matchmaking para encontrar duos e parceiros de jogo. Uma rede social, chat em tempo real e integração com pagamentos para apoiadores.',
        technologies: ['Next.js', 'Stripe', 'GoLang', 'Redis', 'Supabase'],
        screenshot: '/dora.webp',
      },
      {
        id: '2',
        name: 'Calme',
        icon: 'md-musicnote',
        category: 'web',
        description:
          'Player de música simples e minimalista. Reproduz músicas do YouTube com interface limpa e controles intuitivos.',
        technologies: ['React', 'YouTube API', 'Redux'],
        screenshot: '/calme.webp',
        demoUrl: 'https://calme.vercel.app/',
      },
      {
        id: '4',
        name: 'Suguna',
        icon: 'md-radio',
        category: 'web',
        description:
          'Rádio pela internet em forma de atlas. Um globo ortográfico desenhado em D3 plota oito mil estações do Radio Browser; escolha um país e a faixa de sintonia carrega as emissoras de lá. Player com suporte a HLS, favoritos e histórico guardados no próprio navegador.',
        technologies: ['React.js', 'TypeScript', 'D3', 'HLS.js', 'Vite'],
        screenshot: '/suguna.webp',
        demoUrl: 'https://suguna-web.vercel.app/',
        githubUrl: 'https://github.com/yay99857/suguna-web',
      },
      {
        id: '3',
        name: 'Hello',
        icon: 'md-article',
        category: 'web',
        description:
          'Você está olhando para ele. Um portfólio em formato de celular retrô: os projetos viram ícones na tela inicial, com dock, tema claro/escuro e visualizador de imagens.',
        technologies: ['Vue.js'],
        screenshot: '/hello.webp',
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
        name: 'Noted',
        icon: 'md-editnote',
        category: 'tools',
        description:
          'Caderno de notas em Markdown para desktop, local-first: tudo fica num SQLite na sua máquina. Editor CodeMirror com modo vim opcional, preview ao lado, busca full-text que ignora acentos, wiki links com backlinks e histórico de versões.',
        technologies: ['React.js', 'Tauri', 'SQLite', 'CodeMirror'],
        screenshot: '/noted.webp',
        githubUrl: 'https://github.com/yay99857/noted',
      },
    ],
  },
]

export const dockApps: DockApp[] = [
  { id: 'about', name: 'Sobre Mim', icon: 'md-accountcircle', route: '/about' },
  { id: 'gallery', name: 'Galeria', icon: 'md-photolibrary', route: '/gallery' },
  { id: 'skills', name: 'Skills', icon: 'md-code', route: '/skills' },
  { id: 'contact', name: 'Contato', icon: 'md-email', route: '/contact' },
]
