import { auth } from "@clerk/nextjs/server"
import sharp from "sharp"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { imageUrls, format, watermark } = body

    const processedImages = await Promise.all(
      imageUrls.map(async (url: string) => {
        let image = sharp(Buffer.from(url, "base64"))

        if (format === "webp") {
          image = image.webp()
        } else if (format === "png") {
          image = image.png()
        } else if (format === "jpg") {
          image = image.jpeg()
        }

        if (watermark) {
          const watermarkBuffer = Buffer.from(watermark)
          image = image.composite([{ input: watermarkBuffer, gravity: "southeast" }])
        }

        return await image.toBuffer()
      }),
    )

    return NextResponse.json({ images: processedImages.map((img) => img.toString("base64")) })
  } catch (error) {
    console.error("[v0] Batch export error:", error)
    return NextResponse.json({ error: "Failed to batch export" }, { status: 500 })
  }
}
