"use client";
import {RefreshCw} from 'lucide-react';
import {useState} from 'react';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/modern-ui/tabs';
import {Button} from '@/components/modern-ui/button';
import {CodeBlock} from '@/components/code-block';
import {Stepper} from '@/components/modern-ui/stepper';

export const stepperCode = `import { Stepper } from "@/components/modern-ui/stepper";
            
export function StepperDemo() {
  const steps = [
    { id: 1, title: "Step 1" },
    { id: 2, title: "Step 2" },
    { id: 3, title: "Step 3" }
  ];

  return <Stepper steps={steps} activeStep={1} />;
}`;

export const PreviewStepper = () => {
  const [activeTab, setActiveTab] = useState("preview");
  const [key, setKey] = useState(0);
  const [activeStep, setActiveStep] = useState(1);

  const handleRefresh = () => {
    setKey((prevKey) => prevKey + 1);
  };

  const steps = [
    { id: 1, title: "Step 1" },
    { id: 2, title: "Step 2" },
    { id: 3, title: "Step 3" }
  ];

  return (
    <>
      <Tabs value={activeTab} className="mb-8" onValueChange={(value) => setActiveTab(value)}>
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="preview" className="p-6 border rounded-md mt-2 relative min-h-[300px]">
          <div className="absolute inset-0 bg-[radial-gradient(#80808080_1px,transparent_1px)] [background-size:16px_16px] opacity-50">
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md px-4 not-prose">
            <Stepper key={key} steps={steps} activeStep={activeStep} />
            <div className="mt-8 flex justify-center gap-4">
              <Button 
                onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                disabled={activeStep === 0}
              >
                Previous
              </Button>
              <Button 
                onClick={() => setActiveStep((prev) => Math.min(steps.length - 1, prev + 1))}
                disabled={activeStep === steps.length - 1}
              >
                Next
              </Button>
            </div>
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
          <CodeBlock code={stepperCode} language={"tsx"} />
        </TabsContent>
      </Tabs>
    </>
  );
}; 