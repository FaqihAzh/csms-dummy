import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { RadioGroup } from "./radio";

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

describe("RadioGroup Component", () => {
  it("renders all options", () => {
    render(<RadioGroup label="Select option" options={options} />);
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
    expect(screen.getByText("Option 3")).toBeInTheDocument();
  });

  it("renders with label", () => {
    render(<RadioGroup label="Choose one" options={options} />);
    expect(screen.getByText("Choose one")).toBeInTheDocument();
  });

  it("shows required asterisk when labelRequired is true", () => {
    render(<RadioGroup label="Options" labelRequired options={options} />);
    const label = screen.getByText("Options").parentElement;
    expect(label?.textContent).toContain("*");
  });

  it("displays error message", () => {
    render(
      <RadioGroup
        label="Options"
        options={options}
        error="Selection required"
      />
    );
    expect(screen.getByText("Selection required")).toBeInTheDocument();
  });

  it("displays helper text", () => {
    render(
      <RadioGroup
        label="Options"
        options={options}
        helperText="Choose one option"
      />
    );
    expect(screen.getByText("Choose one option")).toBeInTheDocument();
  });

  it("handles onChange event", () => {
    const handleChange = vi.fn();
    render(
      <RadioGroup
        label="Options"
        options={options}
        onChange={handleChange}
      />
    );

    const radio1 = screen.getByLabelText("Option 1");
    fireEvent.click(radio1);
    expect(handleChange).toHaveBeenCalledWith("option1");
  });

  it("checks the selected radio button", () => {
    render(
      <RadioGroup
        label="Options"
        options={options}
        value="option2"
      />
    );

    const radio1 = screen.getByLabelText("Option 1") as HTMLInputElement;
    const radio2 = screen.getByLabelText("Option 2") as HTMLInputElement;
    const radio3 = screen.getByLabelText("Option 3") as HTMLInputElement;

    expect(radio1.checked).toBe(false);
    expect(radio2.checked).toBe(true);
    expect(radio3.checked).toBe(false);
  });

  it("changes selection when another option is clicked", () => {
    const handleChange = vi.fn();
    render(
      <RadioGroup
        label="Options"
        options={options}
        value="option1"
        onChange={handleChange}
      />
    );

    const radio2 = screen.getByLabelText("Option 2");
    fireEvent.click(radio2);
    expect(handleChange).toHaveBeenCalledWith("option2");
  });

  it("applies horizontal orientation", () => {
    const { container } = render(
      <RadioGroup
        label="Options"
        options={options}
        orientation="horizontal"
      />
    );
    const group = container.querySelector('[role="radiogroup"]');
    expect(group).toHaveClass("flex");
  });

  it("applies vertical orientation by default", () => {
    const { container } = render(
      <RadioGroup label="Options" options={options} />
    );
    const group = container.querySelector('[role="radiogroup"]');
    expect(group).toHaveClass("space-y-3");
  });

  it("applies disabled state to all options", () => {
    render(
      <RadioGroup label="Options" options={options} disabled />
    );
    const radios = screen.getAllByRole("radio");
    radios.forEach((radio) => {
      expect(radio).toBeDisabled();
    });
  });

  it("disables specific options", () => {
    const optionsWithDisabled = [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2", disabled: true },
      { value: "option3", label: "Option 3" },
    ];
    render(
      <RadioGroup label="Options" options={optionsWithDisabled} />
    );
    const radio2 = screen.getByLabelText("Option 2");
    expect(radio2).toBeDisabled();
  });

  it("renders option descriptions", () => {
    const optionsWithDescriptions = [
      { value: "option1", label: "Option 1", description: "Description 1" },
      { value: "option2", label: "Option 2", description: "Description 2" },
    ];
    render(
      <RadioGroup label="Options" options={optionsWithDescriptions} />
    );
    expect(screen.getByText("Description 1")).toBeInTheDocument();
    expect(screen.getByText("Description 2")).toBeInTheDocument();
  });

  it("sets aria-invalid when error exists", () => {
    render(
      <RadioGroup
        label="Options"
        options={options}
        error="Error"
      />
    );
    const radios = screen.getAllByRole("radio");
    radios.forEach((radio) => {
      expect(radio).toHaveAttribute("aria-invalid", "true");
    });
  });

  it("groups radios with same name", () => {
    render(
      <RadioGroup
        label="Options"
        options={options}
        name="test-group"
      />
    );
    const radios = screen.getAllByRole("radio");
    radios.forEach((radio) => {
      expect(radio).toHaveAttribute("name", "test-group");
    });
  });

  it("does not trigger onChange when disabled", () => {
    const handleChange = vi.fn();
    render(
      <RadioGroup
        label="Options"
        options={options}
        disabled
        onChange={handleChange}
      />
    );

    const radio1 = screen.getByLabelText("Option 1");
    fireEvent.click(radio1);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("accepts wrapperClassName", () => {
    const { container } = render(
      <RadioGroup
        label="Options"
        options={options}
        wrapperClassName="wrapper-class"
      />
    );
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass("wrapper-class");
  });
});