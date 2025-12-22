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

    return (
        <div className={cn("w-full", className)}>
            {enableFiltering && (
                <div className="mb-4">
                    <input
                        value={globalFilter ?? ""}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        placeholder="Search all columns..."
                        className="flex h-10 w-full max-w-sm rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                </div>
            )}

            <div className="rounded-md border">
                <table className="w-full caption-bottom text-sm">
                    <thead className="border-b bg-muted/50">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id} className="border-b transition-colors hover:bg-muted/50">
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"
                                    >
                                        {header.isPlaceholder ? null : (
                                            <div
                                                className={cn(
                                                    "flex items-center gap-2",
                                                    header.column.getCanSort() && "cursor-pointer select-none"
                                                )}
                                                onClick={header.column.getToggleSortingHandler()}
                                            >
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                                {enableSorting && header.column.getCanSort() && (
                                                    <span className="ml-2">
                                                        {header.column.getIsSorted() === "asc" ? (
                                                            <ChevronUp className="h-4 w-4" />
                                                        ) : header.column.getIsSorted() === "desc" ? (
                                                            <ChevronDown className="h-4 w-4" />
                                                        ) : (
                                                            <ChevronsUpDown className="h-4 w-4" />
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
                                            "border-b transition-colors hover:bg-muted/50",
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

            {enablePagination && (
                <div className="flex items-center justify-between px-2 py-4">
                    <div className="flex-1 text-sm text-muted-foreground">
                        {table.getFilteredSelectedRowModel().rows.length > 0 && (
                            <span>
                                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                                {table.getFilteredRowModel().rows.length} row(s) selected.
                            </span>
                        )}
                    </div>
                    <div className="flex items-center space-x-6 lg:space-x-8">
                        <div className="flex items-center space-x-2">
                            <p className="text-sm font-medium">Rows per page</p>
                            <select
                                value={table.getState().pagination.pageSize}
                                onChange={(e) => {
                                    table.setPageSize(Number(e.target.value));
                                }}
                                className="h-8 w-[70px] rounded-md border border-input bg-background px-2 text-sm"
                            >
                                {[10, 20, 30, 40, 50].map((size) => (
                                    <option key={size} value={size}>
                                        {size}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                className="h-8 w-8 rounded-md border border-input bg-background p-0 hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
                                onClick={() => table.setPageIndex(0)}
                                disabled={!table.getCanPreviousPage()}
                            >
                                <span className="sr-only">Go to first page</span>
                                <ChevronRight className="h-4 w-4 rotate-180" />
                            </button>
                            <button
                                className="h-8 w-8 rounded-md border border-input bg-background p-0 hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                <span className="sr-only">Go to previous page</span>
                                <ChevronRight className="h-4 w-4 rotate-180" />
                            </button>
                            <button
                                className="h-8 w-8 rounded-md border border-input bg-background p-0 hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                <span className="sr-only">Go to next page</span>
                                <ChevronRight className="h-4 w-4" />
                            </button>
                            <button
                                className="h-8 w-8 rounded-md border border-input bg-background p-0 hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
                                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                                disabled={!table.getCanNextPage()}
                            >
                                <span className="sr-only">Go to last page</span>
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

Table.displayName = "Table";

export { Table };