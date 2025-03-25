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

export default async function DocsLayout({
                                           children,
                                         }: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto px-0">
      <div className="flex flex-col md:flex-row min-h-screen">
        <aside
          className="md:block w-64 shrink-0 border-r h-screen sticky top-0 overflow-y-auto py-4 hidden no-scrollbar h-[calc(100vh_-_70px)] top-[70px] left-0 right-0 lg:block w-64 shrink-0 border-border sticky overflow-y-auto py-4 pl-4"
        >
          <LeftSidebar/>
        </aside>
        {children}
      </div>
    </div>

  );
}

