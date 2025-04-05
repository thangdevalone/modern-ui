import * as React from "react";
import { cn } from "@/lib/utils";

interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLSpanElement> {
  asChild?: boolean;
}

export const VisuallyHidden = React.forwardRef<HTMLSpanElement, VisuallyHiddenProps>(
  ({ className, children, asChild = false, ...props }, ref) => {
    const Component = asChild ? React.Fragment : "span";
    
    return (
      <Component
        ref={ref}
        className={cn("sr-only", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

VisuallyHidden.displayName = "VisuallyHidden"; 