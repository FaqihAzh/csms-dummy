import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import {
  Toast,
  ToastProvider,
  ToastViewport,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
} from "./toast";

describe("Toast Component", () => {
  it("renders with title and description", async () => {
    render(
      <ToastProvider>
        <Toast open={true}>
          <ToastTitle>Test Title</ToastTitle>
          <ToastDescription>Test Description</ToastDescription>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Test Title")).toBeInTheDocument();
      expect(screen.getByText("Test Description")).toBeInTheDocument();
    });
  });

  it("applies correct variant classes", async () => {
    const { rerender } = render(
      <ToastProvider>
        <Toast open={true} variant="destructive" data-testid="toast">
          <ToastDescription>Destructive</ToastDescription>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );

    await waitFor(() => {
      const toast = screen.getByTestId("toast");
      expect(toast).toHaveClass("destructive");
    });

    rerender(
      <ToastProvider>
        <Toast open={true} variant="success" data-testid="toast">
          <ToastDescription>Success</ToastDescription>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );

    await waitFor(() => {
      const toast = screen.getByTestId("toast");
      expect(toast).toHaveClass("success");
    });

    rerender(
      <ToastProvider>
        <Toast open={true} variant="warning" data-testid="toast">
          <ToastDescription>Warning</ToastDescription>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );

    await waitFor(() => {
      const toast = screen.getByTestId("toast");
      expect(toast).toHaveClass("warning");
    });

    rerender(
      <ToastProvider>
        <Toast open={true} variant="info" data-testid="toast">
          <ToastDescription>Info</ToastDescription>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );

    await waitFor(() => {
      const toast = screen.getByTestId("toast");
      expect(toast).toHaveClass("info");
    });
  });

  it("renders close button", async () => {
    render(
      <ToastProvider>
        <Toast open={true}>
          <ToastDescription>Test</ToastDescription>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );

    await waitFor(() => {
      const closeButton = screen.getByRole("button");
      expect(closeButton).toBeInTheDocument();
    });
  });

  it("closes when close button is clicked", async () => {
    const onOpenChange = vi.fn();

    render(
      <ToastProvider>
        <Toast open={true} onOpenChange={onOpenChange}>
          <ToastDescription>Test</ToastDescription>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );

    await waitFor(() => {
      const closeButton = screen.getByRole("button");
      fireEvent.click(closeButton);
    });

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("renders with action button", async () => {
    const handleAction = vi.fn();

    render(
      <ToastProvider>
        <Toast open={true}>
          <ToastDescription>Test</ToastDescription>
          <ToastAction altText="Test action" onClick={handleAction}>
            Action
          </ToastAction>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );

    await waitFor(() => {
      const actionButton = screen.getByText("Action");
      expect(actionButton).toBeInTheDocument();
    });
  });

  it("calls action onClick handler", async () => {
    const handleAction = vi.fn();

    render(
      <ToastProvider>
        <Toast open={true}>
          <ToastDescription>Test</ToastDescription>
          <ToastAction altText="Test action" onClick={handleAction}>
            Action
          </ToastAction>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );

    await waitFor(() => {
      const actionButton = screen.getByText("Action");
      fireEvent.click(actionButton);
    });

    expect(handleAction).toHaveBeenCalled();
  });

  it("does not render when open is false", () => {
    render(
      <ToastProvider>
        <Toast open={false}>
          <ToastDescription>Test</ToastDescription>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );

    expect(screen.queryByText("Test")).not.toBeInTheDocument();
  });

  it("renders only description without title", async () => {
    render(
      <ToastProvider>
        <Toast open={true}>
          <ToastDescription>Only Description</ToastDescription>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Only Description")).toBeInTheDocument();
    });
  });

  it("accepts custom className", async () => {
    render(
      <ToastProvider>
        <Toast open={true} className="custom-toast" data-testid="toast">
          <ToastDescription>Test</ToastDescription>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );

    await waitFor(() => {
      const toast = screen.getByTestId("toast");
      expect(toast).toHaveClass("custom-toast");
    });
  });

  it("renders viewport correctly", () => {
    const { container } = render(
      <ToastProvider>
        <ToastViewport />
      </ToastProvider>
    );

    const viewport = container.querySelector('[data-radix-toast-viewport]');
    expect(viewport).toBeInTheDocument();
  });
});