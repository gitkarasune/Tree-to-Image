"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

interface GitHubImporterProps {
  onImport: (tree: string) => void
}

export default function GitHubImporter({ onImport }: GitHubImporterProps) {
  const [owner, setOwner] = useState("")
  const [repo, setRepo] = useState("")
  const [token, setToken] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleImport = async () => {
    if (!owner || !repo || !token) {
      toast.success("Please fill in all fields")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/github-import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ owner, repo, token }),
      })

      if (!response.ok) throw new Error("Failed to import")

      const { tree } = await response.json()
      onImport(tree)

      toast.success("Repository structure imported")

      setOwner("")
      setRepo("")
      setToken("")
    } catch (error) {
      console.error("[v0] GitHub import error:", error)
      toast.error("Failed to import from GitHub")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="p-4 space-y-4">
      <h3 className="font-semibold">Import from GitHub</h3>
      <div className="space-y-2">
        <Input placeholder="Repository owner" value={owner} onChange={(e) => setOwner(e.target.value)} />
        <Input placeholder="Repository name" value={repo} onChange={(e) => setRepo(e.target.value)} />
        <Input placeholder="GitHub token" type="password" value={token} onChange={(e) => setToken(e.target.value)} />
        <Button onClick={handleImport} disabled={isLoading} className="w-full">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Import Repository
        </Button>
      </div>
    </Card>
  )
}
