"use client";

import React from "react";
import { useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/modern-ui/button";
import { ArrowRight } from "lucide-react";
import { motion, useInView } from "motion/react";
import { AnimatedContent } from "./animated-content";

export function ComponentsSection() {
  const components = [
    {
      name: "Button",
      description: "A button component with different variants and sizes.",
      gradient:
        "from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20",
    },
    {
      name: "Input",
      description: "An input component for collecting user data.",
      gradient:
        "from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20",
    },
    {
      name: "Card",
      description: "A card component for displaying content.",
      gradient:
        "from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20",
    },
    {
      name: "Avatar",
      description: "An avatar component for displaying user images.",
      gradient:
        "from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20",
    },
    {
      name: "Accordion",
      description: "An accordion component for displaying collapsible content.",
      gradient:
        "from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/20",
    },
    {
      name: "Dropdown Menu",
      description: "A dropdown menu component for navigation.",
      gradient:
        "from-violet-50 to-indigo-50 dark:from-violet-950/20 dark:to-indigo-950/20",
    },
  ];

  // Animation variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section
      id="components"
      className="container space-y-14 px-4 py-12 sm:py-24"
    >
      <AnimatedContent>
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <div className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium">
            Extensive Component Library
          </div>
          <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl">
            Everything you need
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Beautifully designed components that you can copy and paste into
            your apps.
          </p>
        </div>
      </AnimatedContent>

      <motion.div
        className="mx-auto grid justify-center gap-6 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {components.map((component, index) => (
          <ComponentCard
            key={index}
            name={component.name}
            description={component.description}
            gradient={component.gradient}
            index={index}
          />
        ))}
      </motion.div>

      <div className="flex justify-center">
        <AnimatedContent>
          <Button size="lg" className="rounded-full px-8" asChild>
            <Link href="/docs/components" className="flex items-center gap-2">
              View All Components
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </AnimatedContent>
      </div>
    </section>
  );
}

function ComponentCard({
  name,
  description,
  gradient,
  index,
}: {
  name: string;
  description: string;
  gradient: string;
  index: number;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
          },
        },
      }}
      className="group relative overflow-hidden rounded-xl border bg-background p-2 shadow-md"
      whileHover={{
        translateY: -4,
        boxShadow:
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      }}
    >
      <motion.div
        className={`flex h-[180px] flex-col items-center justify-center rounded-lg bg-gradient-to-br ${gradient} p-6`}
        whileHover={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        {name === "Button" && (
          <div className="flex gap-2">
            <div className="rounded-md bg-white px-4 py-2 shadow-sm dark:bg-background">
              Button
            </div>
            <div className="rounded-md bg-purple-500 px-4 py-2 text-white shadow-sm">
              Button
            </div>
          </div>
        )}
        {name === "Input" && (
          <div className="w-full max-w-xs space-y-2">
            <div className="text-sm font-medium">Email</div>
            <div className="h-10 w-full rounded-md border bg-white px-3 shadow-sm dark:bg-background"></div>
          </div>
        )}
        {name === "Card" && (
          <div className="w-full max-w-xs rounded-lg border bg-white p-4 shadow-sm dark:bg-background">
            <div className="mb-2 h-4 w-20 rounded-md bg-muted"></div>
            <div className="h-2 w-full rounded-md bg-muted"></div>
            <div className="mt-1 h-2 w-4/5 rounded-md bg-muted"></div>
          </div>
        )}
        {name === "Avatar" && (
          <div className="flex -space-x-2">
            <div className="h-10 w-10 rounded-full border-2 border-white bg-muted shadow-sm dark:border-background"></div>
            <div className="h-10 w-10 rounded-full border-2 border-white bg-muted shadow-sm dark:border-background"></div>
            <div className="h-10 w-10 rounded-full border-2 border-white bg-muted shadow-sm dark:border-background"></div>
          </div>
        )}
        {name === "Accordion" && (
          <div className="w-full max-w-xs space-y-2">
            <div className="flex items-center justify-between rounded-md border bg-white p-3 shadow-sm dark:bg-background">
              <div className="h-4 w-24 rounded-md bg-muted"></div>
              <div className="h-4 w-4 rounded-full bg-muted"></div>
            </div>
            <div className="h-20 w-full rounded-b-md border-x border-b bg-white p-3 shadow-sm dark:bg-background">
              <div className="h-2 w-full rounded-md bg-muted"></div>
              <div className="mt-1 h-2 w-4/5 rounded-md bg-muted"></div>
            </div>
          </div>
        )}
        {name === "Dropdown Menu" && (
          <div className="w-full max-w-xs">
            <div className="flex items-center justify-between rounded-t-md border-x border-t bg-white p-3 shadow-sm dark:bg-background">
              <div className="h-4 w-24 rounded-md bg-muted"></div>
              <div className="h-4 w-4 rounded-full bg-muted"></div>
            </div>
            <div className="rounded-b-md border space-y-2 p-2 bg-white shadow-sm dark:bg-background">
              <div className="h-8 w-full rounded-md bg-muted"></div>
              <div className="h-8 w-full rounded-md bg-muted"></div>
            </div>
          </div>
        )}
      </motion.div>
      <div className="p-4">
        <h3 className="font-bold">{name}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
}
