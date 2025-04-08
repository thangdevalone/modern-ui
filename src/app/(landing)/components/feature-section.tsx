"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Zap, Palette, Code2, Layers, Star, Sparkles } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: "Next.js 15 Ready",
      description:
        "Built with the latest features of Next.js 15, including React Server Components and the App Router.",
      color: "purple",
    },
    {
      icon: Palette,
      title: "Customizable",
      description: "Components are built with Tailwind CSS and fully customizable to match your brand.",
      color: "blue",
    },
    {
      icon: Code2,
      title: "Open Source",
      description: "All components are open source and free to use in your projects.",
      color: "green",
    },
    {
      icon: Layers,
      title: "Accessible",
      description: "Components follow WAI-ARIA guidelines and support keyboard navigation.",
      color: "amber",
    },
    {
      icon: Star,
      title: "Dark Mode",
      description: "All components support dark mode out of the box.",
      color: "rose",
    },
    {
      icon: Sparkles,
      title: "TypeScript",
      description: "Built with TypeScript for a better developer experience.",
      color: "violet",
    },
  ]

  return (
    <section id="features" className="container space-y-14 py-24 sm:py-32">
      <AnimatedContent>
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <div className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium">Why choose our components</div>
          <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl">
            Designed for developers
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            This project is an implementation of the Radix UI and Tailwind CSS components library, with a focus on
            accessibility, customization, and developer experience.
          </p>
        </div>
      </AnimatedContent>

      <div className="mx-auto grid justify-center gap-8 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            color={feature.color}
            index={index}
          />
        ))}
      </div>
    </section>
  )
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  color,
  index,
}: {
  icon: any
  title: string
  description: string
  color: string
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      className={`group relative overflow-hidden rounded-xl border bg-background p-6 shadow-md transition-all hover:shadow-lg`}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.5,
        delay: 0.1 * index,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
    >
      <div className={`absolute -right-20 -top-20 h-40 w-40 rounded-full bg-${color}-500/10`}></div>
      <motion.div
        className={`mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-${color}-100 dark:bg-${color}-900/20`}
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <Icon className={`h-6 w-6 text-${color}-600 dark:text-${color}-400`} />
      </motion.div>
      <div className="space-y-2">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </motion.div>
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
