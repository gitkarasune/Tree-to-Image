"use client"

import { useEffect, useRef } from "react"
import hljs from "highlight.js/lib/core"
import markdown from "highlight.js/lib/languages/markdown"
import "highlight.js/styles/atom-one-dark.css"

hljs.registerLanguage("markdown", markdown)

interface EditorProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export default function Editor({ value, onChange, disabled }: EditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const preRef = useRef<HTMLPreElement>(null)
  const linesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (preRef.current) {
      preRef.current.innerHTML = hljs.highlight(value, { language: "markdown" }).value
    }
  }, [value])

  const handleScroll = () => {
    if (textareaRef.current && preRef.current) {
      preRef.current.scrollTop = textareaRef.current.scrollTop
      preRef.current.scrollLeft = textareaRef.current.scrollLeft
    }
  }

  const lineCount = value.split("\n").length

  return (
    <div className="relative w-full h-96 border border-input rounded-lg overflow-hidden bg-muted">
      <div className="absolute left-0 top-0 w-12 h-full bg-muted-foreground/10 border-r border-input flex flex-col items-center pt-4 text-xs text-muted-foreground font-mono">
        {Array.from({ length: lineCount }).map((_, i) => (
          <div key={i} className="h-6 flex items-center justify-center">
            {i + 1}
          </div>
        ))}
      </div>

      <pre
        ref={preRef}
        className="absolute top-0 left-12 w-full h-full p-4 font-mono text-sm overflow-hidden pointer-events-none"
        style={{ margin: 0 }}
      >
        <code>{value}</code>
      </pre>

      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onScroll={handleScroll}
        disabled={disabled}
        className="relative left-12 w-[calc(100%-48px)] h-full p-4 font-mono text-sm bg-transparent text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 dark:focus:ring-offset-background"
        spellCheck="false"
      />
    </div>
  )
}
