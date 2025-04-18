"use client";

import { TypewriterEffect } from "@/components/modern-ui/typewriter-effect";

export function DefaultTypewriterDemo() {
  return (
      <TypewriterEffect words={[{ text: "Modern" }, { text: "UI" }]} />
  );
}

