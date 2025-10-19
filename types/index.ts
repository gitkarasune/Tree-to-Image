export interface TreeItem {
  value?: string
  items?: TreeItem[]
  depth?: number
}

export interface Tree {
  items?: TreeItem[]
}

export interface GenerationConfig {
  theme: string
  fontSize: number
  fontFamily: string
  primaryColor: string
  accentColor: string
  backgroundColor: string
  showIcons: boolean
  padding: number
}
