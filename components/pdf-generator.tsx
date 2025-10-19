"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

interface PDFGeneratorProps {
  treeStructure: string
}

export default function PDFGenerator({ treeStructure }: PDFGeneratorProps) {
  const [title, setTitle] = useState("Tree Structure Report")
  const [description, setDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleGeneratePDF = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/pdf-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ treeStructure, title, description }),
      })

      if (!response.ok) throw new Error("Failed to generate PDF")

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "tree-report.pdf"
      a.click()

      toast.success("PDF generated and downloaded")
    } catch (error) {
      console.error("[v0] PDF generation error:", error)
      toast.error("Failed to generate PDF")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="p-4 space-y-4">
      <h3 className="font-semibold">Generate PDF Report</h3>
      <div className="space-y-2">
        <Input
          placeholder="Report title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isLoading}
        />
        <Textarea
          placeholder="Report description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isLoading}
          className="min-h-24"
        />
        <Button onClick={handleGeneratePDF} disabled={isLoading} className="w-full">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? "Generating..." : "Generate PDF"}
        </Button>
      </div>
    </Card>
  )
}
