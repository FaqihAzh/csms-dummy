import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Input } from "./input";
import { Mail } from "lucide-react";

describe("Input Component", () => {
  it("renders correctly", () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText("Enter text");
    expect(input).toBeInTheDocument();
  });

  it("renders with label", () => {
    render(<Input label="Email" placeholder="email" />);
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("email")).toBeInTheDocument();
  });

  it("shows required asterisk when labelRequired is true", () => {
    render(<Input label="Username" labelRequired />);
    const label = screen.getByText("Username").parentElement;
    expect(label?.textContent).toContain("*");
  });

  it("displays error message", () => {
    render(<Input label="Email" error="Invalid email" />);
    expect(screen.getByText("Invalid email")).toBeInTheDocument();
  });

  it("displays helper text", () => {
    render(<Input helperText="Enter your email address" />);
    expect(screen.getByText("Enter your email address")).toBeInTheDocument();
  });

  it("prioritizes error over helper text", () => {
    render(
      <Input
        helperText="This is helper text"
        error="This is an error"
      />
    );
    expect(screen.getByText("This is an error")).toBeInTheDocument();
    expect(screen.queryByText("This is helper text")).not.toBeInTheDocument();
  });

  it("renders left icon", () => {
    render(<Input leftIcon={<Mail data-testid="mail-icon" />} />);
    expect(screen.getByTestId("mail-icon")).toBeInTheDocument();
  });

  it("renders right icon", () => {
    render(<Input rightIcon={<Mail data-testid="mail-icon" />} />);
    expect(screen.getByTestId("mail-icon")).toBeInTheDocument();
  });

  it("handles onChange event", () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("applies disabled state", () => {
    render(<Input disabled />);
    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
  });

  it("applies readonly attribute", () => {
    render(<Input readOnly />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("readonly");
  });

  it("applies different input types", () => {
    const { rerender } = render(<Input type="email" />);
    let input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("type", "email");

    rerender(<Input type="password" data-testid="password-input" />);
    input = screen.getByTestId("password-input");
    expect((input as HTMLInputElement).type).toBe("password");
  });

  it("applies error styling", () => {
    render(<Input error="Error message" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("border-destructive");
  });

  it("sets aria-invalid when error exists", () => {
    render(<Input error="Error" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("links error message with aria-describedby", () => {
    render(<Input id="test-input" error="Error message" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-describedby", "test-input-error");
  });

  it("accepts custom className", () => {
    render(<Input className="custom-class" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("custom-class");
  });

  it("accepts wrapperClassName", () => {
    const { container } = render(<Input wrapperClassName="wrapper-class" />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass("wrapper-class");
  });
});