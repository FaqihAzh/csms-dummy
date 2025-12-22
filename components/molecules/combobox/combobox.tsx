"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils/cn"
import { Button } from "@/components/atoms/button/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, Label, Popover, PopoverContent, PopoverTrigger } from "@/components/atoms"

export interface ComboboxOption {
  value: string
  label: string
}

export interface ComboboxGroup {
  heading: string
  items: ComboboxOption[]
}

interface ComboboxProps {
  id?: string
  label?: string
  value?: string
  onSelect: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  groups?: ComboboxGroup[]
  options?: ComboboxOption[]
  className?: string
  disabled?: boolean
}

export function Combobox({
  id,
  label,
  value,
  onSelect,
  placeholder = "Select item...",
  searchPlaceholder = "Search...",
  emptyMessage = "No item found.",
  groups = [],
  options = [],
  className,
  disabled = false,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const uniqueId = React.useId()
  const componentId = id || uniqueId

  // Gabungkan logic untuk mencari label dari value yang terpilih
  const getSelectedLabel = () => {
    if (!value) return null

    // Cari di groups
    for (const group of groups) {
      const found = group.items.find((item) => item.value === value)
      if (found) return found.label
    }

    // Cari di flat options
    const found = options.find((item) => item.value === value)
    if (found) return found.label

    return value
  }

  const handleSelect = (currentValue: string) => {
    onSelect(currentValue === value ? "" : currentValue)
    setOpen(false)
  }

  const hasGroups = groups.length > 0

  return (
    <div className={cn("grid w-full max-w-sm items-center gap-1.5", className)}>
      {label && <Label htmlFor={componentId}>{label}</Label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={componentId}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between font-normal"
            disabled={disabled}
          >
            {value ? getSelectedLabel() : <span className="text-muted-foreground">{placeholder}</span>}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              
              {/* Render Groups */}
              {hasGroups && groups.map((group) => (
                <CommandGroup key={group.heading} heading={group.heading}>
                  {group.items.map((item) => (
                    <CommandItem
                      key={item.value}
                      value={item.label}
                      onSelect={() => handleSelect(item.value)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === item.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {item.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}

              {/* Render Flat List if provided */}
              {!hasGroups && options.length > 0 && (
                 <CommandGroup>
                    {options.map((item) => (
                      <CommandItem
                        key={item.value}
                        value={item.label}
                        onSelect={() => handleSelect(item.value)}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === item.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {item.label}
                      </CommandItem>
                    ))}
                 </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}