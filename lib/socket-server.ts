import type { Server as HTTPServer } from "http"
import { Server as SocketIOServer } from "socket.io"

let io: SocketIOServer | null = null

export function initializeSocket(httpServer: HTTPServer) {
  io = new SocketIOServer(httpServer, {
    cors: {
      origin: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  })

  io.on("connection", (socket) => {
    console.log("[v0] User connected:", socket.id)

    socket.on("join-collaboration", (generationId: string) => {
      socket.join(`generation-${generationId}`)
    })

    socket.on("tree-update", (generationId: string, treeStructure: string) => {
      io?.to(`generation-${generationId}`).emit("tree-updated", treeStructure)
    })

    socket.on("disconnect", () => {
      console.log("[v0] User disconnected:", socket.id)
    })
  })

  return io
}

export function getSocket() {
  return io
}
