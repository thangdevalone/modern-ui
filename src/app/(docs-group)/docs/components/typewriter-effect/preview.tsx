"use client";
import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/modern-ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/modern-ui/tabs";
import { TypewriterEffectSmooth } from "@/components/modern-ui/typewriter-effect";
import { cn } from "@/lib/utils";
import { RefreshCw } from "lucide-react";
import { useState } from "react";

const typewriterCode = `import { TypewriterEffectSmooth } from "@/components/modern-ui/typewriter-effect";

export function PreviewTypewriterEffect() {
  return (
    <TypewriterEffectSmooth 
      words={[
        { text: "Beautiful", className: "text-4xl" },
        { text: "accessible", className: "text-4xl" },
        { text: "Modern UI", className: "text-4xl text-blue-500" },
      ]}
    />
  );
}`;

export function PreviewTypewriterEffect() {
  const [activeTab, setActiveTab] = useState("preview");
  const [key, setKey] = useState(0);

  const handleRefresh = () => {
    setKey((prevKey) => prevKey + 1);
  };

  const words = [
    { text: "Beautiful", className: "text-4xl" },
    { text: "accessible", className: "text-4xl" },
    { text: "Modern UI", className: "text-4xl text-blue-500" },
  ];

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
          className="p-6 border rounded-md mt-2 relative min-h-[300px]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(#80808080_1px,transparent_1px)] [background-size:16px_16px] opacity-50 "></div>
          <div className="flex justify-center items-center relative h-full z-10 min-h-[300px] not-prose">
            <div className="flex flex-col items-center justify-center w-full">
              <TypewriterEffectSmooth 
                key={key} 
                words={words} 
                className="text-center"
              />
            </div>
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
          <CodeBlock code={typewriterCode} language={"tsx"} />
        </TabsContent>
      </Tabs>
    </>
  );
}
