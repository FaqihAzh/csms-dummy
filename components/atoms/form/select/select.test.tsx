import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Select } from "./select";

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

describe("Select Component", () => {
  it("renders correctly with options", () => {
    render(<Select options={options} />);
    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();
  });

  it("renders with label", () => {
    render(<Select label="Choose option" options={options} />);
    expect(screen.getByText("Choose option")).toBeInTheDocument();
  });

  it("shows required asterisk when labelRequired is true", () => {
    render(<Select label="Select" labelRequired options={options} />);
    const label = screen.getByText("Select").parentElement;
    expect(label?.textContent).toContain("*");
  });

  it("renders all options", () => {
    render(<Select options={options} />);
    const select = screen.getByRole("combobox") as HTMLSelectElement;
    expect(select.options).toHaveLength(4); // 3 options + 1 placeholder
  });

  it("renders placeholder option", () => {
    render(<Select options={options} placeholder="Select an option" />);
    expect(screen.getByText("Select an option")).toBeInTheDocument();
  });

  it("displays error message", () => {
    render(<Select options={options} error="Selection required" />);
    expect(screen.getByText("Selection required")).toBeInTheDocument();
  });

  it("displays helper text", () => {
    render(<Select options={options} helperText="Choose one" />);
    expect(screen.getByText("Choose one")).toBeInTheDocument();
  });

  it("prioritizes error over helper text", () => {
    render(
      <Select
        options={options}
        helperText="Helper text"
        error="Error message"
      />
    );
    expect(screen.getByText("Error message")).toBeInTheDocument();
    expect(screen.queryByText("Helper text")).not.toBeInTheDocument();
  });

  it("handles onChange event", () => {
    const handleChange = vi.fn();
    render(<Select options={options} onChange={handleChange} />);
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "option2" } });
    expect(handleChange).toHaveBeenCalledWith("option2", expect.anything());
  });

  it("applies disabled state", () => {
    render(<Select options={options} disabled />);
    const select = screen.getByRole("combobox");
    expect(select).toBeDisabled();
  });

  it("disables specific options", () => {
    const optionsWithDisabled = [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2", disabled: true },
      { value: "option3", label: "Option 3" },
    ];
    render(<Select options={optionsWithDisabled} />);
    const select = screen.getByRole("combobox") as HTMLSelectElement;
    const option2 = select.options[2]; // Index 2 because placeholder is index 0
    expect(option2).toHaveAttribute("disabled");
  });

  it("applies error styling", () => {
    render(<Select options={options} error="Error" />);
    const select = screen.getByRole("combobox");
    expect(select).toHaveClass("border-destructive");
  });

  it("sets aria-invalid when error exists", () => {
    render(<Select options={options} error="Error" />);
    const select = screen.getByRole("combobox");
    expect(select).toHaveAttribute("aria-invalid", "true");
  });

  it("links error message with aria-describedby", () => {
    render(<Select id="test-select" options={options} error="Error message" />);
    const select = screen.getByRole("combobox");
    expect(select).toHaveAttribute("aria-describedby", "test-select-error");
  });

  it("accepts custom className", () => {
    render(<Select options={options} className="custom-class" />);
    const select = screen.getByRole("combobox");
    expect(select).toHaveClass("custom-class");
  });

  it("accepts wrapperClassName", () => {
    const { container } = render(
      <Select options={options} wrapperClassName="wrapper-class" />
    );
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass("wrapper-class");
  });

  it("sets default value", () => {
    render(<Select options={options} defaultValue="option2" />);
    const select = screen.getByRole("combobox") as HTMLSelectElement;
    expect(select.value).toBe("option2");
  });

  it("renders chevron icon", () => {
    const { container } = render(<Select options={options} />);
    const icon = container.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });
});