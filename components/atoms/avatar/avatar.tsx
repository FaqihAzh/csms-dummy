import { cn } from "@/lib"

interface AvatarProps {
  src?: string
  alt?: string
  fallback: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Avatar({ src, alt, fallback, size = 'md', className }: AvatarProps) {
  const sizeClasses = {
    sm: 'size-8 text-xs',
    md: 'size-10 text-sm',
    lg: 'size-12 text-base'
  }

  return (
    <div className={cn(
      "rounded-lg bg-primary text-primary-foreground font-semibold flex items-center justify-center",
      sizeClasses[size],
      className
    )}>
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover rounded-lg" />
      ) : (
        <span>{fallback}</span>
      )}
    </div>
  )
}