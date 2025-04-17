"use client";
import {RefreshCw} from 'lucide-react';
import {useState} from 'react';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/modern-ui/tabs';
import {Button} from '@/components/modern-ui/button';
import {CodeBlock} from '@/components/code-block';
import { Calendar } from "@/components/modern-ui/calendar";

export const calendarCode = `import { Calendar } from "@/components/modern-ui/calendar";
import { useState } from "react";

export function CalendarDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
    />
  );
}`;

export function PreviewCalendar() {
  const [activeTab, setActiveTab] = useState("preview");
  const [key, setKey] = useState(0);
  const [date, setDate] = useState<Date | undefined>(new Date());

  const handleRefresh = () => {
    setKey((prevKey) => prevKey + 1);
    setDate(new Date());
  };

  return (
    <>
      <Tabs value={activeTab} className="mb-8" onValueChange={(value) => setActiveTab(value)}>
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="preview" className="p-6 border rounded-md mt-2 relative min-h-[350px]">
          <div className="absolute inset-0 bg-[radial-gradient(#80808080_1px,transparent_1px)] [background-size:16px_16px] opacity-50">
          </div>
          <div className="flex justify-center items-center h-full z-10 min-h-[350px] not-prose">
            <div className="flex flex-col items-center gap-4">
              <Calendar
                key={key}
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
              <div className="text-center text-sm text-muted-foreground">
                {date ? (
                  <p>You selected: {date.toDateString()}</p>
                ) : (
                  <p>Select a date</p>
                )}
              </div>
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
          <CodeBlock code={calendarCode} language={"tsx"} />
        </TabsContent>
      </Tabs>
    </>
  );
} 