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
  keywords: [
    "Modern UI", 
    "React", 
    "Next.js", 
    "Tailwind CSS", 
    "Radix UI", 
    "UI Components",
    "Web Development",
    "Next.js 14",
    "Shadcn UI",
    "Tailwind CSS Components",
    "React Components",
    "UI Library",
    "Modern UI",
    "Modern UI Components",
    "ThangDevAlone"
  ],
  authors: [{ name: "ThangDevAlone" }],
  creator: "ThangDevAlone",
  publisher: "ThangDevAlone",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://modern-ui.org"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://modern-ui.org",
    title: "Modern UI - Next.js Components",
    description: "A collection of reusable components built with Radix UI and Tailwind CSS. Free. Open Source. And Next.js 14 Ready.",
    siteName: "Modern UI",
    images: [{
      url: "/assets/logo.png",
      width: 1200,
      height: 630,
      alt: "Modern UI Components Preview",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Modern UI - Next.js Components",
    description: "A collection of reusable components built with Radix UI and Tailwind CSS. Free. Open Source. And Next.js 14 Ready.",
    images: ["/assets/logo.png"],
    creator: "@ThangDevAlone",
  },
  icons: {
    icon: "/assets/logo_rounded.png",
    shortcut: "/assets/logo_rounded.png",
    apple: "/assets/logo_rounded.png",
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
