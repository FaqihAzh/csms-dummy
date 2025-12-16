"use client";

import * as React from "react";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Label } from "@/components";

export interface CheckboxProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "onChange"
  > {
  label?: string;
  error?: string;
  helperText?: string;
  wrapperClassName?: string;
  labelRequired?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
}

export const Checkbox = React.forwardRef<
  HTMLInputElement,
  CheckboxProps
>(
  (
    {
      className,
      label,
      error,
      helperText,
      wrapperClassName,
      labelRequired,
      disabled,
      checked,
      indeterminate,
      onChange,
      id,
      ...props
    },
    ref
  ) => {
    const internalRef = React.useRef<HTMLInputElement>(null);
    const resolvedRef = (ref ??
      internalRef) as React.RefObject<HTMLInputElement>;

    const checkboxId = React.useId();
    const hasError = Boolean(error);

    React.useEffect(() => {
      if (resolvedRef.current) {
        resolvedRef.current.indeterminate = Boolean(indeterminate);
      }
    }, [indeterminate, resolvedRef]);

    return (
      <div className={cn("w-full", wrapperClassName)}>
        <div className="flex items-start gap-3">
          <div className="relative">
            <input
              ref={resolvedRef}
              id={id ?? checkboxId}
              type="checkbox"
              disabled={disabled}
              checked={checked}
              onChange={(e) => onChange?.(e.target.checked)}
              aria-invalid={hasError}
              aria-describedby={
                error
                  ? `${checkboxId}-error`
                  : helperText
                    ? `${checkboxId}-helper`
                    : undefined
              }
              className="peer sr-only"
              {...props}
            />

            <div
              className={cn(
                "flex h-5 w-5 items-center justify-center rounded border-2 border-input bg-background transition-colors",
                "peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2",
                "peer-checked:bg-primary peer-checked:border-primary",
                "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
                hasError &&
                "border-destructive peer-checked:bg-destructive peer-checked:border-destructive",
                className
              )}
            >
              {indeterminate ? (
                <Minus className="h-4 w-4 text-primary-foreground" />
              ) : checked ? (
                <Check className="h-4 w-4 text-primary-foreground" />
              ) : null}
            </div>
          </div>

          {label && (
            <div className="flex-1">
              <Label
                htmlFor={id ?? checkboxId}
                required={labelRequired}
                disabled={disabled}
                className="cursor-pointer"
              >
                {label}
              </Label>

              {helperText && !error && (
                <p
                  id={`${checkboxId}-helper`}
                  className="mt-1 text-sm text-muted-foreground"
                >
                  {helperText}
                </p>
              )}
            </div>
          )}
        </div>

        {error && (
          <p
            id={`${checkboxId}-error`}
            className="mt-1.5 ml-8 text-sm text-destructive"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export interface CheckboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface CheckboxGroupProps {
  label?: string;
  options: CheckboxOption[];
  value?: string[];
  onChange?: (values: string[]) => void;
  error?: string;
  helperText?: string;
  wrapperClassName?: string;
  labelRequired?: boolean;
  disabled?: boolean;
  orientation?: "vertical" | "horizontal";
}

export const CheckboxGroup = ({
  label,
  options,
  value = [],
  onChange,
  error,
  helperText,
  wrapperClassName,
  labelRequired,
  disabled,
  orientation = "vertical",
}: CheckboxGroupProps) => {
  const groupId = React.useId();
  const hasError = Boolean(error);

  const toggleValue = (val: string, checked: boolean) => {
    if (!onChange) return;
    onChange(
      checked ? [...value, val] : value.filter((v) => v !== val)
    );
  };

  return (
    <div className={cn("w-full", wrapperClassName)}>
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
        role="group"
        aria-labelledby={label ? groupId : undefined}
        aria-describedby={
          hasError
            ? `${groupId}-error`
            : helperText
              ? `${groupId}-helper`
              : undefined
        }
        className={cn(
          "space-y-3",
          orientation === "horizontal" &&
          "flex flex-wrap gap-4 space-y-0"
        )}
      >
        {options.map((option) => (
          <Checkbox
            key={option.value}
            label={option.label}
            checked={value.includes(option.value)}
            disabled={disabled || option.disabled}
            onChange={(checked) =>
              toggleValue(option.value, checked)
            }
          />
        ))}
      </div>

      {hasError && (
        <p
          id={`${groupId}-error`}
          className="mt-2 text-sm text-destructive"
        >
          {error}
        </p>
      )}

      {helperText && !hasError && (
        <p
          id={`${groupId}-helper`}
          className="mt-2 text-sm text-muted-foreground"
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

CheckboxGroup.displayName = "CheckboxGroup";

interface RHFCheckboxProps<T extends FieldValues = any>
  extends Omit<CheckboxProps, "checked" | "onChange"> {
  name: Path<T>;
  control: Control<T>;
}

export const RHFCheckbox = <T extends FieldValues = any>({
  name,
  control,
  ...props
}: RHFCheckboxProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Checkbox
          {...props}
          checked={field.value}
          onChange={field.onChange}
          error={fieldState.error?.message}
        />
      )}
    />
  );
};

interface RHFCheckboxGroupProps<T extends FieldValues = any>
  extends Omit<CheckboxGroupProps, "value" | "onChange"> {
  name: Path<T>;
  control: Control<T>;
}

export const RHFCheckboxGroup = <T extends FieldValues = any>({
  name,
  control,
  ...props
}: RHFCheckboxGroupProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <CheckboxGroup
          {...props}
          value={field.value ?? []}
          onChange={field.onChange}
          error={fieldState.error?.message}
        />
      )}
    />
  );
};
