import type { Meta, StoryObj } from "@storybook/react";
import { Table, TableProps } from "../table/table";
import { ColumnDef } from "@tanstack/react-table";
import { Badge, Button } from "@/components";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";

const meta: Meta<typeof Table> = {
    title: "Components/Data/Table",
    component: Table,
    tags: ["autodocs"],
};

export default meta;


interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    status: "active" | "inactive";
}

const users: User[] = [
    { id: "1", name: "John Doe", email: "john@example.com", role: "Admin", status: "active" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", role: "User", status: "active" },
    { id: "3", name: "Bob Johnson", email: "bob@example.com", role: "User", status: "inactive" },
    { id: "4", name: "Alice Brown", email: "alice@example.com", role: "Manager", status: "active" },
    { id: "5", name: "Charlie Wilson", email: "charlie@example.com", role: "User", status: "inactive" },
];

const userColumns: ColumnDef<User>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "role",
        header: "Role",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <Badge variant={row.original.status === "active" ? "success" : "secondary"}>
                {row.original.status}
            </Badge>
        ),
    },
];

export const Default: StoryObj<TableProps<User>> = {
    args: {
        data: users,
        columns: userColumns,
    },
};

export const WithSorting: StoryObj<TableProps<User>> = {
    args: {
        data: users,
        columns: userColumns,
        enableSorting: true,
    },
};

export const WithFiltering: StoryObj<TableProps<User>> = {
    args: {
        data: users,
        columns: userColumns,
        enableSorting: true,
        enableFiltering: true,
    },
};

export const WithPagination: StoryObj<TableProps<User>> = {
    args: {
        data: Array.from({ length: 50 }, (_, i) => ({
            id: String(i + 1),
            name: `User ${i + 1}`,
            email: `user${i + 1}@example.com`,
            role: i % 3 === 0 ? "Admin" : i % 2 === 0 ? "Manager" : "User",
            status: i % 2 === 0 ? "active" : "inactive",
        })),
        columns: userColumns,
        enablePagination: true,
        pageSize: 10,
    },
};

export const WithActions: StoryObj<TableProps<User>> = {
    render: () => {
        const columnsWithActions: ColumnDef<User>[] = [
            ...userColumns,
            {
                id: "actions",
                header: "Actions",
                cell: ({ row }) => (
                    <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost">
                            <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </div>
                ),
            },
        ];

        return <Table data={users} columns={columnsWithActions} enableSorting />;
    },
};

export const Empty: StoryObj<TableProps<User>> = {
    args: {
        data: [],
        columns: userColumns,
        emptyMessage: "No users found. Add your first user to get started.",
    },
};

interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    stock: number;
    rating: number;
}

const products: Product[] = [
    { id: "1", name: "Laptop", category: "Electronics", price: 999, stock: 15, rating: 4.5 },
    { id: "2", name: "Mouse", category: "Accessories", price: 29, stock: 150, rating: 4.2 },
    { id: "3", name: "Keyboard", category: "Accessories", price: 79, stock: 80, rating: 4.7 },
    { id: "4", name: "Monitor", category: "Electronics", price: 299, stock: 25, rating: 4.6 },
    { id: "5", name: "Headphones", category: "Audio", price: 149, stock: 60, rating: 4.4 },
];

const productColumns: ColumnDef<Product>[] = [
    {
        accessorKey: "name",
        header: "Product Name",
    },
    {
        accessorKey: "category",
        header: "Category",
    },
    {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => `$${row.original.price.toFixed(2)}`,
    },
    {
        accessorKey: "stock",
        header: "Stock",
        cell: ({ row }) => (
            <Badge variant={row.original.stock > 50 ? "success" : row.original.stock > 20 ? "warning" : "destructive"}>
                {row.original.stock} units
            </Badge>
        ),
    },
    {
        accessorKey: "rating",
        header: "Rating",
        cell: ({ row }) => (
            <div className="flex items-center gap-1">
                <span>⭐</span>
                <span>{row.original.rating.toFixed(1)}</span>
            </div>
        ),
    },
];

export const ProductTable: StoryObj<TableProps<Product>> = {
    args: {
        data: products,
        columns: productColumns,
        enableSorting: true,
        enableFiltering: true,
    },
};

export const FullFeatured: StoryObj<TableProps<Product>> = {
    render: () => {
        const columnsWithActions: ColumnDef<Product>[] = [
            ...productColumns,
            {
                id: "actions",
                header: "Actions",
                cell: ({ row }) => (
                    <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                            Edit
                        </Button>
                        <Button size="sm" variant="destructive">
                            Delete
                        </Button>
                    </div>
                ),
            },
        ];

        return (
            <Table
                data={products}
                columns={columnsWithActions}
                enableSorting
                enableFiltering
                enablePagination={false}
            />
        );
    },
};

interface Transaction {
    id: string;
    date: string;
    description: string;
    amount: number;
    type: "income" | "expense";
}

const transactions: Transaction[] = [
    { id: "1", date: "2024-01-15", description: "Salary", amount: 5000, type: "income" },
    { id: "2", date: "2024-01-16", description: "Groceries", amount: 150, type: "expense" },
    { id: "3", date: "2024-01-17", description: "Freelance Work", amount: 800, type: "income" },
    { id: "4", date: "2024-01-18", description: "Rent", amount: 1200, type: "expense" },
    { id: "5", date: "2024-01-19", description: "Utilities", amount: 100, type: "expense" },
];

const transactionColumns: ColumnDef<Transaction>[] = [
    {
        accessorKey: "date",
        header: "Date",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => (
            <Badge variant={row.original.type === "income" ? "success" : "destructive"}>
                {row.original.type}
            </Badge>
        ),
    },
    {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => {
            const isIncome = row.original.type === "income";
            return (
                <span className={isIncome ? "text-success" : "text-destructive"}>
                    {isIncome ? "+" : "-"}${row.original.amount.toFixed(2)}
                </span>
            );
        },
    },
];

export const TransactionTable: StoryObj<TableProps<Transaction>> = {
    args: {
        data: transactions,
        columns: transactionColumns,
        enableSorting: true,
    },
};