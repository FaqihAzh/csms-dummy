import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";
import { Mail, ArrowRight, Trash2, AlertTriangle, Save } from "lucide-react";

const meta: Meta<typeof Button> = {
    title: "Components/UI/Button",
    component: Button,
    tags: ["autodocs"],
    argTypes: {
        variant: {
            control: "select",
            options: [
                "default",
                "secondary",
                "outline",
                "ghost",
                "link",
                "destructive",
                "warning",
            ],
        },
        size: {
            control: "select",
            options: ["default", "sm", "lg", "icon", "icon-sm", "icon-lg"],
        },
        isLoading: {
            control: "boolean",
        },
        disabled: {
            control: "boolean",
        },
        asChild: {
            table: {
                disable: true,
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
    args: {
        children: "Button",
        variant: "default",
    },
};

export const Secondary: Story = {
    args: {
        children: "Secondary",
        variant: "secondary",
    },
};

export const Outline: Story = {
    args: {
        children: "Outline",
        variant: "outline",
    },
};

export const Ghost: Story = {
    args: {
        children: "Ghost",
        variant: "ghost",
    },
};

export const Link: Story = {
    args: {
        children: "Link Button",
        variant: "link",
    },
};

export const Destructive: Story = {
    args: {
        children: "Delete Account",
        variant: "destructive",
        leftIcon: <Trash2 className="h-4 w-4" />,
    },
};

export const Warning: Story = {
    args: {
        children: "Proceed with Caution",
        variant: "warning",
        leftIcon: <AlertTriangle className="h-4 w-4" />,
    },
};

export const WithIcons: Story = {
    args: {
        children: "Login with Email",
        leftIcon: <Mail className="h-4 w-4" />,
    },
};

export const RightIcon: Story = {
    args: {
        children: "Get Started",
        rightIcon: <ArrowRight className="h-4 w-4" />,
    },
};

export const Loading: Story = {
    args: {
        children: "Saving...",
        isLoading: true,
        variant: "default",
    },
};

export const IconOnly: Story = {
    args: {
        size: "icon",
        variant: "outline",
        children: <Save className="h-4 w-4" />,
    },
};

export const Large: Story = {
    args: {
        size: "lg",
        children: "Large Call to Action",
    },
};