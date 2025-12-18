import * as React from "react"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react"
import { cn } from "@/lib/utils/cn"
import { buttonVariants, Button } from "@/components/atoms"
import { usePagination } from "@/lib/hooks/usePagination"

export interface PaginationControllerProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
    maxVisible?: number
    className?: string 
}

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  )
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"button">

function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <button
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? "default" : "ghost",
          size,
        }),
        className
      )}
      {...props}
    />
  )
}

function PaginationPrevious({
  className,
  disabled,
  ...props
}: React.ComponentProps<typeof PaginationLink> & { disabled?: boolean }) {
  return (
    <PaginationLink
        aria-label="Go to previous page"
        size="default"
        disabled={disabled}
        className={cn(
            "gap-1 px-2.5 sm:pr-2.5",
            disabled && "pointer-events-none opacity-50",
            className
        )}
        {...props}
    >
      <ChevronLeftIcon />
    </PaginationLink>
  )
}

function PaginationNext({
  className,
  disabled,
  ...props
}: React.ComponentProps<typeof PaginationLink> & { disabled?: boolean }) {
  return (
    <PaginationLink
        aria-label="Go to next page"
        size="default"
        disabled={disabled}
        className={cn(
            "gap-1 px-2.5 sm:pr-2.5",
            disabled && "pointer-events-none opacity-50",
            className
        )}
        {...props}
    >
      <ChevronRightIcon />
    </PaginationLink>
  )
}

function PaginationFirst({
  className,
  disabled,
  ...props
}: React.ComponentProps<typeof PaginationLink> & { disabled?: boolean }) {
  return (
    <PaginationLink
      aria-label="Go to first page"
      size="default"
      disabled={disabled}
      className={cn(
        "gap-1 px-2.5",
        disabled && "pointer-events-none opacity-50",
        className
      )}
      {...props}
    >
      <ChevronsLeftIcon className="size-4" />
      <span className="sr-only">First</span>
    </PaginationLink>
  )
}

function PaginationLast({
  className,
  disabled,
  ...props
}: React.ComponentProps<typeof PaginationLink> & { disabled?: boolean }) {
  return (
    <PaginationLink
      aria-label="Go to last page"
      size="default"
      disabled={disabled}
      className={cn(
        "gap-1 px-2.5",
        disabled && "pointer-events-none opacity-50",
        className
      )}
      {...props}
    >
      <ChevronsRightIcon className="size-4" />
      <span className="sr-only">Last</span>
    </PaginationLink>
  )
}

function PaginationController({
    currentPage,
    totalPages,
    onPageChange,
    maxVisible = 5,
    className,
}: PaginationControllerProps){
    const visiblePages = usePagination({
        currentPage,
        totalPages,
        maxVisible,     
    })

    const isFirstPage = currentPage === 1
    const isLastPage = currentPage === totalPages
    const canGoPrev = currentPage > 1
    const canGoNext = currentPage < totalPages

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return
        onPageChange(page)
    }

    return (
        <Pagination className={className}>
            <PaginationContent>
                <PaginationItem>
                    <PaginationFirst
                        onClick={() => handlePageChange(1)}
                        disabled={isFirstPage}
                    />
                </PaginationItem>

                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={!canGoPrev}
                    />
                </PaginationItem>

                {visiblePages.map((page) => (
                    <PaginationItem key={page}>
                        <PaginationLink
                            onClick={() => handlePageChange(page)}
                            isActive={page === currentPage}
                        >
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                <PaginationItem>
                    <PaginationNext
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={!canGoNext}
                    />
                </PaginationItem>

                <PaginationItem>
                    <PaginationLast
                        onClick={() => handlePageChange(totalPages)}
                        disabled={isLastPage}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationFirst,
  PaginationLast,
  PaginationController,
}