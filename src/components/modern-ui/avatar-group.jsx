"use client";

import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import * as React from "react";

export function AvatarGroup({
  children,
  className,
  limit = 3,
  ...props
}) {
  const childrenArray = React.Children.toArray(children);
  const visibleAvatars = limit ? childrenArray.slice(0, limit) : childrenArray;
  const excess = limit ? childrenArray.length - limit : 0;

  return (
    <div className={cn("flex -space-x-2", className)} {...props}>
      {visibleAvatars.map((child, index) => (
        <div
          key={index}
          className="relative inline-block border-2 border-background rounded-full"
        >
          {child}
        </div>
      ))}
      {excess > 0 && (
        <div className="relative flex h-11 w-11 flex-row gap-0.5 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium border-2 border-background">
          <Plus className="h-3 w-3" />
          <span>{excess}</span>
        </div>
      )}
    </div>
  );
}