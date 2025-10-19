"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { GenerationConfig } from "@/types"

interface CustomizationPanelProps {
  config: GenerationConfig
  onChange: (config: GenerationConfig) => void
}

const THEMES = [
  { id: "light", name: "Light" },
  { id: "dark", name: "Dark" },
  { id: "nord", name: "Nord" },
  { id: "dracula", name: "Dracula" },
]

export default function CustomizationPanel({ config, onChange }: CustomizationPanelProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("treeVizConfig")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        onChange(parsed)
      } catch (e) {
        console.error("Failed to load config from localStorage")
      }
    }
  }, [])

  const updateConfig = (updates: Partial<GenerationConfig>) => {
    const newConfig = { ...config, ...updates }
    onChange(newConfig)

    localStorage.setItem("treeVizConfig", JSON.stringify(newConfig))
  }

  if (!mounted) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-4">Appearance</h2>

          <div className="space-y-4">
            <div>
              <Label htmlFor="theme">Theme</Label>
              <Select value={config.theme} onValueChange={(value) => updateConfig({ theme: value })}>
                <SelectTrigger id="theme">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {THEMES.map((theme) => (
                    <SelectItem key={theme.id} value={theme.id}>
                      {theme.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="font">Font Family</Label>
              <Input id="font" value="Monospace" disabled className="bg-muted" />
            </div>

            <div>
              <Label htmlFor="fontSize">Font Size: {config.fontSize}px</Label>
              <input
                id="fontSize"
                type="range"
                min="12"
                max="24"
                value={config.fontSize}
                onChange={(e) => updateConfig({ fontSize: Number.parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-4">Colors</h2>

          <div className="space-y-4">
            <div>
              <Label htmlFor="primary">Primary Color</Label>
              <div className="flex gap-2">
                <input
                  id="primary"
                  type="color"
                  value={config.primaryColor}
                  onChange={(e) => updateConfig({ primaryColor: e.target.value })}
                  className="w-12 h-10 rounded cursor-pointer"
                />
                <Input
                  value={config.primaryColor}
                  onChange={(e) => updateConfig({ primaryColor: e.target.value })}
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="background">Background Color</Label>
              <div className="flex gap-2">
                <input
                  id="background"
                  type="color"
                  value={config.backgroundColor}
                  onChange={(e) => updateConfig({ backgroundColor: e.target.value })}
                  className="w-12 h-10 rounded cursor-pointer"
                />
                <Input
                  value={config.backgroundColor}
                  onChange={(e) => updateConfig({ backgroundColor: e.target.value })}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
