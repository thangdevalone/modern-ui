"use client"

import type React from "react"

import { useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"
import { motion, useInView } from "framer-motion"

export function DocsSection() {
  return (
    <section id="docs" className="container py-24 sm:py-32">
      <AnimatedContent>
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-6 text-center">
          <div className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium">Ready to start?</div>
          <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl">
            Get Started in Minutes
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Install the components and start building your application.
          </p>

          <motion.div
            className="relative mt-4 w-full max-w-3xl overflow-hidden rounded-xl border bg-muted/50 shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{
              y: -5,
              boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div className="flex items-center border-b bg-muted/50 px-4 py-2">
              <div className="flex space-x-1">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
              </div>
              <div className="ml-4 text-xs font-medium">Terminal</div>
            </div>
            <div className="group relative">
              <pre className="overflow-x-auto p-4 text-sm text-muted-foreground">
                <code>
                  <span className="text-muted-foreground"># Install dependencies</span>
                  {"\n"}
                  npm install{"\n\n"}
                  <span className="text-muted-foreground"># Run development server</span>
                  {"\n"}
                  npm run dev
                </code>
              </pre>
              <div className="absolute right-4 top-4 opacity-0 transition-opacity group-hover:opacity-100">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <span className="sr-only">Copy code</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                  </svg>
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="mt-4 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="rounded-full px-8" asChild>
                <Link href="https://github.com" target="_blank">
                  <Github className="mr-2 h-5 w-5" />
                  GitHub
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="lg" className="rounded-full px-8" asChild>
                <Link href="#docs">
                  Documentation
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </AnimatedContent>
    </section>
  )
}

function AnimatedContent({ children, customDelay = 0 }: { children: React.ReactNode; customDelay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.5,
        delay: customDelay,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
    >
      {children}
    </motion.div>
  )
}
