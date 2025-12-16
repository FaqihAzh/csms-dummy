import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";
import { Mail, Lock, Search, Eye, EyeOff, User, CreditCard } from "lucide-react";
import { useState } from "react";

const meta: Meta<typeof Input> = {
  title: "Components/Form/Input",
  component: Input,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Email Address",
    placeholder: "Enter your email",
    type: "email",
  },
};

export const Required: Story = {
  args: {
    label: "Username",
    placeholder: "Enter username",
    labelRequired: true,
  },
};

export const WithError: Story = {
  args: {
    label: "Email",
    placeholder: "Enter your email",
    labelRequired: true,
    error: "Please enter a valid email address",
    defaultValue: "invalid-email",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "Enter password",
    helperText: "Password must be at least 8 characters long",
  },
};

export const WithLeftIcon: Story = {
  args: {
    label: "Email",
    placeholder: "you@example.com",
    leftIcon: <Mail className="h-4 w-4" />,
  },
};

export const WithRightIcon: Story = {
  args: {
    label: "Search",
    placeholder: "Search...",
    rightIcon: <Search className="h-4 w-4" />,
  },
};

export const WithBothIcons: Story = {
  args: {
    label: "Card Number",
    placeholder: "1234 5678 9012 3456",
    leftIcon: <CreditCard className="h-4 w-4" />,
    rightIcon: <Lock className="h-4 w-4" />,
  },
};

export const PasswordToggle: Story = {
  render: () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <Input
        label="Password"
        type={showPassword ? "text" : "password"}
        placeholder="Enter your password"
        labelRequired
        rightIcon={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="hover:text-foreground transition-colors"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        }
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Input",
    placeholder: "This input is disabled",
    disabled: true,
    defaultValue: "Cannot edit this",
  },
};

export const ReadOnly: Story = {
  args: {
    label: "Read Only",
    readOnly: true,
    defaultValue: "This is read-only content",
  },
};

export const DifferentTypes: Story = {
  render: () => (
    <div className="space-y-4">
      <Input label="Text" type="text" placeholder="Text input" />
      <Input label="Email" type="email" placeholder="email@example.com" />
      <Input label="Password" type="password" placeholder="Password" />
      <Input label="Number" type="number" placeholder="123" />
      <Input label="Tel" type="tel" placeholder="+1 (555) 123-4567" />
      <Input label="URL" type="url" placeholder="https://example.com" />
      <Input label="Date" type="date" />
      <Input label="Time" type="time" />
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <div className="max-w-md space-y-4">
      <Input
        label="Full Name"
        placeholder="John Doe"
        labelRequired
        leftIcon={<User className="h-4 w-4" />}
      />
      <Input
        label="Email Address"
        type="email"
        placeholder="john@example.com"
        labelRequired
        leftIcon={<Mail className="h-4 w-4" />}
        helperText="We'll never share your email"
      />
      <Input
        label="Password"
        type="password"
        placeholder="Enter password"
        labelRequired
        leftIcon={<Lock className="h-4 w-4" />}
        helperText="Must be at least 8 characters"
      />
    </div>
  ),
};

export const WithValidation: Story = {
  render: () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const validateEmail = (value: string) => {
      if (!value) {
        setError("Email is required");
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        setError("Please enter a valid email");
      } else {
        setError("");
      }
    };

    return (
      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        labelRequired
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          validateEmail(e.target.value);
        }}
        onBlur={(e) => validateEmail(e.target.value)}
        error={error}
        leftIcon={<Mail className="h-4 w-4" />}
      />
    );
  },
};