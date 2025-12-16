import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./select";
import { useState } from "react";

const meta: Meta<typeof Select> = {
  title: "Components/Form/Select",
  component: Select,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Select>;

const countries = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "id", label: "Indonesia" },
];

const fruits = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
  { value: "grape", label: "Grape", disabled: true },
  { value: "mango", label: "Mango" },
];

export const Default: Story = {
  args: {
    options: countries,
    placeholder: "Select a country",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Country",
    options: countries,
    placeholder: "Select your country",
  },
};

export const Required: Story = {
  args: {
    label: "Country",
    labelRequired: true,
    options: countries,
    placeholder: "Select your country",
  },
};

export const WithError: Story = {
  args: {
    label: "Country",
    labelRequired: true,
    options: countries,
    placeholder: "Select your country",
    error: "Please select a country",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Preferred Contact Time",
    options: [
      { value: "morning", label: "Morning (9AM - 12PM)" },
      { value: "afternoon", label: "Afternoon (12PM - 5PM)" },
      { value: "evening", label: "Evening (5PM - 9PM)" },
    ],
    placeholder: "Select time",
    helperText: "We'll try to contact you during this time",
  },
};

export const WithDisabledOption: Story = {
  args: {
    label: "Select Fruit",
    options: fruits,
    placeholder: "Choose a fruit",
    helperText: "Grape is currently out of stock",
  },
};

export const Disabled: Story = {
  args: {
    label: "Country",
    options: countries,
    disabled: true,
    defaultValue: "us",
  },
};

export const WithDefaultValue: Story = {
  args: {
    label: "Country",
    options: countries,
    defaultValue: "id",
  },
};

export const FormExample: Story = {
  render: () => (
    <div className="max-w-md space-y-4">
      <Select
        label="Country"
        labelRequired
        options={countries}
        placeholder="Select country"
      />
      <Select
        label="State/Province"
        labelRequired
        options={[
          { value: "ca", label: "California" },
          { value: "ny", label: "New York" },
          { value: "tx", label: "Texas" },
        ]}
        placeholder="Select state"
      />
      <Select
        label="City"
        options={[
          { value: "la", label: "Los Angeles" },
          { value: "sf", label: "San Francisco" },
          { value: "sd", label: "San Diego" },
        ]}
        placeholder="Select city"
      />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");

    const handleChange = (newValue: string) => {
      setValue(newValue);
      if (newValue) {
        setError("");
      }
    };

    const handleSubmit = () => {
      if (!value) {
        setError("Please select a country");
      } else {
        alert(`Selected: ${value}`);
      }
    };

    return (
      <div className="space-y-4">
        <Select
          label="Country"
          labelRequired
          options={countries}
          placeholder="Select country"
          value={value}
          onChange={handleChange}
          error={error}
        />
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
        >
          Submit
        </button>
        {value && !error && (
          <p className="text-sm text-muted-foreground">
            Selected value: <strong>{value}</strong>
          </p>
        )}
      </div>
    );
  },
};

export const ManyOptions: Story = {
  args: {
    label: "Select Year",
    options: Array.from({ length: 50 }, (_, i) => ({
      value: String(2024 - i),
      label: String(2024 - i),
    })),
    placeholder: "Select year",
  },
};

export const GroupedByType: Story = {
  render: () => (
    <div className="space-y-4">
      <Select
        label="Account Type"
        labelRequired
        options={[
          { value: "personal", label: "Personal Account" },
          { value: "business", label: "Business Account" },
          { value: "enterprise", label: "Enterprise Account" },
        ]}
        placeholder="Select account type"
      />
      <Select
        label="Plan"
        labelRequired
        options={[
          { value: "free", label: "Free - $0/month" },
          { value: "pro", label: "Pro - $9/month" },
          { value: "premium", label: "Premium - $29/month" },
        ]}
        placeholder="Select plan"
      />
    </div>
  ),
};