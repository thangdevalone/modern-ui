"use client";

import type React from "react";

import { MoreHorizontal } from "lucide-react";
import { memo, useEffect, useLayoutEffect, useRef, useState } from "react";

import { Button } from "@/components/modern-ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/modern-ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
  content?: React.ReactNode;
  icon?: React.ReactNode;
}

interface UnderlineTabsProps {
  tabs: Tab[];
  defaultTabId?: string;
  className?: string;
}

const TabContent = memo(
  ({ content, isActive }: { content: React.ReactNode; isActive: boolean }) => {
    if (!isActive) return null;
    return <div role="tabpanel">{content}</div>;
  }
);
TabContent.displayName = "TabContent";

export function UnderlineTabs({
  tabs,
  defaultTabId,
  className,
}: UnderlineTabsProps) {
  const [activeTab, setActiveTab] = useState<string>(
    defaultTabId || tabs[0]?.id || ""
  );
  const [visibleTabs, setVisibleTabs] = useState<Tab[]>(tabs);
  const [overflowTabs, setOverflowTabs] = useState<Tab[]>([]);
  const [underlineStyle, setUnderlineStyle] = useState({
    transform: "translateX(0)",
    width: 0,
  });

  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const isInitialRender = useRef(true);
  const dropdownRef = useRef<HTMLButtonElement>(null);

  const updateUnderlinePosition = (tabId: string) => {
    const activeTabElement = tabRefs.current[tabId];
    if (activeTabElement && containerRef.current) {
      setUnderlineStyle({
        transform: `translateX(${activeTabElement.offsetLeft}px)`,
        width: activeTabElement.offsetWidth,
      });
    }
  };
  const SENSITIVITY = 50;

  const getTabWidths = () => {
    const tempDiv = document.createElement("div");
    tempDiv.style.visibility = "hidden";
    tempDiv.style.position = "absolute";
    tempDiv.style.top = "-9999px";
    document.body.appendChild(tempDiv);

    const tabWidths = tabs.map((tab) => {
      const clone = document.createElement("button");
      clone.className = Object.values(tabRefs.current)[0]?.className || "";
      clone.textContent = tab.label;
      tempDiv.appendChild(clone);
      const width = clone.offsetWidth;
      tempDiv.removeChild(clone);
      return { id: tab.id, width };
    });

    document.body.removeChild(tempDiv);
    return tabWidths;
  };

  const calculateVisibleTabs = (priorityTabId?: string) => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const dropdownWidth = 50;
    let availableWidth = containerWidth;

    const tabWidths = getTabWidths();

    let orderedTabs = [...tabs];

    if (priorityTabId) {
      // Find the priority tab
      const priorityTab = tabs.find((tab) => tab.id === priorityTabId);
      if (priorityTab) {
        orderedTabs = tabs.filter((tab) => tab.id !== priorityTabId);

        orderedTabs.unshift(priorityTab);
      }
    }

    const visibleTabIds = new Set<string>();

    if (priorityTabId) {
      const priorityTabWidth =
        tabWidths.find((t) => t.id === priorityTabId)?.width || 0;
      if (availableWidth >= priorityTabWidth) {
        visibleTabIds.add(priorityTabId);
        availableWidth -= priorityTabWidth;
      }
    }

    for (const tab of orderedTabs) {
      if (visibleTabIds.has(tab.id)) continue;

      const tabWidth = tabWidths.find((t) => t.id === tab.id)?.width || 0;

      const needDropdown = orderedTabs.length - visibleTabIds.size > 1;
      const widthToUse = needDropdown
        ? availableWidth - dropdownWidth
        : availableWidth;

      if (widthToUse >= tabWidth) {
        visibleTabIds.add(tab.id);
        availableWidth -= tabWidth + SENSITIVITY;
      } else {
        break;
      }
    }

    const newVisibleTabs: Tab[] = [];
    const newOverflowTabs: Tab[] = [];

    for (const tab of tabs) {
      if (visibleTabIds.has(tab.id)) {
        newVisibleTabs.push(tab);
      } else {
        newOverflowTabs.push(tab);
      }
    }

    setVisibleTabs(newVisibleTabs);
    setOverflowTabs(newOverflowTabs);
  };

  useEffect(() => {
    if (!containerRef.current) return;

    resizeObserverRef.current = new ResizeObserver(() => {
      calculateVisibleTabs(activeTab);
      updateUnderlinePosition(activeTab);
    });

    resizeObserverRef.current.observe(containerRef.current);

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
    };
  }, [tabs, activeTab]);

  // Initial calculation
  useEffect(() => {
    if (isInitialRender.current) {
      calculateVisibleTabs(activeTab);
      isInitialRender.current = false;
    }
  }, [tabs, activeTab]);

  useLayoutEffect(() => {
    updateUnderlinePosition(activeTab);
  }, [activeTab, visibleTabs]);

  // Handle tab click
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);

    if (overflowTabs.some((tab) => tab.id === tabId)) {
      calculateVisibleTabs(tabId);
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="relative border-b">
        <div ref={containerRef} className="flex">
          {visibleTabs.map((tab) => (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[tab.id] = el;
              }}
              onClick={() => handleTabClick(tab.id)}
              className={cn(
                "flex items-center cursor-pointer gap-2 px-4 py-2 text-sm font-medium transition-colors",
                activeTab === tab.id
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.icon && <div>{tab.icon}</div>}
              {tab.label}
            </button>
          ))}

          {overflowTabs.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  ref={dropdownRef}
                  variant="ghost"
                  size="sm"
                  className="ml-auto h-8 w-8 p-0 transition-opacity duration-200"
                >
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Xem thêm</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {overflowTabs.map((tab) => (
                  <DropdownMenuItem
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={cn(
                      "transition-colors duration-200",
                      activeTab === tab.id &&
                        "bg-muted font-medium text-foreground"
                    )}
                  >
                    {tab.icon && tab.icon}
                    {tab.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Animated underline */}
          <div
            className="absolute bottom-0 left-0 h-0.5 bg-primary will-change-transform"
            style={{
              transform: underlineStyle.transform,
              width: `${underlineStyle.width}px`,
              transition:
                "transform 300ms cubic-bezier(0.4, 0, 0.2, 1), width 300ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
        </div>
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
}
