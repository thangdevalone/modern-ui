"use client";

import { Badge } from "@/components/modern-ui/badge";

export function DefaultBadgeDemo() {
  return (
    <Badge>New</Badge>
  );
}

export function SecondaryBadgeDemo() {
  return (
    <Badge variant="secondary">Secondary</Badge>
  );
}

export function DestructiveBadgeDemo() {
  return (
    <Badge variant="destructive">Error</Badge>
  );
}

export function OutlineBadgeDemo() {
  return (
    <Badge variant="outline">Outline</Badge>
  );
}

export function CustomStyledBadgeDemo() {
  return (
    <Badge className="bg-blue-500 hover:bg-blue-600">Custom</Badge>
  );
} 