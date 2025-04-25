"use client";

import Link from "next/link";
import { Button } from "@/components/modern-ui/button";
import {
  ArrowRight,
  Zap,
  Palette,
  Code2,
  Layers,
  Grid,
} from "lucide-react";
import { motion } from "motion/react";
import dynamic from "next/dynamic";

const Github = dynamic(() => import("@/components/assets-theme/github"), {
  ssr: false,
});
export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-24 lg:py-32">
      <div className="container flex max-w-6xl px-4 flex-col items-center gap-8 text-center">
        <motion.div
          className="hidden sm:inline-flex items-center rounded-full border bg-transparent px-3 py-1 text-sm shadow-sm backdrop-blur"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-neutral-500" />
          Beautiful Components for Modern Web Apps
        </motion.div>

        <motion.h1
          className="bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text font-heading text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Build Faster with Modern UI Library
        </motion.h1>

        <motion.p
          className="max-w-[42rem] line-clamp-3 text-base md:text-xl leading-normal text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          A collection of reusable components built with Radix UI and Tailwind
          CSS. Free. Open Source. And Next.js 15 Ready. Inspired by Shadcn UI.
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button
            size="lg"
            className="h-12 rounded-full px-8 shadow-lg"
            asChild
          >
            <Link href="/docs/installation" className="flex items-center gap-2">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-12 rounded-full px-8"
            asChild
          >
            <Link
              href="https://github.com/thangdevalone/modern-ui"
              target="_blank"
              className="flex items-center gap-2"
            >
              <Github isInvert />
              GitHub
            </Link>
          </Button>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-4">
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
                  <div
                    className={`h-10 w-10 rounded-full bg-${item.color}-100 p-2 dark:bg-${item.color}-900/20`}
                  >
                    <item.icon
                      className={`h-6 w-6 text-${item.color}-600 dark:text-${item.color}-400`}
                    />
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
  );
}
