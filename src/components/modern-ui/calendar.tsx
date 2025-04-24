"use client";

import { Button, buttonVariants } from "@/components/modern-ui/button";
import { cn } from "@/lib/utils";
import { differenceInCalendarDays } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import {
  DayPicker,
  labelNext,
  labelPrevious,
  useDayPicker,
  type DayPickerProps,
} from "react-day-picker";

export type CalendarProps = DayPickerProps & {
  /**
   * In the year view, the number of years to display at once.
   * @default 12
   */
  yearRange?: number;

  /**
   * Wether to show the year switcher in the caption.
   * @default true
   */
  showYearSwitcher?: boolean;

  /**
   * The initial view of the calendar.
   * @default "days"
   */
  initialView?: NavView;

  /**
   * Custom handlers for direct selection
   */
  onMonthSelect?: (date: Date) => void;
  onQuarterSelect?: (date: Date) => void;
  onYearSelect?: (date: Date) => void;

  monthsClassName?: string;
  monthCaptionClassName?: string;
  weekdaysClassName?: string;
  weekdayClassName?: string;
  monthClassName?: string;
  captionClassName?: string;
  captionLabelClassName?: string;
  buttonNextClassName?: string;
  buttonPreviousClassName?: string;
  navClassName?: string;
  monthGridClassName?: string;
  weekClassName?: string;
  dayClassName?: string;
  dayButtonClassName?: string;
  rangeStartClassName?: string;
  rangeEndClassName?: string;
  selectedClassName?: string;
  todayClassName?: string;
  outsideClassName?: string;
  disabledClassName?: string;
  rangeMiddleClassName?: string;
  hiddenClassName?: string;
};

type NavView = "days" | "months" | "years";
type DateRange = {
  from?: Date;
  to?: Date;
};

/**
 * A custom calendar component built on top of react-day-picker.
 * @param props The props for the calendar.
 * @default yearRange 12
 * @returns
 */
