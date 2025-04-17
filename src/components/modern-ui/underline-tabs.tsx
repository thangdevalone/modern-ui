"use client";

import { cn } from "@/lib/utils";
import type React from "react";

import { useRef, useState, useEffect, memo } from "react";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

interface UnderlineTabsProps {
  tabs: Tab[];
  defaultTabId?: string;
  className?: string;
}

const TabContent = ({
  content,
  isActive,
}: {
  content: React.ReactNode;
  isActive: boolean;
}) => {
  if (!isActive) return null;
  return <div role="tabpanel">{content}</div>;
};
TabContent.displayName = "TabContent";

export const UnderlineTabs = ({ tabs, defaultTabId, className }: UnderlineTabsProps) => {
  const [activeTab, setActiveTab] = useState<string>(
    defaultTabId || tabs[0].id
  );
  const [underlineStyle, setUnderlineStyle] = useState({
    transform: "translateX(0)",
    width: 0,
  });

  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  const updateUnderlinePosition = (tabId: string) => {
    const activeTabElement = tabRefs.current[tabId];
    if (activeTabElement && tabsContainerRef.current) {
      setUnderlineStyle({
        transform: `translateX(${activeTabElement.offsetLeft}px)`,
        width: activeTabElement.offsetWidth,
      });
    }
  };

  useEffect(() => {
    updateUnderlinePosition(activeTab);
  }, [activeTab]);

  useEffect(() => {
    if (!tabsContainerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      updateUnderlinePosition(activeTab);
    });

    resizeObserver.observe(tabsContainerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [activeTab]);

  return (
    <div className={cn("w-full", className)}>
      <div className="relative border-b">
        <div className="flex overflow-x-auto no-scrollbar" ref={tabsContainerRef}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[tab.id] = el;
              }}
              className={`flex items-center cursor-pointer gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={(e) => {
                const el = e.currentTarget;
                if (el && tabsContainerRef.current) {
                  setUnderlineStyle({
                    transform: `translateX(${el.offsetLeft}px)`,
                    width: el.offsetWidth,
                  });
                }
                setActiveTab(tab.id);
              }}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.icon && tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div
          className="absolute bottom-0 left-0 h-0.5 bg-primary will-change-transform"
          style={{
            transform: underlineStyle.transform,
            width: `${underlineStyle.width}px`,
            transition: "transform 300ms cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
      </div>

      <div className="mt-4 p-2">
        {tabs.map((tab) => (
          <TabContent
            key={tab.id}
            content={tab.content}
            isActive={activeTab === tab.id}
          />
        ))}
      </div>
    </div>
  );
};
