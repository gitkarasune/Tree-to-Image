import type { TreeItem } from "../types"

export function parseTree(source: string): TreeItem {
  const lines = source.split("\n").filter((line) => line.trim())
  const root: TreeItem = { items: [] }
  const stack: TreeItem[] = [root]

  for (const line of lines) {
    const indent = line.search(/\S/)
    const level = Math.floor(indent / 2)
    const value = line.trim()

    // Pop stack to correct level
    while (stack.length > level + 1) {
      stack.pop()
    }

    const item: TreeItem = { value, items: [] }
    const parent = stack[stack.length - 1]

    if (!parent.items) {
      parent.items = []
    }
    parent.items.push(item)
    stack.push(item)
  }

  return root
}

export function flattenTree(tree: TreeItem): TreeItem[] {
  const result: TreeItem[] = []

  function traverse(node: TreeItem) {
    if (node.value) {
      result.push(node)
    }
    if (node.items) {
      node.items.forEach(traverse)
    }
  }

  traverse(tree)
  return result
}
