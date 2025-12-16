import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "./label";

const meta: Meta<typeof Label> = {
  title: "Components/Form/Label",
  component: Label,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    children: "Label Text",
  },
};

export const Required: Story = {
  args: {
    children: "Required Field",
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled Label",
    disabled: true,
  },
};

export const RequiredAndDisabled: Story = {
  args: {
    children: "Required and Disabled",
    required: true,
    disabled: true,
  },
};

export const WithInput: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="email-input" required>
        Email Address
      </Label>
      <input
        id="email-input"
        type="email"
        placeholder="you@example.com"
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
      />
    </div>
  ),
};

export const FormLabels: Story = {
  render: () => (
    <div className="max-w-md space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name" required>
          Full Name
        </Label>
        <input
          id="name"
          type="text"
          placeholder="John Doe"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" required>
          Email
        </Label>
        <input
          id="email"
          type="email"
          placeholder="john@example.com"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">
          Bio (Optional)
        </Label>
        <textarea
          id="bio"
          placeholder="Tell us about yourself..."
          rows={4}
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="country" disabled>
          Country (Locked)
        </Label>
        <input
          id="country"
          type="text"
          value="United States"
          disabled
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm opacity-50"
        />
      </div>
    </div>
  ),
};

export const DifferentStyles: Story = {
  render: () => (
    <div className="space-y-4">
      <Label>Default Label</Label>
      <Label required>Required Label</Label>
      <Label disabled>Disabled Label</Label>
      <Label className="text-lg font-bold">Custom Styled Label</Label>
      <Label className="text-primary">Colored Label</Label>
    </div>
  ),
};