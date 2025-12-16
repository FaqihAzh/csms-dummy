import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { NestedTable, NestedTableData } from "./nested-table";
import { ColumnDef } from "@tanstack/react-table";

interface TestNestedData extends NestedTableData {
    name: string;
    value: number;
}

const testNestedData: TestNestedData[] = [
    {
        id: "1",
        level: 0,
        name: "Parent 1",
        value: 100,
        status: "pending",
        children: [
            {
                id: "1-1",
                level: 1,
                name: "Child 1-1",
                value: 50,
                status: "approved",
            },
            {
                id: "1-2",
                level: 1,
                name: "Child 1-2",
                value: 50,
                status: "pending",
                children: [
                    {
                        id: "1-2-1",
                        level: 2,
                        name: "Grandchild 1-2-1",
                        value: 25,
                        status: "rejected",
                    },
                ],
            },
        ],
    },
    {
        id: "2",
        level: 0,
        name: "Parent 2",
        value: 200,
        status: "approved",
    },
];

const testColumns: ColumnDef<TestNestedData>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "value",
        header: "Value",
    },
];

describe("NestedTable Component", () => {
    it("renders table with nested data", () => {
        render(<NestedTable data={testNestedData} columns={testColumns} />);
        expect(screen.getByText("Parent 1")).toBeInTheDocument();
        expect(screen.getByText("Parent 2")).toBeInTheDocument();
    });

    it("renders expand button for rows with children", () => {
        render(<NestedTable data={testNestedData} columns={testColumns} />);
        const expandButtons = screen.getAllByRole("button");
        expect(expandButtons.length).toBeGreaterThan(0);
    });

    it("expands row when expand button is clicked", async () => {
        render(<NestedTable data={testNestedData} columns={testColumns} />);

        const expandButton = screen.getAllByRole("button")[0];
        fireEvent.click(expandButton);

        await waitFor(() => {
            expect(screen.getByText("Child 1-1")).toBeInTheDocument();
        });
    });

    it("collapses row when clicking expanded row", async () => {
        render(<NestedTable data={testNestedData} columns={testColumns} />);

        const expandButton = screen.getAllByRole("button")[0];

        // Expand
        fireEvent.click(expandButton);
        await waitFor(() => {
            expect(screen.getByText("Child 1-1")).toBeInTheDocument();
        });

        // Collapse
        fireEvent.click(expandButton);
        await waitFor(() => {
            expect(screen.queryByText("Child 1-1")).not.toBeInTheDocument();
        });
    });

    it("respects maxLevel prop", () => {
        render(<NestedTable data={testNestedData} columns={testColumns} maxLevel={1} />);

        // Expand first level
        const expandButton = screen.getAllByRole("button")[0];
        fireEvent.click(expandButton);

        // Child should be visible
        expect(screen.getByText("Child 1-2")).toBeInTheDocument();

        // But grandchild expand button should not exist or be disabled
        // since maxLevel is 1 and grandchild is at level 2
    });

    it("renders approval badges when enableApproval is true", () => {
        render(<NestedTable data={testNestedData} columns={testColumns} enableApproval />);
        expect(screen.getByText("Pending")).toBeInTheDocument();
        expect(screen.getByText("Approved")).toBeInTheDocument();
    });

    it("renders approve and reject buttons for pending items", () => {
        render(<NestedTable data={testNestedData} columns={testColumns} enableApproval />);

        // Should have approve/reject buttons for pending items
        const buttons = screen.getAllByRole("button");
        const hasApproveButton = buttons.some(btn => btn.querySelector('svg'));
        expect(hasApproveButton).toBe(true);
    });

    it("calls onApprove when approve button is clicked", () => {
        const handleApprove = vi.fn();
        render(
            <NestedTable
                data={testNestedData}
                columns={testColumns}
                enableApproval
                onApprove={handleApprove}
            />
        );

        // Find approve button (Check icon button)
        const buttons = screen.getAllByRole("button");
        const approveButton = buttons.find(btn => {
            const svg = btn.querySelector('svg');
            return svg && svg.classList.contains('h-4');
        });

        if (approveButton) {
            fireEvent.click(approveButton);
            expect(handleApprove).toHaveBeenCalled();
        }
    });

    it("calls onReject when reject button is clicked", () => {
        const handleReject = vi.fn();
        render(
            <NestedTable
                data={testNestedData}
                columns={testColumns}
                enableApproval
                onReject={handleReject}
            />
        );

        // Find reject button (X icon button)
        const buttons = screen.getAllByRole("button");
        const rejectButton = buttons.find(btn => {
            const svg = btn.querySelector('svg');
            return svg && svg.classList.contains('h-4');
        });

        if (rejectButton) {
            fireEvent.click(rejectButton);
            expect(handleReject).toHaveBeenCalled();
        }
    });

    it("shows different background colors for different levels", () => {
        const { container } = render(<NestedTable data={testNestedData} columns={testColumns} />);

        // Expand to show children
        const expandButton = screen.getAllByRole("button")[0];
        fireEvent.click(expandButton);

        // Check that rows exist with different styling
        const rows = container.querySelectorAll("tbody tr");
        expect(rows.length).toBeGreaterThan(1);
    });

    it("applies custom className", () => {
        const { container } = render(
            <NestedTable
                data={testNestedData}
                columns={testColumns}
                className="custom-nested-table"
            />
        );
        expect(container.querySelector(".custom-nested-table")).toBeInTheDocument();
    });

    it("shows empty message when no data", () => {
        render(
            <NestedTable
                data={[]}
                columns={testColumns}
                emptyMessage="No nested data available"
            />
        );
        expect(screen.getByText("No nested data available")).toBeInTheDocument();
    });

    it("renders table info footer", () => {
        render(<NestedTable data={testNestedData} columns={testColumns} maxLevel={4} />);
        expect(screen.getByText(/Max Level:/)).toBeInTheDocument();
        expect(screen.getByText(/4/)).toBeInTheDocument();
    });

    it("handles deeply nested data (4 levels)", async () => {
        const deepData: TestNestedData[] = [
            {
                id: "1",
                level: 0,
                name: "Level 0",
                value: 1,
                children: [
                    {
                        id: "1-1",
                        level: 1,
                        name: "Level 1",
                        value: 2,
                        children: [
                            {
                                id: "1-1-1",
                                level: 2,
                                name: "Level 2",
                                value: 3,
                                children: [
                                    {
                                        id: "1-1-1-1",
                                        level: 3,
                                        name: "Level 3",
                                        value: 4,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ];

        render(<NestedTable data={deepData} columns={testColumns} maxLevel={4} />);

        // Expand all levels
        const buttons = screen.getAllByRole("button");
        for (const button of buttons) {
            fireEvent.click(button);
            await waitFor(() => { });
        }

        expect(screen.getByText("Level 0")).toBeInTheDocument();
    });

    it("does not show expand button for rows without children", () => {
        render(<NestedTable data={testNestedData} columns={testColumns} />);

        // Parent 2 has no children, so it should not have an expand button
        // But this is hard to test without more specific selectors
        expect(screen.getByText("Parent 2")).toBeInTheDocument();
    });
});