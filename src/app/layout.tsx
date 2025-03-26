import type React from "react";
import "./globals.css";
import {Inter} from "next/font/google";
import {ThemeProvider} from '@/components/providers/theme-provider';
import {Metadata} from 'next';
import {Footer, Header} from '@/components/layouts/main-layout';

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Modern UI",
  description: "A collection of reusable components built with Radix UI and Tailwind CSS. Free. Open Source. And Next.js 14 Ready.",
  icons: {
    icon: "/assets/logo_rounded.png",
  },
};

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
    <body className={inter.className}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div className="flex flex-col min-h-dvh">
        <Header/>
        {children}
        <Footer/>
      </div>
    </ThemeProvider>
    </body>
    </html>
  );
}

