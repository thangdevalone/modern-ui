"use client";

import type React from "react";

import { useRef, useState, useEffect } from "react";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

interface UnderlineTabsProps {
  tabs: Tab[];
  defaultTabId?: string;
}

export const UnderlineTabs = ({ tabs, defaultTabId }: UnderlineTabsProps) => {
  const [activeTab, setActiveTab] = useState<string>(
    defaultTabId || tabs[0].id
  );
  const [underlineStyle, setUnderlineStyle] = useState({
    left: 0,
    width: 0,
  });

  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  useEffect(() => {
    const activeTabElement = tabRefs.current[activeTab];
    if (activeTabElement) {
      setUnderlineStyle({
        left: activeTabElement.offsetLeft,
        width: activeTabElement.offsetWidth,
      });
    }
  }, [activeTab]);

  useEffect(() => {
    const handleResize = () => {
      const activeTabElement = tabRefs.current[activeTab];
      if (activeTabElement) {
        setUnderlineStyle({
          left: activeTabElement.offsetLeft,
          width: activeTabElement.offsetWidth,
        });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeTab]);

  return (
    <div className="w-full">
      <div className="relative border-b">
        <div className="flex">
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
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.icon && tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div
          className="absolute bottom-0 h-0.5 bg-primary transition-all duration-300 ease-in-out"
          style={{
            left: `${underlineStyle.left}px`,
            width: `${underlineStyle.width}px`,
          }}
        />
      </div>

      <div className="mt-4 p-2">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`${activeTab === tab.id ? "block" : "hidden"}`}
            role="tabpanel"
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};
