import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./badge";
import { Check, X, AlertTriangle, Star, Zap, InfoIcon } from "lucide-react";
import React from "react";

const meta: Meta<typeof Badge> = {
  title: "Components/UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "destructive",
        "warning",
        "success",
        "info",
        "outline",
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: "Badge",
    variant: "default",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary",
    variant: "secondary",
  },
};

export const Destructive: Story = {
  args: {
    children: "Destructive",
    variant: "destructive",
  },
};

export const Warning: Story = {
  args: {
    children: "Warning",
    variant: "warning",
  },
};

export const Success: Story = {
  args: {
    children: "Success",
    variant: "success",
  },
};

export const Info: Story = {
  args: {
    children: "Info",
    variant: "info",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline",
    variant: "outline",
  },
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="success">
        <Check className="mr-1 h-3 w-3" />
        Completed
      </Badge>
      <Badge variant="destructive">
        <X className="mr-1 h-3 w-3" />
        Failed
      </Badge>
      <Badge variant="extreme">
        <X className="mr-1 h-3 w-3" />
        Extreme
      </Badge>
      <Badge variant="warning">
        <AlertTriangle className="mr-1 h-3 w-3" />
        Warning
      </Badge>
      <Badge variant="info">
        <InfoIcon className="mr-1 h-3 w-3" />
        Information
      </Badge>
    </div>
  ),
};

export const StatusBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="success">Active</Badge>
      <Badge variant="warning">Pending</Badge>
      <Badge variant="destructive">Inactive</Badge>
      <Badge variant="secondary">Draft</Badge>
      <Badge variant="info">Review</Badge>
      <Badge variant="outline">Archived</Badge>
    </div>
  ),
};

export const WithDot: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="success">
        <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-success" />
        Online
      </Badge>
      <Badge variant="warning">
        <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-warning" />
        Away
      </Badge>
      <Badge variant="destructive">
        <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-destructive" />
        Offline
      </Badge>
      <Badge variant="secondary">
        <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-secondary-foreground" />
        Busy
      </Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge className="text-[10px] px-2 py-0">Small</Badge>
      <Badge>Default</Badge>
      <Badge className="text-sm px-3 py-1">Large</Badge>
    </div>
  ),
};

export const Removable: Story = {
  render: () => {
    const [badges, setBadges] = React.useState([
      { id: 1, label: "React", variant: "default" as const },
      { id: 2, label: "TypeScript", variant: "info" as const },
      { id: 3, label: "Tailwind", variant: "success" as const },
      { id: 4, label: "Storybook", variant: "warning" as const },
    ]);

    const removeBadge = (id: number) => {
      setBadges(badges.filter((b) => b.id !== id));
    };

    return (
      <div className="flex flex-wrap gap-2">
        {badges.map((badge) => (
          <Badge key={badge.id} variant={badge.variant}>
            {badge.label}
            <button
              onClick={() => removeBadge(badge.id)}
              className="ml-1.5 rounded-full hover:bg-black/10 p-0.5"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
    );
  },
};

export const NotificationBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <div className="relative inline-flex">
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
          Messages
        </button>
        <Badge
          variant="destructive"
          className="absolute -top-2 -right-2 px-2 min-w-[1.25rem] h-5"
        >
          3
        </Badge>
      </div>

      <div className="relative inline-flex">
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
          Notifications
        </button>
        <Badge
          variant="warning"
          className="absolute -top-2 -right-2 px-2 min-w-[1.25rem] h-5"
        >
          12
        </Badge>
      </div>

      <div className="relative inline-flex">
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
          Cart
        </button>
        <Badge
          variant="success"
          className="absolute -top-2 -right-2 px-2 min-w-[1.25rem] h-5"
        >
          5
        </Badge>
      </div>
    </div>
  ),
};

export const CategoryBadges: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Programming Languages</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">JavaScript</Badge>
          <Badge variant="default">TypeScript</Badge>
          <Badge variant="default">Python</Badge>
          <Badge variant="default">Go</Badge>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Frameworks</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="info">React</Badge>
          <Badge variant="info">Next.js</Badge>
          <Badge variant="info">Vue</Badge>
          <Badge variant="info">Angular</Badge>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Skills</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="success">
            <Star className="mr-1 h-3 w-3" />
            Expert
          </Badge>
          <Badge variant="warning">
            <Zap className="mr-1 h-3 w-3" />
            Intermediate
          </Badge>
          <Badge variant="outline">Beginner</Badge>
        </div>
      </div>
    </div>
  ),
};