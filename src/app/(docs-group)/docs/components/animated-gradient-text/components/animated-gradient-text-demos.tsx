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
      from="from-blue-600" 
      via="via-green-500" 
      to="to-indigo-400"
    >
      Custom Colors
    </AnimatedGradientText>
  );
}

export function LargeAnimatedGradientTextDemo() {
  return (
    <AnimatedGradientText className="text-5xl font-extrabold">
      Large Text
    </AnimatedGradientText>
  );
}

export function HeadingAnimatedGradientTextDemo() {
  return (
    <AnimatedGradientText 
      as="h1"
      className="text-3xl font-bold"
    >
      Main Heading
    </AnimatedGradientText>
  );
}

export function SlowerAnimationDemo() {
  return (
    <AnimatedGradientText 
      className="text-2xl font-bold"
      duration="10s" // 10 seconds
    >
      Slower Animation
    </AnimatedGradientText>
  );
} 