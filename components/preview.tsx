"use client"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import ModalPreview from "./modal-preview"
import type { TreeItem } from "@/types"
import Image from "next/image"

interface PreviewProps {
  imageUrl: string
  isLoading: boolean
  tree: TreeItem | null
}

export default function Preview({ imageUrl, isLoading, tree }: PreviewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (isLoading) {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-muted rounded-lg">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!imageUrl) {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-muted rounded-lg">
        <p className="text-muted-foreground text-center">Generate an image to see preview</p>
      </div>
    )
  }

  return (
    <>
      <div
        className="w-full bg-muted rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => setIsModalOpen(true)}
      >
        <Image 
        src={imageUrl || "/placeholder.svg"} 
        alt="Generated tree" 
        width={80}
        height={80}
        priority={true}
        quality={100}
        className="w-full h-auto" 
        />
      </div>

      <ModalPreview imageUrl={imageUrl} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} tree={tree} />
    </>
  )
}
