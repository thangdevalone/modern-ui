"use client"

import { useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronRight, Github, Zap, Palette, Code2, Layers } from "lucide-react"
import { motion } from "framer-motion"

export function HeroSection() {
  const ref = useRef(null)

  return (
    <section className="relative overflow-hidden py-20 md:py-24 lg:py-32">
      {/* Modern background with subtle patterns */}
      <div className="absolute inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background"></div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptMC00aDJ2MmgtMnYtMnptLTQgMHYyaC0ydi0yaDJ6bTIgMGgydjJoLTJ2LTJ6bS0yLTRoMnYyaC0ydi0yek0zNCAyMHYyaC0ydi0yaDJ6bTAgNGgydjJoLTJ2LTJ6bS00LTRoMnYyaC0ydi0yek0zMCAyMGgydjJoLTJ2LTJ6bS0yLTRoMnYyaC0ydi0yek0yMiAyNGgydjJoLTJ2LTJ6bTAgNGgydjJoLTJ2LTJ6bS00LTRoMnYyaC0ydi0yek0xOCAyMGgydjJoLTJ2LTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50 dark:opacity-20"></div>

        {/* Gradient orbs */}
        <div className="absolute -left-20 -top-20 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-purple-500/20 to-violet-500/20 blur-3xl opacity-30 dark:from-purple-500/10 dark:to-violet-500/10"></div>
        <div className="absolute -right-20 bottom-10 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 blur-3xl opacity-30 dark:from-blue-500/10 dark:to-cyan-500/10"></div>

        {/* Animated dots */}
        <div className="absolute inset-0">
          <div
            className="absolute h-2 w-2 rounded-full bg-purple-500/30 top-1/4 left-1/4 animate-pulse"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="absolute h-2 w-2 rounded-full bg-blue-500/30 top-1/3 right-1/3 animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute h-2 w-2 rounded-full bg-cyan-500/30 bottom-1/4 right-1/4 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute h-2 w-2 rounded-full bg-violet-500/30 bottom-1/3 left-1/3 animate-pulse"
            style={{ animationDelay: "1.5s" }}
          ></div>
        </div>
      </div>

      <div className="container flex max-w-6xl flex-col items-center gap-8 text-center">
        <motion.div
          className="inline-flex items-center rounded-full border bg-background/95 px-3 py-1 text-sm font-medium shadow-sm backdrop-blur transition-colors"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
          <span className="ml-2 text-muted-foreground">Available on GitHub</span>
          <Link href="https://github.com" className="ml-2 text-foreground hover:underline" target="_blank">
            <span>Star us</span>
            <ChevronRight className="ml-1 inline-block h-3 w-3" />
          </Link>
        </motion.div>

        <motion.h1
          className="bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text font-heading text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Beautiful UI components <br className="hidden sm:inline" />
          for modern applications
        </motion.h1>

        <motion.p
          className="max-w-[42rem] text-xl leading-normal text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          A collection of reusable components built with Radix UI and Tailwind CSS.
          <span className="block font-medium text-foreground">Free. Open Source. And Next.js 15 Ready.</span>
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="lg" className="h-12 rounded-full px-8 shadow-lg" asChild>
              <Link href="#docs">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" size="lg" className="h-12 rounded-full px-8" asChild>
              <Link href="https://github.com" target="_blank">
                <Github className="mr-2 h-5 w-5" />
                GitHub
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-8 w-full max-w-4xl overflow-hidden rounded-2xl border bg-background/50 shadow-xl backdrop-blur-sm"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.4,
            type: "spring",
            stiffness: 100,
            damping: 15,
          }}
        >
          <div className="flex items-center border-b px-4 py-2">
            <div className="flex space-x-1">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
            </div>
          </div>
          <div className="relative overflow-hidden bg-muted/30 p-8">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                { icon: Zap, color: "purple" },
                { icon: Palette, color: "blue" },
                { icon: Code2, color: "green" },
                { icon: Layers, color: "amber" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col gap-2 rounded-lg border bg-background p-4 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.5 + index * 0.1,
                    type: "spring",
                  }}
                >
                  <div className={`h-10 w-10 rounded-full bg-${item.color}-100 p-2 dark:bg-${item.color}-900/20`}>
                    <item.icon className={`h-6 w-6 text-${item.color}-600 dark:text-${item.color}-400`} />
                  </div>
                  <div className="h-4 w-20 rounded-md bg-muted"></div>
                  <div className="h-2 w-full rounded-md bg-muted"></div>
                  <div className="h-2 w-3/4 rounded-md bg-muted"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
