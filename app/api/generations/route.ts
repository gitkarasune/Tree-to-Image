import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { treeStructure, config, imageUrl } = body

    const generation = await prisma.generation.create({
      data: {
        userId,
        treeStructure,
        config,
        imageUrl,
      },
    })

    return NextResponse.json(generation)
  } catch (error) {
    console.error("[v0] Generation API error:", error)
    return NextResponse.json({ error: "Failed to save generation" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const generations = await prisma.generation.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 50,
    })

    return NextResponse.json(generations)
  } catch (error) {
    console.error("[v0] Get generations error:", error)
    return NextResponse.json({ error: "Failed to fetch generations" }, { status: 500 })
  }
}
