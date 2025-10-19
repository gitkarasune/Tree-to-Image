"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

interface TreeComparisonProps {
  generationId: string
}

interface DiffResult {
  diffs: [number, string][]
}

interface Comparison {
  id: string
  generationId: string
  versionA: string
  versionB: string
  diffResult: DiffResult
}

export default function TreeComparison({ generationId }: TreeComparisonProps) {
  const [versionA, setVersionA] = useState("")
  const [versionB, setVersionB] = useState("")
  const [comparison, setComparison] = useState<Comparison | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleCompare = async () => {
    if (!versionA || !versionB) {
      toast.warning("Please enter both versions")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ versionA, versionB, generationId }),
      })

      if (!response.ok) throw new Error("Failed to compare")

      const result = await response.json()
      setComparison(result)

      toast.success("Trees compared successfully")
    } catch (error) {
      console.error("[v0] Comparison error:", error)
      toast.success("Failed to compare trees")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 space-y-2">
          <h3 className="font-semibold">Version A</h3>
          <Textarea
            placeholder="Enter first tree structure"
            value={versionA}
            onChange={(e) => setVersionA(e.target.value)}
            className="min-h-40"
          />
        </Card>

        <Card className="p-4 space-y-2">
          <h3 className="font-semibold">Version B</h3>
          <Textarea
            placeholder="Enter second tree structure"
            value={versionB}
            onChange={(e) => setVersionB(e.target.value)}
            className="min-h-40"
          />
        </Card>
      </div>

      <Button onClick={handleCompare} disabled={isLoading} className="w-full">
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Compare Trees
      </Button>

      {comparison && (
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Comparison Result</h3>
          <pre className="bg-muted p-3 rounded text-sm overflow-auto max-h-60">
            {JSON.stringify(comparison.diffResult, null, 2)}
          </pre>
        </Card>
      )}
    </div>
  )
}
