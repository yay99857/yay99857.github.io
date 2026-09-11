// types/portfolio.ts
export interface AppItem {
  id: string
  name: string
  icon: string // oh-vue-icons name, e.g. "md-gamepad" (see src/icons.ts)
  description?: string // Full project description
  category: string
  technologies?: string[] // Technologies used
  screenshot?: string // Preview image URL
  demoUrl?: string // Live demo link
  githubUrl?: string // GitHub repository link
  downloadUrl?: string // Download link
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
