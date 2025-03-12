"use client";
import Link from 'next/link';
import {ChevronRight, RefreshCw} from 'lucide-react';
import {useState} from 'react';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/modern-ui/tabs';
import {Button} from '@/components/modern-ui/button';
import {CodeBlock} from '@/components/code-block';

const buttonCode = `import { Button } from "@/components/modern-ui/button";
            
export function ButtonDemo() {
    return <Button>Click me</Button>;
}`;

export const PreviewButton = () => {
  const [activeTab, setActiveTab] = useState("preview");
  const [key, setKey] = useState(0);

  const handleRefresh = () => {
    setKey((prevKey) => prevKey + 1);
  };

  return (
    <>
      <div
        className="mb-4 text-sm flex flex-row items-center gap-2 text-muted-foreground"
      >
        <Link className="no-underline" href={"/docs"}>Docs</Link> <ChevronRight className="w-4 h-4"/>
        <Link className="no-underline" href={"/docs/components"}>Components</Link> <ChevronRight className="w-4 h-4"/>
        <strong>Button</strong>
      </div>
      <Tabs value={activeTab} className="mb-8" onValueChange={(value) => setActiveTab(value)}>
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="preview" className="p-6 border rounded-md mt-2 relative min-h-[300px]">
          <div className="absolute inset-0 bg-dot-pattern opacity-15">
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Button key={key}>Click me</Button>
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
          <CodeBlock code={buttonCode}/>
        </TabsContent>
      </Tabs>
    </>
  );
};
