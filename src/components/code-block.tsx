"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, ChevronUp, Copy, Terminal } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { AnimatePresence, motion } from "framer-motion";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  maxHeight?: number;
  expandedHeight?: number;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  code,
  language = "js",
  filename,
  maxHeight = 300,
  expandedHeight = 800,
  showLineNumbers = true,
}: CodeBlockProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowButton, setShouldShowButton] = useState(false);
  const codeRef = useRef<HTMLDivElement>(null);
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    if (codeRef.current) {
      const codeHeight = codeRef.current.scrollHeight;
      setShouldShowButton(codeHeight > maxHeight);
    }
  }, [maxHeight, code]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

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
          <motion.button
            onClick={handleCopy}
            className="group relative rounded-md p-1.5 text-zinc-400"
            aria-label="Copy command"
            whileHover={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              color: "#ffffff",
            }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {hasCopied ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Check className="h-4 w-4" />
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="cursor-pointer"
                >
                  <Copy className="h-4 w-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      <div
        className="relative h-full"
        style={{
          maxHeight: isExpanded ? "100%" : maxHeight,
        }}
      >
        <div
          ref={codeRef}
          className="h-full"
          style={{
            scrollbarWidth: "thin",
            overflow: isExpanded ? "auto" : "hidden",
            scrollbarColor: "#4B5563 #1F2937",
          }}
        >
          <SyntaxHighlighter
            language={language}
            style={coldarkDark}
            showLineNumbers={showLineNumbers}
            wrapLines={true}
            lineProps={{}}
            customStyle={{
              margin: 0,
              padding: "1rem",
              background: "transparent",
              fontSize: "0.875rem",
              fontFamily: "JetBrains Mono, Menlo, Monaco, Consolas, monospace",
            }}
            codeTagProps={{
              style: {
                fontFamily:
                  "JetBrains Mono, Menlo, Monaco, Consolas, monospace",
              },
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>

        {shouldShowButton && !isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0d1117] to-transparent pointer-events-none" />
        )}

        {shouldShowButton && (
          <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-2">
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center cursor-pointer gap-1 rounded-md bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-300 hover:bg-zinc-700 transition-colors z-10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="h-3.5 w-3.5" />
                  <span>Collapse</span>
                </>
              ) : (
                <>
                  <ChevronDown className="h-3.5 w-3.5" />
                  <span>Expand</span>
                </>
              )}
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
