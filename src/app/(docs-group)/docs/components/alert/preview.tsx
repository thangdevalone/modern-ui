"use client";
import {RefreshCw} from 'lucide-react';
import {useState} from 'react';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/modern-ui/tabs';
import {Button} from '@/components/modern-ui/button';
import {CodeBlock} from '@/components/code-block';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/modern-ui/alert";
import { InfoIcon } from "lucide-react";

export const alertCode = `import { Alert, AlertDescription, AlertTitle } from "@/components/modern-ui/alert";
import { InfoIcon } from "lucide-react";
            
export function AlertDemo() {
  return (
    <Alert className='max-w-md'>
      <InfoIcon className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the CLI.
      </AlertDescription>
    </Alert>
  );
}`;

export const PreviewAlert = () => {
  const [activeTab, setActiveTab] = useState("preview");
  const [key, setKey] = useState(0);

  const handleRefresh = () => {
    setKey((prevKey) => prevKey + 1);
  };

  return (
    <>
      <Tabs value={activeTab} className="mb-8" onValueChange={(value) => setActiveTab(value)}>
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="preview" className="p-6 border rounded-md mt-2 relative min-h-[300px]">
          <div className="absolute inset-0 bg-[radial-gradient(#80808080_1px,transparent_1px)] [background-size:16px_16px] opacity-50 ">
          </div>
          <div className="flex justify-center items-center h-full z-10 min-h-[250px] not-prose">
            <Alert key={key} className='max-w-md'>
              <InfoIcon className="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                You can add components to your app using the CLI.
              </AlertDescription>
            </Alert>
          </div>
          <div className="absolute z-10 top-4 right-4 flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={handleRefresh}
            >
              <RefreshCw className="h-4 w-4"/>
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="code" className="mt-2">
          <CodeBlock code={alertCode} language={"tsx"} />
        </TabsContent>
      </Tabs>
    </>
  );
};
