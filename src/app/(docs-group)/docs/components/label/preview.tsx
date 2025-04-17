"use client";
import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/modern-ui/button";
import { Checkbox } from "@/components/modern-ui/checkbox";
import { Label } from "@/components/modern-ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/modern-ui/tabs";
import { RefreshCw } from "lucide-react";
import { useState } from "react";

export const labelCode = `import { Label } from "@/components/modern-ui/label";
import { Checkbox } from "@/components/modern-ui/checkbox";

export function LabelDemo() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
  );
}`;

export const PreviewLabel = () => {
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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 not-prose">
            <div key={key} className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Accept terms and conditions
              </Label>
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
          <CodeBlock code={labelCode} language={"tsx"} />
        </TabsContent>
      </Tabs>
    </>
  );
};
