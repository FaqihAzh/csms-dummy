import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ScrollArea, ScrollBar } from "./scroll-area";

describe("ScrollArea Component", () => {
  it("renders correctly with children", () => {
    render(
      <ScrollArea>
        <div>Test Content</div>
      </ScrollArea>
    );
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ScrollArea className="custom-class">
        <div>Content</div>
      </ScrollArea>
    );
    const scrollArea = container.firstChild;
    expect(scrollArea).toHaveClass("custom-class");
  });

  it("renders with overflow-hidden class", () => {
    const { container } = render(
      <ScrollArea>
        <div>Content</div>
      </ScrollArea>
    );
    const scrollArea = container.firstChild;
    expect(scrollArea).toHaveClass("overflow-hidden");
  });

  it("renders viewport with children", () => {
    render(
      <ScrollArea>
        <div data-testid="child-content">Child Content</div>
      </ScrollArea>
    );
    expect(screen.getByTestId("child-content")).toBeInTheDocument();
  });

  it("renders with vertical scrollbar by default", () => {
    const { container } = render(
      <ScrollArea>
        <div>Content</div>
      </ScrollArea>
    );
    // Radix UI renders scrollbar elements
    expect(container.querySelector('[data-radix-scroll-area-viewport]')).toBeInTheDocument();
  });

  it("renders multiple children", () => {
    render(
      <ScrollArea>
        <div>First</div>
        <div>Second</div>
        <div>Third</div>
      </ScrollArea>
    );
    expect(screen.getByText("First")).toBeInTheDocument();
    expect(screen.getByText("Second")).toBeInTheDocument();
    expect(screen.getByText("Third")).toBeInTheDocument();
  });

  it("accepts data attributes", () => {
    const { container } = render(
      <ScrollArea data-testid="scroll-area">
        <div>Content</div>
      </ScrollArea>
    );
    expect(container.querySelector('[data-testid="scroll-area"]')).toBeInTheDocument();
  });
});

describe("ScrollBar Component", () => {
  it("renders with vertical orientation by default", () => {
    const { container } = render(
      <ScrollArea>
        <div>Content</div>
        <ScrollBar />
      </ScrollArea>
    );
    const scrollbar = container.querySelector('[data-orientation="vertical"]');
    expect(scrollbar).toBeInTheDocument();
  });

  it("renders with horizontal orientation", () => {
    const { container } = render(
      <ScrollArea>
        <div>Content</div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    );
    const scrollbar = container.querySelector('[data-orientation="horizontal"]');
    expect(scrollbar).toBeInTheDocument();
  });

  it("applies custom className to scrollbar", () => {
    const { container } = render(
      <ScrollArea>
        <div>Content</div>
        <ScrollBar className="custom-scrollbar" />
      </ScrollArea>
    );
    const scrollbar = container.querySelector('.custom-scrollbar');
    expect(scrollbar).toBeInTheDocument();
  });
});