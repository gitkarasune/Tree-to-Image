import { sql } from "@vercel/postgres"
import { type NextRequest, NextResponse } from "next/server"

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await sql`DELETE FROM history WHERE id = ${params.id}`
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to delete history" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { bookmarked } = await request.json()

    const result = await sql`
      UPDATE history SET bookmarked = ${bookmarked} WHERE id = ${params.id}
      RETURNING *
    `

    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to update history" }, { status: 500 })
  }
}
