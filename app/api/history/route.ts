import { sql } from "@vercel/postgres"
import { type NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    const result = await sql`
      SELECT * FROM history ORDER BY timestamp DESC LIMIT 100
    `
    return NextResponse.json(result.rows)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch history" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { tree, config, timestamp } = await request.json()

    const result = await sql`
      INSERT INTO history (tree, config, timestamp, bookmarked)
      VALUES (${JSON.stringify(tree)}, ${JSON.stringify(config)}, ${timestamp}, false)
      RETURNING *
    `

    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to save history" }, { status: 500 })
  }
}
