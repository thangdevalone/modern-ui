"use client";

import Link from "next/link";
import { RainbowButton } from "@/components/modern-ui/rainbow-button";
import { CommandMenu } from "@/components/command-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Button } from "@/components/modern-ui/button";
import { Menu } from "lucide-react";
import { motion } from "motion/react";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/modern-ui/drawer";
import LeftSidebar, {
  containerVariants,
  itemVariants,
} from "../shared/left-sidebar";
import { VisuallyHidden } from "../modern-ui/visually-hidden";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Logo = dynamic(() => import("@/components/assets-theme/logo"), {
  ssr: false,
});
const Github = dynamic(() => import("@/components/assets-theme/github"), {
  ssr: false,
});

const mainNavigationItems = [
  { href: "/docs/components", label: "Components" },
  { href: "/docs", label: "Documentation" },
  { href: "/blogs", label: "Blogs" },
  { href: "/components", label: "Showcase" },
];

export const Header = () => {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/60">
      <div className="container flex sm:h-[70px] h-[60px] items-center justify-between pl-6 pr-4 md:pl-4 md:pr-0">
        <Link href="/" className="flex items-center min-w-[35px] space-x-3">
          <Logo />
          <span className="font-bold hidden md:block">Modern UI</span>
        </Link>
        <nav className="items-center space-x-6 ml-6 hidden md:flex">
          {mainNavigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground font-medium transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-2 lg:space-x-4 min-w-[200px] justify-end">
          <RainbowButton
            onClick={() =>
              window.open(
                "https://github.com/thangdevalone/modern-ui",
                "_blank"
              )
            }
            className="h-9 text-sm hidden lg:inline-flex gap-2 text-nowrap"
          >
            <Github />
            Star on GitHub
          </RainbowButton>
          <div className="flex-1 xs:block hidden">
            <CommandMenu />
          </div>
          <Button
            variant="icon"
            size="icon"
            className="flex lg:hidden items-center justify-center"
            onClick={() =>
              window.open(
                "https://github.com/thangdevalone/modern-ui",
                "_blank"
              )
            }
          >
            <Github isInvert />
          </Button>
          <ThemeToggle />

          <Drawer>
            <DrawerTrigger asChild>
              <Button className="sm:hidden flex" variant="icon" size="icon">
                <Menu className="size-6!" />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-3/4">
              <VisuallyHidden>
                <DrawerTitle>Navigation Menu</DrawerTitle>
              </VisuallyHidden>
              <div className="px-4 py-4 overflow-auto">
                <div className="flex flex-col gap-2 mb-4">
                  {mainNavigationItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-muted-foreground transition-colors hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
                <LeftSidebar />
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header>
  );
};

export const Footer = () => {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Image src="/assets/favicon.png" width={24} height={24} alt="logo" />
          <p className="text-center text-sm leading-loose md:text-left">
            Built by{" "}
            <Link
              href="https://github.com/thangdevalone"
              target="_blank"
              className="font-medium underline underline-offset-4"
            >
              @thangdevalone
            </Link>
            . The source code is available on{" "}
            <Link
              href="https://github.com/thangdevalone/modern-ui"
              target="_blank"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
};
