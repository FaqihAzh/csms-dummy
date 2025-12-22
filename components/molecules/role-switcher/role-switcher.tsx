// components/molecules/role-switcher/role-switcher.tsx
"use client"

import { useState } from "react"
import { Check, CheckCircle, ChevronDown, User } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger, Button } from "@/components/atoms"
import { cn } from "@/lib"

interface Role {
  value: string
  label: string
}

interface RoleSwitcherProps {
  roles: Role[]
  currentRole: string
  onRoleChange: (role: string) => void
  className?: string
}

export function RoleSwitcher({
  roles,
  currentRole,
  onRoleChange,
  className
}: RoleSwitcherProps) {
  const [open, setOpen] = useState(false)

  const handleSelect = (value: string) => {
    onRoleChange(value)
    setOpen(false)
  }

  const currentRoleLabel = roles.find(r => r.value === currentRole)?.label || "Pilih Hak Akses Role"

  return (
    <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className="group">
            <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
                "justify-between",
                className
            )}
            >
                <span className="flex items-center text-sm gap-2">
                    <User className="size-3 text-secondary-foreground" />
                    {currentRoleLabel}
                </span>
            <ChevronDown className="ml-2 size-4 shrink-0 opacity-50 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </Button>
        </PopoverTrigger>

      <PopoverContent className="w-[280px] p-0 border-0" align="start">
        {/* Header */}
        <div className="px-3 py-2 border-b border-border">
            <p className="text-[10px] text-muted-foreground font-medium tracking-wide mb-1">
                SWITCH ROLE
            </p>
            <p className="text-sm font-medium">Pilih Hak Akses</p>
        </div>

        {/* Role List */}
        <div className="max-h-[320px] overflow-y-auto py-1">
          {roles.map((role) => {
            const isSelected = currentRole === role.value
            
            return (
              <button
                key={role.value}
                onClick={() => handleSelect(role.value)}
                className={cn(
                  "w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-accent transition-colors",
                  isSelected && "font-medium"
                )}
              >
                { isSelected ? (
                    <>
                        <CheckCircle className="size-4 shrink-0 text-primary"/>
                        <span className={cn("text-primary")}>
                            {role.label}
                        </span>
                    </>
                ) : (
                    <div className="ml-6">
                        <span className={cn("text-foreground")}>
                            {role.label}
                        </span>
                    </div>
                    )
                }
              </button>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}