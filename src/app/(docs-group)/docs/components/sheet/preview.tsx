"use client";
import {RefreshCw} from 'lucide-react';
import {useState} from 'react';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/modern-ui/tabs';
import {Button} from '@/components/modern-ui/button';
import {CodeBlock} from '@/components/code-block';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/modern-ui/sheet";

export const sheetCode = `import { Button } from "@/components/modern-ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/modern-ui/sheet";

export function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sheet Title</SheetTitle>
          <SheetDescription>
            Sheet description goes here. Make it useful for the user.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">Sheet content goes here.</div>
      </SheetContent>
    </Sheet>
  );
}`;

export function PreviewSheet() {
  const [activeTab, setActiveTab] = useState("preview");
  const [key, setKey] = useState(0);

  const handleRefresh = () => {
    setKey((prevKey) => prevKey + 1);
  };

  return (
    <>
      <Tabs value={activeTab} className="mb-8" onValueChange={(value) => setActiveTab(value)}>
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="preview" className="p-6 border rounded-md mt-2 relative min-h-[200px]">
          <div className="absolute inset-0 bg-[radial-gradient(#80808080_1px,transparent_1px)] [background-size:16px_16px] opacity-50">
          </div>
          <div className="flex justify-center relative items-center h-full z-10 min-h-[200px] not-prose">
            <Sheet key={key}>
              <SheetTrigger asChild>
                <Button variant="outline">Open Sheet</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Modern UI Sheet Component</SheetTitle>
                  <SheetDescription>
                    This is a sheet component that slides in from the edge of the screen.
                  </SheetDescription>
                </SheetHeader>
                <div className="py-6">
                  <p className="text-muted-foreground">
                    Sheets are great for mobile interfaces and can be used to display additional 
                    information without navigating away from the current page.
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <div className="absolute z-10 top-4 right-4 flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={handleRefresh}
            >
              <RefreshCw className="h-4 w-4"/>
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