import { auth } from "@clerk/nextjs/server"
import PDFDocument from "pdfkit"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { treeStructure, title, description } = body

    const doc = new PDFDocument()
    const chunks: Buffer[] = []

    doc.on("data", (chunk) => chunks.push(chunk))

    doc.fontSize(24).text(title || "Tree Structure Report", { align: "center" })
    doc.moveDown()

    if (description) {
      doc.fontSize(12).text(description)
      doc.moveDown()
    }

    doc.fontSize(10).text(treeStructure, { align: "left" })

    doc.end()

    return new Promise((resolve) => {
      doc.on("end", () => {
        const pdfBuffer = Buffer.concat(chunks)
        resolve(
          new NextResponse(pdfBuffer, {
            headers: {
              "Content-Type": "application/pdf",
              "Content-Disposition": 'attachment; filename="tree-report.pdf"',
            },
          }),
        )
      })
    })
  } catch (error) {
    console.error("[v0] PDF generation error:", error)
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 })
  }
}
