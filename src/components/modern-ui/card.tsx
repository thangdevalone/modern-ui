"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const cardVariants = cva("group relative overflow-hidden rounded-xl transition-all duration-300", {
  variants: {
    variant: {
      default: "bg-background border border-border shadow-xs",
      outline: "bg-background border-1 border-primary/20 hover:border-primary/40",
      destructive: "bg-destructive text-destructive-foreground",
      dashed: "bg-background border-1 border-dashed border-border",
      elevated: "bg-background border border-border shadow-lg",
      interactive: "bg-background border border-border hover:scale-[1.01] hover:shadow-md",
    },
    size: {
      default: "p-6",
      sm: "p-4",
      lg: "p-8",
      xl: "p-10",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

export interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  childClassname?: string
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, childClassname, variant, size, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(cardVariants({ variant, size }), className)} {...props}>
        <div className={cn("relative z-10 not-prose", childClassname)}>{props.children}</div>
      </div>
    )
  },
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("flex flex-col space-y-1.5", className)} {...props} />,
)
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-xl font-semibold leading-none tracking-tight", className)} {...props} />
  ),
)
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
)
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("pt-6", className)} {...props} />,
)
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("flex items-center pt-6", className)} {...props} />,
)
CardFooter.displayName = "CardFooter"

const CardBadge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "secondary" | "outline" | "destructive"
  }
>(({ className, variant = "default", ...props }, ref) => {
  const variantClasses = {
    default: "bg-primary/10 text-primary border border-primary/20",
    secondary: "bg-secondary/10 text-secondary border border-secondary/20",
    outline: "bg-background border border-border",
    destructive: "bg-destructive/10 text-destructive border border-destructive/20",
  }

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
  )
})
CardBadge.displayName = "CardBadge"

const CardDecoration = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/10 blur-3xl", className)}
      {...props}
    />
  ),
)
CardDecoration.displayName = "CardDecoration"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, CardBadge, CardDecoration }

