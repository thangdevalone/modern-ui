"use client";
import { CodeBlock } from "@/components/code-block";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/modern-ui/tabs";
import { RichTextEditor } from "@/components/modern-ui/rich-text-editor";
import { useState } from "react";

export const richTextEditorCode = `import { RichTextEditor } from "@/components/modern-ui/rich-text-editor";
            
export function RichTextEditorDemo() {
  return (
    <RichTextEditor className="w-full" placeholder="Type something..." />
  );
}`;

export const PreviewRichTextEditor = () => {
  const [activeTab, setActiveTab] = useState("preview");
  
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
          className="rounded-md mt-2 relative min-h-[400px]"
        >
          <div className="flex justify-center items-center h-full z-10 relative min-h-[350px] not-prose">
            <RichTextEditor
              className="w-full bg-background"
              placeholder="Type something..."
            />
          </div>
        </TabsContent>
        <TabsContent value="code" className="mt-2">
          <CodeBlock code={richTextEditorCode} language={"tsx"} />
        </TabsContent>
      </Tabs>
    </>
  );
}; 