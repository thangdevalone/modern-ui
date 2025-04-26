"use client";

import {cn} from "@/lib/utils";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {motion} from "motion/react";

const Tabs = React.forwardRef<React.ComponentRef<typeof TabsPrimitive.Root>, React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>>(
  ({className, ...props}, ref) => {
    return (
      <TabsPrimitive.Root
        className={cn(
          className,
        "[&_div[role='tabpanel'][data-orientation='vertical']]:ml-2 [&_div[role='tabpanel'][data-orientation='horizontal']]:mt-2"
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

const TabsList = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({className, ...props}, ref) => {
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });
  const [isMounted, setIsMounted] = useState(false);
  const tabsListRef = useRef<HTMLDivElement | null>(null);

  const updateIndicator = React.useCallback(() => {
    if (!tabsListRef.current) return;

    const activeTab = tabsListRef.current.querySelector<HTMLElement>(
      '[data-state="active"]'
    );
    if (!activeTab) return;

    const activeRect = activeTab.getBoundingClientRect();
    const tabsRect = tabsListRef.current.getBoundingClientRect();

    setIndicatorStyle({
      left: activeRect.left - tabsRect.left,
      top: activeRect.top - tabsRect.top,
      width: activeRect.width,
      height: activeRect.height,
    });
  }, []);

  useEffect(() => {
    updateIndicator();
    setIsMounted(true);

    window.addEventListener("resize", updateIndicator);
    const observer = new MutationObserver(updateIndicator);

    if (tabsListRef.current) {
      observer.observe(tabsListRef.current, {
        attributes: true,
        childList: true,
        subtree: true,
      });
    }

    return () => {
      window.removeEventListener("resize", updateIndicator);
      observer.disconnect();
    };
  }, [updateIndicator]);

  return (
    <div className="relative" ref={tabsListRef}>
      <TabsPrimitive.List
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
          className
        )}
        {...props}
      />
      {isMounted && (
        <motion.div
          className="absolute rounded-md bg-background shadow-xs"
          initial={false}
          animate={indicatorStyle}
          transition={{type: "spring", stiffness: 250, damping: 25}}
        />
      )}
    </div>
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({className, ...props}, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex w-full cursor-pointer items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-foreground z-10",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({className, ...props}, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "bg-background ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export {Tabs, TabsContent, TabsList, TabsTrigger};
