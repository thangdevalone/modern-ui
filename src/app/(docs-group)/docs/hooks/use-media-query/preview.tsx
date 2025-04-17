"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/modern-ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/modern-ui/tabs";
import { Input } from "@/components/modern-ui/input";
import { RefreshCw } from "lucide-react";
import { CodeBlock } from "@/components/code-block";
import { Badge } from "@/components/modern-ui/badge";

const mediaQueryCode = `
import { useMediaQuery } from "@/hooks/use-media-query";

export function MediaQueryDemo() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 640px) and (max-width: 1023px)");
  const isMobile = useMediaQuery("(max-width: 639px)");
  
  return (
    <div className="space-y-4">
      <div className="p-4 border rounded-lg">
        <h3 className="font-medium mb-3">Current viewport</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Badge variant={isDesktop ? "default" : "outline"}>Desktop</Badge>
            <Badge variant={isTablet ? "default" : "outline"}>Tablet</Badge>
            <Badge variant={isMobile ? "default" : "outline"}>Mobile</Badge>
          </div>
        </div>
      </div>
      <div className="text-sm text-muted-foreground">
        Try resizing your browser window to see the changes
      </div>
    </div>
  );
}
`;

// Helper component to display window dimensions
function WindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    const updateSize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  
  return (
    <div className="absolute bottom-2 right-2 text-xs text-muted-foreground font-mono">
      {size.width} × {size.height}
    </div>
  );
}

export function PreviewUseMediaQuery() {
  const [activeTab, setActiveTab] = useState("preview");
  const [key, setKey] = useState(0);
  
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 640px) and (max-width: 1023px)");
  const isMobile = useMediaQuery("(max-width: 639px)");

  const handleRefresh = () => {
    setKey((prevKey) => prevKey + 1);
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
          <div className="absolute inset-0 bg-[radial-gradient(#80808080_1px,transparent_1px)] [background-size:16px_16px] opacity-50 "></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full bg-background max-w-[300px]">
            <div className="space-y-4" key={key}>
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-3">Current viewport</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Badge variant={isDesktop ? "default" : "outline"}>Desktop</Badge>
                    <Badge variant={isTablet ? "default" : "outline"}>Tablet</Badge>
                    <Badge variant={isMobile ? "default" : "outline"}>Mobile</Badge>
                  </div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                Try resizing your browser window to see the changes
              </div>
            </div>
          </div>
          <WindowSize />
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
          <CodeBlock code={mediaQueryCode} language={"tsx"} />
        </TabsContent>
      </Tabs>
    </>
  );
} 