function Calendar({
  className,
  mode = "single",
  showOutsideDays = true,
  showYearSwitcher = true,
  yearRange = 12,
  numberOfMonths,
  initialView = "days",
  onMonthSelect,
  onYearSelect,
  ...props
}: CalendarProps) {
  const [navView, setNavView] = React.useState<NavView>(initialView);
  const [displayYears, setDisplayYears] = React.useState<{
    from: number;
    to: number;
  }>(
    React.useMemo(() => {
      const currentYear = new Date().getFullYear();
      return {
        from: currentYear - Math.floor(yearRange / 2 - 1),
        to: currentYear + Math.ceil(yearRange / 2),
      };
    }, [yearRange])
  );

  const { onNextClick, onPrevClick, startMonth, endMonth } = props;

  const columnsDisplayed = navView === "years" ? 1 : numberOfMonths;

  const _monthsClassName = cn("relative flex", props.monthsClassName);
  const _monthCaptionClassName = cn(
    "relative mx-10 flex h-7 items-center justify-center",
    props.monthCaptionClassName
  );
  const _weekdaysClassName = cn("flex flex-row", props.weekdaysClassName);
  const _weekdayClassName = cn(
    "w-8 text-sm font-normal text-muted-foreground",
    props.weekdayClassName
  );
  const _monthClassName = cn("w-full", props.monthClassName);
  const _captionClassName = cn(
    "relative flex items-center justify-center pt-1",
    props.captionClassName
  );
  const _captionLabelClassName = cn(
    "truncate text-sm font-medium",
    props.captionLabelClassName
  );
  const buttonNavClassName = buttonVariants({
    variant: "outline",
    className:
      "absolute h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
  });
  const _buttonNextClassName = cn(
    buttonNavClassName,
    "right-0",
    props.buttonNextClassName
  );
  const _buttonPreviousClassName = cn(
    buttonNavClassName,
    "left-0",
    props.buttonPreviousClassName
  );
  const _navClassName = cn("flex items-start", props.navClassName);
  const _monthGridClassName = cn("mx-auto mt-4", props.monthGridClassName);
  const _weekClassName = cn("mt-2 flex w-max items-start", props.weekClassName);
  const _dayClassName = cn(
    "flex size-8 flex-1 items-center justify-center p-0 text-sm",
    props.dayClassName
  );
  const _dayButtonClassName = cn(
    buttonVariants({ variant: "ghost" }),
    "size-8 rounded-md p-0 font-normal transition-none aria-selected:opacity-100",
    props.dayButtonClassName
  );
  const buttonRangeClassName =
    "bg-accent [&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary [&>button]:hover:text-primary-foreground";
  const _rangeStartClassName = cn(
    buttonRangeClassName,
    "day-range-start rounded-s-md",
    props.rangeStartClassName
  );
  const _rangeEndClassName = cn(
    buttonRangeClassName,
    "day-range-end rounded-e-md",
    props.rangeEndClassName
  );
  const _rangeMiddleClassName = cn(
    "bg-accent !text-foreground [&>button]:bg-transparent [&>button]:!text-foreground [&>button]:hover:bg-transparent [&>button]:hover:!text-foreground",
    props.rangeMiddleClassName
  );
  const _selectedClassName = cn(
    "[&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary [&>button]:hover:text-primary-foreground",
    props.selectedClassName
  );
  const _todayClassName = cn(
    "[&>button]:bg-accent [&>button]:text-accent-foreground",
    props.todayClassName
  );
  const _outsideClassName = cn(
    "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
    props.outsideClassName
  );
  const _disabledClassName = cn(
    "text-muted-foreground opacity-50",
    props.disabledClassName
  );
  const _hiddenClassName = cn("invisible flex-1", props.hiddenClassName);

  return (
    <DayPicker
      {...(props as any)}
      mode={mode}
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      style={{
        width: 248.8 * (columnsDisplayed ?? 1) + "px",
      }}
      classNames={{
        months: _monthsClassName,
        month_caption: _monthCaptionClassName,
        weekdays: _weekdaysClassName,
        weekday: _weekdayClassName,
        month: _monthClassName,
        caption: _captionClassName,
        caption_label: _captionLabelClassName,
        button_next: _buttonNextClassName,
        button_previous: _buttonPreviousClassName,
        nav: _navClassName,
        month_grid: _monthGridClassName,
        week: _weekClassName,
        day: _dayClassName,
        day_button: _dayButtonClassName,
        range_start: _rangeStartClassName,
        range_middle: _rangeMiddleClassName,
        range_end: _rangeEndClassName,
        selected: _selectedClassName,
        today: _todayClassName,
        outside: _outsideClassName,
        disabled: _disabledClassName,
        hidden: _hiddenClassName,
      }}
      components={{
        Chevron: ({ orientation }) => {
          const Icon = orientation === "left" ? ChevronLeft : ChevronRight;
          return <Icon className="h-4 w-4" />;
        },
        Nav: ({ className }) => (
          <Nav
            className={className}
            displayYears={displayYears}
            navView={navView}
            setDisplayYears={setDisplayYears}
            startMonth={startMonth}
            endMonth={endMonth}
            onPrevClick={onPrevClick}
            onNextClick={onNextClick}
          />
        ),
        CaptionLabel: (props) => (
          <CaptionLabel
            showYearSwitcher={showYearSwitcher}
            navView={navView}
            setNavView={setNavView}
            displayYears={displayYears}
            {...props}
          />
        ),
        MonthGrid: ({ className, children, ...gridProps }) => (
          <MonthGrid
            children={children}
            className={className}
            displayYears={displayYears}
            startMonth={startMonth}
            endMonth={endMonth}
            navView={navView}
            setNavView={setNavView}
            onMonthSelect={onMonthSelect}
            onYearSelect={onYearSelect}
            {...gridProps}
          />
        ),
      }}
      numberOfMonths={columnsDisplayed}
    />
  );
}
Calendar.displayName = "Calendar";

