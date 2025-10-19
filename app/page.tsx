"use client"

import { useState, useCallback, useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import Editor from "@/components/editor"
import Preview from "@/components/preview"
import ExportPanel from "@/components/export-panel"
import CustomizationPanel from "@/components/customization-panel"
import TemplatesPanel from "@/components/templates-panel"
import HistoryPanel from "@/components/history-panel"
import Header from "@/components/header"
import AuthPromptModal from "@/components/auth-prompt-modal"
import { parseTree } from "@/lib/tree-parser"
import { generateImage } from "@/lib/image-generator"
import type { TreeItem, GenerationConfig } from "@/types"

const DEFAULT_TREE = `- src
  - components
    - ui
      - button.tsx
      - card.tsx
  - lib
    - utils.ts
  - app
    - page.tsx
- package.json`

export default function Home() {
  const { user, isLoaded } = useUser()
  const [source, setSource] = useState(DEFAULT_TREE)
  const [tree, setTree] = useState<TreeItem | null>(null)
  const [imageUrl, setImageUrl] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [generationCount, setGenerationCount] = useState(0)
  const [showAuthPrompt, setShowAuthPrompt] = useState(false)
  const [config, setConfig] = useState<GenerationConfig>({
    theme: "light",
    fontSize: 16,
    fontFamily: "mono",
    primaryColor: "#000000",
    accentColor: "#3b82f6",
    backgroundColor: "#ffffff",
    showIcons: true,
    padding: 32,
  })
  const [history, setHistory] = useState<Array<{ tree: TreeItem; config: GenerationConfig; timestamp: number }>>([])

  useEffect(() => {
    try {
      const parsed = parseTree(source)
      setTree(parsed)
    } catch (error) {
      console.error("[v0] Parse error:", error)
      setTree(null)
    }
  }, [source])

  const handleGenerate = useCallback(async () => {
    if (!tree) {
      toast.success("Please enter a valid tree structure")
      return
    }

    if (!user && generationCount >= 2) {
      setShowAuthPrompt(true)
      return
    }

    setIsLoading(true)
    try {
      const url = await generateImage(tree, config)
      setImageUrl(url)

      const newHistoryItem = { tree, config: { ...config }, timestamp: Date.now() }
      setHistory((prev) => [newHistoryItem, ...prev.slice(0, 9)])
      setGenerationCount((prev) => prev + 1)

      if (user) {
        await fetch("/api/generations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            treeStructure: source,
            config,
            imageUrl: url,
          }),
        })
      }

      toast.success("Image generated successfully")
    } catch (error) {
      console.error("[v0] Generation error:", error)
      toast.error("Failed to generate image")
    } finally {
      setIsLoading(false)
    }
  }, [tree, config, user, generationCount, source])

  const handleLoadTemplate = (templateSource: string) => {
    setSource(templateSource)
    toast.info("Redirecting to editor...")
  }

  const handleLoadHistory = (item: (typeof history)[0]) => {
    setTree(item.tree)
    setConfig(item.config)
    toast.info("Previous generation loaded")
  }

  if (!isLoaded) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <AuthPromptModal open={showAuthPrompt} onOpenChange={setShowAuthPrompt} />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Tabs defaultValue="editor" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="customize">Customize</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="editor" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <Card className="p-4">
                  <h2 className="text-lg font-semibold mb-4">Tree Structure</h2>
                  <Editor value={source} onChange={setSource} disabled={isLoading} />
                </Card>

                <Button onClick={handleGenerate} disabled={isLoading || !tree} size="lg" className="w-full">
                  {isLoading ? "Generating..." : "Generate Image"}
                </Button>
              </div>

              <div className="space-y-4">
                <Card className="p-4">
                  <h2 className="text-lg font-semibold mb-4">Preview</h2>
                  <Preview imageUrl={imageUrl} isLoading={isLoading} tree={tree} />
                </Card>

                {imageUrl && <ExportPanel imageUrl={imageUrl} tree={tree} config={config} />}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="templates">
            <TemplatesPanel onLoadTemplate={handleLoadTemplate} />
          </TabsContent>

          <TabsContent value="customize">
            <CustomizationPanel config={config} onChange={setConfig} />
          </TabsContent>

          <TabsContent value="history">
            <HistoryPanel history={history} onLoadHistory={handleLoadHistory} />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
