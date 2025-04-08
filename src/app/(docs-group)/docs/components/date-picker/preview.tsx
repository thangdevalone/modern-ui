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
import DatePicker, { DateRangePicker, MonthPicker, QuarterPicker, YearPicker } from "@/components/modern-ui/date-picker";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";

export const datePickerCode = `import DatePicker from "@/components/modern-ui/date-picker";
            
export function DatePickerDemo() {
    return <DatePicker />;
}`;

export const dateRangePickerCode = `import { DateRangePicker } from "@/components/modern-ui/date-picker";
import { DateRange } from "react-day-picker";
            
export function DateRangePickerDemo() {
    const [dateRange, setDateRange] = useState<DateRange>({
        from: new Date(),
        to: addDays(new Date(), 7),
    });
    
    return <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />;
}`;

export const monthPickerCode = `import { MonthPicker } from "@/components/modern-ui/date-picker";
            
export function MonthPickerDemo() {
    return <MonthPicker />;
}`;

export const quarterPickerCode = `import { QuarterPicker } from "@/components/modern-ui/date-picker";
            
export function QuarterPickerDemo() {
    return <QuarterPicker />;
}`;

export const yearPickerCode = `import { YearPicker } from "@/components/modern-ui/date-picker";
            
export function YearPickerDemo() {
    return <YearPicker />;
}`;

export const PreviewDatePicker = () => {
  const [activeTab, setActiveTab] = useState("preview");
  const [pickerType, setPickerType] = useState("date");
  const [key, setKey] = useState(0);
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  const handleRefresh = () => {
    setKey((prevKey) => prevKey + 1);
  };

  const getActiveCode = () => {
    switch (pickerType) {
      case "date":
        return datePickerCode;
      case "dateRange":
        return dateRangePickerCode;
      case "month":
        return monthPickerCode;
      case "quarter":
        return quarterPickerCode;
      case "year":
        return yearPickerCode;
      default:
        return datePickerCode;
    }
  };

  const renderPicker = () => {
    switch (pickerType) {
      case "date":
        return <DatePicker key={key} />;
      case "dateRange":
        return <DateRangePicker 
          key={key} 
          dateRange={dateRange} 
          setDateRange={(range) => range && setDateRange(range)} 
        />;
      case "month":
        return <MonthPicker key={key} />;
      case "quarter":
        return <QuarterPicker key={key} />;
      case "year":
        return <YearPicker key={key} />;
      default:
        return <DatePicker key={key} />;
    }
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
          className="p-6 border rounded-md mt-2 relative min-h-[350px]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(#80808080_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex flex-col space-y-4 items-center">
              <div className="flex space-x-2 mb-4 flex-wrap gap-2 justify-center">
                <Button 
                  variant={pickerType === "date" ? "default" : "outline"} 
                  onClick={() => setPickerType("date")}
                  size="sm"
                >
                  Date
                </Button>
                <Button 
                  variant={pickerType === "dateRange" ? "default" : "outline"} 
                  onClick={() => setPickerType("dateRange")}
                  size="sm"
                >
                  Date Range
                </Button>
                <Button 
                  variant={pickerType === "month" ? "default" : "outline"} 
                  onClick={() => setPickerType("month")}
                  size="sm"
                >
                  Month
                </Button>
                <Button 
                  variant={pickerType === "quarter" ? "default" : "outline"} 
                  onClick={() => setPickerType("quarter")}
                  size="sm"
                >
                  Quarter
                </Button>
                <Button 
                  variant={pickerType === "year" ? "default" : "outline"} 
                  onClick={() => setPickerType("year")}
                  size="sm"
                >
                  Year
                </Button>
              </div>
              {renderPicker()}
            </div>
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
          <CodeBlock code={getActiveCode()} language={"tsx"} />
        </TabsContent>
      </Tabs>
    </>
  );
};
