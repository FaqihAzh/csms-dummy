import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Label } from "./label";

describe("Label Component", () => {
  it("renders correctly", () => {
    render(<Label>Test Label</Label>);
    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  it("renders as label element", () => {
    render(<Label>Test</Label>);
    const label = screen.getByText("Test");
    expect(label.tagName).toBe("LABEL");
  });

  it("shows asterisk when required is true", () => {
    render(<Label required>Required Field</Label>);
    const label = screen.getByText("Required Field").parentElement;
    expect(label?.textContent).toContain("*");
  });

  it("does not show asterisk when required is false", () => {
    render(<Label required={false}>Optional Field</Label>);
    const label = screen.getByText("Optional Field").parentElement;
    expect(label?.textContent).not.toContain("*");
  });

  it("applies disabled styling when disabled is true", () => {
    render(<Label disabled>Disabled Label</Label>);
    const label = screen.getByText("Disabled Label");
    expect(label).toHaveClass("opacity-70");
    expect(label).toHaveClass("cursor-not-allowed");
  });

  it("accepts htmlFor prop", () => {
    render(<Label htmlFor="test-input">Input Label</Label>);
    const label = screen.getByText("Input Label");
    expect(label).toHaveAttribute("for", "test-input");
  });

  it("accepts custom className", () => {
    render(<Label className="custom-class">Label</Label>);
    const label = screen.getByText("Label");
    expect(label).toHaveClass("custom-class");
  });

  it("applies base styling classes", () => {
    render(<Label>Label</Label>);
    const label = screen.getByText("Label");
    expect(label).toHaveClass("text-sm");
    expect(label).toHaveClass("font-medium");
    expect(label).toHaveClass("leading-none");
  });

  it("combines required and disabled states", () => {
    render(<Label required disabled>Label</Label>);
    const label = screen.getByText("Label").parentElement;
    expect(label?.textContent).toContain("*");
    expect(label).toHaveClass("opacity-70");
  });

  it("accepts additional HTML attributes", () => {
    render(<Label data-testid="test-label" aria-label="Test">Label</Label>);
    const label = screen.getByTestId("test-label");
    expect(label).toHaveAttribute("aria-label", "Test");
  });

  it("renders children correctly", () => {
    render(
      <Label>
        <span>Complex</span> Label
      </Label>
    );
    expect(screen.getByText("Complex")).toBeInTheDocument();
    expect(screen.getByText(/Label/)).toBeInTheDocument();
  });
});