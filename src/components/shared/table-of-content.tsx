"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Bug, Lightbulb } from "lucide-react";
import type { TOCItem } from "@/lib/toc";
import { extractTOC } from "@/lib/toc";

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const tocItems = extractTOC(content);
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, x: 10 },
    show: { opacity: 1, x: 0 },
  };

  const renderTOCItems = (items: TOCItem[]) => {
    return (
      <motion.ul
        className="space-y-1"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {items.map((tocItem) => (
          <motion.li key={tocItem.id} variants={item}>
            <Link
              href={`#${tocItem.id}`}
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(tocItem.id);
                if (element) {
                  const offset = 200;
                  const elementPosition =
                    element.getBoundingClientRect().top + window.scrollY;
                  window.scrollTo({
                    top: elementPosition - offset,
                    behavior: "smooth",
                  });
                }
              }}
              className="text-muted-foreground w-fit hover:text-foreground relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-current after:transition-width after:duration-300 hover:after:w-full transition-colors block"
            >
              <span className="line-clamp-1 break-all">{tocItem.text}</span>
            </Link>

            {tocItem.children && tocItem.children.length > 0 && (
              <motion.ul
                className="ml-4 space-y-1"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {renderTOCItems(tocItem.children)}
              </motion.ul>
            )}
          </motion.li>
        ))}
      </motion.ul>
    );
  };

  return (
    <aside className="hidden no-scrollbar h-[calc(100vh_-_70px)] top-[70px] left-0 right-0 lg:block w-64 shrink-0 border-l border-border sticky overflow-y-auto py-4 pl-4">
      <motion.div
        className="space-y-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div>
          <motion.h2 className="font-semibold mb-4" variants={item}>
            On This Page
          </motion.h2>
          {tocItems.length > 0 ? (
            renderTOCItems(tocItems)
          ) : (
            <p className="text-muted-foreground">
              No headings found in this document.
            </p>
          )}
        </div>

        <motion.div
          className="space-y-3 pt-4 border-t border-border"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item}>
            <Link
              href="#report-issue"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Bug className="h-4 w-4" />
              <span>Report an issue</span>
            </Link>
          </motion.div>
          <motion.div variants={item}>
            <Link
              href="#request-feature"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Lightbulb className="h-4 w-4" />
              <span>Request a feature</span>
            </Link>
          </motion.div>
          <motion.div variants={item}></motion.div>
        </motion.div>
      </motion.div>
    </aside>
  );
}
