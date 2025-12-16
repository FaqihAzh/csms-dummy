import type { Meta, StoryObj } from "@storybook/react";
import { FileUploader, UploadedFile } from "./file-uploader";
import { useState } from "react";

const meta: Meta<typeof FileUploader> = {
    title: "Components/Form/FileUploader",
    component: FileUploader,
    tags: ["autodocs"],
    argTypes: {
        mode: {
            control: "radio",
            options: ["dropzone", "button"],
        },
    },
};

export default meta;
type Story = StoryObj<typeof FileUploader>;

export const Default: Story = {
    args: {
        label: "Upload Documents",
    },
};

export const WithLabel: Story = {
    args: {
        label: "Profile Picture",
        helperText: "Upload a photo for your profile",
    },
};

export const Multiple: Story = {
    args: {
        label: "Upload Gallery",
        multiple: true,
        maxFiles: 5,
        helperText: "You can upload up to 5 images",
    },
};

export const AcceptedTypes: Story = {
    args: {
        label: "Upload Images Only",
        accept: "image/*",
        helperText: "Only image files are allowed",
    },
};

export const ButtonMode: Story = {
    args: {
        label: "Attachment",
        mode: "button",
        helperText: "Click button to select file",
    },
};

export const Disabled: Story = {
    args: {
        label: "Upload Disabled",
        disabled: true,
    },
};

export const WithError: Story = {
    args: {
        label: "Upload Error",
        error: "Failed to upload file. Please try again.",
    },
};

export const WithInitialFiles: Story = {
    args: {
        label: "Existing Files",
        value: [
            {
                id: "1",
                file: new File(["dummy content"], "document.pdf", { type: "application/pdf" }),
                status: "success",
            },
            {
                id: "2",
                file: new File(["dummy content"], "image.png", { type: "image/png" }),
                status: "uploading",
                progress: 45,
            },
            {
                id: "3",
                file: new File(["dummy content"], "error.txt", { type: "text/plain" }),
                status: "error",
                error: "File too large",
            },
        ],
    },
};

export const Controlled: Story = {
    render: () => {
        const [files, setFiles] = useState<UploadedFile[]>([]);

        return (
            <div className="space-y-4">
                <FileUploader
                    label="Controlled Uploader"
                    value={files}
                    onChange={setFiles}
                    multiple
                    accept="image/*"
                    helperText="Upload images (controlled state)"
                />
                <div className="p-4 bg-secondary rounded-md">
                    <p className="text-sm font-medium">State Preview:</p>
                    <pre className="text-xs mt-2 overflow-auto max-h-40">
                        {JSON.stringify(
                            files.map((f) => ({
                                name: f.file.name,
                                size: f.file.size,
                                status: f.status,
                            })),
                            null,
                            2
                        )}
                    </pre>
                </div>
            </div>
        );
    },
};
