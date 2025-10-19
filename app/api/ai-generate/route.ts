import { auth } from "@clerk/nextjs/server"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { NextResponse } from "next/server"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "")

export async function POST(request: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { prompt } = body

    const model = genAI.getGenerativeModel({ model: "gemini-pro" })
    const result = await model.generateContent(
      `Generate a file tree structure based on this description. Return only the tree structure in markdown format with dashes and indentation:\n\n${prompt}`,
    )

    const response = await result.response
    const text = response.text()

    return NextResponse.json({ tree: text })
  } catch (error) {
    console.error("[v0] AI generation error:", error)
    return NextResponse.json({ error: "Failed to generate tree" }, { status: 500 })
  }
}
