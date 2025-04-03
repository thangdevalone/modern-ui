"use client";

import { useState, useEffect } from "react";
import DatePicker, {
  DateRangePicker,
  MonthPicker,
  QuarterPicker,
  YearPicker,
} from "@/components/modern-ui/date-picker";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import { Button } from "@/components/modern-ui/button";
import { RefreshCw } from "lucide-react";

export function DatePickerDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [key, setKey] = useState(0);

  const handleRefresh = () => {
    setKey((prev) => prev + 1);
    setDate(new Date());
  };

  return (
    <>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <DatePicker
          key={key}
          date={date}
          setDate={setDate}
          placeholder="Select a date"
        />
      </div>
      <div className="absolute top-4 right-4">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={handleRefresh}
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
}

export function DateRangePickerDemo() {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });
  const [key, setKey] = useState(0);

  const handleRefresh = () => {
    setKey((prev) => prev + 1);
    setDateRange({
      from: new Date(),
      to: addDays(new Date(), 7),
    });
  };

  const handleDateRangeChange = (range: DateRange | undefined) => {
    if (range) {
      setDateRange(range);
    }
  };

  return (
    <>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <DateRangePicker
          key={key}
          dateRange={dateRange}
          setDateRange={handleDateRangeChange}
          placeholder="Select date range"
        />
      </div>
      <div className="absolute top-4 right-4">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={handleRefresh}
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
}

export function MonthPickerDemo() {
  const [month, setMonth] = useState<Date | undefined>(new Date());
  const [key, setKey] = useState(0);

  const handleRefresh = () => {
    setKey((prev) => prev + 1);
    setMonth(new Date());
  };

  return (
    <>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <MonthPicker
          key={key}
          month={month}
          setMonth={setMonth}
          placeholder="Select month"
        />
      </div>
      <div className="absolute top-4 right-4">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={handleRefresh}
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
}

export function QuarterPickerDemo() {
  const [quarter, setQuarter] = useState<Date | undefined>(new Date());
  const [key, setKey] = useState(0);

  const handleRefresh = () => {
    setKey((prev) => prev + 1);
    setQuarter(new Date());
  };

  return (
    <>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <QuarterPicker
          key={key}
          quarter={quarter}
          setQuarter={setQuarter}
          placeholder="Select quarter"
        />
      </div>
      <div className="absolute top-4 right-4">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={handleRefresh}
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
}

export function YearPickerDemo() {
  const [year, setYear] = useState<Date | undefined>(new Date());
  const [key, setKey] = useState(0);

  const handleRefresh = () => {
    setKey((prev) => prev + 1);
    setYear(new Date());
  };

  return (
    <>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <YearPicker
          key={key}
          year={year}
          setYear={setYear}
          placeholder="Select year"
        />
      </div>
      <div className="absolute top-4 right-4">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={handleRefresh}
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
}
