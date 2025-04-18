"use client";
import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/modern-ui/button";
import { Slider } from "@/components/modern-ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/modern-ui/tabs";
import { cn } from "@/lib/utils";
import { RefreshCw } from "lucide-react";
import { useState } from "react";


const sliderCode = `import { Slider } from "@/components/modern-ui/slider";

export function PreviewSlider() {
  const [value, setValue] = useState([25]);

  return (
    <div className={cn("rounded-xl border shadow-sm bg-card text-card-foreground mx-auto w-full max-w-md mb-8 p-6")}>
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Volume</span>
          <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-md text-sm font-medium">
            {value[0]}%
          </span>
        </div>
        <Slider
          value={value}
          onValueChange={setValue}
          max={100}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between items-center text-xs text-muted-foreground mt-1">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
}`;

export function PreviewSlider() {
  const [value, setValue] = useState([25]);
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
          <div className="absolute inset-0 bg-[radial-gradient(#80808080_1px,transparent_1px)] [background-size:16px_16px] opacity-50 "></div>
          <div className="flex justify-center items-center relative h-full z-10 min-h-[250px] not-prose">
            <div
              key={key}
              className={cn(
                "rounded-xl border shadow-sm bg-card text-card-foreground mx-auto w-full max-w-md mb-8 p-6"
              )}
            >
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Volume</span>
                  <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-md text-sm font-medium">
                    {value[0]}%
                  </span>
                </div>
                <Slider
                  value={value}
                  onValueChange={setValue}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between items-center text-xs text-muted-foreground mt-1">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
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
          <CodeBlock code={sliderCode} language={"tsx"} />
        </TabsContent>
      </Tabs>
    </>
  );
}
