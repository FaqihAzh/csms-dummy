"use client";

import * as React from "react";
import { cn } from "@/lib";
import { Label } from "@/components";

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
  description?: string;
}

export interface RadioGroupProps {
  label?: string;
  error?: string;
  helperText?: string;
  wrapperClassName?: string;
  labelRequired?: boolean;
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
  name?: string;
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      label,
      error,
      helperText,
      wrapperClassName,
      labelRequired,
      options,
      value: controlledValue,
      defaultValue,
      onChange,
      disabled,
      orientation = "vertical",
      name,
    },
    ref
  ) => {
    const generatedId = React.useId();
    const groupId = name || generatedId;
    const hasError = Boolean(error);

    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;

    const handleChange = (val: string) => {
      if (!disabled) {
        if (!isControlled) {
          setInternalValue(val);
        }
        onChange?.(val);
      }
    };

    return (
      <div ref={ref} className={cn("w-full", wrapperClassName)}>
        {label && (
          <Label
            required={labelRequired}
            disabled={disabled}
            className="mb-3 block"
            id={groupId}
          >
            {label}
          </Label>
        )}

        <div
          role="radiogroup"
          aria-labelledby={label ? groupId : undefined}
          aria-describedby={
            error
              ? `${groupId}-error`
              : helperText
                ? `${groupId}-helper`
                : undefined
          }
          className={cn(
            orientation === "vertical"
              ? "space-y-3"
              : "flex flex-wrap gap-4"
          )}
        >
          {options.map((option) => {
            const radioId = `${groupId}-${option.value}`;
            const isChecked = value === option.value;
            const isDisabled = disabled || option.disabled;

            return (
              <label
                key={option.value}
                htmlFor={radioId}
                className={cn(
                  "flex cursor-pointer items-start gap-3 rounded-md p-2 transition-colors",
                  "hover:bg-muted",
                  isDisabled && "cursor-not-allowed opacity-50"
                )}
              >
                {/* Native radio */}
                <input
                  id={radioId}
                  type="radio"
                  name={groupId}
                  value={option.value}
                  checked={isChecked}
                  onChange={() => handleChange(option.value)}
                  disabled={isDisabled}
                  className="peer sr-only"
                  aria-invalid={hasError}
                />

                {/* Custom radio UI */}
                <div
                  className={cn(
                    "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-input bg-background",
                    "transition-colors ring-offset-background",
                    "peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2",
                    "peer-checked:border-primary",
                    hasError &&
                    "border-destructive peer-checked:border-destructive"
                  )}
                >
                  {isChecked && (
                    <div
                      className={cn(
                        "h-2.5 w-2.5 rounded-full bg-primary",
                        hasError && "bg-destructive"
                      )}
                    />
                  )}
                </div>

                {/* Text */}
                <div className="flex-1">
                  <span className="text-sm font-medium leading-none">
                    {option.label}
                  </span>

                  {option.description && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {option.description}
                    </p>
                  )}
                </div>
              </label>
            );
          })}
        </div>

        {error && (
          <p
            id={`${groupId}-error`}
            className="mt-2 text-sm text-destructive"
          >
            {error}
          </p>
        )}

        {helperText && !error && (
          <p
            id={`${groupId}-helper`}
            className="mt-2 text-sm text-muted-foreground"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

RadioGroup.displayName = "RadioGroup";

export { RadioGroup };
