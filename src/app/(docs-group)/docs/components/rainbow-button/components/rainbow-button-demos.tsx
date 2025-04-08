import { RainbowButton } from "@/components/modern-ui/rainbow-button";
import { Button } from "@/components/modern-ui/button";

export function BasicRainbowButtonDemo() {
  return (
    <RainbowButton>Click me</RainbowButton>
  );
}

export function LargeRainbowButtonDemo() {
  return (
    <RainbowButton size="lg">Large Button</RainbowButton>
  );
}

export function SmallRainbowButtonDemo() {
  return (
    <RainbowButton size="sm">Small Button</RainbowButton>
  );
}

export function DisabledRainbowButtonDemo() {
  return (
    <RainbowButton disabled>Disabled</RainbowButton>
  );
}

export function RainbowButtonWithIconDemo() {
  return (
    <RainbowButton>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mr-2 h-4 w-4"
      >
        <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
      </svg>
      With Icon
    </RainbowButton>
  );
} 