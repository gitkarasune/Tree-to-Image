"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { toast } from "sonner"
import { Download, Copy, Share2, FileJson, Code2, Sparkles } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { TreeItem, GenerationConfig } from "@/types"

interface ExportPanelProps {
  imageUrl: string
  tree: TreeItem | null
  config: GenerationConfig
}

export default function ExportPanel({ imageUrl, tree, config }: ExportPanelProps) {
  const [isExporting, setIsExporting] = useState(false)

  const downloadImage = async (format: "png" | "jpg" | "webp" | "pdf" | "svg") => {
    setIsExporting(true)
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `tree-${Date.now()}.${format}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast.success(`Image downloaded as ${format.toUpperCase()}`)
    } catch (error) {
        console.log("Error!", error)
      toast.error("Failed to download image")
    } finally {
      setIsExporting(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })])
      toast.success("Image copied to clipboard")
    } catch (error) {
                console.log("Error!", error)
      toast.error("Failed to copy image")
    }
  }

  const shareToAI = (platform: string) => {
    const text = "Check out my project structure generated with Treexy!"
    const urls: Record<string, string> = {
      chatgpt: `https://chat.openai.com`,
      claude: `https://claude.ai`,
      deepseek: `https://chat.deepseek.com`,
      gemini: `https://gemini.google.com`,
      v0: `https://v0.app`,
    }

    if (urls[platform]) {
      window.open(urls[platform], "_blank")
      toast.info(`Opening ${platform} in new tab`)
    }
  }

  const shareToSocial = (platform: string) => {
    const text = "Check out my project structure generated with Treexy!"
    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
    }

    if (urls[platform]) {
      window.open(urls[platform], "_blank", "width=600,height=400")
      toast.success(`Shared to ${platform}`)
    }
  }

  const exportAsJSON = () => {
    const data = {
      tree,
      config,
      generatedAt: new Date().toISOString(),
    }
    const json = JSON.stringify(data, null, 2)
    const blob = new Blob([json], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `tree-config-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast.info("Configuration exported as JSON")
  }

  return (
    <Card className="p-4 space-y-4">
      <h3 className="font-semibold">Export & Share</h3>

      <div className="space-y-2">
        <p className="text-sm ">Download Formats</p>
        <div className="grid grid-cols-4 gap-2">
          <Button size="sm" onClick={() => downloadImage("png")} disabled={isExporting}>
            <Download className="w-4 h-4 mr-2" />
            PNG
          </Button>
          <Button size="sm" onClick={() => downloadImage("jpg")} disabled={isExporting}>
            <Download className="w-4 h-4 mr-2" />
            JPG
          </Button>
          <Button size="sm" onClick={() => downloadImage("webp")} disabled={isExporting}>
            <Download className="w-4 h-4 mr-2" />
            WebP
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm">
                <Download className="w-4 h-4 mr-2" />
                More
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => downloadImage("pdf")}>PDF</DropdownMenuItem>
              <DropdownMenuItem onClick={() => downloadImage("svg")}>SVG</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm ">Share to AI</p>
        <div className="grid grid-cols-3 gap-2"> 
          <Button size="sm" onClick={() => shareToAI("chatgpt")} className="text-xs">
            <Sparkles className="w-3 h-3 mr-1" />
            ChatGPT
          </Button>
          <Button size="sm" onClick={() => shareToAI("claude")} className="text-xs">
            <Sparkles className="w-3 h-3 mr-1" />
            Claude
          </Button>
          <Button size="sm" onClick={() => shareToAI("deepseek")} className="text-xs">
            <Sparkles className="w-3 h-3 mr-1" />
            Deepseek
          </Button>
          <Button size="sm" onClick={() => shareToAI("gemini")} className="text-xs">
            <Sparkles className="w-3 h-3 mr-1" />
            Gemini
          </Button>
          <Button size="sm" onClick={() => shareToAI("v0")} className="text-xs">
            <Code2 className="w-3 h-3 mr-1" />
            V0
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm ">Share to Social</p>
        <div className="grid grid-cols-3 lg:grid-cols-4 gap-2">
          <Button size="sm" onClick={() => shareToSocial("twitter")}>
            <Share2 className="w-4 h-4 mr-2" />
            Twitter
          </Button>
          <Button size="sm" onClick={() => shareToSocial("linkedin")}>
            <Share2 className="w-4 h-4 mr-2" />
            LinkedIn
          </Button>
        <Button size="sm" className="w-full" onClick={copyToClipboard}>
          <Copy className="w-4 h-4 mr-2" />
          Copy to Clipboard
        </Button>
        <Button size="sm" className="w-full" onClick={exportAsJSON}>
          <FileJson className="w-4 h-4 mr-2" />
          Export Config
        </Button>
        </div>
      </div>
    </Card>
  )
}
