"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

interface Commands {
  [key: string]: string;
}

interface TerminalBlockProps {
  commands: Commands;
  activeTab?: keyof Commands;
  showTypingAnimation?: boolean;
}

export function TerminalBlock({
  commands,
  activeTab = Object.keys(commands)[0],
  showTypingAnimation = true,
}: TerminalBlockProps) {
  const [hasCopied, setHasCopied] = useState(false);
  const [displayedCommand, setDisplayedCommand] = useState("");
  const [isTyping, setIsTyping] = useState(showTypingAnimation);
  const [currentTab, setCurrentTab] = useState<keyof Commands>(activeTab);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(commands[currentTab]);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  useEffect(() => {
    if (showTypingAnimation) {
      setIsTyping(true);
      setDisplayedCommand("");
    }
  }, [currentTab, showTypingAnimation]);

  useEffect(() => {
    if (!showTypingAnimation) {
      setDisplayedCommand(commands[currentTab]);
      return;
    }

    if (isTyping) {
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i <= commands[currentTab].length) {
          setDisplayedCommand(commands[currentTab].slice(0, i));
          i++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, 30);

      return () => clearInterval(typingInterval);
    }
  }, [commands, currentTab, isTyping, showTypingAnimation]);

  const tabs = Object.keys(commands);

  return (
    <motion.div
      className="overflow-hidden rounded-xl border border-zinc-800 bg-[#0d1117] shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex border-b border-zinc-800 bg-[#161b22]">
        {tabs.map((tab) => (
          <motion.button
            key={tab}
            onClick={() => setCurrentTab(tab as keyof Commands)}
            className={cn(
              "relative px-6 py-3 text-sm font-medium cursor-pointer transition-colors",
              currentTab === tab
                ? "text-primary-foreground"
                : "text-zinc-500 hover:text-zinc-300"
            )}
            whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
            whileTap={{ scale: 0.97 }}
          >
            {tab}
            {currentTab === tab && (
              <motion.span
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#58a6ff]"
                layoutId="activeTab"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
        <div className="ml-auto pr-2 flex items-center">
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
                >
                  <Copy className="h-4 w-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentTab}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
          className="p-4 text-sm"
        >
          <div className="flex text-primary-foreground font-mono">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {displayedCommand}
            </motion.span>
            {isTyping && (
              <motion.span
                className="ml-0.5 h-4 w-2 bg-zinc-400"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
              />
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
