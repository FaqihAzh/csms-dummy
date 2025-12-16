import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox, CheckboxGroup } from "./checkbox";
import { useState } from "react";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Form/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: "Accept terms and conditions",
  },
};

export const Checked: Story = {
  args: {
    label: "I agree to the terms",
    checked: true,
  },
};

export const Required: Story = {
  args: {
    label: "Subscribe to newsletter",
    labelRequired: true,
  },
};

export const WithError: Story = {
  args: {
    label: "I accept the terms and conditions",
    labelRequired: true,
    error: "You must accept the terms to continue",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Remember me",
    helperText: "Keep me logged in on this device",
  },
};

export const Disabled: Story = {
  args: {
    label: "This option is disabled",
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: "This option is disabled and checked",
    disabled: true,
    checked: true,
  },
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <div className="space-y-4">
        <Checkbox
          label="Enable notifications"
          checked={checked}
          onChange={setChecked}
          helperText="Receive email notifications about account activity"
        />
        <p className="text-sm text-muted-foreground">
          Status: {checked ? "Enabled" : "Disabled"}
        </p>
      </div>
    );
  },
};

export const MultipleCheckboxes: Story = {
  render: () => (
    <div className="space-y-3">
      <Checkbox label="Email notifications" defaultChecked />
      <Checkbox label="SMS notifications" />
      <Checkbox label="Push notifications" defaultChecked />
      <Checkbox label="Weekly newsletter" />
    </div>
  ),
};

// CheckboxGroup Stories
export const GroupVertical: StoryObj<typeof CheckboxGroup> = {
  render: () => (
    <CheckboxGroup
      label="Select your interests"
      options={[
        { value: "sports", label: "Sports" },
        { value: "music", label: "Music" },
        { value: "movies", label: "Movies" },
        { value: "technology", label: "Technology" },
      ]}
    />
  ),
};

export const GroupHorizontal: StoryObj<typeof CheckboxGroup> = {
  render: () => (
    <CheckboxGroup
      label="Select your interests"
      orientation="horizontal"
      options={[
        { value: "sports", label: "Sports" },
        { value: "music", label: "Music" },
        { value: "movies", label: "Movies" },
        { value: "technology", label: "Technology" },
      ]}
    />
  ),
};

export const GroupRequired: StoryObj<typeof CheckboxGroup> = {
  render: () => (
    <CheckboxGroup
      label="Select features to enable"
      labelRequired
      options={[
        { value: "analytics", label: "Analytics" },
        { value: "notifications", label: "Notifications" },
        { value: "darkMode", label: "Dark Mode" },
      ]}
    />
  ),
};

export const GroupWithError: StoryObj<typeof CheckboxGroup> = {
  render: () => (
    <CheckboxGroup
      label="Select at least one option"
      labelRequired
      error="Please select at least one option"
      options={[
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
      ]}
    />
  ),
};

export const GroupWithHelperText: StoryObj<typeof CheckboxGroup> = {
  render: () => (
    <CheckboxGroup
      label="Newsletter preferences"
      helperText="You can change these settings anytime"
      options={[
        { value: "daily", label: "Daily digest" },
        { value: "weekly", label: "Weekly roundup" },
        { value: "monthly", label: "Monthly newsletter" },
      ]}
    />
  ),
};

export const GroupDisabled: StoryObj<typeof CheckboxGroup> = {
  render: () => (
    <CheckboxGroup
      label="Disabled group"
      disabled
      options={[
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
      ]}
      value={["option1"]}
    />
  ),
};

export const GroupWithDisabledOption: StoryObj<typeof CheckboxGroup> = {
  render: () => (
    <CheckboxGroup
      label="Select features"
      options={[
        { value: "feature1", label: "Feature 1" },
        { value: "feature2", label: "Feature 2 (Premium)", disabled: true },
        { value: "feature3", label: "Feature 3" },
      ]}
      helperText="Some features require a premium subscription"
    />
  ),
};

export const GroupControlled: StoryObj<typeof CheckboxGroup> = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(["sports"]);

    return (
      <div className="space-y-4">
        <CheckboxGroup
          label="Your interests"
          labelRequired
          options={[
            { value: "sports", label: "Sports" },
            { value: "music", label: "Music" },
            { value: "movies", label: "Movies" },
            { value: "technology", label: "Technology" },
            { value: "travel", label: "Travel" },
          ]}
          value={selected}
          onChange={setSelected}
        />
        <div className="text-sm text-muted-foreground">
          <p className="font-medium mb-1">Selected ({selected.length}):</p>
          <p>{selected.length > 0 ? selected.join(", ") : "None"}</p>
        </div>
      </div>
    );
  },
};

export const FormExample: StoryObj<typeof CheckboxGroup> = {
  render: () => {
    const [values, setValues] = useState<string[]>([]);
    const [error, setError] = useState("");

    const handleSubmit = () => {
      if (values.length === 0) {
        setError("Please select at least one option");
      } else {
        setError("");
        alert(`Selected: ${values.join(", ")}`);
      }
    };

    return (
      <div className="max-w-md space-y-4">
        <CheckboxGroup
          label="What features are you interested in?"
          labelRequired
          orientation="vertical"
          options={[
            { value: "analytics", label: "Advanced Analytics" },
            { value: "reports", label: "Custom Reports" },
            { value: "api", label: "API Access" },
            { value: "support", label: "Priority Support" },
          ]}
          value={values}
          onChange={(newValues) => {
            setValues(newValues);
            if (newValues.length > 0) {
              setError("");
            }
          }}
          error={error}
        />
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
        >
          Submit
        </button>
      </div>
    );
  },
};