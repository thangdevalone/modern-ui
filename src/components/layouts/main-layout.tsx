"use client";

import Link from 'next/link';
import {RainbowButton} from '@/components/modern-ui/rainbow-button';
import {CommandMenu} from '@/components/command-menu';
import {ThemeToggle} from '@/components/theme-toggle';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const Logo = dynamic(() => import("@/components/assets-theme/logo"), {ssr: false});
const Github = dynamic(() => import("@/components/assets-theme/github"), {ssr: false});

export const Header = () => {
  return (
    <header
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-[70px] items-center justify-between">
        <Link href="/" className="flex items-center space-x-3">
          <Logo/>
          <span className="font-bold">Modern UI</span>
        </Link>
        <nav className="flex items-center space-x-6 ml-6">
          <Link href="/docs/components"
                className="text-sm text-muted-foreground font-medium transition-colors hover:text-primary">
            Components
          </Link>
          <Link
            href="/docs"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Documentation
          </Link>
          <Link
            href="/blogs"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Blogs
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <RainbowButton onClick={() => window.open("https://github.com/thangdevalone/modern-ui", '_blank')}
                         className="h-9 text-sm">
            <div>
              <Github/>
            </div>
            Star on GitHub
          </RainbowButton>
          <CommandMenu/>
          <ThemeToggle/>
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
          <Image src="/assets/favicon.png" width={24} height={24} alt="logo"/>
          <p className="text-center text-sm leading-loose md:text-left">
            Built by{" "}
            <Link href="https://github.com/thangdevalone" target="_blank"
                  className="font-medium underline underline-offset-4">
              @thangdevalone
            </Link>
            . The source code is available on{" "}
            <Link href="https://github.com/thangdevalone/modern-ui"
                  target="_blank"
                  className="font-medium underline underline-offset-4">
              GitHub
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
};