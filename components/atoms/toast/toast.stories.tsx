import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  Toast,
  ToastProvider,
  ToastViewport,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
} from "./toast";
import { Button } from "../button/button";
import { Check, AlertTriangle, X as XIcon, InfoIcon } from "lucide-react";

const meta: Meta<typeof Toast> = {
  title: "Components/UI/Toast",
  component: Toast,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <ToastProvider>
        <Button onClick={() => setOpen(true)}>Show Toast</Button>
        <Toast open={open} onOpenChange={setOpen}>
          <div className="grid gap-1">
            <ToastTitle>Notification</ToastTitle>
            <ToastDescription>This is a default toast message.</ToastDescription>
          </div>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );
  },
};

export const Success: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <ToastProvider>
        <Button variant="success" onClick={() => setOpen(true)}>
          Show Success Toast
        </Button>
        <Toast variant="success" open={open} onOpenChange={setOpen}>
          <div className="flex gap-3">
            <Check className="h-5 w-5 mt-0.5" />
            <div className="grid gap-1">
              <ToastTitle>Success!</ToastTitle>
              <ToastDescription>
                Your changes have been saved successfully.
              </ToastDescription>
            </div>
          </div>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );
  },
};

export const Destructive: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <ToastProvider>
        <Button variant="destructive" onClick={() => setOpen(true)}>
          Show Error Toast
        </Button>
        <Toast variant="destructive" open={open} onOpenChange={setOpen}>
          <div className="flex gap-3">
            <XIcon className="h-5 w-5 mt-0.5" />
            <div className="grid gap-1">
              <ToastTitle>Error</ToastTitle>
              <ToastDescription>
                Something went wrong. Please try again.
              </ToastDescription>
            </div>
          </div>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );
  },
};

export const Warning: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <ToastProvider>
        <Button variant="warning" onClick={() => setOpen(true)}>
          Show Warning Toast
        </Button>
        <Toast variant="warning" open={open} onOpenChange={setOpen}>
          <div className="flex gap-3">
            <AlertTriangle className="h-5 w-5 mt-0.5" />
            <div className="grid gap-1">
              <ToastTitle>Warning</ToastTitle>
              <ToastDescription>
                Your session will expire in 5 minutes.
              </ToastDescription>
            </div>
          </div>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );
  },
};

export const Info: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <ToastProvider>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Show Info Toast
        </Button>
        <Toast variant="info" open={open} onOpenChange={setOpen}>
          <div className="flex gap-3">
            <InfoIcon className="h-5 w-5 mt-0.5" />
            <div className="grid gap-1">
              <ToastTitle>Information</ToastTitle>
              <ToastDescription>
                A new update is available for download.
              </ToastDescription>
            </div>
          </div>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );
  },
};

export const WithAction: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <ToastProvider>
        <Button onClick={() => setOpen(true)}>Schedule Meeting</Button>
        <Toast open={open} onOpenChange={setOpen}>
          <div className="grid gap-1">
            <ToastTitle>Meeting Scheduled</ToastTitle>
            <ToastDescription>
              Your meeting has been scheduled for tomorrow at 10:00 AM.
            </ToastDescription>
          </div>
          <ToastAction altText="View calendar" onClick={() => alert("View calendar")}>
            View
          </ToastAction>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );
  },
};

export const WithActionDestructive: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <ToastProvider>
        <Button variant="destructive" onClick={() => setOpen(true)}>
          Delete Item
        </Button>
        <Toast variant="destructive" open={open} onOpenChange={setOpen}>
          <div className="grid gap-1">
            <ToastTitle>Item Deleted</ToastTitle>
            <ToastDescription>
              The item has been permanently deleted.
            </ToastDescription>
          </div>
          <ToastAction altText="Undo deletion" onClick={() => alert("Undo")}>
            Undo
          </ToastAction>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );
  },
};

export const SimpleMessage: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <ToastProvider>
        <Button onClick={() => setOpen(true)}>Copy to Clipboard</Button>
        <Toast open={open} onOpenChange={setOpen}>
          <ToastDescription>Link copied to clipboard!</ToastDescription>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );
  },
};

export const MultipleToasts: Story = {
  render: () => {
    const [toasts, setToasts] = useState<{ id: number; variant: any; message: string }[]>([]);
    const [nextId, setNextId] = useState(1);

    const addToast = (variant: any, message: string) => {
      const id = nextId;
      setNextId(id + 1);
      setToasts([...toasts, { id, variant, message }]);
    };

    const removeToast = (id: number) => {
      setToasts(toasts.filter((t) => t.id !== id));
    };

    return (
      <ToastProvider>
        <div className="flex gap-2 flex-wrap">
          <Button onClick={() => addToast("default", "Default notification")}>
            Default
          </Button>
          <Button
            variant="success"
            onClick={() => addToast("success", "Operation successful!")}
          >
            Success
          </Button>
          <Button
            variant="destructive"
            onClick={() => addToast("destructive", "An error occurred")}
          >
            Error
          </Button>
          <Button
            variant="warning"
            onClick={() => addToast("warning", "Warning message")}
          >
            Warning
          </Button>
        </div>

        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            variant={toast.variant}
            open={true}
            onOpenChange={() => removeToast(toast.id)}
            duration={3000}
          >
            <ToastDescription>{toast.message}</ToastDescription>
            <ToastClose />
          </Toast>
        ))}

        <ToastViewport />
      </ToastProvider>
    );
  },
};

export const LongContent: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <ToastProvider>
        <Button onClick={() => setOpen(true)}>Show Long Toast</Button>
        <Toast open={open} onOpenChange={setOpen}>
          <div className="grid gap-1">
            <ToastTitle>System Update Available</ToastTitle>
            <ToastDescription>
              A new system update is available for download. This update includes
              important security patches, performance improvements, and new
              features. It is recommended to install this update as soon as
              possible.
            </ToastDescription>
          </div>
          <ToastAction altText="Update now" onClick={() => alert("Updating...")}>
            Update
          </ToastAction>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );
  },
};

export const AutoDismiss: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <ToastProvider>
        <Button onClick={() => setOpen(true)}>Auto Dismiss (3s)</Button>
        <Toast open={open} onOpenChange={setOpen} duration={3000}>
          <div className="grid gap-1">
            <ToastTitle>Auto Dismiss</ToastTitle>
            <ToastDescription>
              This toast will automatically close after 3 seconds.
            </ToastDescription>
          </div>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );
  },
};