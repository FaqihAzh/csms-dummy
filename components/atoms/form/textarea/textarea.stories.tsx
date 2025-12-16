import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./textarea";
import { useState } from "react";

const meta: Meta<typeof Textarea> = {
  title: "Components/Form/Textarea",
  component: Textarea,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: "Enter your message...",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Description",
    placeholder: "Describe your issue...",
  },
};

export const Required: Story = {
  args: {
    label: "Comment",
    placeholder: "Leave a comment...",
    labelRequired: true,
  },
};

export const WithError: Story = {
  args: {
    label: "Message",
    placeholder: "Enter message",
    labelRequired: true,
    error: "Message must be at least 10 characters",
    defaultValue: "Too short",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Bio",
    placeholder: "Tell us about yourself...",
    helperText: "Brief description for your profile",
    rows: 4,
  },
};

export const WithCharacterCount: Story = {
  args: {
    label: "Tweet",
    placeholder: "What's happening?",
    maxLength: 280,
    showCount: true,
    rows: 3,
  },
};

export const CharacterCountWithValue: Story = {
  render: () => {
    const [value, setValue] = useState("This is a sample tweet!");

    return (
      <Textarea
        label="Tweet"
        placeholder="What's happening?"
        maxLength={280}
        showCount
        rows={3}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Textarea",
    placeholder: "This textarea is disabled",
    disabled: true,
    defaultValue: "Cannot edit this text",
  },
};

export const ReadOnly: Story = {
  args: {
    label: "Terms and Conditions",
    readOnly: true,
    rows: 6,
    defaultValue: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  },
};

export const DifferentSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Textarea label="Small (2 rows)" rows={2} placeholder="2 rows..." />
      <Textarea label="Medium (4 rows)" rows={4} placeholder="4 rows..." />
      <Textarea label="Large (8 rows)" rows={8} placeholder="8 rows..." />
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <div className="max-w-md space-y-4">
      <Textarea
        label="Subject"
        placeholder="Brief subject of your message"
        labelRequired
        rows={2}
      />
      <Textarea
        label="Message"
        placeholder="Enter your detailed message here..."
        labelRequired
        helperText="Please provide as much detail as possible"
        rows={6}
        maxLength={500}
        showCount
      />
    </div>
  ),
};

export const WithValidation: Story = {
  render: () => {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");

    const validateMessage = (text: string) => {
      if (!text) {
        setError("Message is required");
      } else if (text.length < 10) {
        setError("Message must be at least 10 characters");
      } else if (text.length > 500) {
        setError("Message must not exceed 500 characters");
      } else {
        setError("");
      }
    };

    return (
      <Textarea
        label="Feedback"
        placeholder="Share your feedback..."
        labelRequired
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          validateMessage(e.target.value);
        }}
        onBlur={(e) => validateMessage(e.target.value)}
        error={error}
        maxLength={500}
        showCount
        rows={5}
      />
    );
  },
};