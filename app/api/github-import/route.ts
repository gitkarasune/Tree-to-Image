import { auth } from "@clerk/nextjs/server"
import { Octokit } from "@octokit/rest"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { owner, repo, token } = body as { owner: string; repo: string; token: string }

    const octokit = new Octokit({ auth: token })

    // Type-safe representation of GitHub repo items
    type RepoItem = {
      type: "file" | "dir" | "symlink" | "submodule"
      name: string
      path: string
    }

    // Recursive function to build the file tree
    const buildTree = async (path = "", prefix = ""): Promise<string> => {
      const { data } = await octokit.repos.getContent({ owner, repo, path })

      if (!Array.isArray(data)) {
        return data?.name ? `${prefix}- ${data.name}` : ""
      }

      const lines: string[] = []

      for (const item of data as RepoItem[]) {
      // Skip items without name or that start with '.'
        if (!item.name || item.name.startsWith(".")) continue

        if (item.type === "dir") {
          lines.push(`${prefix}- ${item.name}/`)
          const subTree = await buildTree(item.path ?? "", `${prefix}  `)
          if (subTree) lines.push(subTree)
        } else {
          lines.push(`${prefix}- ${item.name}`)
        }
      }

      return lines.join("\n")
    }

    const tree = await buildTree()

    return NextResponse.json({ tree })
  } catch (error) {
    console.error("[v0] GitHub import error:", error)
    return NextResponse.json({ error: "Failed to import from GitHub" }, { status: 500 })
  }
}
