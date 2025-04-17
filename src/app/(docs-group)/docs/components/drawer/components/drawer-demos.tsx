"use client";

import { Button } from "@/components/modern-ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
} from "@/components/modern-ui/drawer";

export function DrawerDemo() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Mobile Menu</DrawerTitle>
          <DrawerDescription>
            This is a drawer component for mobile interfaces.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 grid gap-2">
          <div className="h-8 rounded-md bg-muted/50 flex items-center justify-center">
            Menu Item 1
          </div>
          <div className="h-8 rounded-md bg-muted/50 flex items-center justify-center">
            Menu Item 2
          </div>
          <div className="h-8 rounded-md bg-muted/50 flex items-center justify-center">
            Menu Item 3
          </div>
        </div>
        <DrawerFooter>
          <Button>Close</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export function DrawerSizeDemo() {
  return (
    <div className="flex gap-2">
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">Small</Button>
        </DrawerTrigger>
        <DrawerContent className="h-full max-h-[30vh]">
          <DrawerHeader>
            <DrawerTitle>Small Drawer</DrawerTitle>
            <DrawerDescription>
              This is a small drawer with 30% viewport height.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4">
            Drawer content goes here
          </div>
        </DrawerContent>
      </Drawer>
      
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">Medium</Button>
        </DrawerTrigger>
        <DrawerContent className="h-full max-h-[50vh]">
          <DrawerHeader>
            <DrawerTitle>Medium Drawer</DrawerTitle>
            <DrawerDescription>
              This is a medium drawer with 50% viewport height.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4">
            Drawer content goes here
          </div>
        </DrawerContent>
      </Drawer>
      
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">Large</Button>
        </DrawerTrigger>
        <DrawerContent className="h-full max-h-[80vh]">
          <DrawerHeader>
            <DrawerTitle>Large Drawer</DrawerTitle>
            <DrawerDescription>
              This is a large drawer with 80% viewport height.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4">
            Drawer content goes here
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export function DrawerNestedDemo() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Main Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Main Drawer</DrawerTitle>
          <DrawerDescription>
            This is the main drawer. Try opening the nested drawer.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 flex justify-center">
          <Drawer>
            <DrawerTrigger asChild>
              <Button>Open Nested Drawer</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Nested Drawer</DrawerTitle>
                <DrawerDescription>
                  This is a nested drawer inside the main drawer.
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4">
                <p>Nested drawer content goes here</p>
              </div>
              <DrawerFooter>
                <Button>Close</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </DrawerContent>
    </Drawer>
  );
} 