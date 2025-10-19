"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { SiGithub } from "react-icons/si"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function Header() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const isDarkMode = localStorage.getItem("darkMode") === "true"
    setIsDark(isDarkMode)
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !isDark
    setIsDark(newDarkMode)
    localStorage.setItem("darkMode", String(newDarkMode))

    if (newDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  if (!mounted) return null

  return (
    <header className="border-b border-border bg-card"> 
      <div className="container mx-auto px-4 py-4 max-w-[95rem]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <p className="text-sm text-muted-foreground">Convert file trees to beautiful images</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              onClick={toggleDarkMode}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>

            <Button size="lg">
               <a href="https://github.com/gitKarasune" target="_blank" rel="noopener noreferrer">
                 <SiGithub className="w-8 h-8" />
               </a>
             </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