function Nav({
  className,
  navView,
  startMonth,
  endMonth,
  displayYears,
  setDisplayYears,
  onPrevClick,
  onNextClick,
}: {
  className?: string;
  navView: NavView;
  startMonth?: Date;
  endMonth?: Date;
  displayYears: { from: number; to: number };
  setDisplayYears: React.Dispatch<
    React.SetStateAction<{ from: number; to: number }>
  >;
  onPrevClick?: (date: Date) => void;
  onNextClick?: (date: Date) => void;
}) {
  const { nextMonth, previousMonth, goToMonth } = useDayPicker();

  const isPreviousDisabled = (() => {
    if (navView === "years" || navView === "months") {
      return (
        (startMonth &&
          differenceInCalendarDays(
            new Date(displayYears.from - 1, 0, 1),
            startMonth
          ) < 0) ||
        (endMonth &&
          differenceInCalendarDays(
            new Date(displayYears.from - 1, 0, 1),
            endMonth
          ) > 0)
      );
    }
    return !previousMonth;
  })();

  const isNextDisabled = (() => {
    if (navView === "years" || navView === "months") {
      return (
        (startMonth &&
          differenceInCalendarDays(
            new Date(displayYears.to + 1, 0, 1),
            startMonth
          ) < 0) ||
        (endMonth &&
          differenceInCalendarDays(
            new Date(displayYears.to + 1, 0, 1),
            endMonth
          ) > 0)
      );
    }
    return !nextMonth;
  })();

  const handlePreviousClick = React.useCallback(() => {
    if (!previousMonth) return;

    if (navView === "years") {
      setDisplayYears((prev) => ({
        from: prev.from - (prev.to - prev.from + 1),
        to: prev.to - (prev.to - prev.from + 1),
      }));
      onPrevClick?.(
        new Date(
          displayYears.from - (displayYears.to - displayYears.from),
          0,
          1
        )
      );
      return;
    }

    if (navView === "months") {
      setDisplayYears((prev) => ({
        from: prev.from - 1,
        to: prev.to - 1,
      }));
      onPrevClick?.(new Date(displayYears.from - 1, 0, 1));
      return;
    }

    goToMonth(previousMonth);
    onPrevClick?.(previousMonth);
  }, [
    previousMonth,
    goToMonth,
    navView,
    displayYears,
    setDisplayYears,
    onPrevClick,
  ]);

  const handleNextClick = React.useCallback(() => {
    if (!nextMonth) return;

    if (navView === "years") {
      setDisplayYears((prev) => ({
        from: prev.from + (prev.to - prev.from + 1),
        to: prev.to + (prev.to - prev.from + 1),
      }));
      onNextClick?.(
        new Date(
          displayYears.from + (displayYears.to - displayYears.from),
          0,
          1
        )
      );
      return;
    }

    if (navView === "months") {
      setDisplayYears((prev) => ({
        from: prev.from + 1,
        to: prev.to + 1,
      }));
      onNextClick?.(new Date(displayYears.from + 1, 0, 1));
      return;
    }

    goToMonth(nextMonth);
    onNextClick?.(nextMonth);
  }, [
    goToMonth,
    nextMonth,
    navView,
    displayYears,
    setDisplayYears,
    onNextClick,
  ]);

  const getAriaLabel = (direction: "previous" | "next") => {
    if (navView === "years") {
      return `Go to the ${direction} ${
        displayYears.to - displayYears.from + 1
      } years`;
    }
    if (navView === "months") {
      return `Go to ${
        direction === "previous" ? "previous" : "next"
      } year's months`;
    }
    return direction === "previous"
      ? labelPrevious(previousMonth)
      : labelNext(nextMonth);
  };

  return (
    <nav className={cn("flex items-center", className)}>
      <Button
        variant="outline"
        className="absolute left-0 h-7 w-7 bg-transparent p-0 opacity-80 hover:opacity-100"
        type="button"
        tabIndex={isPreviousDisabled ? undefined : -1}
        disabled={isPreviousDisabled}
        aria-label={getAriaLabel("previous")}
        onClick={handlePreviousClick}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        className="absolute right-0 h-7 w-7 bg-transparent p-0 opacity-80 hover:opacity-100"
        type="button"
        tabIndex={isNextDisabled ? undefined : -1}
        disabled={isNextDisabled}
        aria-label={getAriaLabel("next")}
        onClick={handleNextClick}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  );
}

function CaptionLabel({
  children,
  showYearSwitcher,
  navView,
  setNavView,
  displayYears,
  ...props
}: {
  showYearSwitcher?: boolean;
  navView: NavView;
  setNavView: React.Dispatch<React.SetStateAction<NavView>>;
  displayYears: { from: number; to: number };
} & React.HTMLAttributes<HTMLSpanElement>) {
  if (!showYearSwitcher) return <span {...props}>{children}</span>;

  const handleViewChange = () => {
    setNavView((prev) => {
      switch (prev) {
        case "days":
          return "months";
        case "months":
          return "years";
        case "years":
          return "days";
        default:
          return "days";
      }
    });
  };

  const getViewLabel = () => {
    switch (navView) {
      case "days":
        return children;
      case "months":
        return `${displayYears.from} - Months`;
      case "years":
        return `${displayYears.from} - ${displayYears.to}`;
      default:
        return children;
    }
  };

  return (
    <Button
      className="h-7 w-full truncate text-sm font-medium"
      variant="ghost"
      size="sm"
      onClick={handleViewChange}
    >
      {getViewLabel()}
    </Button>
  );
}

function MonthGrid({
  className,
  children,
  displayYears,
  startMonth,
  endMonth,
  navView,
  setNavView,
  onMonthSelect,
  onQuarterSelect,
  onYearSelect,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
  displayYears: { from: number; to: number };
  startMonth?: Date;
  endMonth?: Date;
  navView: NavView;
  setNavView: React.Dispatch<React.SetStateAction<NavView>>;
  onMonthSelect?: (date: Date) => void;
  onQuarterSelect?: (date: Date) => void;
  onYearSelect?: (date: Date) => void;
} & React.TableHTMLAttributes<HTMLTableElement>) {
  if (navView === "years") {
    return (
      <YearGrid
        displayYears={displayYears}
        startMonth={startMonth}
        endMonth={endMonth}
        setNavView={setNavView}
        navView={navView}
        onYearSelect={onYearSelect}
        className={className}
        {...props}
      />
    );
  }

  if (navView === "months") {
    return (
      <MonthViewGrid
        displayYears={displayYears}
        startMonth={startMonth}
        endMonth={endMonth}
        setNavView={setNavView}
        navView={navView}
        onMonthSelect={onMonthSelect}
        className={className}
        {...props}
      />
    );
  }

  return (
    <table className={className} {...props}>
      {children}
    </table>
  );
}

