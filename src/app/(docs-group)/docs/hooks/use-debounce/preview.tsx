"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/modern-ui/button";
import { useDebounce } from "@/hooks/use-debounce";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/modern-ui/tabs";
import { Input } from "@/components/modern-ui/input";
import { RefreshCw } from "lucide-react";
import { CodeBlock } from "@/components/code-block";
import { Slider } from "@/components/modern-ui/slider";

const debounceCode = `
import { useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";

export function DebounceDemo() {
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue, 500);
  
  return (
    <div className="space-y-4">
      <div>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type something..."
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 border rounded-lg">
          <p className="text-sm text-muted-foreground mb-1">Input value:</p>
          <p className="font-mono">{inputValue}</p>
        </div>
        <div className="p-4 border rounded-lg">
          <p className="text-sm text-muted-foreground mb-1">Debounced value:</p>
          <p className="font-mono">{debouncedValue}</p>
        </div>
      </div>
    </div>
  );
}
`;

export function PreviewUseDebounce() {
  const [activeTab, setActiveTab] = useState("preview");
  const [key, setKey] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [delay, setDelay] = useState(500);
  const debouncedValue = useDebounce(inputValue, delay);
  const [lastTyped, setLastTyped] = useState<number | null>(null);

  const handleRefresh = () => {
    setKey((prevKey) => prevKey + 1);
    setInputValue("");
  };

  // Track when user types
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setLastTyped(Date.now());
  };

  return (
    <>
      <Tabs
        value={activeTab}
        className="mb-8 not-prose"
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
          <div className="absolute inset-0 bg-[radial-gradient(#80808080_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[300px]">
            <div className="space-y-4" key={key}>
              <div className="space-y-2">
                <label className="text-sm font-medium">Debounce delay: {delay}ms</label>
                <Slider
                  value={[delay]}
                  min={100}
                  max={2000}
                  step={100}
                  onValueChange={(value: number[]) => setDelay(value[0])}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>100ms</span>
                  <span>2000ms</span>
                </div>
              </div>
              <div>
                <Input
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Type something..."
                  className="mb-4 bg-background"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 border bg-background rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Input value:</p>
                  <p className="font-mono text-sm break-all">{inputValue || "—"}</p>
                </div>
                <div className="p-3 border bg-background rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Debounced value:</p>
                  <p className="font-mono text-sm break-all">{debouncedValue || "—"}</p>
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
          <CodeBlock code={debounceCode} language={"tsx"} />
        </TabsContent>
      </Tabs>
    </>
  );
} 