// types/portfolio.ts
export interface AppItem {
  id: string
  name: string
  icon: string // nome do ícone em oh-vue-icons, ex.: "md-gamepad" (ver src/icons.ts)
  description?: string // Descrição completa do projeto
  category: string
  technologies?: string[] // Array de tecnologias usadas
  screenshot?: string // URL da imagem de preview
  demoUrl?: string // Link para demo ao vivo
  githubUrl?: string // Link para repositório GitHub
  downloadUrl?: string // Link para download
}

export interface AppSection {
  title: string
  apps: AppItem[]
}

export interface DockApp {
  id: string
  name: string
  icon: string
  route?: string
}
