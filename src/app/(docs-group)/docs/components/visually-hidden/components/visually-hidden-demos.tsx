"use client";

import React from "react";
import { VisuallyHidden } from "@/components/modern-ui/visually-hidden";
import { Button } from "@/components/modern-ui/button";
import { MoonIcon, SunIcon, BellIcon, Menu, X } from "lucide-react";

export function BasicVisuallyHiddenDemo() {
  return (
    <div>
      <VisuallyHidden>This text is hidden visually</VisuallyHidden>
      <p>This text is visible</p>
    </div>
  );
}

export function VisuallyHiddenWithIconDemo() {
  return (
    <Button variant="outline" size="icon">
      <X className="h-4 w-4" />
      <VisuallyHidden>Close</VisuallyHidden>
    </Button>
  );
}

export function VisuallyHiddenWithButtonDemo() {
  return (
    <Button variant="ghost" size="icon">
      <Menu className="h-4 w-4" />
      <VisuallyHidden>Open menu</VisuallyHidden>
    </Button>
  );
}

export function IconButtonsDemo() {
  return (
    <div className="flex space-x-2">
      <Button variant="outline" size="icon">
        <SunIcon className="h-[1.2rem] w-[1.2rem]" />
        <VisuallyHidden>Light mode</VisuallyHidden>
      </Button>
      <Button variant="outline" size="icon">
        <MoonIcon className="h-[1.2rem] w-[1.2rem]" />
        <VisuallyHidden>Dark mode</VisuallyHidden>
      </Button>
      <Button variant="outline" size="icon">
        <BellIcon className="h-[1.2rem] w-[1.2rem]" />
        <VisuallyHidden>Notifications</VisuallyHidden>
      </Button>
    </div>
  );
}

export function FormLabelsDemo() {
  return (
    <form className="space-y-4">
      <div>
        <VisuallyHidden>
          <label htmlFor="email">Email address</label>
        </VisuallyHidden>
        <input 
          id="email"
          type="email" 
          placeholder="Email address"
          className="w-full border rounded-md px-3 py-2"
        />
      </div>
      <Button type="submit">Subscribe</Button>
    </form>
  );
} 