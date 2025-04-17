"use client";

import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, Terminal } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CopyButton } from "./modern-ui/copy-button";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  maxHeight?: number;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  code,
  language = "js",
  filename,
  maxHeight = 300,
  showLineNumbers = true,
}: CodeBlockProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowButton, setShouldShowButton] = useState(false);
  const highlighterRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const checkCodeHeight = () => {
      if (highlighterRef.current) {
        const codeHeight = highlighterRef.current.scrollHeight;
        setShouldShowButton(codeHeight > maxHeight);
      }
    };

    checkCodeHeight();

    const timer = setTimeout(checkCodeHeight, 100);

    const resizeObserver = new ResizeObserver(() => {
      checkCodeHeight();
    });

    if (highlighterRef.current) {
      resizeObserver.observe(highlighterRef.current);
    }

    window.addEventListener("resize", checkCodeHeight);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkCodeHeight);
      resizeObserver.disconnect();
    };
  }, [maxHeight, code]);

  const getLanguageDisplayName = () => {
    const languageMap: Record<string, string> = {
      js: "JavaScript",
      jsx: "React JSX",
      ts: "TypeScript",
      tsx: "React TSX",
      html: "HTML",
      css: "CSS",
      json: "JSON",
      py: "Python",
      rb: "Ruby",
      go: "Go",
      java: "Java",
      php: "PHP",
      rust: "Rust",
      swift: "Swift",
      c: "C",
      cpp: "C++",
      cs: "C#",
      sh: "Shell",
      bash: "Bash",
      sql: "SQL",
      yaml: "YAML",
      md: "Markdown",
    };

    return languageMap[language] || language.toUpperCase();
  };

  return (
    <motion.div className="overflow-hidden relative rounded-xl border border-zinc-800 bg-[#0d1117] shadow-lg not-prose">
      {language !== "bash" ? (
        <div className="flex items-center justify-between border-b border-zinc-800 bg-[#161b22] px-4 py-2">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-zinc-400" />
            {filename ? (
              <span className="text-xs font-medium text-zinc-300">
                {filename}
              </span>
            ) : (
              <span className="text-xs font-medium text-zinc-400">
                {getLanguageDisplayName()}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {filename && (
              <span className="text-xs text-zinc-500">
                {getLanguageDisplayName()}
              </span>
            )}
            <CopyButton value={code} />
          </div>
        </div>
      ) : (
        <div className="absolute right-2 top-2 z-10">
          <CopyButton value={code} />
        </div>
      )}

      <div
        className="relative h-full"
        style={{
          maxHeight: isExpanded ? "none" : `${maxHeight}px`,
          transition: "max-height 0.3s ease-in-out",
        }}
      >
        <div
          className={cn("h-full code-scrollbar")}
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#4B5563 #1F2937",
          }}
        >
          <style jsx global>{`
            .code-scrollbar::-webkit-scrollbar {
              width: 8px;
              height: 8px;
            }
            .code-scrollbar::-webkit-scrollbar-track {
              background: #1f2937;
            }
            .code-scrollbar::-webkit-scrollbar-thumb {
              background: #4b5563;
              border-radius: 4px;
            }
            .code-scrollbar::-webkit-scrollbar-thumb:hover {
              background: #6b7280;
            }
          `}</style>
          <SyntaxHighlighter
            language={language}
            style={coldarkDark}
            showLineNumbers={showLineNumbers && language !== "bash"}
            wrapLines={true}
            lineProps={{}}
            customStyle={{
              margin: 0,
              padding: "1rem",
              background: "transparent",
              fontSize: "0.875rem",
              fontFamily: "JetBrains Mono, Menlo, Monaco, Consolas, monospace",
              overflow: "auto",
              height: "100%",
              scrollbarWidth: "thin",
              scrollbarColor: "#4B5563 #1F2937",
            }}
            codeTagProps={{
              style: {
                fontFamily:
                  "JetBrains Mono, Menlo, Monaco, Consolas, monospace",
              },
            }}
            className="code-scrollbar"
            ref={highlighterRef as any}
          >
            {code}
          </SyntaxHighlighter>
        </div>

        {shouldShowButton && !isExpanded && (
          <div
            className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0d1117] to-transparent pointer-events-none"
            style={{ width: "calc(100% - 15px)" }}
          />
        )}

        {shouldShowButton && (
          <motion.div
            className="absolute bottom-1 left-0 right-0 flex justify-center pb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{ pointerEvents: "none" }}
          >
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center cursor-pointer gap-1 rounded-md bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:bg-zinc-700 transition-colors z-10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ pointerEvents: "auto" }}
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="h-3.5 w-3.5" />
                  <span>Collapse code</span>
                </>
              ) : (
                <>
                  <ChevronDown className="h-3.5 w-3.5" />
                  <span>Expand code</span>
                </>
              )}
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
