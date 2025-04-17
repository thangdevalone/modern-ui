"use client";

import { Calendar } from "@/components/modern-ui/calendar";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export function CalendarDemo() {
  const [date, setDate] = useState<Date>(new Date());

  return (
    <Calendar
      mode="single"
      required
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
    />
  );
}

export function CalendarRangeDemo() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 7)),
  });

  return (
    <Calendar
      mode="range"
      selected={dateRange}
      onSelect={setDateRange}
      className="rounded-md border"
      numberOfMonths={2}
    />
  );
}

export function CalendarMultipleDemo() {
  const [dates, setDates] = useState<Date[]>([]);

  return (
    <Calendar
      mode="multiple"
      required
      selected={dates}
      onSelect={setDates}
      className="rounded-md border"
    />
  );
}
