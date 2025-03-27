"use client";

import {ReactNode, useState} from "react";
import {motion} from "framer-motion";
import {cn} from "@/lib/utils";
import type {LucideIcon} from "lucide-react";

interface Tab {
  id: string;
  label: string;
  icon?: LucideIcon;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
}

export default function UnderlineTabs({tabs, defaultTab, className}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  return (
    <div className={cn("w-full", className)}>
      <div className="border-b border-muted">
        <div className="flex">
          {tabs.map((tab) => {
            const Icon = tab?.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "relative px-4 cursor-pointer py-2 text-sm font-medium transition-colors flex items-center gap-2",
                  activeTab === tab.id ? "text-black" : "text-gray-500 hover:text-gray-700",
                )}
              >
                {Icon && <Icon className="h-4 w-4"/>}
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 0.2}}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6">
        {tabs.map(
          (tab) =>
            activeTab === tab.id && (
              <div key={tab.id}>
                {tab.content}
              </div>
            )
        )}
      </div>
    </div>
  );
}
