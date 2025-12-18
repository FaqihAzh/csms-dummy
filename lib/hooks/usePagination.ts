import { useMemo } from "react"

interface UsePaginationProps {
    currentPage: number
    totalPages: number
    maxVisible: number 
}

export function usePagination({
    currentPage,
    totalPages,
    maxVisible = 5, 
}: UsePaginationProps){
    return useMemo(() => {
        if (totalPages <= maxVisible){
            return Array.from({ length: totalPages }, (_, i) => i + 1)
        }
        
        let startPage = Math.max((currentPage - 1) / maxVisible) * maxVisible + 1

        if (startPage + maxVisible - 1 > totalPages) {
            startPage = totalPages - maxVisible + 1
        }

        let endPage = Math.min(startPage + maxVisible - 1, totalPages)

        return Array.from({ length: endPage - startPage + 1}, (_, i) => startPage + i)
    }, [currentPage, totalPages, maxVisible])
}