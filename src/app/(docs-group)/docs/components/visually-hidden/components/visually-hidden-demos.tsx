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