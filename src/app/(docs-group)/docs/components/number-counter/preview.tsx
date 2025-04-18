"use client";
import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/modern-ui/button";
import { NumberCounter } from "@/components/modern-ui/number-counter";
import {
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/modern-ui/tabs";
import { Tabs } from "@radix-ui/react-tabs";
import { RefreshCw } from "lucide-react";
import { useState } from "react";

export const numberCounterCode = `import { NumberCounter } from "@/components/modern-ui/number-counter";

export function PreviewNumberCounter() {
  const [value, setValue] = useState(1000);

  const resetAnimation = () => {
    setValue(prev => prev + 500);
  };

  return (
    <div className={cn("rounded-xl border shadow-sm bg-card text-card-foreground mx-auto w-full max-w-md mb-8 p-6")}>
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="text-5xl font-bold" key={key}>
          <NumberCounter value={value} startValue={value - 500} />
        </div>
        <Button onClick={resetAnimation} variant="outline">
          Add 500
        </Button>
      </div>
    </div>
  );
}`;

export function PreviewNumberCounter() {
  const [value, setValue] = useState(1000);
  const [activeTab, setActiveTab] = useState("preview");
  const [key, setKey] = useState(0);
  
  const handleRefresh = () => {
    setKey((prevKey) => prevKey + 1);
  };

  const resetAnimation = () => {
    setValue((prev) => prev + 500);
    setKey((prev) => prev + 1);
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
          <div className="absolute inset-0 bg-[radial-gradient(#80808080_1px,transparent_1px)] [background-size:16px_16px] opacity-50 "></div>
          <div className="flex justify-center items-center relative h-full z-10 min-h-[250px] not-prose">
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="text-5xl font-bold" key={key}>
                <NumberCounter value={value} startValue={value - 500} />
              </div>
              <Button onClick={resetAnimation}>
                Add 500
              </Button>
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
          <CodeBlock code={numberCounterCode} language={"tsx"} />
        </TabsContent>
      </Tabs>
    </>
  );
}
