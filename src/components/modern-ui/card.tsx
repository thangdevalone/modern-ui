"use client";

import * as React from "react";
import {cva, type VariantProps} from "class-variance-authority";
import {cn} from "@/lib/utils";

const cardVariants = cva("group relative overflow-hidden rounded-xl transition-all duration-300", {
  variants: {
    variant: {
      default: "bg-background border border-border shadow-sm hover:bg-muted/50",
      glass: "backdrop-blur-md bg-background/80 border border-white/20 shadow-lg",
      gradient:
        "bg-background before:absolute before:inset-0 before:rounded-xl before:p-[1px] before:bg-gradient-to-r before:from-primary/50 before:via-secondary/50 before:to-primary/50 before:-z-10",
      outline: "bg-background border-2 border-primary/20 hover:border-primary/40",
      elevated:
        "bg-background shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_2px_8px_rgba(0,0,0,0.08),0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_4px_12px_rgba(0,0,0,0.1),0_8px_24px_rgba(0,0,0,0.06)]",
    },
    size: {
      default: "p-6",
      sm: "p-4",
      lg: "p-8",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  spotlight?: boolean,
  childClassname?: string,
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({className, childClassname, variant, size, spotlight = false, ...props}, ref) => {
    const [position, setPosition] = React.useState({x: 0, y: 0});

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!spotlight) return;

      const rect = e.currentTarget.getBoundingClientRect();
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    return (
      <div
        ref={ref}
        className={cn(cardVariants({variant, size}), className)}
        onMouseMove={handleMouseMove}
        {...props}
      >
        {spotlight && (
          <div
            className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.06), transparent 40%)`,
            }}
          />
        )}
        <div className={cn("relative z-10", childClassname)}>{props.children}</div>
      </div>
    );
  },
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({className, ...props}, ref) => <div ref={ref} className={cn("flex flex-col space-y-1.5", className)} {...props} />,
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({className, ...props}, ref) => (
    <h3 ref={ref} className={cn("text-xl font-semibold leading-none tracking-tight", className)} {...props} />
  ),
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({className, ...props}, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({className, ...props}, ref) => <div ref={ref} className={cn("pt-6", className)} {...props} />,
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({className, ...props}, ref) => <div ref={ref} className={cn("flex items-center pt-6", className)} {...props} />,
);
CardFooter.displayName = "CardFooter";

const CardBadge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "secondary" | "outline" | "destructive"
}
>(({className, variant = "default", ...props}, ref) => {
  const variantClasses = {
    default: "bg-primary/10 text-primary border border-primary/20",
    secondary: "bg-secondary/10 text-secondary border border-secondary/20",
    outline: "bg-background border border-border",
    destructive: "bg-destructive/10 text-destructive border border-destructive/20",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
});
CardBadge.displayName = "CardBadge";

const CardDecoration = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({className, ...props}, ref) => (
    <div
      ref={ref}
      className={cn("absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/10 blur-3xl", className)}
      {...props}
    />
  ),
);
CardDecoration.displayName = "CardDecoration";

export {Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, CardBadge, CardDecoration};

