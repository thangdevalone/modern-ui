"use client"

import { useState, useRef, useEffect } from "react"
import { CopyButton } from "@/components/modern-ui/copy-button"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
  maxHeight?: number
}

export function CodeBlock({ code, language = "tsx", filename, maxHeight = 300 }: CodeBlockProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [shouldShowButton, setShouldShowButton] = useState(false)
  const codeRef = useRef<HTMLPreElement>(null)

  useEffect(() => {
    if (codeRef.current) {
      const codeHeight = codeRef.current.scrollHeight
      setShouldShowButton(codeHeight > maxHeight)
    }
  }, [maxHeight])

  return (
    <div className="relative my-4 overflow-hidden rounded-lg border bg-zinc-950 text-zinc-50">
      {filename && <div className="border-b bg-zinc-900 px-4 py-2 text-xs text-zinc-400">{filename}</div>}
      <div className="relative">
        <div
          className={cn(
            "overflow-hidden transition-all duration-500 ease-in-out",
            !isExpanded && shouldShowButton ? `max-h-[${maxHeight}px]` : "max-h-[5000px]",
          )}
          style={{
            maxHeight: !isExpanded && shouldShowButton ? maxHeight : 5000,
          }}
        >
          <pre ref={codeRef} className="overflow-x-auto p-4 text-sm">
            {code}
          </pre>
        </div>

        {shouldShowButton && (
          <div
            className={cn(
              "absolute bottom-0 left-0 right-0 flex justify-center py-2 transition-opacity duration-300",
              !isExpanded ? "bg-gradient-to-t from-zinc-950 to-transparent" : "",
            )}
          >
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 rounded-md bg-zinc-800 px-3 py-1 text-xs text-zinc-300 hover:bg-zinc-700 hover:text-zinc-50 transition-all"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="h-3 w-3" />
                  <span>Show Less</span>
                </>
              ) : (
                <>
                  <ChevronDown className="h-3 w-3" />
                  <span>Show More</span>
                </>
              )}
            </button>
          </div>
        )}

        <div className="absolute right-2 top-2">
          <CopyButton value={code} />
        </div>
      </div>
    </div>
  )
}

