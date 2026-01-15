export interface NavItem {
  id: string
  label: string
  path: string
  icon?: string
}

export interface RouteConfig {
  path: string
  element: React.ReactNode
  title: string
}
