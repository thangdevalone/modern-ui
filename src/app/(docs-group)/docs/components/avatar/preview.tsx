"use client";

import { CodeBlock } from "@/components/code-block";
import { AvatarFallback, AvatarImage } from "@/components/modern-ui/avatar";
import { Button } from "@/components/modern-ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/modern-ui/tabs";
import { Avatar } from "@radix-ui/react-avatar";
import { RefreshCw } from "lucide-react";
import { useState } from "react";

export const avatarCode = `import { Avatar, AvatarFallback, AvatarImage } from "@/components/modern-ui/avatar";
import { AvatarGroup } from "@/components/modern-ui/avatar-group";
            
export function AvatarDemo() {
  return (
    <Avatar className="w-10 h-10">
      <AvatarImage src="https://api.dicebear.com/9.x/pixel-art/svg?seed=Maria" alt="@dicebear"/>
      <AvatarFallback>MU</AvatarFallback>
    </Avatar>
  );
}`;

export const PreviewAvatar = () => {
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
          <div className="absolute inset-0 bg-[radial-gradient(#80808080_1px,transparent_1px)] [background-size:16px_16px] opacity-50 "></div>
          <div className="flex justify-center items-center h-full z-10 relative min-h-[250px] not-prose">
            <Avatar key={key} className="w-10 h-10">
              <AvatarImage
                src="https://api.dicebear.com/9.x/pixel-art/svg?seed=Maria"
                alt="@shadcn"
              />
              <AvatarFallback>MA</AvatarFallback>
            </Avatar>
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
          <CodeBlock code={avatarCode} language={"tsx"} />
        </TabsContent>
      </Tabs>
    </>
  );
};
