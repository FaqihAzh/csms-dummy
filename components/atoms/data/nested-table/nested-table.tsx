'use client'

import React, { useState } from "react";
import {
    useReactTable,
    getCoreRowModel,
    getExpandedRowModel,
    getSortedRowModel,
    flexRender,
    ColumnDef,
    SortingState,
    ExpandedState,
    Row,
} from "@tanstack/react-table";
import { ChevronDown, ChevronRight, Check, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Badge, Button } from "@/components";

export type ApprovalStatus = "pending" | "approved" | "rejected";

export interface NestedTableData {
    id: string;
    level: number;
    status?: ApprovalStatus;
    children?: NestedTableData[];
    [key: string]: any;
}

export interface NestedTableProps<TData extends NestedTableData> {
    data: TData[];
    columns: ColumnDef<TData>[];
    maxLevel?: number;
    enableApproval?: boolean;
    onApprove?: (row: TData) => void;
    onReject?: (row: TData) => void;
    className?: string;
    emptyMessage?: string;
    renderSubComponent?: (row: Row<TData>) => React.ReactNode;
}

const NestedTable = <TData extends NestedTableData>({
    data,
    columns,
    maxLevel = 4,
    enableApproval = false,
    onApprove,
    onReject,
    className,
    emptyMessage = "No data available",
    renderSubComponent,
}: NestedTableProps<TData>) => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [expanded, setExpanded] = useState<ExpandedState>({});

    // Add expand column if there are children
    const columnsWithExpand: ColumnDef<TData, any>[] = [
        {
            id: "expander",
            header: () => null,
            cell: ({ row }) => {
                const canExpand = row.original.children && row.original.children.length > 0;
                const currentLevel = row.original.level || 0;
                const canExpandMore = currentLevel < maxLevel;

                if (!canExpand || !canExpandMore) {
                    return <div style={{ width: 24 }} />;
                }

                return (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            row.toggleExpanded();
                        }}
                        className="p-1 hover:bg-accent rounded transition-colors"
                    >
                        {row.getIsExpanded() ? (
                            <ChevronDown className="h-4 w-4" />
                        ) : (
                            <ChevronRight className="h-4 w-4" />
                        )}
                    </button>
                );
            },
            size: 40,
        },
        ...columns,
    ];

    // Add approval column if enabled
    if (enableApproval) {
        columnsWithExpand.push({
            id: "approval",
            header: "Status",
            cell: ({ row }) => {
                const status = row.original.status || "pending";

                return (
                    <div className="flex items-center gap-2">
                        <Badge
                            variant={
                                status === "approved"
                                    ? "success"
                                    : status === "rejected"
                                        ? "destructive"
                                        : "warning"
                            }
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </Badge>
                    </div>
                );
            },
            size: 120,
        });

        columnsWithExpand.push({
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const status = row.original.status || "pending";

                if (status !== "pending") return null;

                return (
                    <div className="flex items-center gap-2">
                        <Button
                            size="sm"
                            variant="success"
                            onClick={(e) => {
                                e.stopPropagation();
                                onApprove?.(row.original);
                            }}
                        >
                            <Check className="h-4 w-4" />
                        </Button>
                        <Button
                            size="sm"
                            variant="destructive"
                            onClick={(e) => {
                                e.stopPropagation();
                                onReject?.(row.original);
                            }}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                );
            },
            size: 120,
        });
    }

    const table = useReactTable({
        data,
        columns: columnsWithExpand,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        getSubRows: (row) => row.children as TData[] | undefined,
        state: {
            sorting,
            expanded,
        },
        onSortingChange: setSorting,
        onExpandedChange: setExpanded,
    });

    const renderRow = (row: Row<TData>) => {
        const level = row.original.level || 0;
        const bgColor = level === 0 ? "" : level === 1 ? "bg-muted/30" : level === 2 ? "bg-muted/50" : "bg-muted/70";

        return (
            <React.Fragment key={row.id}>
                <tr className={cn("border-b transition-colors hover:bg-muted/50", bgColor)}>
                    {row.getVisibleCells().map((cell) => (
                        <td
                            key={cell.id}
                            className="p-4 align-middle"
                            style={{
                                paddingLeft:
                                    cell.column.id === "expander"
                                        ? `${level * 20 + 16}px`
                                        : undefined,
                            }}
                        >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    ))}
                </tr>
                {row.getIsExpanded() && renderSubComponent && (
                    <tr>
                        <td colSpan={columnsWithExpand.length}>
                            <div className="p-4 bg-muted/20">
                                {renderSubComponent(row)}
                            </div>
                        </td>
                    </tr>
                )}
            </React.Fragment>
        );
    };

    return (
        <div className={cn("w-full", className)}>
            <div className="rounded-md border">
                <table className="w-full caption-bottom text-sm">
                    <thead className="border-b bg-muted/50">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id} className="border-b transition-colors">
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"
                                        style={{ width: header.getSize() }}
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => renderRow(row))
                        ) : (
                            <tr>
                                <td colSpan={columnsWithExpand.length} className="h-24 text-center">
                                    {emptyMessage}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="mt-4 text-sm text-muted-foreground">
                <p>
                    Expanded: {Object.keys(expanded).length} row(s) |
                    Max Level: {maxLevel} |
                    Current Rows: {table.getRowModel().rows.length}
                </p>
            </div>
        </div>
    );
};

NestedTable.displayName = "NestedTable";

export { NestedTable };