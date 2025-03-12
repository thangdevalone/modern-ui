"use client";

import {useEffect, useRef, useState} from "react";
import {Check, Copy, Terminal} from "lucide-react";
import {cn} from "@/lib/utils";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {coldarkDark} from "react-syntax-highlighter/dist/esm/styles/prism";
import {AnimatePresence, motion} from "framer-motion";

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
    <motion.div
      className="relative my-6 overflow-hidden rounded-xl border border-zinc-800 bg-[#0d1117] shadow-lg"
    >
      <div className="flex items-center justify-between border-b flex border-zinc-800 bg-[#161b22] px-4 py-2">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-zinc-400"/>
          {filename ? (
            <span className="text-xs font-medium text-zinc-300">{filename}</span>
          ) : (
            <span className="text-xs font-medium text-zinc-400">{getLanguageDisplayName()}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {filename && <span className="text-xs text-zinc-500">{getLanguageDisplayName()}</span>}
          <motion.button
            onClick={handleCopy}
            className="group relative rounded-md p-1.5 text-zinc-400"
            aria-label="Copy command"
            whileHover={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              color: "#ffffff",
            }}
            whileTap={{scale: 0.9}}
          >
            <AnimatePresence mode="wait">
              {hasCopied ? (
                <motion.div
                  key="check"
                  initial={{scale: 0.8, opacity: 0}}
                  animate={{scale: 1, opacity: 1}}
                  exit={{scale: 0.8, opacity: 0}}
                  transition={{duration: 0.15}}
                >
                  <Check className="h-4 w-4"/>
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{scale: 0.8, opacity: 0}}
                  animate={{scale: 1, opacity: 1}}
                  exit={{scale: 0.8, opacity: 0}}
                  transition={{duration: 0.15}}
                >
                  <Copy className="h-4 w-4"/>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Code content */}
      <div className="relative">
        <div
          className={cn("overflow-hidden transition-all duration-500 ease-in-out")}
          style={{
            maxHeight: !isExpanded && shouldShowButton ? maxHeight : 5000,
          }}
        >
          <div ref={codeRef} className="overflow-x-auto">
            <SyntaxHighlighter
              language={language}
              style={coldarkDark}
              showLineNumbers={showLineNumbers}
              wrapLines={true}
              lineProps={{style: {wordBreak: "break-all", whiteSpace: "pre-wrap"}}}
              customStyle={{
                margin: 0,
                padding: "1rem",
                background: "transparent",
                fontSize: "0.875rem",
                fontFamily: "JetBrains Mono, Menlo, Monaco, Consolas, monospace",
              }}
              codeTagProps={{
                style: {
                  fontFamily: "JetBrains Mono, Menlo, Monaco, Consolas, monospace",
                },
              }}
            >
              {code}
            </SyntaxHighlighter>
          </div>
        </div>


      </div>
    </motion.div>
  );
}

