"use client";
import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/modern-ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/modern-ui/tabs";
import { Textarea } from "@/components/modern-ui/textarea";
import { RefreshCw } from "lucide-react";
import { useState } from "react";

export const textareaCode = `import { Textarea } from "@/components/modern-ui/textarea";
            
export function TextAreaDemo() {
  return (
    <Textarea className="w-full max-w-sm" placeholder="Enter your message" />
  );
}`;

export const PreviewTextArea = () => {
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
          className="p-6 border rounded-md mt-2 relative min-h-[300px]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(#80808080_1px,transparent_1px)] [background-size:16px_16px] opacity-50 "></div>
          <div className="flex justify-center items-center h-full z-10 relative min-h-[250px] not-prose">
            <Textarea
              className="w-full bg-background max-w-sm"
              key={key}
              placeholder="Enter your message"
            />
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
          <CodeBlock code={textareaCode} language={"tsx"} />
        </TabsContent>
      </Tabs>
    </>
  );
};
