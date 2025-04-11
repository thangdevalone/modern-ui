"use client";

import { Button } from "@/components/modern-ui/button";
import { Plus } from "lucide-react";

export function DefaultButtonDemo() {
  return (
    <Button>Default Button</Button>
  );
}

export function SecondaryButtonDemo() {
  return (
    <Button variant="secondary">Secondary Button</Button>
  );
}

export function OutlineButtonDemo() {
  return (
    <Button variant="outline">Outline Button</Button>
  );
}

export function DestructiveButtonDemo() {
  return (
    <Button variant="destructive">Destructive Button</Button>
  );
}

export function GhostButtonDemo() {
  return (
    <Button variant="ghost">Ghost Button</Button>
  );
}

export function LinkButtonDemo() {
  return (
    <Button variant="link">Link Button</Button>
  );
}

export function ButtonSizesDemo() {
  return (
    <>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </>
  );
}

export function ButtonWithIconDemo() {
  return (
    <Button icon={<Plus />}>
      With Icon
    </Button>
  );
}

export function IconButtonDemo() {
  return (
    <Button size="icon" icon={<Plus />}>
      <span className="sr-only">Add item</span>
    </Button>
  );
}

export function LoadingButtonDemo() {
  return (
    <Button loading>Loading...</Button>
  );
} 