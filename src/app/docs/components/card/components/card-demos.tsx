"use client";

import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardBadge,
  CardDecoration,
} from "@/components/modern-ui/card";
import { Button } from "@/components/modern-ui/button";

export function DefaultCardDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Default Card</CardTitle>
        <CardDescription>
          This is a default card with standard styling
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the card content area, which can contain any elements.</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          Cancel
        </Button>
        <Button size="sm">Save</Button>
      </CardFooter>
    </Card>
  );
}

export function OutlineCardDemo() {
  return (
    <Card variant="outline" className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Outline Card</CardTitle>
        <CardDescription>Card with an outline border style</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This card has a border that highlights when you hover over it.</p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button size="sm">Learn More</Button>
      </CardFooter>
    </Card>
  );
}

export function ElevatedCardDemo() {
  return (
    <Card variant="elevated" className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Elevated Card</CardTitle>
        <CardDescription>Card with enhanced shadow effects</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This card has a more prominent shadow to create a raised effect.</p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button size="sm">Explore</Button>
      </CardFooter>
    </Card>
  );
}

export function InteractiveCardDemo() {
  return (
    <Card variant="interactive" className="w-full max-w-sm cursor-pointer">
      <CardHeader>
        <CardTitle>Interactive Card</CardTitle>
        <CardDescription>
          This card has interactive hover effects
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          Hover over this card to see it slightly scale up and add a shadow
          effect.
        </p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="outline" size="sm">
          Click Me
        </Button>
      </CardFooter>
    </Card>
  );
}

export function CardWithBadgeDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="relative">
        <div className="absolute right-0 top-0">
          <CardBadge>New</CardBadge>
        </div>
        <CardTitle>Card with Badge</CardTitle>
        <CardDescription>A card featuring a badge component</CardDescription>
      </CardHeader>
      <CardContent>
        <p>The CardBadge component can be placed anywhere within the card.</p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button size="sm">View More</Button>
      </CardFooter>
    </Card>
  );
}

export function CardWithDecorationDemo() {
  return (
    <Card className="max-w-sm border-purple-300 shadow-lg shadow-purple-200/50 hover:shadow-purple-300/50">
      <CardHeader>
        <CardTitle className="text-purple-700">Custom Card</CardTitle>
        <CardDescription>Custom styling combination</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          This card uses custom class combinations with the interactive variant.
        </p>
      </CardContent>
      <CardFooter>
        <CardBadge className="bg-purple-100 text-purple-700 border-purple-200">
          Custom
        </CardBadge>
      </CardFooter>
      <CardDecoration className="bg-purple-200/50" />
    </Card>
  );
}

export function DashedCardDemo() {
  return (
    <Card variant="dashed" className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Dashed Card</CardTitle>
        <CardDescription>A card with dashed border styling</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This card uses a dashed border style to create a distinct look.</p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button size="sm">Add Content</Button>
      </CardFooter>
    </Card>
  );
}
