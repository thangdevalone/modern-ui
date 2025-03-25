import type React from "react";
import Link from "next/link";
import {Home} from "lucide-react";
import {cn} from "@/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/modern-ui/breadcrumb";

export interface BreadcrumbItemProps {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbProps {
  items: BreadcrumbItemProps[];
  className?: string;
}

export function BreadcrumbNav({items, className}: BreadcrumbProps) {
  return (
    <Breadcrumb className={cn('not-prose', className)}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="flex items-center">
            <Home className="h-4 w-4"/>
            <span className="sr-only">Home</span>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {items.map((item, index) => {
          const isLastItem = index === items.length - 1;

          return (
            <BreadcrumbItem key={item.label}>
              <BreadcrumbSeparator/>

              {isLastItem || !item.href ? (
                <BreadcrumbPage className="flex items-center">
                  {item.icon && <span className="mr-1">{item.icon}</span>}
                  {item.label}
                </BreadcrumbPage>
              ) : (
                <Link href={item.href || "#"} passHref legacyBehavior>
                  <BreadcrumbLink className="flex items-center">
                    {item.icon && <span className="mr-1">{item.icon}</span>}
                    {item.label}
                  </BreadcrumbLink>
                </Link>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

