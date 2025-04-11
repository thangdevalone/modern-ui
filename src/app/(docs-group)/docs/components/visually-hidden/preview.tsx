"use client";
import {RefreshCw} from 'lucide-react';
import {useState} from 'react';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/modern-ui/tabs';
import {Button} from '@/components/modern-ui/button';
import {CodeBlock} from '@/components/code-block';
import { VisuallyHidden } from "@/components/modern-ui/visually-hidden";
import { MoonIcon } from "lucide-react";

export const visuallyHiddenCode = `import { VisuallyHidden } from "@/components/modern-ui/visually-hidden";
import { Button } from "@/components/modern-ui/button";
import { MoonIcon } from "lucide-react";
            
export function VisuallyHiddenDemo() {
  return (
    <Button variant="outline" size="icon">
      <MoonIcon className="h-[1.2rem] w-[1.2rem]" />
      <VisuallyHidden>Toggle theme</VisuallyHidden>
    </Button>
  );
}`;

export const PreviewVisuallyHidden = () => {
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
        <TabsContent value="preview" className="p-6 border rounded-md mt-2 relative min-h-[300px]">
          <div className="absolute inset-0 bg-[radial-gradient(#80808080_1px,transparent_1px)] [background-size:16px_16px] opacity-50">
          </div>
          <div className="w-full flex justify-center items-center h-full mx-auto">
            <Button key={key} variant="outline" size="icon">
              <MoonIcon className="h-[1.2rem] w-[1.2rem]" />
              <VisuallyHidden>Toggle theme</VisuallyHidden>
            </Button>
          </div>
          <div className="absolute top-4 right-4 flex gap-2">
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
          <CodeBlock code={visuallyHiddenCode} language={"tsx"} />
        </TabsContent>
      </Tabs>
    </>
  );
}; 