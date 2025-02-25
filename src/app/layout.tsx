import type React from "react";
import "./globals.css";
import {Inter} from "next/font/google";
import {ThemeProvider} from '@/components/providers/theme-provider';
import {Metadata} from 'next';

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Modern UI",
  description: "A collection of reusable components built with Radix UI and Tailwind CSS. Free. Open Source. And Next.js 14 Ready.",
  icons: {
    icon: "/assets/favicon.png",
  },
};

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body className={inter.className}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </ThemeProvider>
    </body>
    </html>
  );
}

