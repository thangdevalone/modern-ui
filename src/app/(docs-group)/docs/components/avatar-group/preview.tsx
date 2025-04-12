"use client";

import { CodeBlock } from "@/components/code-block";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/modern-ui/avatar";
import { AvatarGroup } from "@/components/modern-ui/avatar-group";
import { Button } from "@/components/modern-ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/modern-ui/tabs";
import { RefreshCw } from "lucide-react";
import { useState } from "react";

export const avatarGroupCode = `import { Avatar, AvatarFallback, AvatarImage } from "@/components/modern-ui/avatar";
import { AvatarGroup } from "@/components/modern-ui/avatar-group";
            
export function AvatarGroupDemo() {
  return (
    <div className="flex flex-col items-center justify-center p-6 border rounded-md space-y-4">
      <AvatarGroup limit={3}>
        <Avatar>
          <AvatarImage src="https://api.dicebear.com/9.x/pixel-art/svg?seed=Maria" alt="@dicebear" />
          <AvatarFallback>MA</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="https://api.dicebear.com/9.x/pixel-art/svg?seed=Nolan" alt="@dicebear" />
          <AvatarFallback>NO</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="https://api.dicebear.com/9.x/pixel-art/svg?seed=Destiny" alt="@dicebear" />
          <AvatarFallback>DE</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="https://api.dicebear.com/9.x/pixel-art/svg?seed=Ryan" alt="@dicebear" />
          <AvatarFallback>RY</AvatarFallback>
        </Avatar>
      </AvatarGroup>
    </div>
  );
}`;

export const PreviewAvatarGroup = () => {
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
          <div className="min-h-[250px] flex items-center justify-center not-prose">
            <AvatarGroup key={key} limit={3}>
              <Avatar>
                <AvatarImage
                  src="https://api.dicebear.com/9.x/pixel-art/svg?seed=Maria"
                  alt="@dicebear"
                />
                <AvatarFallback>MA</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="https://api.dicebear.com/9.x/pixel-art/svg?seed=Nolan"
                  alt="@dicebear"
                />
                <AvatarFallback>NO</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="https://api.dicebear.com/9.x/pixel-art/svg?seed=Destiny"
                  alt="@dicebear"
                />
                <AvatarFallback>DE</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="https://api.dicebear.com/9.x/pixel-art/svg?seed=Ryan"
                  alt="@dicebear"
                />
                <AvatarFallback>RY</AvatarFallback>
              </Avatar>
            </AvatarGroup>
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
          <CodeBlock code={avatarGroupCode} language={"tsx"} />
        </TabsContent>
      </Tabs>
    </>
  );
}; 