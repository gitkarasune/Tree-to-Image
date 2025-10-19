import type { TreeItem } from "@/types"

export function detectProjectType(tree: TreeItem | null): string {
  if (!tree || !tree.items) return "Unknown"

  const items = tree.items.map((item) => item.value?.toLowerCase() || "")
  const itemsStr = items.join(" ")

  if (itemsStr.includes("app") && itemsStr.includes("package.json")) {
    if (itemsStr.includes("next.config")) return "Next.js"
    return "React"
  }
  if (itemsStr.includes("manage.py")) return "Django"
  if (itemsStr.includes("src") && itemsStr.includes("setup.py")) return "Python"
  if (itemsStr.includes("packages") && itemsStr.includes("turbo.json")) return "Monorepo"
  if (itemsStr.includes("frontend") && itemsStr.includes("backend")) return "Full Stack"
  if (itemsStr.includes("myproject") && itemsStr.includes("myapp")) return "Django"
  if (itemsStr.includes("src") && itemsStr.includes("components")) return "React"
  if (itemsStr.includes("lib") && itemsStr.includes("components")) return "Next.js"

  return "Project"
}
