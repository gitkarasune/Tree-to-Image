import type { TreeItem, GenerationConfig } from "../types"

export async function generateImage(tree: TreeItem, config: GenerationConfig): Promise<string> {
  // Create canvas
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")
  if (!ctx) throw new Error("Could not get canvas context")

  // Calculate dimensions
  const itemCount = countItems(tree)
  const lineHeight = config.fontSize + 8
  const width = 800
  const height = Math.max(400, itemCount * lineHeight + config.padding * 2)

  canvas.width = width
  canvas.height = height

  // Set background
  ctx.fillStyle = config.backgroundColor
  ctx.fillRect(0, 0, width, height)

  // Set font
  const fontFamily = config.fontFamily === "mono" ? "monospace" : config.fontFamily === "serif" ? "serif" : "sans-serif"
  ctx.font = `${config.fontSize}px ${fontFamily}`
  ctx.fillStyle = config.primaryColor

  // Draw tree
  let y = config.padding + config.fontSize
  drawTree(ctx, tree, 0, y, config, (newY) => {
    y = newY
  })

  // Convert to image
  return canvas.toDataURL("image/png")
}

function drawTree(
  ctx: CanvasRenderingContext2D,
  tree: TreeItem,
  depth: number,
  y: number,
  config: GenerationConfig,
  updateY: (y: number) => void,
): number {
  if (!tree.items) return y

  for (const item of tree.items) {
    const indent = depth * 20 + config.padding
    const text = item.value || ""

    // Draw item
    ctx.fillStyle = config.primaryColor
    ctx.fillText(text, indent, y)
    y += config.fontSize + 8

    // Draw children
    if (item.items && item.items.length > 0) {
      y = drawTree(ctx, item, depth + 1, y, config, updateY)
    }
  }

  updateY(y)
  return y
}

function countItems(tree: TreeItem): number {
  let count = 0

  function traverse(node: TreeItem) {
    if (node.items) {
      count += node.items.length
      node.items.forEach(traverse)
    }
  }

  traverse(tree)
  return count
}
