"use client";

import React, { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Label, Button } from "@/components";

const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const formatDate = (
    date?: Date,
    format: "dd/MM/yyyy" | "MM/dd/yyyy" | "yyyy-MM-dd" = "dd/MM/yyyy"
) => {
    if (!date) return "";
    const d = String(date.getDate()).padStart(2, "0");
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const y = date.getFullYear();

    if (format === "MM/dd/yyyy") return `${m}/${d}/${y}`;
    if (format === "yyyy-MM-dd") return `${y}-${m}-${d}`;
    return `${d}/${m}/${y}`;
};

const isSameDay = (a?: Date, b?: Date) =>
    !!a &&
    !!b &&
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear();

const isInRange = (date: Date, from?: Date, to?: Date) =>
    !!from && !!to && date >= from && date <= to;

export interface DatePickerProps {
    label?: string;
    value?: Date;
    onChange?: (date?: Date) => void;
    placeholder?: string;
    error?: string;
    helperText?: string;
    labelRequired?: boolean;
    disabled?: boolean;
    minDate?: Date;
    maxDate?: Date;
    dateFormat?: "dd/MM/yyyy" | "MM/dd/yyyy" | "yyyy-MM-dd";
    wrapperClassName?: string;
    className?: string;
    showClearButton?: boolean;
    id?: string;
    defaultValue?: Date;
}

export interface DateRangePickerProps
    extends Omit<DatePickerProps, "value" | "onChange"> {
    value?: { from?: Date; to?: Date };
    onChange?: (range?: { from?: Date; to?: Date }) => void;
}

const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
    (props, ref) => {
        const {
            label,
            value,
            onChange,
            placeholder = "Select date",
            error,
            helperText,
            labelRequired,
            disabled,
            minDate,
            maxDate,
            dateFormat = "dd/MM/yyyy",
            wrapperClassName,
            className,
            showClearButton = true,
            id,
            defaultValue,
        } = props;

        const isControlled = "value" in props;
        const [internalValue, setInternalValue] = useState<Date | undefined>(
            defaultValue
        );

        const displayValue = isControlled ? value : internalValue;

        const [open, setOpen] = useState(false);
        const [month, setMonth] = useState(
            displayValue?.getMonth() ?? new Date().getMonth()
        );
        const [year, setYear] = useState(
            displayValue?.getFullYear() ?? new Date().getFullYear()
        );

        const pickerId = id ?? React.useId();
        const hasError = Boolean(error);

        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();

        const selectDate = (day: number) => {
            const date = new Date(year, month, day);
            if ((minDate && date < minDate) || (maxDate && date > maxDate)) return;

            if (!isControlled) {
                setInternalValue(date);
            }
            onChange?.(date);
            setOpen(false);
        };

        return (
            <div ref={ref} className={cn("w-full", wrapperClassName)}>
                {label && (
                    <Label required={labelRequired} disabled={disabled} className="mb-2">
                        {label}
                    </Label>
                )}

                <div className="relative">
                    <button
                        type="button"
                        disabled={disabled}
                        onClick={() => setOpen((v) => !v)}
                        className={cn(
                            "flex h-10 w-full items-center justify-between rounded-md border px-3 text-sm",
                            "bg-background focus-visible:ring-2 focus-visible:ring-ring",
                            hasError && "border-destructive",
                            className
                        )}
                    >
                        <span className={!displayValue ? "text-muted-foreground" : ""}>
                            {displayValue ? formatDate(displayValue, dateFormat) : placeholder}
                        </span>

                        <div className="flex items-center gap-1">
                            {displayValue && showClearButton && !disabled && (
                                <X
                                    className="h-3 w-3 text-muted-foreground hover:text-foreground mr-1"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (!isControlled) {
                                            setInternalValue(undefined);
                                        }
                                        onChange?.(undefined);
                                    }}
                                />
                            )}
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </div>
                    </button>

                    {open && (
                        <>
                            <div
                                className="fixed inset-0 z-40"
                                onClick={() => setOpen(false)}
                            />
                            <div className="absolute z-50 mt-2 rounded-md border bg-popover p-4 shadow-md">
                                {/* Header */}
                                <div className="mb-3 flex items-center justify-between">
                                    <Button
                                        size="icon-sm"
                                        variant="ghost"
                                        onClick={() =>
                                            month === 0
                                                ? (setMonth(11), setYear(year - 1))
                                                : setMonth(month - 1)
                                        }
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>

                                    <span className="text-sm font-medium">
                                        {MONTHS[month]} {year}
                                    </span>

                                    <Button
                                        size="icon-sm"
                                        variant="ghost"
                                        onClick={() =>
                                            month === 11
                                                ? (setMonth(0), setYear(year + 1))
                                                : setMonth(month + 1)
                                        }
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>

                                {/* Calendar Grid */}
                                <div className="grid grid-cols-7 gap-1 text-center">
                                    {DAYS.map((d) => (
                                        <div
                                            key={d}
                                            className="flex h-9 w-9 items-center justify-center text-xs font-medium text-muted-foreground"
                                        >
                                            {d}
                                        </div>
                                    ))}

                                    {Array.from({ length: firstDay }).map((_, i) => (
                                        <div key={`e-${i}`} className="h-9 w-9" />
                                    ))}

                                    {Array.from({ length: daysInMonth }).map((_, i) => {
                                        const day = i + 1;
                                        const date = new Date(year, month, day);
                                        const selected = isSameDay(date, displayValue);

                                        return (
                                            <button
                                                key={day}
                                                onClick={() => selectDate(day)}
                                                disabled={
                                                    (minDate && date < minDate) ||
                                                    (maxDate && date > maxDate)
                                                }
                                                className={cn(
                                                    "flex h-9 w-9 items-center justify-center rounded-md text-sm",
                                                    "hover:bg-accent transition-colors",
                                                    selected &&
                                                    "bg-primary text-primary-foreground hover:bg-primary"
                                                )}
                                            >
                                                {day}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {error && <p className="mt-1.5 text-sm text-destructive">{error}</p>}
                {helperText && !error && (
                    <p className="mt-1.5 text-sm text-muted-foreground">{helperText}</p>
                )}
            </div>
        );
    }
);

DatePicker.displayName = "DatePicker";

const DateRangePicker = React.forwardRef<
    HTMLDivElement,
    DateRangePickerProps
>(({ value, onChange, dateFormat, ...props }, ref) => {
    const [range, setRange] = useState(value ?? {});
    const [selectingEnd, setSelectingEnd] = useState(false);

    const handleSelect = (date?: Date) => {
        if (!date) {
            setRange({});
            onChange?.(undefined);
            return;
        }

        if (!range.from || selectingEnd) {
            const newRange = range.from
                ? { from: range.from, to: date }
                : { from: date };
            setRange(newRange);
            onChange?.(newRange);
            setSelectingEnd(false);
        } else {
            setRange({ from: date });
            setSelectingEnd(true);
        }
    };

    const displayValue =
        range.from && range.to
            ? `${formatDate(range.from, dateFormat)} - ${formatDate(
                range.to,
                dateFormat
            )}`
            : range.from
                ? formatDate(range.from, dateFormat)
                : "";

    return (
        <div ref={ref}>
            <DatePicker
                {...props}
                value={range.from}
                onChange={handleSelect}
                placeholder={displayValue || "Select date range"}
                dateFormat={dateFormat}
            />
        </div>
    );
});

DateRangePicker.displayName = "DateRangePicker";

export { DatePicker, DateRangePicker };
