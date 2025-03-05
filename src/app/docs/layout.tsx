import type React from "react";
import {Metadata} from 'next';
import LeftSidebar from '@/components/shared/left-sidebar';

export const metadata: Metadata = {
  title: "Docs | Modern UI",
  description: "A collection of reusable components built with Radix UI and Tailwind CSS. Free. Open Source. And Next.js 14 Ready.",
  icons: {
    icon: "/assets/logo_rounded.png",
  },
};

export default function DocsLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row min-h-screen">
        <aside
          className="hidden md:block w-64 shrink-0 border-r border-border h-screen sticky top-0 overflow-y-auto py-4"
        >
          <LeftSidebar/>
        </aside>
        {children}
      </div>
    </div>

  );
}

