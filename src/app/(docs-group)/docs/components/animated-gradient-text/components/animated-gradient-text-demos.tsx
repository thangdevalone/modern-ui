"use client";

import { AnimatedGradientText } from "@/components/modern-ui/animated-gradient-text";

export function BasicAnimatedGradientTextDemo() {
  return (
    <AnimatedGradientText className="text-3xl font-bold">
      Modern UI
    </AnimatedGradientText>
  );
}

export function CustomColorsAnimatedGradientTextDemo() {
  return (
    <AnimatedGradientText 
      className="text-3xl font-bold"
      colorFrom="#ec4899" 
      colorTo="#ffaa40"
    >
      Custom Colors
    </AnimatedGradientText>
  );
}