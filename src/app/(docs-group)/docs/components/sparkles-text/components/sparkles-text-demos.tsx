"use client";

import { SparklesText } from "@/components/modern-ui/sparkles-text";

export function DefaultSparklesTextDemo() {
  return <SparklesText>Magic Text</SparklesText>;
}

export function ColoredSparklesTextDemo() {
  return (
    <SparklesText sparkleColors={["#FFD700", "#FF69B4", "#00BFFF"]}>
      Colorful Magic
    </SparklesText>
  );
}

export function CustomSparklesTextDemo() {
  return (
    <SparklesText sparkleSize={20} sparkleCount={20} speed={0.4}>
      Special Offer
    </SparklesText>
  );
}
