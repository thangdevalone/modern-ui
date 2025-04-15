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
import { FluidDropdown, Category } from "@/components/modern-ui/fluid-dropdown";
import { Layers, Shirt, Briefcase, Smartphone, Home } from "lucide-react";

// Define sample categories to show in the preview
const sampleCategories: Category[] = [
  { id: "all", label: "All", icon: Layers, color: "#A06CD5" },
  { id: "lifestyle", label: "Lifestyle", icon: Shirt, color: "#FF6B6B" },
  { id: "desk", label: "Desk", icon: Briefcase, color: "#4ECDC4" },
  { id: "tech", label: "Tech", icon: Smartphone, color: "#45B7D1" },
  { id: "home", label: "Home", icon: Home, color: "#F9C74F" },
];

export const fluidDropdownCode = `import { FluidDropdown } from "@/components/modern-ui/fluid-dropdown";
import { Layers, Shirt, Briefcase, Smartphone, Home } from "lucide-react";

export function FluidDropdownDemo() {
  const categories = [
    { id: "all", label: "All", icon: Layers, color: "#A06CD5" },
    { id: "lifestyle", label: "Lifestyle", icon: Shirt, color: "#FF6B6B" },
    { id: "desk", label: "Desk", icon: Briefcase, color: "#4ECDC4" },
    { id: "tech", label: "Tech", icon: Smartphone, color: "#45B7D1" },
    { id: "home", label: "Home", icon: Home, color: "#F9C74F" },
  ];

  return <FluidDropdown categories={categories} defaultCategoryId="all" className="w-[200px]" />;
}`;

export const PreviewFluidDropdown = () => {
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
          <div className="flex justify-center items-center h-full z-10 relative min-h-[250px]">
            <FluidDropdown 
              key={key} 
              categories={sampleCategories} 
              defaultCategoryId="all" 
              className="w-[200px]"
            />
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
          <CodeBlock code={fluidDropdownCode} language="tsx" />
        </TabsContent>
      </Tabs>
    </>
  );
}; 