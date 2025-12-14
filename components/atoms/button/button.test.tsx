import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Button } from "./button";

describe("Button Component", () => {
    it("renders correctly with default props", () => {
        render(<Button>Click me</Button>);
        const button = screen.getByRole("button", { name: /click me/i });
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass("bg-primary");
    });

    it("applies the correct variant classes", () => {
        const { rerender } = render(<Button variant="destructive">Delete</Button>);
        expect(screen.getByRole("button")).toHaveClass("bg-destructive");

        rerender(<Button variant="outline">Outline</Button>);
        expect(screen.getByRole("button")).toHaveClass("border-input");

        rerender(<Button variant="ghost">Ghost</Button>);
        expect(screen.getByRole("button")).toHaveClass("hover:bg-accent");
    });

    it("applies the correct size classes", () => {
        const { rerender } = render(<Button size="sm">Small</Button>);
        expect(screen.getByRole("button")).toHaveClass("h-9");

        rerender(<Button size="lg">Large</Button>);
        expect(screen.getByRole("button")).toHaveClass("h-11");

        rerender(<Button size="icon">Icon</Button>);
        expect(screen.getByRole("button")).toHaveClass("h-10 w-10");
    });

    it("handles click events", () => {
        const handleClick = vi.fn();
        render(<Button onClick={handleClick}>Click me</Button>);
        fireEvent.click(screen.getByRole("button"));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("is disabled when disabled prop is true", () => {
        const handleClick = vi.fn();
        render(<Button disabled onClick={handleClick}>Disabled</Button>);
        const button = screen.getByRole("button");
        expect(button).toBeDisabled();
        fireEvent.click(button);
        expect(handleClick).not.toHaveBeenCalled();
    });

    it("shows loading spinner and disables interactions when isLoading is true", () => {
        const handleClick = vi.fn();
        render(<Button isLoading onClick={handleClick}>Submit</Button>);
        const button = screen.getByRole("button");

        expect(button).toBeDisabled();
        expect(button.querySelector('.animate-spin')).toBeInTheDocument();

        fireEvent.click(button);
        expect(handleClick).not.toHaveBeenCalled();
    });

    it("renders left and right icons", () => {
        render(
            <Button
                leftIcon={<span data-testid="left-icon">L</span>}
                rightIcon={<span data-testid="right-icon">R</span>}
            >
                Content
            </Button>
        );
        expect(screen.getByTestId("left-icon")).toBeInTheDocument();
        expect(screen.getByTestId("right-icon")).toBeInTheDocument();
    });

    it("supports polymorphism via asChild", () => {
        render(
            <Button asChild>
                <a href="/link">Link styled as button</a>
            </Button>
        );
        const link = screen.getByRole("link", { name: /link styled as button/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveClass("bg-primary");
        expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });
});