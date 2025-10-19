"use client"

import { useState, useEffect, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Trash2, Bookmark, Search } from "lucide-react"
import { toast } from "sonner"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Skeleton } from "@/components/ui/skeleton"
import type { TreeItem, GenerationConfig } from "@/types"

interface HistoryItem {
  id: string
  tree: TreeItem
  config: GenerationConfig
  timestamp: number
  bookmarked: boolean
}

interface HistoryPanelProps {
  history: Array<{ tree: TreeItem; config: GenerationConfig; timestamp: number }>
  onLoadHistory: (item: { tree: TreeItem; config: GenerationConfig; timestamp: number }) => void
}

const ITEMS_PER_PAGE = 6

export default function HistoryPanel({ history, onLoadHistory }: HistoryPanelProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [dbHistory, setDbHistory] = useState<HistoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const response = await fetch("/api/history")
        if (response.ok) {
          const data = await response.json()
          setDbHistory(data)
        }
      } catch (error) {
        console.error("Failed to load history:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadHistory()
  }, [])

  const filteredHistory = useMemo(() => {
    return dbHistory.filter((item) =>
      new Date(item.timestamp).toLocaleString().toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [searchQuery, dbHistory])

  const totalPages = Math.ceil(filteredHistory.length / ITEMS_PER_PAGE)
  const paginatedHistory = filteredHistory.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/history/${id}`, { method: "DELETE" })
      setDbHistory(dbHistory.filter((item) => item.id !== id))
      toast.success("History item deleted")
    } catch (error) {
      console.log("Error!", error)
      toast.error("Failed to delete history")
    }
  }

  const handleBookmark = async (id: string, bookmarked: boolean) => {
    try {
      await fetch(`/api/history/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookmarked: !bookmarked }),
      })
      setDbHistory(dbHistory.map((item) => (item.id === id ? { ...item, bookmarked: !bookmarked } : item)))
      toast.success(`${bookmarked ? 'Removed from bookmarks' : 'Added to bookmarks'},`)
    } catch (error) {
      console.log("Error!", error)
      toast.error("Failed to update bookmark")
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    )
  }

  if (dbHistory.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">No history yet. Generate some images to see them here.</p>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search history by date or time..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            setCurrentPage(1)
          }}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginatedHistory.map((item, index) => (
          <Card key={item.id} className="p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm font-medium">Generation #{dbHistory.length - index}</p>
                <p className="text-xs text-muted-foreground">{new Date(item.timestamp).toLocaleString()}</p>
              </div>
              {item.bookmarked && <Badge variant="default">Bookmarked</Badge>}
            </div>

            <div className="flex gap-2 mt-4">
              <Button
                onClick={() => onLoadHistory({ tree: item.tree, config: item.config, timestamp: item.timestamp })}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                Load
              </Button>
              <Button onClick={() => handleBookmark(item.id, item.bookmarked)} variant="outline" size="sm">
                <Bookmark className={`w-4 h-4 ${item.bookmarked ? "fill-current" : ""}`} />
              </Button>
              <Button onClick={() => handleDelete(item.id)} variant="outline" size="sm" className="text-destructive">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious onClick={() => setCurrentPage(currentPage - 1)} />
                </PaginationItem>
              )}

              {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                const pageNum = i + 1
                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink onClick={() => setCurrentPage(pageNum)} isActive={currentPage === pageNum}>
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                )
              })}

              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationNext onClick={() => setCurrentPage(currentPage + 1)} />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}