function YearGrid({
  className,
  displayYears,
  startMonth,
  endMonth,
  setNavView,
  navView,
  onYearSelect,
  ...props
}: {
  className?: string;
  displayYears: { from: number; to: number };
  startMonth?: Date;
  endMonth?: Date;
  setNavView: React.Dispatch<React.SetStateAction<NavView>>;
  navView: NavView;
  onYearSelect?: (date: Date) => void;
} & React.HTMLAttributes<HTMLDivElement>) {
  
  const { goToMonth, selected } = useDayPicker() as {
    goToMonth: (date: Date) => void;
    selected: DateRange | undefined;
  };

  // Generate years in a proper grid layout
  const currentYear = new Date().getFullYear();

  // Calculate the start year to create a nice 3x4 grid with current year in the middle
  let startYear = displayYears.from;
  const yearsToShow = 12; // 3x4 grid

  return (
    <div className="w-full" {...props}>
      <div className="mt-2 px-1">
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: yearsToShow }, (_, i) => {
            const year = startYear + i;
            const isCurrentYear = year === currentYear;

            const isBefore = startMonth && new Date(year, 11, 31) < startMonth;

            const isAfter = endMonth && new Date(year, 0, 1) > endMonth;

            const isDisabled = isBefore || isAfter;

            const newDate = new Date(year, 0, 1);

            const isSelected =
              selected &&
              typeof selected === "object" &&
              "getFullYear" in selected &&
              (selected as Date).getFullYear() === year;

            return (
              <Button
                key={i}
                className={cn(
                  "h-10 w-full rounded-md transition-all",
                  isCurrentYear &&
                    !isSelected &&
                    "bg-accent text-accent-foreground font-medium",
                  isSelected && "bg-primary text-primary-foreground font-medium"
                )}
                variant={isSelected ? "default" : "ghost"}
                onClick={() => {
                  if (typeof onYearSelect === "function") {
                    onYearSelect(newDate);
                    return;
                  }
                setNavView("days");
                
                  let selectedMonth = 0;
                
                  if (selected && typeof selected === "object") {
                    if ("getMonth" in selected && typeof (selected as Date).getMonth === "function") {
                      selectedMonth = (selected as Date).getMonth();
                    } else if ("from" in selected && selected.from instanceof Date) {
                      selectedMonth = selected.from.getMonth();
                    }
                  }
                
                  goToMonth(new Date(year, selectedMonth));
                }}
                disabled={isDisabled}
              >
                {year}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function MonthViewGrid({
  className,
  displayYears,
  startMonth,
  endMonth,
  setNavView,
  navView,
  onMonthSelect,
  ...props
}: {
  className?: string;
  displayYears: { from: number; to: number };
  startMonth?: Date;
  endMonth?: Date;
  setNavView: React.Dispatch<React.SetStateAction<NavView>>;
  navView: NavView;
  onMonthSelect?: (date: Date) => void;
} & React.HTMLAttributes<HTMLDivElement>) {
  const { goToMonth } = useDayPicker();
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

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

  return (
    <div className={cn("grid grid-cols-3 gap-2", className)} {...props}>
      {monthNames.map((month, index) => {
        const isCurrentMonth =
          currentYear === displayYears.from && currentMonth === index;

        const isBefore =
          startMonth &&
          differenceInCalendarDays(
            new Date(displayYears.from, index, 1),
            startMonth
          ) < 0;

        const isAfter =
          endMonth &&
          differenceInCalendarDays(
            new Date(displayYears.from, index, 1),
            endMonth
          ) > 0;

        const isDisabled = isBefore || isAfter;

        return (
          <Button
            key={index}
            className={cn(
              "h-9 w-full text-sm font-normal text-foreground",
              isCurrentMonth && "bg-accent font-medium text-accent-foreground"
            )}
            variant="ghost"
            onClick={() => {
              const newDate = new Date(displayYears.from, index, 1);
              if (typeof onMonthSelect === "function") {
                onMonthSelect(newDate);
                return;
              }

              setNavView("days");
              goToMonth(newDate);
            }}
            disabled={isDisabled}
          >
            {month}
          </Button>
        );
      })}
    </div>
  );
}

export { Calendar };
