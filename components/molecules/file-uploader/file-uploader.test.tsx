import { render, screen, fireEvent } from "@testing-library/react";
import { FileUploader } from "./file-uploader";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";

describe("FileUploader", () => {
    it("renders correctly with label", () => {
        render(<FileUploader label="Upload File" />);
        expect(screen.getByText("Upload File")).toBeInTheDocument();
        expect(screen.getByText("Click to upload or drag and drop")).toBeInTheDocument();
    });

    it("handles file selection", async () => {
        const handleChange = vi.fn();
        render(<FileUploader onChange={handleChange} />);

        const file = new File(["dummy content"], "test.png", { type: "image/png" });
        const input = screen.getByLabelText(/click to upload/i, { selector: "input" });

        await userEvent.upload(input, file);

        expect(handleChange).toHaveBeenCalled();
        expect(screen.getByText("test.png")).toBeInTheDocument();
    });

    it("validates file size", async () => {
        const handleChange = vi.fn();
        render(<FileUploader onChange={handleChange} maxSize={1} />); // 1MB max

        // Create a large file (2MB)
        const largeFile = new File(["a".repeat(2 * 1024 * 1024)], "large.png", { type: "image/png" });
        const input = screen.getByLabelText(/click to upload/i, { selector: "input" });

        await userEvent.upload(input, largeFile);

        expect(screen.getByText(/File size must be less than 1MB/i)).toBeInTheDocument();
    });

    it("validates file type", async () => {
        const handleChange = vi.fn();
        render(<FileUploader onChange={handleChange} accept="image/*" />);

        const invalidFile = new File(["dummy content"], "test.txt", { type: "text/plain" });
        const input = screen.getByLabelText(/click to upload/i, { selector: "input" });

        await userEvent.upload(input, invalidFile);

        expect(screen.getByText(/File type not accepted/i)).toBeInTheDocument();
    });

    it("handles multiple files", async () => {
        const handleChange = vi.fn();
        render(<FileUploader onChange={handleChange} multiple />);

        const file1 = new File(["content1"], "file1.png", { type: "image/png" });
        const file2 = new File(["content2"], "file2.png", { type: "image/png" });
        const input = screen.getByLabelText(/click to upload/i, { selector: "input" });

        await userEvent.upload(input, [file1, file2]);

        expect(screen.getByText("file1.png")).toBeInTheDocument();
        expect(screen.getByText("file2.png")).toBeInTheDocument();
        expect(handleChange).toHaveBeenCalled();
    });

    it("removes file when delete button is clicked", async () => {
        const handleChange = vi.fn();
        render(<FileUploader onChange={handleChange} />);

        const file = new File(["dummy content"], "test.png", { type: "image/png" });
        const input = screen.getByLabelText(/click to upload/i, { selector: "input" });

        await userEvent.upload(input, file);
        expect(screen.getByText("test.png")).toBeInTheDocument();

        const removeButton = screen.getByRole("button", { name: "" }); // The X icon button usually has no text, might need aria-label in component
        // Since the component uses lucide-react X icon inside a button, we can find it by class or role.
        // Let's assume the button is findable. In the component it's:
        // <Button ... onClick={() => removeFile(uploadedFile.id)} ...> <X ... /> </Button>

        // We can try finding by the remove icon or just the button in the file list item
        const buttons = screen.getAllByRole("button");
        const deleteButton = buttons[buttons.length - 1]; // Last button is likely the remove button

        fireEvent.click(deleteButton);

        expect(screen.queryByText("test.png")).not.toBeInTheDocument();
    });

    it("renders in button mode", () => {
        render(<FileUploader mode="button" label="Upload" />);
        expect(screen.getByRole("button", { name: /choose file/i })).toBeInTheDocument();
        expect(screen.queryByText("Click to upload or drag and drop")).not.toBeInTheDocument();
    });
});
