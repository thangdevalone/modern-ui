"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/modern-ui/button";
import { useClickAway } from "@/hooks/use-click-away";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/modern-ui/tabs";
import { RefreshCw } from "lucide-react";
import { CodeBlock } from "@/components/code-block";

const clickAwayCode = `
import { Button } from "@/components/modern-ui/button";

export function ClickAwayDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickAway(dropdownRef, () => {
    if (isOpen) setIsOpen(false);
  });

  return (
    <div ref={dropdownRef} className="relative">
      <Button onClick={() => setIsOpen(true)}>
        Click me
      </Button>
      {isOpen && (
        <div className="absolute left-0 top-[125%] w-[250px] bg-white p-4 border rounded-lg shadow-md">
          <p>Click outside to close</p>
        </div>
      )}
    </div>
  );
} 
`;

export function PreviewUseClickAway() {
  const [activeTab, setActiveTab] = useState("preview");
  const [key, setKey] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleRefresh = () => {
    setKey((prevKey) => prevKey + 1);
  };

  useClickAway(dropdownRef, () => {
    if (isOpen) setIsOpen(false);
  });

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
          <div className="absolute inset-0 bg-[radial-gradient(#80808080_1px,transparent_1px)] [background-size:16px_16px] opacity-50 "></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div ref={dropdownRef} className="relative">
              <Button onClick={() => setIsOpen(true)} key={key}>
                Click me
              </Button>
              {isOpen && (
                <div className="absolute left-0 top-[125%] w-[250px] bg-white p-4 border rounded-lg shadow-md">
                  <p>Click outside to close</p>
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
          <CodeBlock code={clickAwayCode} language={"tsx"} />
        </TabsContent>
      </Tabs>
    </>
  );
}
