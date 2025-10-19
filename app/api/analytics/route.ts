import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { eventType, userId, metadata } = body

    await prisma.analyticsEvent.create({
      data: {
        eventType,
        userId,
        metadata,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Analytics error:", error)
    return NextResponse.json({ error: "Failed to log event" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const events = await prisma.analyticsEvent.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    })

    return NextResponse.json(events)
  } catch (error) {
    console.error("[v0] Get analytics error:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}
