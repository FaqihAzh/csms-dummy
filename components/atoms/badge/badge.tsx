import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-3 py-1.5 text-xs font-semibold leading-tight transition-colors select-none",
  {
    variants: {
      variant: {
        default:
          "shadow-box-badge border-primary-border-color bg-primary-foreground-accent text-primary hover:bg-primary-foreground-accent/90",
        secondary:
          "border-secondary-border-color bg-secondary text-secondary-foreground hover:bg-secondary/90",
        destructive:
          "shadow-box-badge border-destructive-border-color bg-destructive-foreground text-destructive hover:bg-destructive-foreground/90",
        extreme:
          "border-extreme-border-color bg-extreme-foreground text-extreme hover:bg-extreme/90",
        outline:
          "border-outline-border-color bg-background text-secondary-foreground hover:bg-secondary/70",
        success:
          "shadow-box-badge border-success-border-color bg-success-foreground text-success hover:bg-success-foreground/90",
        warning:
          "shadow-box-badge border-warning-border-color bg-warning-foreground text-warning hover:bg-warning-foreground/90",
        info:
          "border-info-border-color bg-sky-500 text-white hover:bg-sky-500/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };