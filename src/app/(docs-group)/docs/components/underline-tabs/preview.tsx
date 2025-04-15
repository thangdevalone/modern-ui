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
import { UnderlineTabs } from "@/components/modern-ui/underline-tabs";
import { Home, Settings, User } from "lucide-react";

export const underlineTabsCode = `import UnderlineTabs from "@/components/modern-ui/underline-tabs";
import { Home, Settings, User } from "lucide-react";

export function UnderlineTabsDemo() {
  const tabs = [
    {
      id: "profile",
      label: "Profile",
      icon: User,
      content: <div className="p-4">Profile content goes here</div>
    },
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      content: <div className="p-4">Dashboard content goes here</div>
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      content: <div className="p-4">Settings content goes here</div>
    }
  ];

  return <UnderlineTabs tabs={tabs} defaultTab="profile" />;
}`;

export const PreviewUnderlineTabs = () => {
  const [activeTab, setActiveTab] = useState("preview");
  const [key, setKey] = useState(0);

  const handleRefresh = () => {
    setKey((prevKey) => prevKey + 1);
  };

  const tabs = [
    {
      id: "profile",
      label: "Profile",
      icon: <User className="h-4 w-4" />,
      content: (
        <div className="p-4 border rounded-md">Profile content goes here</div>
      ),
    },
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <Home className="h-4 w-4"/>,
      content: (
        <div className="p-4 border rounded-md">Dashboard content goes here</div>
      ),
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="h-4 w-4"/>,
      content: (
        <div className="p-4 border rounded-md">Settings content goes here</div>
      ),
    },
  ];

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
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/3 w-lg bg-background border p-8 rounded-md">
            <UnderlineTabs key={key} tabs={tabs} defaultTabId="profile" />
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
          <CodeBlock code={underlineTabsCode} />
        </TabsContent>
      </Tabs>
    </>
  );
};
