"use client"

import { useEffect, useState } from "react"
import { io, type Socket } from "socket.io-client"
import Editor from "./editor"
import { toast } from "sonner"

interface CollaborativeEditorProps {
  generationId: string
  initialValue: string
  onTreeChange: (tree: string) => void
}

export default function CollaborativeEditor({ generationId, initialValue, onTreeChange }: CollaborativeEditorProps) {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [value, setValue] = useState(initialValue)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000", {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    })

    newSocket.on("connect", () => {
      console.log("[v0] Connected to collaboration server")
      setIsConnected(true)
      newSocket.emit("join-collaboration", generationId)
      toast.success("connected: enjoy!")
    })

    newSocket.on("tree-updated", (updatedTree: string) => {
      console.log("[v0] Received tree update")
      setValue(updatedTree)
      onTreeChange(updatedTree)
    })

    newSocket.on("disconnect", () => {
      console.log("[v0] Disconnected from collaboration server")
      setIsConnected(false)
      toast.success("disconnected: bye!")
    })

    setSocket(newSocket)

    return () => {
      newSocket.disconnect()
    }
  }, [generationId, onTreeChange])

  const handleChange = (newValue: string) => {
    setValue(newValue)
    onTreeChange(newValue)

    if (socket && isConnected) {
      socket.emit("tree-update", generationId, newValue)
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Collaborative Editor</h3>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`} />
          <span className="text-xs text-muted-foreground">{isConnected ? "Connected" : "Disconnected"}</span>
        </div>
      </div>
      <Editor value={value} onChange={handleChange} />
    </div>
  )
}
