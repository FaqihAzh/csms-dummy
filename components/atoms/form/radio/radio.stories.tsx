import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup } from "./radio";
import { useState } from "react";

const meta: Meta<typeof RadioGroup> = {
  title: "Components/Form/Radio",
  component: RadioGroup,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  args: {
    label: "Select an option",
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ],
  },
};

export const Horizontal: Story = {
  args: {
    label: "Choose your plan",
    orientation: "horizontal",
    options: [
      { value: "free", label: "Free" },
      { value: "pro", label: "Pro" },
      { value: "enterprise", label: "Enterprise" },
    ],
  },
};

export const Required: Story = {
  args: {
    label: "Select payment method",
    labelRequired: true,
    options: [
      { value: "credit", label: "Credit Card" },
      { value: "debit", label: "Debit Card" },
      { value: "paypal", label: "PayPal" },
    ],
  },
};

export const WithError: Story = {
  args: {
    label: "Select shipping method",
    labelRequired: true,
    error: "Please select a shipping method",
    options: [
      { value: "standard", label: "Standard Shipping" },
      { value: "express", label: "Express Shipping" },
      { value: "overnight", label: "Overnight Shipping" },
    ],
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Select notification frequency",
    helperText: "You can change this setting anytime in preferences",
    options: [
      { value: "realtime", label: "Real-time" },
      { value: "hourly", label: "Hourly" },
      { value: "daily", label: "Daily" },
    ],
  },
};

export const WithDescriptions: Story = {
  args: {
    label: "Choose your plan",
    options: [
      {
        value: "free",
        label: "Free",
        description: "Perfect for trying out our service. Includes basic features.",
      },
      {
        value: "pro",
        label: "Pro - $9/month",
        description: "For professionals. Includes advanced features and priority support.",
      },
      {
        value: "enterprise",
        label: "Enterprise - Custom",
        description: "For large teams. Includes everything plus dedicated support.",
      },
    ],
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled radio group",
    disabled: true,
    value: "option2",
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ],
  },
};

export const WithDisabledOption: Story = {
  args: {
    label: "Select size",
    options: [
      { value: "small", label: "Small" },
      { value: "medium", label: "Medium" },
      { value: "large", label: "Large (Out of Stock)", disabled: true },
      { value: "xlarge", label: "X-Large" },
    ],
    helperText: "Large size is currently unavailable",
  },
};

export const WithDefaultValue: Story = {
  args: {
    label: "Select theme",
    value: "dark",
    options: [
      { value: "light", label: "Light" },
      { value: "dark", label: "Dark" },
      { value: "auto", label: "Auto" },
    ],
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState("option1");

    return (
      <div className="space-y-4">
        <RadioGroup
          label="Select an option"
          value={value}
          onChange={setValue}
          options={[
            { value: "option1", label: "Option 1" },
            { value: "option2", label: "Option 2" },
            { value: "option3", label: "Option 3" },
          ]}
        />
        <p className="text-sm text-muted-foreground">
          Selected value: <strong>{value}</strong>
        </p>
        <button
          onClick={() => setValue("option2")}
          className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md text-sm"
        >
          Set to Option 2
        </button>
      </div>
    );
  },
};

export const PaymentMethods: Story = {
  render: () => {
    const [method, setMethod] = useState("");

    return (
      <RadioGroup
        label="Payment Method"
        labelRequired
        value={method}
        onChange={setMethod}
        options={[
          {
            value: "card",
            label: "Credit or Debit Card",
            description: "Pay securely with your card",
          },
          {
            value: "paypal",
            label: "PayPal",
            description: "Use your PayPal account",
          },
          {
            value: "bank",
            label: "Bank Transfer",
            description: "Direct transfer from your bank account",
          },
          {
            value: "crypto",
            label: "Cryptocurrency",
            description: "Pay with Bitcoin or Ethereum",
          },
        ]}
      />
    );
  },
};

export const ShippingOptions: Story = {
  render: () => {
    const [shipping, setShipping] = useState("standard");

    return (
      <div className="space-y-4">
        <RadioGroup
          label="Shipping Method"
          labelRequired
          value={shipping}
          onChange={setShipping}
          options={[
            {
              value: "standard",
              label: "Standard Shipping (Free)",
              description: "Delivery in 5-7 business days",
            },
            {
              value: "express",
              label: "Express Shipping ($9.99)",
              description: "Delivery in 2-3 business days",
            },
            {
              value: "overnight",
              label: "Overnight Shipping ($24.99)",
              description: "Next business day delivery",
            },
          ]}
        />
        {shipping && (
          <div className="p-4 bg-secondary rounded-md">
            <p className="text-sm">
              <strong>Selected:</strong> {shipping.charAt(0).toUpperCase() + shipping.slice(1)} Shipping
            </p>
          </div>
        )}
      </div>
    );
  },
};

export const FormExample: Story = {
  render: () => {
    const [gender, setGender] = useState("");
    const [plan, setPlan] = useState("");
    const [error, setError] = useState({ gender: "", plan: "" });

    const handleSubmit = () => {
      const newError = { gender: "", plan: "" };

      if (!gender) newError.gender = "Please select your gender";
      if (!plan) newError.plan = "Please select a plan";

      setError(newError);

      if (gender && plan) {
        alert(`Submitted:\nGender: ${gender}\nPlan: ${plan}`);
      }
    };

    return (
      <div className="max-w-md space-y-6">
        <RadioGroup
          label="Gender"
          labelRequired
          value={gender}
          onChange={(value) => {
            setGender(value);
            if (value) setError((prev) => ({ ...prev, gender: "" }));
          }}
          error={error.gender}
          orientation="horizontal"
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "other", label: "Other" },
          ]}
        />

        <RadioGroup
          label="Select Plan"
          labelRequired
          value={plan}
          onChange={(value) => {
            setPlan(value);
            if (value) setError((prev) => ({ ...prev, plan: "" }));
          }}
          error={error.plan}
          options={[
            {
              value: "basic",
              label: "Basic - Free",
              description: "Perfect for personal use",
            },
            {
              value: "pro",
              label: "Pro - $9/month",
              description: "For professionals and small teams",
            },
            {
              value: "business",
              label: "Business - $29/month",
              description: "For growing businesses",
            },
          ]}
        />

        <button
          onClick={handleSubmit}
          className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md"
        >
          Submit
        </button>
      </div>
    );
  },
};