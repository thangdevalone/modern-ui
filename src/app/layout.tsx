import { Footer, Header } from "@/components/layouts/main-layout";
import { SonnerGlobal } from "@/components/modern-ui/sonner";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import type React from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Modern UI",
  description:
    "A collection of reusable components built with Radix UI and Tailwind CSS. Free. Open Source. And Next.js 14 Ready.",
  icons: {
    icon: "/assets/logo_rounded.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-dvh">
            <Header />
            {children}
            <Footer />
            <SonnerGlobal
              richColors
              closeButton
              toastOptions={{
                classNames: {
                  error: "bg-red-400",
                  success: "bg-green-400",
                  warning: "bg-yellow-400",
                  info: "bg-blue-400",
                },
              }}
            />
          </div>
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId="G-N8SKLBK84Y" />
    </html>
  );
}
