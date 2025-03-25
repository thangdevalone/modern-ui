"use client";

import * as React from "react";
import {ChevronRight} from "lucide-react";
import {cn} from "@/lib/utils";

const Breadcrumb = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(({className, ...props}, ref) => (
  <nav ref={ref} className={cn("flex", className)} aria-label="Breadcrumb" {...props} />
));
Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList = React.forwardRef<HTMLOListElement, React.OlHTMLAttributes<HTMLOListElement>>(
  ({className, ...props}, ref) => (
    <ol ref={ref} className={cn("flex flex-wrap items-center gap-1.5", className)} {...props} />
  ),
);
BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.LiHTMLAttributes<HTMLLIElement>>(
  ({className, ...props}, ref) => <li ref={ref} className={cn("inline-flex items-center", className)} {...props} />,
);
BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  asChild?: boolean
}
>(({className, asChild = false, ...props}, ref) => {
  return (
    <a
      ref={ref}
      className={cn(
        "text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center",
        className,
      )}
      {...props}
    />
  );
});
BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbSeparator = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({className, ...props}, ref) => (
    <span ref={ref} className={cn("mx-1 text-muted-foreground/50", className)} {...props}>
      <ChevronRight className="h-4 w-4"/>
    </span>
  ),
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({className, ...props}, ref) => (
    <span ref={ref} className={cn("text-sm font-medium text-foreground", className)} aria-current="page" {...props} />
  ),
);
BreadcrumbPage.displayName = "BreadcrumbPage";

const BreadcrumbEllipsis = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({className, ...props}, ref) => (
    <span ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props}>
      ...
    </span>
  ),
);
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
  BreadcrumbEllipsis,
};

