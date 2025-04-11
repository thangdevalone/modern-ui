"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The number of avatars to show before truncating
   * @default 3
   */
  limit?: number;
}

/**
 * A component for displaying avatar groups with automatic stacking and truncation.
 */
export function AvatarGroup({
  children,
  className,
  limit = 3,
  ...props
}: AvatarGroupProps) {
  const childrenArray = React.Children.toArray(children);
  const visibleAvatars = limit ? childrenArray.slice(0, limit) : childrenArray;
  const excess = limit ? childrenArray.length - limit : 0;

  return (
    <div
      className={cn("flex -space-x-2", className)}
      {...props}
    >
      {visibleAvatars.map((child, index) => (
        <div
          key={index}
          className="relative inline-block border-2 border-background rounded-full"
        >
          {child}
        </div>
      ))}
      {excess > 0 && (
        <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium border-2 border-background">
          +{excess}
        </div>
      )}
    </div>
  );
} 