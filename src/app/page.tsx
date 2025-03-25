"use client";

import Link from "next/link";
import {Button, buttonVariants} from "@/components/modern-ui/button";
import {motion} from "framer-motion";
import dynamic from 'next/dynamic';
import Image from 'next/image';
import {cn} from '@/lib/utils';
import {ThemeToggle} from '@/components/theme-toggle';


import {RainbowButton} from '@/components/modern-ui/rainbow-button';
import {CommandMenu} from '@/components/command-menu';

const Github = dynamic(() => import("@/components/assets-theme/github"), {
  ssr: false,
});
const Logo = dynamic(() => import("@/components/assets-theme/logo"), {
  ssr: false,
});
const DoodleBackground = dynamic(() => import("@/components/doodle-background"), {
  ssr: false,
});
const container = {
  hidden: {opacity: 0},
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: {opacity: 0, y: 20},
  show: {opacity: 1, y: 0},
};

export default function Home() {

  return (
      <main className="flex-1">
        <section className="relative overflow-hidden min-h-[90dvh] max-h-[1200px] flex items-center">
          <DoodleBackground/>

          {/* Content */}
          <motion.div initial="hidden" animate="show" variants={container} className="container relative space-y-6">
            <motion.div
              variants={container}
              className="flex max-w-[64rem] flex-col items-center gap-4 text-center mx-auto"
            >
              <div
                className="inline-flex items-center rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 px-4 py-1.5 text-sm font-medium text-white shadow-xl dark:from-pink-600 dark:via-purple-600 dark:to-blue-600 animate-gradient-x"
              >
                Beautiful Components for Modern Web Apps
              </div>
              <motion.h1
                variants={item}
                className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-rose-500 via-fuchsia-500 to-indigo-500"
              >
                Build Faster with Our UI Library
              </motion.h1>
              <motion.p
                variants={item}
                className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8"
              >
                A collection of reusable components built with Radix UI and Tailwind CSS. Free. Open Source. And Next.js
                14 Ready.
              </motion.p>
              <motion.div variants={item} className="md:gap-4 gap-2 flex md:flex-row flex-col">
                <Link href="/components">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-rose-500 via-fuchsia-500 to-indigo-500 hover:from-rose-600 hover:via-fuchsia-600 hover:to-indigo-600 transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    Browse Components
                  </Button>
                </Link>
                <Link href="/docs">
                  <Button
                    variant="outline"
                    size="lg"
                    className="hover:bg-gradient-to-r hover:from-violet-50 hover:to-indigo-50 dark:hover:from-violet-950 dark:hover:to-indigo-950 transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    Documentation
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* Rest of the sections */}
        <section className="container space-y-6 py-8 md:py-12 lg:py-24 relative">
          <div
            className="absolute inset-0 bg-gradient-to-br from-rose-50/50 to-indigo-50/50 rounded-3xl dark:from-rose-950/10 dark:to-indigo-950/10"/>
          <motion.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{duration: 0.5}}
            className="relative"
          >
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
              <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">Features</h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                This component library includes everything you need to build a modern web application.
              </p>
            </div>
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{once: true}}
              className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 mt-8"
            >
              {[
                {
                  title: "Accessible",
                  description: "All components follow WAI-ARIA guidelines.",
                  gradient: "from-rose-500/20 via-fuchsia-500/20 to-indigo-500/20",
                },
                {
                  title: "Responsive",
                  description: "Responsive design that works on any device.",
                  gradient: "from-fuchsia-500/20 via-indigo-500/20 to-violet-500/20",
                },
                {
                  title: "Themeable",
                  description: "Customizable design tokens and dark mode support.",
                  gradient: "from-indigo-500/20 via-violet-500/20 to-purple-500/20",
                },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  variants={item}
                  whileHover={{scale: 1.05}}
                  className="group relative overflow-hidden rounded-lg border bg-background p-2"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${feature.gradient}`}
                  />
                  <div className="relative flex h-[180px] flex-col justify-between rounded-md p-6">
                    <div className="space-y-2">
                      <h3 className="font-bold">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="container py-8 md:py-12 lg:py-24">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{once: true}}
            className="grid gap-4 md:gap-8 lg:gap-12 md:grid-cols-4"
          >
            {[
              {number: "300+", label: "Components"},
              {number: "10k+", label: "Github Stars"},
              {number: "1M+", label: "Downloads"},
              {number: "99.9%", label: "Customer satisfaction"},
            ].map((stat, i) => (
              <motion.div key={i} variants={item} whileHover={{scale: 1.05}} className="relative group">
                <div
                  className="absolute inset-0 bg-gradient-to-br from-rose-100 via-fuchsia-100 to-indigo-100 rounded-2xl blur-xl opacity-25 group-hover:opacity-75 transition-opacity duration-500 dark:from-rose-900/50 dark:via-fuchsia-900/50 dark:to-indigo-900/50"/>
                <div className="relative space-y-2 text-center p-6 bg-background rounded-2xl border">
                  <div
                    className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-500 via-fuchsia-500 to-indigo-500">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="container py-8 md:py-12 lg:py-24">
          <motion.div
            initial={{opacity: 0, scale: 0.95}}
            whileInView={{opacity: 1, scale: 1}}
            viewport={{once: true}}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-rose-500 via-fuchsia-500 to-indigo-500"/>
            <div className="relative bg-background/[0.8] dark:bg-background/[0.9] backdrop-blur-xl p-8 md:p-12 lg:p-16">
              <div className="mx-auto max-w-[58rem] flex flex-col items-center space-y-4 text-center">
                <h2
                  className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-rose-500 via-fuchsia-500 to-indigo-500">
                  Start Building Today
                </h2>
                <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                  Join thousands of developers creating amazing applications.
                </p>
                <div className="flex flex-row flex-wrap gap-4 w-full max-w-md">
                  <Button
                    className="flex-1 bg-gradient-to-r from-rose-500 via-fuchsia-500 to-indigo-500 hover:from-rose-600 hover:via-fuchsia-600 hover:to-indigo-600 transition-all duration-300 hover:scale-105 active:scale-95"
                    size="lg"
                  >
                    Get Started
                  </Button>
                  <Link
                    href="https://github.com/thangdevalone/modern-ui"
                    className={cn(buttonVariants({
                      variant: 'outline',
                      size: "lg"
                    }), "flex-1 hover:bg-gradient-to-r hover:from-rose-50 hover:to-indigo-50 dark:hover:from-rose-950 dark:hover:to-indigo-950 transition-all duration-300 hover:scale-105 active:scale-95")}
                  >
                    View on GitHub
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
  );
}

