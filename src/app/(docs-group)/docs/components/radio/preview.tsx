"use client";
import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/modern-ui/button";
import { Label } from "@/components/modern-ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/modern-ui/radio";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/modern-ui/tabs";
import { RefreshCw } from "lucide-react";
import { useState } from "react";

export const radioCode = `import { RadioGroup, RadioGroupItem } from "@/components/modern-ui/radio";
import { Label } from "@/components/modern-ui/label";

export function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Compact</Label>
      </div>
    </RadioGroup>
  );
}`;

export function PreviewRadio() {
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
          className="p-6 border rounded-md mt-2 relative min-h-[250px]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(#80808080_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
          <div className="flex justify-center items-center relative h-full z-10 min-h-[250px] not-prose">
            <RadioGroup key={key} defaultValue="comfortable">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="default" id="preview-r1" />
                <Label htmlFor="preview-r1">Default</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="comfortable" id="preview-r2" />
                <Label htmlFor="preview-r2">Comfortable</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="compact" id="preview-r3" />
                <Label htmlFor="preview-r3">Compact</Label>
              </div>
            </RadioGroup>
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
          <CodeBlock code={radioCode} language={"tsx"} />
        </TabsContent>
      </Tabs>
    </>
  );
}
