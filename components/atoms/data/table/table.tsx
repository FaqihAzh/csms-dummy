'use client'

import React, { useState } from "react";
import {
    useReactTable,
    getCoreRowModel,
    getExpandedRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
    ColumnDef,
    SortingState,
    ExpandedState,
    Row,
} from "@tanstack/react-table";
import { ChevronDown, ChevronRight, ChevronsUpDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib";
import { PaginationController } from "@/components/molecules/pagination/pagination";

export interface TableProps<TData> {
    data: TData[];
    columns: ColumnDef<TData>[];
    onRowClick?: (row: Row<TData>) => void;
    enableSorting?: boolean;
    enableFiltering?: boolean;
    enablePagination?: boolean;
    pageSize?: number;
    enableRowSelection?: boolean;
    getSubRows?: (row: TData) => TData[] | undefined;
    className?: string;
    emptyMessage?: string;
}

const Table = <TData extends object>({
    data,
    columns,
    onRowClick,
    enableSorting = true,
    enableFiltering = false,
    enablePagination = false,
    pageSize = 10,
    enableRowSelection = false,
    getSubRows,
    className,
    emptyMessage = "No data available",
}: TableProps<TData>) => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [expanded, setExpanded] = useState<ExpandedState>({});
    const [globalFilter, setGlobalFilter] = useState("");

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
        getFilteredRowModel: enableFiltering ? getFilteredRowModel() : undefined,
        getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
        getExpandedRowModel: getSubRows ? getExpandedRowModel() : undefined,
        getSubRows,
        state: {
            sorting,
            expanded,
            globalFilter,
        },
        onSortingChange: setSorting,
        onExpandedChange: setExpanded,
        onGlobalFilterChange: setGlobalFilter,
        enableRowSelection,
        initialState: {
            pagination: {
                pageSize,
            },
        },
    });

    const currentPage = table.getState().pagination.pageIndex + 1;
    const totalPages = table.getPageCount();

    const handlePageChange = (page: number) => {
        table.setPageIndex(page - 1);
    };

    return (
        <div className={cn("flex w-full flex-col rounded-xl border border-border bg-background", className)}>
            {enableFiltering && (
                <div className="p-4">
                    <input
                        value={globalFilter ?? ""}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        placeholder="Search all columns..."
                        className="flex h-10 w-full max-w-sm rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                </div>
            )}

            <div className="w-full overflow-x-auto">
                <table className="w-full caption-bottom text-sm">
                    <thead className="border-b border-secondary-border bg-muted/50">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id} className="border-b-secondary-border-color transition-colors hover:bg-muted/50">
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="p-4 text-left align-middle font-semibold uppercase text-muted-foreground"
                                    >
                                        {header.isPlaceholder ? null : (
                                            <div
                                                className={cn(
                                                    "flex items-center gap-2",
                                                    header.column.getCanSort() && "cursor-pointer select-none",
                                                    (header.column.getIsSorted() === "asc" || header.column.getIsSorted() === "desc") && "text-primary" 
                                                )}
                                                onClick={header.column.getToggleSortingHandler()}
                                            >
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                                {enableSorting && header.column.getCanSort() && (
                                                    <span className="ml-2">
                                                        {header.column.getIsSorted() === "asc" ? (
                                                            <ChevronUp className="size-4 text-primary" />
                                                        ) : header.column.getIsSorted() === "desc" ? (
                                                            <ChevronDown className="size-4 text-primary" />
                                                        ) : (
                                                            <ChevronsUpDown className="size-4" />
                                                        )}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <React.Fragment key={row.id}>
                                    <tr
                                        className={cn(
                                            "border-b border-primary-border-color transition-colors hover:bg-muted/50",
                                            onRowClick && "cursor-pointer"
                                        )}
                                        onClick={() => onRowClick?.(row)}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <td key={cell.id} className="p-4 align-middle">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </tr>
                                </React.Fragment>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="h-24 text-center">
                                    {emptyMessage}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {enablePagination && totalPages > 1 && (
                <div className="p-4 border-t border-border">
                    <PaginationController
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        maxVisible={5}
                    />
                </div>
            )}
        </div>
    );
};

Table.displayName = "Table";

export { Table };