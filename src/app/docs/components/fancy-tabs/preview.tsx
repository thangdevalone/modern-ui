"use client";
import { RefreshCw } from "lucide-react";
import { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/modern-ui/tabs";
import { Button } from "@/components/modern-ui/button";
import { CodeBlock } from "@/components/code-block";

export const tabsCode = `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/modern-ui/tabs";
            
export function TabsDemo() {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        Account tab content
      </TabsContent>
      <TabsContent value="password">
        Password tab content
      </TabsContent>
      <TabsContent value="settings">
        Settings tab content
      </TabsContent>
    </Tabs>
  );
}`;

export const PreviewTabs = () => {
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
          <div className="absolute inset-0 bg-[radial-gradient(#80808080_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96">
            <Tabs key={key} defaultValue="account" className="w-full">
              <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent
                value="account"
                className="p-4 mt-4 border rounded-md"
              >
                Account tab content
              </TabsContent>
              <TabsContent
                value="password"
                className="p-4 mt-4 border rounded-md"
              >
                Password tab content
              </TabsContent>
              <TabsContent
                value="settings"
                className="p-4 mt-4 border rounded-md"
              >
                Settings tab content
              </TabsContent>
            </Tabs>
          </div>
          <div className="absolute top-4 right-4 flex gap-2">
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
          <CodeBlock code={tabsCode} />
        </TabsContent>
      </Tabs>
    </>
  );
};
