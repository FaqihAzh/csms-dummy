import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Textarea } from "./textarea";

describe("Textarea Component", () => {
  it("renders correctly", () => {
    render(<Textarea placeholder="Enter message" />);
    const textarea = screen.getByPlaceholderText("Enter message");
    expect(textarea).toBeInTheDocument();
  });

  it("renders with label", () => {
    render(<Textarea label="Message" placeholder="message" />);
    expect(screen.getByText("Message")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("message")).toBeInTheDocument();
  });

  it("shows required asterisk when labelRequired is true", () => {
    render(<Textarea label="Comment" labelRequired />);
    const label = screen.getByText("Comment").parentElement;
    expect(label?.textContent).toContain("*");
  });

  it("displays error message", () => {
    render(<Textarea label="Bio" error="Bio is too short" />);
    expect(screen.getByText("Bio is too short")).toBeInTheDocument();
  });

  it("displays helper text", () => {
    render(<Textarea helperText="Max 500 characters" />);
    expect(screen.getByText("Max 500 characters")).toBeInTheDocument();
  });

  it("prioritizes error over helper text", () => {
    render(
      <Textarea
        helperText="Helper text"
        error="Error message"
      />
    );
    expect(screen.getByText("Error message")).toBeInTheDocument();
    expect(screen.queryByText("Helper text")).not.toBeInTheDocument();
  });

  it("shows character count when showCount and maxLength are set", () => {
    render(<Textarea showCount maxLength={100} value="Hello" />);
    expect(screen.getByText("5/100")).toBeInTheDocument();
  });

  it("updates character count on change", () => {
    const { rerender } = render(
      <Textarea showCount maxLength={100} value="Hello" />
    );
    expect(screen.getByText("5/100")).toBeInTheDocument();

    rerender(<Textarea showCount maxLength={100} value="Hello World" />);
    expect(screen.getByText("11/100")).toBeInTheDocument();
  });

  it("handles onChange event", () => {
    const handleChange = vi.fn();
    render(<Textarea onChange={handleChange} />);
    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "test" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("applies disabled state", () => {
    render(<Textarea disabled />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toBeDisabled();
  });

  it("applies readonly attribute", () => {
    render(<Textarea readOnly />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("readonly");
  });

  it("applies maxLength attribute", () => {
    render(<Textarea maxLength={200} />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("maxLength", "200");
  });

  it("applies error styling", () => {
    render(<Textarea error="Error message" />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveClass("border-destructive");
  });

  it("sets aria-invalid when error exists", () => {
    render(<Textarea error="Error" />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("aria-invalid", "true");
  });

  it("links error message with aria-describedby", () => {
    render(<Textarea id="test-textarea" error="Error message" />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("aria-describedby", "test-textarea-error");
  });

  it("accepts custom className", () => {
    render(<Textarea className="custom-class" />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveClass("custom-class");
  });

  it("accepts wrapperClassName", () => {
    const { container } = render(<Textarea wrapperClassName="wrapper-class" />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass("wrapper-class");
  });

  it("renders as textarea element", () => {
    render(<Textarea />);
    const textarea = screen.getByRole("textbox");
    expect(textarea.tagName).toBe("TEXTAREA");
  });
});