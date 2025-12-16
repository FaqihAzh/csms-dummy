import type { Meta, StoryObj } from "@storybook/react";
import { NestedTable, NestedTableData, ApprovalStatus } from "../nested-table/nested-table";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { Badge } from "@/components";

const meta: Meta<typeof NestedTable> = {
    title: "Components/Data/NestedTable",
    component: NestedTable,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NestedTable>;

interface Department extends NestedTableData {
    name: string;
    manager: string;
    budget: number;
    employees: number;
}

const departmentData: Department[] = [
    {
        id: "1",
        level: 0,
        name: "Engineering",
        manager: "John Doe",
        budget: 500000,
        employees: 50,
        status: "approved",
        children: [
            {
                id: "1-1",
                level: 1,
                name: "Frontend Team",
                manager: "Jane Smith",
                budget: 200000,
                employees: 15,
                status: "approved",
                children: [
                    {
                        id: "1-1-1",
                        level: 2,
                        name: "React Team",
                        manager: "Bob Johnson",
                        budget: 100000,
                        employees: 8,
                        status: "pending",
                        children: [
                            {
                                id: "1-1-1-1",
                                level: 3,
                                name: "UI Components",
                                manager: "Alice Brown",
                                budget: 50000,
                                employees: 4,
                                status: "approved",
                            },
                        ],
                    },
                    {
                        id: "1-1-2",
                        level: 2,
                        name: "Vue Team",
                        manager: "Charlie Wilson",
                        budget: 100000,
                        employees: 7,
                        status: "approved",
                    },
                ],
            },
            {
                id: "1-2",
                level: 1,
                name: "Backend Team",
                manager: "David Lee",
                budget: 300000,
                employees: 35,
                status: "pending",
                children: [
                    {
                        id: "1-2-1",
                        level: 2,
                        name: "API Development",
                        manager: "Emma Davis",
                        budget: 150000,
                        employees: 20,
                        status: "rejected",
                    },
                    {
                        id: "1-2-2",
                        level: 2,
                        name: "Database Team",
                        manager: "Frank Miller",
                        budget: 150000,
                        employees: 15,
                        status: "pending",
                    },
                ],
            },
        ],
    },
    {
        id: "2",
        level: 0,
        name: "Marketing",
        manager: "Grace Taylor",
        budget: 300000,
        employees: 25,
        status: "approved",
        children: [
            {
                id: "2-1",
                level: 1,
                name: "Digital Marketing",
                manager: "Henry Wilson",
                budget: 150000,
                employees: 15,
                status: "approved",
                children: [
                    {
                        id: "2-1-1",
                        level: 2,
                        name: "Social Media",
                        manager: "Ivy Chen",
                        budget: 80000,
                        employees: 8,
                        status: "pending",
                    },
                ],
            },
            {
                id: "2-2",
                level: 1,
                name: "Content Creation",
                manager: "Jack Anderson",
                budget: 150000,
                employees: 10,
                status: "approved",
            },
        ],
    },
];

const columns: ColumnDef<Department>[] = [
    {
        accessorKey: "name",
        header: "Department/Team",
        cell: ({ row }) => {
            const level = row.original.level;
            return (
                <div className="flex items-center gap-2">
                    <span className="font-medium">{row.original.name}</span>
                    <Badge variant="outline" className="text-xs">
                        Level {level}
                    </Badge>
                </div>
            );
        },
    },
    {
        accessorKey: "manager",
        header: "Manager",
    },
    {
        accessorKey: "budget",
        header: "Budget",
        cell: ({ row }) => `$${row.original.budget.toLocaleString()}`,
    },
    {
        accessorKey: "employees",
        header: "Employees",
        cell: ({ row }) => `${row.original.employees} people`,
    },
];

export const Default: Story = {
    args: {
        data: departmentData,
        columns: columns as any,
        maxLevel: 4,
    },
};

export const WithApproval: Story = {
    render: () => {
        const [data, setData] = useState<Department[]>(departmentData);

        const handleApprove = (row: Department) => {
            const updateStatus = (items: Department[]): Department[] => {
                return items.map((item) => {
                    if (item.id === row.id) {
                        return { ...item, status: "approved" as ApprovalStatus };
                    }
                    if (item.children) {
                        return { ...item, children: updateStatus(item.children as Department[]) };
                    }
                    return item;
                });
            };
            setData(updateStatus(data));
        };

        const handleReject = (row: Department) => {
            const updateStatus = (items: Department[]): Department[] => {
                return items.map((item) => {
                    if (item.id === row.id) {
                        return { ...item, status: "rejected" as ApprovalStatus };
                    }
                    if (item.children) {
                        return { ...item, children: updateStatus(item.children as Department[]) };
                    }
                    return item;
                });
            };
            setData(updateStatus(data));
        };

        return (
            <NestedTable
                data={data}
                columns={columns}
                maxLevel={4}
                enableApproval
                onApprove={handleApprove}
                onReject={handleReject}
            />
        );
    },
};

export const MaxLevel2: Story = {
    args: {
        data: departmentData,
        columns: columns as any,
        maxLevel: 2,
    },
};

interface Project extends NestedTableData {
    name: string;
    description: string;
    progress: number;
}

const projectData: Project[] = [
    {
        id: "p1",
        level: 0,
        name: "Website Redesign",
        description: "Complete overhaul of company website",
        progress: 65,
        status: "approved",
        children: [
            {
                id: "p1-1",
                level: 1,
                name: "Frontend Development",
                description: "Build new UI components",
                progress: 80,
                status: "approved",
                children: [
                    {
                        id: "p1-1-1",
                        level: 2,
                        name: "Home Page",
                        description: "Design and implement home page",
                        progress: 100,
                        status: "approved",
                    },
                    {
                        id: "p1-1-2",
                        level: 2,
                        name: "About Page",
                        description: "Create about us section",
                        progress: 60,
                        status: "pending",
                    },
                ],
            },
            {
                id: "p1-2",
                level: 1,
                name: "Backend API",
                description: "Develop REST APIs",
                progress: 50,
                status: "pending",
                children: [
                    {
                        id: "p1-2-1",
                        level: 2,
                        name: "User Authentication",
                        description: "Implement auth system",
                        progress: 90,
                        status: "approved",
                    },
                    {
                        id: "p1-2-2",
                        level: 2,
                        name: "Data Migration",
                        description: "Migrate old data",
                        progress: 30,
                        status: "rejected",
                    },
                ],
            },
        ],
    },
];

const projectColumns: ColumnDef<Project>[] = [
    {
        accessorKey: "name",
        header: "Project/Task",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "progress",
        header: "Progress",
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${row.original.progress}%` }}
                    />
                </div>
                <span className="text-sm">{row.original.progress}%</span>
            </div>
        ),
    },
];

export const ProjectTracking: Story = {
    render: () => {
        const [data, setData] = useState<Project[]>(projectData);

        const handleApprove = (row: Project) => {
            const updateStatus = (items: Project[]): Project[] => {
                return items.map((item) => {
                    if (item.id === row.id) {
                        return { ...item, status: "approved" as ApprovalStatus };
                    }
                    if (item.children) {
                        return { ...item, children: updateStatus(item.children as Project[]) };
                    }
                    return item;
                });
            };
            setData(updateStatus(data));
        };

        const handleReject = (row: Project) => {
            const updateStatus = (items: Project[]): Project[] => {
                return items.map((item) => {
                    if (item.id === row.id) {
                        return { ...item, status: "rejected" as ApprovalStatus };
                    }
                    if (item.children) {
                        return { ...item, children: updateStatus(item.children as Project[]) };
                    }
                    return item;
                });
            };
            setData(updateStatus(data));
        };

        return (
            <NestedTable
                data={data}
                columns={projectColumns}
                maxLevel={4}
                enableApproval
                onApprove={handleApprove}
                onReject={handleReject}
            />
        );
    },
};

interface Order extends NestedTableData {
    orderNumber: string;
    customer: string;
    total: number;
    date: string;
}

const orderData: Order[] = [
    {
        id: "o1",
        level: 0,
        orderNumber: "ORD-001",
        customer: "Acme Corp",
        total: 15000,
        date: "2024-01-15",
        status: "approved",
        children: [
            {
                id: "o1-1",
                level: 1,
                orderNumber: "LINE-001",
                customer: "Product A",
                total: 5000,
                date: "2024-01-15",
                status: "approved",
            },
            {
                id: "o1-2",
                level: 1,
                orderNumber: "LINE-002",
                customer: "Product B",
                total: 10000,
                date: "2024-01-15",
                status: "pending",
            },
        ],
    },
    {
        id: "o2",
        level: 0,
        orderNumber: "ORD-002",
        customer: "Tech Solutions",
        total: 25000,
        date: "2024-01-16",
        status: "pending",
        children: [
            {
                id: "o2-1",
                level: 1,
                orderNumber: "LINE-003",
                customer: "Service Package",
                total: 25000,
                date: "2024-01-16",
                status: "pending",
            },
        ],
    },
];

const orderColumns: ColumnDef<Order>[] = [
    {
        accessorKey: "orderNumber",
        header: "Order #",
    },
    {
        accessorKey: "customer",
        header: "Customer/Item",
    },
    {
        accessorKey: "date",
        header: "Date",
    },
    {
        accessorKey: "total",
        header: "Total",
        cell: ({ row }) => `$${row.original.total.toLocaleString()}`,
    },
];

export const OrderManagement: Story = {
    render: () => {
        const [data, setData] = useState<Order[]>(orderData);

        const handleApprove = (row: Order) => {
            const updateStatus = (items: Order[]): Order[] => {
                return items.map((item) => {
                    if (item.id === row.id) {
                        return { ...item, status: "approved" as ApprovalStatus };
                    }
                    if (item.children) {
                        return { ...item, children: updateStatus(item.children as Order[]) };
                    }
                    return item;
                });
            };
            setData(updateStatus(data));
        };

        const handleReject = (row: Order) => {
            const updateStatus = (items: Order[]): Order[] => {
                return items.map((item) => {
                    if (item.id === row.id) {
                        return { ...item, status: "rejected" as ApprovalStatus };
                    }
                    if (item.children) {
                        return { ...item, children: updateStatus(item.children as Order[]) };
                    }
                    return item;
                });
            };
            setData(updateStatus(data));
        };

        return (
            <NestedTable
                data={data}
                columns={orderColumns}
                maxLevel={2}
                enableApproval
                onApprove={handleApprove}
                onReject={handleReject}
            />
        );
    },
};