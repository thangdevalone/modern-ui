"use client"

import type React from "react"

import { useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion, useInView } from "framer-motion"

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
}

export function IntegrationSection() {
  return (
    <section className="relative overflow-hidden border-t py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-100/40 via-background to-background dark:from-purple-900/10"></div>
      <div className="container">
        <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-2">
          <AnimatedContent customDelay={0.2}>
            <motion.div
              className="relative mx-auto aspect-video w-full max-w-md overflow-hidden rounded-2xl border bg-background p-2 shadow-2xl lg:order-last"
              whileHover={{
                y: -5,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5"></div>
              <div className="h-full rounded-xl border bg-background/80 p-6 backdrop-blur-sm">
                <div className="grid h-full grid-rows-[auto,1fr] gap-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="h-4 w-24 rounded-md bg-muted"></div>
                  </div>
                  <div className="grid grid-cols-[1fr,2fr] gap-6">
                    <div className="space-y-4">
                      <div className="h-8 w-full rounded-md bg-muted"></div>
                      <div className="h-8 w-full rounded-md bg-muted"></div>
                      <div className="h-8 w-full rounded-md bg-muted"></div>
                      <div className="h-8 w-full rounded-md bg-muted"></div>
                    </div>
                    <div className="rounded-xl border bg-muted/30 p-4">
                      <div className="space-y-3">
                        <div className="h-4 w-1/2 rounded-md bg-muted"></div>
                        <div className="h-20 w-full rounded-md bg-muted"></div>
                        <div className="flex justify-end">
                          <div className="h-8 w-20 rounded-md bg-purple-500"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatedContent>
          <AnimatedContent>
            <div className="space-y-6">
              <div className="inline-flex rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                Seamless Integration
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Works with your favorite tools
              </h2>
              <p className="text-lg text-muted-foreground">
                Our components are designed to work seamlessly with popular frameworks and tools. Whether you're using
                Next.js, React, or any other modern framework, our components will fit right in.
              </p>
              <motion.ul
                className="grid gap-2"
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                {["Next.js 15 App Router", "React Server Components", "Tailwind CSS", "TypeScript"].map(
                  (item, index) => (
                    <motion.li key={index} className="flex items-center gap-2" variants={item}>
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
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
                          className="h-3 w-3 text-green-600 dark:text-green-400"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span>{item}</span>
                    </motion.li>
                  ),
                )}
              </motion.ul>
              <div className="flex flex-col gap-3 sm:flex-row">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="rounded-full" asChild>
                    <Link href="#docs">Get Started</Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </AnimatedContent>
        </div>
      </div>
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
