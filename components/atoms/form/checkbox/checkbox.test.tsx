import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Checkbox, CheckboxGroup } from "./checkbox";

describe("Checkbox Component", () => {
  it("renders correctly", () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByText("Accept terms")).toBeInTheDocument();
  });

  it("renders checkbox input", () => {
    render(<Checkbox label="Test" />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
  });

  it("shows required asterisk when labelRequired is true", () => {
    render(<Checkbox label="Terms" labelRequired />);
    const label = screen.getByText("Terms").parentElement;
    expect(label?.textContent).toContain("*");
  });

  it("displays error message", () => {
    render(<Checkbox label="Terms" error="You must accept" />);
    expect(screen.getByText("You must accept")).toBeInTheDocument();
  });

  it("displays helper text", () => {
    render(<Checkbox label="Remember me" helperText="Stay logged in" />);
    expect(screen.getByText("Stay logged in")).toBeInTheDocument();
  });

  it("handles onChange event", () => {
    const handleChange = vi.fn();
    render(<Checkbox label="Test" onChange={handleChange} />);
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledWith(true, expect.anything());
  });

  it("applies checked state", () => {
    render(<Checkbox label="Test" checked />);
    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it("applies disabled state", () => {
    render(<Checkbox label="Test" disabled />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeDisabled();
  });

  it("sets aria-invalid when error exists", () => {
    render(<Checkbox label="Test" error="Error" />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("aria-invalid", "true");
  });

  it("links error message with aria-describedby", () => {
    render(<Checkbox id="test-cb" label="Test" error="Error message" />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("aria-describedby", "test-cb-error");
  });

  it("accepts custom className", () => {
    const { container } = render(<Checkbox label="Test" className="custom-class" />);
    const checkboxDiv = container.querySelector(".custom-class");
    expect(checkboxDiv).toBeInTheDocument();
  });
});

describe("CheckboxGroup Component", () => {
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  it("renders all options", () => {
    render(<CheckboxGroup label="Select options" options={options} />);
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
    expect(screen.getByText("Option 3")).toBeInTheDocument();
  });

  it("renders with label", () => {
    render(<CheckboxGroup label="Choose options" options={options} />);
    expect(screen.getByText("Choose options")).toBeInTheDocument();
  });

  it("shows required asterisk when labelRequired is true", () => {
    render(<CheckboxGroup label="Options" labelRequired options={options} />);
    const label = screen.getByText("Options").parentElement;
    expect(label?.textContent).toContain("*");
  });

  it("displays error message", () => {
    render(
      <CheckboxGroup
        label="Options"
        options={options}
        error="Select at least one"
      />
    );
    expect(screen.getByText("Select at least one")).toBeInTheDocument();
  });

  it("displays helper text", () => {
    render(
      <CheckboxGroup
        label="Options"
        options={options}
        helperText="Choose multiple"
      />
    );
    expect(screen.getByText("Choose multiple")).toBeInTheDocument();
  });

  it("handles onChange with multiple selections", () => {
    const handleChange = vi.fn();
    render(
      <CheckboxGroup
        label="Options"
        options={options}
        onChange={handleChange}
      />
    );

    const checkbox1 = screen.getByLabelText("Option 1");
    const checkbox2 = screen.getByLabelText("Option 2");

    fireEvent.click(checkbox1);
    expect(handleChange).toHaveBeenCalledWith(["option1"]);

    fireEvent.click(checkbox2);
    expect(handleChange).toHaveBeenCalledWith(["option1", "option2"]);
  });

  it("applies horizontal orientation", () => {
    const { container } = render(
      <CheckboxGroup
        label="Options"
        options={options}
        orientation="horizontal"
      />
    );
    const group = container.querySelector('[role="group"]');
    expect(group).toHaveClass("flex");
  });

  it("applies vertical orientation by default", () => {
    const { container } = render(
      <CheckboxGroup label="Options" options={options} />
    );
    const group = container.querySelector('[role="group"]');
    expect(group).toHaveClass("space-y-3");
  });

  it("applies disabled state to all options", () => {
    render(
      <CheckboxGroup label="Options" options={options} disabled />
    );
    const checkboxes = screen.getAllByRole("checkbox");
    checkboxes.forEach((checkbox) => {
      expect(checkbox).toBeDisabled();
    });
  });

  it("disables specific options", () => {
    const optionsWithDisabled = [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2", disabled: true },
      { value: "option3", label: "Option 3" },
    ];
    render(
      <CheckboxGroup label="Options" options={optionsWithDisabled} />
    );
    const checkbox2 = screen.getByLabelText("Option 2");
    expect(checkbox2).toBeDisabled();
  });

  it("sets checked state for values in value prop", () => {
    render(
      <CheckboxGroup
        label="Options"
        options={options}
        value={["option1", "option3"]}
      />
    );
    const checkbox1 = screen.getByLabelText("Option 1") as HTMLInputElement;
    const checkbox2 = screen.getByLabelText("Option 2") as HTMLInputElement;
    const checkbox3 = screen.getByLabelText("Option 3") as HTMLInputElement;

    expect(checkbox1.checked).toBe(true);
    expect(checkbox2.checked).toBe(false);
    expect(checkbox3.checked).toBe(true);
  });

  it("unchecks option when clicked again", () => {
    const handleChange = vi.fn();
    render(
      <CheckboxGroup
        label="Options"
        options={options}
        value={["option1"]}
        onChange={handleChange}
      />
    );

    const checkbox1 = screen.getByLabelText("Option 1");
    fireEvent.click(checkbox1);
    expect(handleChange).toHaveBeenCalledWith([]);
  });
});