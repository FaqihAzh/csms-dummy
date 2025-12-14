import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer";

describe("Drawer Component", () => {
  it("renders trigger button correctly", () => {
    render(
      <Drawer>
        <DrawerTrigger>Open Drawer</DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Test Drawer</DrawerTitle>
        </DrawerContent>
      </Drawer>
    );

    expect(screen.getByText("Open Drawer")).toBeInTheDocument();
  });

  it("opens drawer when trigger is clicked", async () => {
    render(
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Test Title</DrawerTitle>
          <DrawerDescription>Test Description</DrawerDescription>
        </DrawerContent>
      </Drawer>
    );

    const trigger = screen.getByText("Open");
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
      expect(screen.getByText("Test Title")).toBeInTheDocument();
      expect(screen.getByText("Test Description")).toBeInTheDocument();
    });
  });

  it("closes drawer when DrawerClose is clicked", async () => {
    render(
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Test Title</DrawerTitle>
          <DrawerFooter>
            <DrawerClose>Close</DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );

    fireEvent.click(screen.getByText("Open"));

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Close"));

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("renders header and footer correctly", async () => {
    render(
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Header Title</DrawerTitle>
            <DrawerDescription>Header Description</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <button>Footer Button</button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );

    fireEvent.click(screen.getByText("Open"));

    await waitFor(() => {
      expect(screen.getByText("Header Title")).toBeInTheDocument();
      expect(screen.getByText("Header Description")).toBeInTheDocument();
      expect(screen.getByText("Footer Button")).toBeInTheDocument();
    });
  });

  it("renders drag handle", async () => {
    render(
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Test Title</DrawerTitle>
        </DrawerContent>
      </Drawer>
    );

    fireEvent.click(screen.getByText("Open"));

    await waitFor(() => {
      const content = screen.getByRole("dialog");
      // Check if the drag handle (rounded bar) exists
      const dragHandle = content.querySelector(".rounded-full.bg-muted");
      expect(dragHandle).toBeInTheDocument();
    });
  });

  it("supports controlled state", async () => {
    const onOpenChange = vi.fn();

    const { rerender } = render(
      <Drawer open={false} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerTitle>Controlled Drawer</DrawerTitle>
        </DrawerContent>
      </Drawer>
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    rerender(
      <Drawer open={true} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerTitle>Controlled Drawer</DrawerTitle>
        </DrawerContent>
      </Drawer>
    );

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
  });

  it("renders drawer overlay", async () => {
    render(
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Test Title</DrawerTitle>
        </DrawerContent>
      </Drawer>
    );

    fireEvent.click(screen.getByText("Open"));

    await waitFor(() => {
      const dialog = screen.getByRole("dialog");
      // Check if overlay exists (parent of dialog content should have bg-black/80)
      const overlay = dialog.parentElement?.previousElementSibling;
      expect(overlay).toBeInTheDocument();
    });
  });

  it("supports dismissible prop", async () => {
    render(
      <Drawer dismissible={false}>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Non-dismissible Drawer</DrawerTitle>
          <DrawerFooter>
            <DrawerClose>Close</DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );

    fireEvent.click(screen.getByText("Open"));

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    // Try to close by clicking outside (on overlay)
    const dialog = screen.getByRole("dialog");
    const overlay = dialog.parentElement;
    
    if (overlay) {
      fireEvent.click(overlay);
      
      // Drawer should still be open since dismissible is false
      await waitFor(() => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
      });
    }
  });

  it("accepts custom className", async () => {
    render(
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent className="custom-drawer-class">
          <DrawerTitle>Test Title</DrawerTitle>
        </DrawerContent>
      </Drawer>
    );

    fireEvent.click(screen.getByText("Open"));

    await waitFor(() => {
      const dialog = screen.getByRole("dialog");
      expect(dialog).toHaveClass("custom-drawer-class");
    });
  });

  it("renders children content correctly", async () => {
    render(
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Title</DrawerTitle>
          </DrawerHeader>
          <div className="p-4">
            <p>Custom content inside drawer</p>
          </div>
          <DrawerFooter>
            <button>Action Button</button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );

    fireEvent.click(screen.getByText("Open"));

    await waitFor(() => {
      expect(screen.getByText("Custom content inside drawer")).toBeInTheDocument();
      expect(screen.getByText("Action Button")).toBeInTheDocument();
    });
  });
});