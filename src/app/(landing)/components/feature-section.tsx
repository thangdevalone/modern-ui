"use client";

import type React from "react";
import { motion, useInView } from "framer-motion";
import { Zap, Palette, Code2, Layers, Star, Sparkles } from "lucide-react";
import { AnimatedContent } from "./animated-content";
import { useRef } from "react";

const colorMap = {
  purple: "bg-purple-500/10",
  blue: "bg-blue-500/10",
  green: "bg-green-500/10",
  amber: "bg-amber-500/10",
  rose: "bg-rose-500/10",
  violet: "bg-violet-500/10",
} as const;

const iconColorMap = {
  purple: {
    bg: "bg-purple-100 dark:bg-purple-900/20",
    text: "text-purple-600 dark:text-purple-400",
  },
  blue: {
    bg: "bg-blue-100 dark:bg-blue-900/20",
    text: "text-blue-600 dark:text-blue-400",
  },
  green: {
    bg: "bg-green-100 dark:bg-green-900/20",
    text: "text-green-600 dark:text-green-400",
  },
  amber: {
    bg: "bg-amber-100 dark:bg-amber-900/20",
    text: "text-amber-600 dark:text-amber-400",
  },
  rose: {
    bg: "bg-rose-100 dark:bg-rose-900/20",
    text: "text-rose-600 dark:text-rose-400",
  },
  violet: {
    bg: "bg-violet-100 dark:bg-violet-900/20",
    text: "text-violet-600 dark:text-violet-400",
  },
} as const;

export function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: "Next.js 15 Ready",
      description:
        "Built with the latest features of Next.js 15, including React Server Components and the App Router.",
      color: "purple" as const,
    },
    {
      icon: Palette,
      title: "Customizable",
      description:
        "Components are built with Tailwind CSS and fully customizable to match your brand.",
      color: "blue" as const,
    },
    {
      icon: Code2,
      title: "Open Source",
      description:
        "All components are open source and free to use in your projects.",
      color: "green" as const,
    },
    {
      icon: Layers,
      title: "Accessible",
      description:
        "Components follow WAI-ARIA guidelines and support keyboard navigation.",
      color: "amber" as const,
    },
    {
      icon: Star,
      title: "Dark Mode",
      description: "All components support dark mode out of the box.",
      color: "rose" as const,
    },
    {
      icon: Sparkles,
      title: "TypeScript",
      description: "Built with TypeScript for a better developer experience.",
      color: "violet" as const,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
      },
    },
  };

  return (
    <section id="features" className="container space-y-14 px-4 py-12 sm:py-24">
      <AnimatedContent>
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
          >
            Why choose our components
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl"
          >
            Designed for developers
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-[85%] leading-normal line-clamp-3 text-muted-foreground sm:text-lg sm:leading-7"
          >
            This project is an implementation of the Radix UI and Tailwind CSS
            components library, with a focus on accessibility, customization,
            and developer experience.
          </motion.p>
        </div>
      </AnimatedContent>

      <motion.div
        className="mx-auto grid justify-center gap-8 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className={`group relative overflow-hidden rounded-xl border bg-background p-6 shadow-md`}
            whileHover={{
              translateY: -4,
              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            }}
          >
            <div
              className={`absolute -right-20 -top-20 h-40 w-40 rounded-full ${
                colorMap[feature.color]
              }`}
            />
            <motion.div
              className={`mb-6 flex h-12 w-12 items-center justify-center rounded-full ${
                iconColorMap[feature.color].bg
              }`}
              whileHover={{ scale: 1.05 }}
            >
              <feature.icon
                className={`h-6 w-6 ${iconColorMap[feature.color].text}`}
              />
            </motion.div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
