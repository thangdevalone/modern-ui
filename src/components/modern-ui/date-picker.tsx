"use client";

import { format } from "date-fns";
import * as React from "react";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/modern-ui/button";
import { Calendar } from "@/components/modern-ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/modern-ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";

export interface DatePickerProps {
  date?: Date;
  setDate?: (date: Date | undefined) => void;
  className?: string;
  placeholder?: string;
}

export default function DatePicker({
  date,
  setDate,
  className,
  placeholder = "Pick a date",
}: DatePickerProps) {
  const [_date, _setDate] = React.useState<Date>();
  const selectedDate = date || _date;
  const handleDateChange = setDate || _setDate;
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !selectedDate && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? (
            format(selectedDate, "PPP")
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          defaultMonth={selectedDate}
          {...(selectedDate ? { defaultSelected: selectedDate } : {})}
          onDayClick={(date) => {
            handleDateChange(date);
            setOpen(false);
          }}
          initialView="days"
          autoFocus
        />
      </PopoverContent>
    </Popover>
  );
}

export interface DateRangePickerProps {
  dateRange?: DateRange;
  setDateRange?: (dateRange: DateRange | undefined) => void;
  className?: string;
  placeholder?: string;
  numberOfMonths?: number;
}

export function DateRangePicker({
  dateRange,
  setDateRange,
  className,
  placeholder = "Pick a date range",
  numberOfMonths = 2,
}: DateRangePickerProps) {
  const [_dateRange, _setDateRange] = React.useState<DateRange>();
  const selectedDateRange = dateRange || _dateRange;
  const [open, setOpen] = React.useState(false);

  const handleDateRangeChange = React.useCallback(
    (range: DateRange | undefined) => {
      const handler = setDateRange || _setDateRange;
      handler(range);
    },
    [setDateRange, _setDateRange]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[300px] justify-start text-left font-normal",
            !selectedDateRange && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDateRange?.from ? (
            selectedDateRange.to ? (
              <>
                {format(selectedDateRange.from, "PPP")} -{" "}
                {format(selectedDateRange.to, "PPP")}
              </>
            ) : (
              format(selectedDateRange.from, "PPP")
            )
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex flex-col">
          <Calendar
            mode="range"
            {...(selectedDateRange
              ? { defaultSelected: selectedDateRange }
              : {})}
            onDayClick={(date) => {
              if (!selectedDateRange?.from) {
                handleDateRangeChange({ from: date, to: undefined });
              } else if (selectedDateRange.from && !selectedDateRange.to) {
                const to =
                  date > selectedDateRange.from ? date : selectedDateRange.from;
                const from =
                  date > selectedDateRange.from ? selectedDateRange.from : date;
                handleDateRangeChange({ from, to });
              } else {
                handleDateRangeChange({ from: date, to: undefined });
              }
            }}
            numberOfMonths={numberOfMonths}
            initialView="days"
            autoFocus
          />
          <div className="p-3 border-t border-border flex justify-end">
            <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
              Done
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export interface MonthPickerProps {
  month?: Date;
  setMonth?: (month: Date | undefined) => void;
  className?: string;
  placeholder?: string;
}

export function MonthPicker({
  month,
  setMonth,
  className,
  placeholder = "Pick a month",
}: MonthPickerProps) {
  const [_month, _setMonth] = React.useState<Date>();
  const selectedMonth = month || _month;
  const handleMonthChange = setMonth || _setMonth;
  const [open, setOpen] = React.useState(false);

  const MonthView = () => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const currentYear = selectedMonth
      ? selectedMonth.getFullYear()
      : new Date().getFullYear();

    const [year, setYear] = React.useState(currentYear);

    return (
      <div className="p-3">
        <div className="flex justify-between items-center mb-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setYear((y) => y - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="font-medium">{year}</div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setYear((y) => y + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {monthNames.map((monthName, index) => {
            const isCurrentMonth =
              selectedMonth &&
              selectedMonth.getMonth() === index &&
              selectedMonth.getFullYear() === year;

            return (
              <Button
                key={index}
                variant={isCurrentMonth ? "default" : "ghost"}
                className="h-9"
                onClick={() => {
                  const date = new Date(year, index, 1);
                  handleMonthChange(date);
                  setOpen(false);
                }}
              >
                {monthName}
              </Button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !selectedMonth && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedMonth ? (
            format(selectedMonth, "MMMM yyyy")
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <MonthView />
      </PopoverContent>
    </Popover>
  );
}

export interface QuarterPickerProps {
  quarter?: Date;
  setQuarter?: (quarter: Date | undefined) => void;
  className?: string;
  placeholder?: string;
}

export function QuarterPicker({
  quarter,
  setQuarter,
  className,
  placeholder = "Pick a quarter",
}: QuarterPickerProps) {
  const [_quarter, _setQuarter] = React.useState<Date>();
  const selectedQuarter = quarter || _quarter;
  const handleQuarterChange = setQuarter || _setQuarter;
  const [open, setOpen] = React.useState(false);

  const getQuarterLabel = (date: Date) => {
    const quarterIndex = Math.floor(date.getMonth() / 3);
    const monthNames = [
      ["Jan", "Mar"],
      ["Apr", "Jun"],
      ["Jul", "Sep"],
      ["Oct", "Dec"],
    ];
    return `(${monthNames[quarterIndex][0]} - ${
      monthNames[quarterIndex][1]
    }) ${date.getFullYear()}`;
  };

  const QuarterView = () => {
    const currentYear = selectedQuarter
      ? selectedQuarter.getFullYear()
      : new Date().getFullYear();

    const [year, setYear] = React.useState(currentYear);

    const quarters = [
      { name: "(Jan - Mar)", months: [0, 1, 2] },
      { name: "(Apr - Jun)", months: [3, 4, 5] },
      { name: "(Jul - Sep)", months: [6, 7, 8] },
      { name: "(Oct - Dec)", months: [9, 10, 11] },
    ];

    const getCurrentQuarter = (date: Date | undefined) => {
      if (!date) return -1;
      return Math.floor(date.getMonth() / 3);
    };

    return (
      <div className="p-3">
        <div className="flex justify-between items-center mb-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setYear((y) => y - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="font-medium">{year}</div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setYear((y) => y + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {quarters.map((quarter, index) => {
            const isCurrentQuarter =
              selectedQuarter &&
              getCurrentQuarter(selectedQuarter) === index &&
              selectedQuarter.getFullYear() === year;

            return (
              <Button
                key={index}
                variant={isCurrentQuarter ? "default" : "ghost"}
                className="h-10"
                onClick={() => {
                  const date = new Date(year, quarter.months[0], 1);
                  handleQuarterChange(date);
                  setOpen(false);
                }}
              >
                {quarter.name}
              </Button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !selectedQuarter && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedQuarter ? (
            getQuarterLabel(selectedQuarter)
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <QuarterView />
      </PopoverContent>
    </Popover>
  );
}

export interface YearPickerProps {
  year?: Date;
  setYear?: (year: Date | undefined) => void;
  className?: string;
  placeholder?: string;
}

export function YearPicker({
  year,
  setYear,
  className,
  placeholder = "Pick a year",
}: YearPickerProps) {
  const [_year, _setYear] = React.useState<Date>();
  const selectedYear = year || _year;
  const handleYearChange = setYear || _setYear;
  const [open, setOpen] = React.useState(false);

  const YearView = () => {
    const currentYear = selectedYear
      ? selectedYear.getFullYear()
      : new Date().getFullYear();
    const [decade, setDecade] = React.useState(
      Math.floor(currentYear / 10) * 10
    );

    const years = Array.from({ length: 12 }, (_, i) => decade + i - 1);

    return (
      <div className="p-3">
        <div className="flex justify-between items-center mb-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setDecade((d) => d - 10)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="font-medium">
            {decade} - {decade + 9}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setDecade((d) => d + 10)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {years.map((year) => {
            const isCurrentYear =
              selectedYear && selectedYear.getFullYear() === year;

            const isCurrentDecade = year >= decade && year < decade + 10;

            return (
              <Button
                key={year}
                variant={isCurrentYear ? "default" : "ghost"}
                className={cn(
                  "h-9",
                  !isCurrentDecade && "text-muted-foreground opacity-50"
                )}
                onClick={() => {
                  const date = new Date(year, 0, 1);
                  handleYearChange(date);
                  setOpen(false);
                }}
              >
                {year}
              </Button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !selectedYear && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedYear ? (
            format(selectedYear, "yyyy")
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <YearView />
      </PopoverContent>
    </Popover>
  );
}
