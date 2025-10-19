"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

interface AIGeneratorProps {
  onGenerate: (tree: string) => void
}

export default function AIGenerator({ onGenerate }: AIGeneratorProps) {
  const [prompt, setPrompt] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a description")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/ai-generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) throw new Error("Failed to generate")

      const { tree } = await response.json()
      onGenerate(tree)

      toast.success("Tree generated with AI")

      setPrompt("")
    } catch (error) {
      console.error("[v0] AI generation error:", error)
      toast.error("Failed to generate tree with AI")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="p-4 space-y-4">
      <h3 className="font-semibold">AI Tree Generator</h3>
      <div className="space-y-2">
        <Input
          placeholder="Describe your project structure..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={isLoading}
        />
        <Button onClick={handleGenerate} disabled={isLoading} className="w-full">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Generate with AI
        </Button>
      </div>
    </Card>
  )
}
