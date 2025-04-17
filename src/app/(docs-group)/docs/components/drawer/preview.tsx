"use client";

import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/modern-ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/modern-ui/drawer";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/modern-ui/tabs";
import { RefreshCw } from "lucide-react";
import { useState } from "react";

export const sheetCode = `import { Button } from "@/components/modern-ui/button";
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
          <DrawerTitle>Mobile UI Component</DrawerTitle>
          <DrawerDescription>
            A bottom sheet drawer for mobile and tablet interfaces.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 grid gap-2">
          <div className="h-8 rounded-md bg-muted/50 flex items-center justify-center">
            Swipe to dismiss
          </div>
          <div className="h-8 rounded-md bg-muted/50 flex items-center justify-center">
            Perfect for mobile interfaces
          </div>
        </div>
        <DrawerFooter>
          <Button>Close</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}`;

export function PreviewDrawer() {
  const [activeTab, setActiveTab] = useState("preview");
  const [key, setKey] = useState(0);

  const handleRefresh = () => {
    setKey((prevKey) => prevKey + 1);
  };

  return (
    <>
      <Tabs
        value={activeTab}
        className="mb-8"
        onValueChange={(value) => setActiveTab(value)}
      >
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent
          value="preview"
          className="p-6 border rounded-md mt-2 relative min-h-[200px]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(#80808080_1px,transparent_1px)] [background-size:16px_16px] opacity-50 "></div>
          <div className="flex justify-center items-center relative h-full z-10 min-h-[200px] not-prose">
            <Drawer key={key}>
              <DrawerTrigger asChild>
                <Button variant="outline">Open Drawer</Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Mobile UI Component</DrawerTitle>
                  <DrawerDescription>
                    A bottom sheet drawer for mobile and tablet interfaces.
                  </DrawerDescription>
                </DrawerHeader>
                <div className="p-4 grid gap-2">Drawer content goes here</div>
                <DrawerFooter>
                  <Button>Close</Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
          <div className="absolute z-10 top-4 right-4 flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={handleRefresh}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="code" className="mt-2">
          <CodeBlock code={sheetCode} language={"tsx"} />
        </TabsContent>
      </Tabs>
    </>
  );
}
