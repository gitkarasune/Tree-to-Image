import { auth } from "@clerk/nextjs/server"
import DiffMatchPatch from "diff-match-patch"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

const dmp = new DiffMatchPatch()

export async function POST(request: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { versionA, versionB, generationId } = body

    const diffs = dmp.diff_main(versionA, versionB)
    dmp.diff_cleanupSemantic(diffs)

    const comparison = await prisma.treeComparison.create({
      data: {
        generationId,
        versionA,
        versionB,
        diffResult: { diffs },
      },
    })

    return NextResponse.json(comparison)
  } catch (error) {
    console.error("[v0] Compare error:", error)
    return NextResponse.json({ error: "Failed to compare trees" }, { status: 500 })
  }
}
