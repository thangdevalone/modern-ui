"use client";

import React, { useState } from "react";
import { Button } from "@/components/modern-ui/button";
import { Input } from "@/components/modern-ui/input";
import { useLocalStorage } from "@/hooks/use-local-storage";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/modern-ui/tabs";
import { RefreshCw } from "lucide-react";
import { CodeBlock } from "@/components/code-block";

const localStorageCode = `
import { useLocalStorage } from "@/hooks/use-local-storage";

export function LocalStorageDemo() {
  const [storedValue, setStoredValue] = useLocalStorage("demo-key", "");
  const [inputValue, setInputValue] = useState("");

  const handleSave = () => {
    if (inputValue) {
      setStoredValue(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a value to store"
        />
        <Button onClick={handleSave}>Save</Button>
      </div>
      {storedValue && (
        <div className="p-4 bg-muted rounded-lg border">
          <p className="text-sm text-muted-foreground mb-1">Stored value:</p>
          <p className="font-mono">{storedValue}</p>
        </div>
      )}
    </div>
  );
}
`;

export function PreviewUseLocalStorage() {
  const [activeTab, setActiveTab] = useState("preview");
  const [key, setKey] = useState(0);
  const [storedValue, setStoredValue] = useLocalStorage("demo-key", "");
  const [inputValue, setInputValue] = useState("");

  const handleRefresh = () => {
    setKey((prevKey) => prevKey + 1);
    setStoredValue("");
  };

  const handleSave = () => {
    if (inputValue) {
      setStoredValue(inputValue);
      setInputValue("");
    }
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
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter a value to store"
                />
                <Button onClick={handleSave}>Save</Button>
              </div>
              {storedValue && (
                <div className="p-4 bg-muted rounded-lg border">
                  <p className="text-sm text-muted-foreground mb-1">Stored value:</p>
                  <p className="font-mono">{storedValue}</p>
                </div>
              )}
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
          <CodeBlock code={localStorageCode} language={"tsx"} />
        </TabsContent>
      </Tabs>
    </>
  );
} 