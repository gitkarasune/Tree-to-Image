"use client"

import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Copy, Search } from "lucide-react"
import { toast } from "sonner"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { TEMPLATES } from "@/lib/templates"

interface TemplatesPanelProps {
  onLoadTemplate: (template: string) => void 
}

const ITEMS_PER_PAGE = 6

export default function TemplatesPanel({ onLoadTemplate }: TemplatesPanelProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const filteredTemplates = useMemo(() => {
    return TEMPLATES.filter(
      (template) =>
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
    )
  }, [searchQuery])

  const totalPages = Math.ceil(filteredTemplates.length / ITEMS_PER_PAGE)
  const paginatedTemplates = filteredTemplates.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const handleLoadTemplate = (template: string) => {
    onLoadTemplate(template)
    toast.success("Template has been loaded into the editor")
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Project Templates</h2>
        <p className="text-muted-foreground">Choose a template to get started quickly</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search templates by name, description, or tags..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            setCurrentPage(1)
          }}
          className="pl-10"
        />
      </div>

      {paginatedTemplates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedTemplates.map((template) => (
            <Card key={template.id} className="p-4 hover:shadow-lg transition-shadow flex flex-col">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold">{template.name}</h3>
                  {template.popular && <Badge variant="default">Popular</Badge>}
                </div>
                <p className="text-sm text-muted-foreground mb-3">{template.description}</p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {template.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button onClick={() => handleLoadTemplate(template.template)} className="w-full" size="sm">
                <Copy className="w-4 h-4 mr-2" />
                Load Template
              </Button>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">No templates found matching your search.</p>
        </Card>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious onClick={() => setCurrentPage(currentPage - 1)} />
                </PaginationItem>
              )}

              {Array.from({ length: totalPages }).map((_, i) => (
                <PaginationItem key={i + 1}>
                  <PaginationLink onClick={() => setCurrentPage(i + 1)} isActive={currentPage === i + 1}>
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

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
