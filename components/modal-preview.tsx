"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { detectProjectType } from "@/lib/project-detector"
import type { TreeItem } from "@/types"
import Image from "next/image"

interface ModalPreviewProps {
  imageUrl: string
  isOpen: boolean
  onClose: () => void
  tree: TreeItem | null
}

export default function ModalPreview({ imageUrl, isOpen, onClose, tree }: ModalPreviewProps) {
  const [projectType, setProjectType] = useState<string>("")

  useEffect(() => {
    if (tree) {
      const detected = detectProjectType(tree)
      setProjectType(detected)
    }
  }, [tree])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <div
              className="relative bg-background rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-muted rounded-lg transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-6">
                <Image
                  src={imageUrl || "/placeholder.svg"}
                  alt="Generated tree preview"
                  width={100}
                  height={100}
                  priority={true}
                  quality={100}
                  className="w-full rounded-lg shadow-lg"
                />

                {projectType && (
                  <div className="mt-4 flex gap-2 flex-wrap">
                    <Badge variant="secondary">{projectType}</Badge>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
