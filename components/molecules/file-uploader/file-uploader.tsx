'use client'

import React, { useState, useRef } from "react";
import { Upload, X, File, Image as ImageIcon, FileText, Video, Music, Check, AlertCircle } from "lucide-react";
import { cn } from "@/lib";
import { Label, Button, Badge } from "@/components";

export interface UploadedFile {
    id: string;
    file: File;
    preview?: string;
    progress?: number;
    status: "pending" | "uploading" | "success" | "error";
    error?: string;
}

export interface FileUploaderProps {
    label?: string;
    value?: UploadedFile[];
    onChange?: (files: UploadedFile[]) => void;
    onUpload?: (file: File) => Promise<void>;
    accept?: string;
    multiple?: boolean;
    maxSize?: number; // in MB
    maxFiles?: number;
    disabled?: boolean;
    error?: string;
    helperText?: string;
    labelRequired?: boolean;
    showPreview?: boolean;
    uploadOnSelect?: boolean;
    wrapperClassName?: string;
    className?: string;
    mode?: "button" | "dropzone";
}

const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
};

const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) return <ImageIcon className="h-5 w-5" />;
    if (fileType.startsWith("video/")) return <Video className="h-5 w-5" />;
    if (fileType.startsWith("audio/")) return <Music className="h-5 w-5" />;
    if (fileType.includes("pdf") || fileType.includes("document")) return <FileText className="h-5 w-5" />;
    return <File className="h-5 w-5" />;
};

const FileUploader = React.forwardRef<HTMLDivElement, FileUploaderProps>(
    (
        {
            label,
            value = [],
            onChange,
            onUpload,
            accept,
            multiple = false,
            maxSize = 5, // 5MB default
            maxFiles = 10,
            disabled,
            error,
            helperText,
            labelRequired,
            showPreview = true,
            uploadOnSelect = false,
            wrapperClassName,
            className,
            mode = "dropzone",
        },
        ref
    ) => {
        const [isDragging, setIsDragging] = useState(false);
        const [files, setFiles] = useState<UploadedFile[]>(value);
        const inputRef = useRef<HTMLInputElement>(null);

        const uploaderId = `uploader-${Math.random().toString(36).substr(2, 9)}`;
        const hasError = !!error;

        const validateFile = (file: File): string | null => {
            // Check file size
            if (file.size > maxSize * 1024 * 1024) {
                return `File size must be less than ${maxSize}MB`;
            }

            // Check file type
            if (accept) {
                const acceptedTypes = accept.split(",").map(t => t.trim());
                const fileType = file.type;
                const fileExt = `.${file.name.split(".").pop()}`;

                const isAccepted = acceptedTypes.some(type => {
                    if (type.startsWith(".")) {
                        return fileExt === type;
                    }
                    if (type.endsWith("/*")) {
                        const baseType = type.split("/")[0];
                        return fileType.startsWith(baseType);
                    }
                    return fileType === type;
                });

                if (!isAccepted) {
                    return `File type not accepted. Allowed: ${accept}`;
                }
            }

            // Check max files
            if (!multiple && files.length >= 1) {
                return "Only one file allowed";
            }

            if (files.length >= maxFiles) {
                return `Maximum ${maxFiles} files allowed`;
            }

            return null;
        };

        const handleFiles = async (fileList: FileList | null) => {
            if (!fileList || disabled) return;

            const newFiles: UploadedFile[] = [];

            for (let i = 0; i < fileList.length; i++) {
                const file = fileList[i];
                const validationError = validateFile(file);

                const uploadedFile: UploadedFile = {
                    id: `${Date.now()}-${i}`,
                    file,
                    status: validationError ? "error" : "pending",
                    error: validationError || undefined,
                };

                // Create preview for images
                if (showPreview && file.type.startsWith("image/")) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        uploadedFile.preview = e.target?.result as string;
                        setFiles(prev => [...prev]);
                    };
                    reader.readAsDataURL(file);
                }

                newFiles.push(uploadedFile);

                // Auto upload if enabled
                if (uploadOnSelect && onUpload && !validationError) {
                    uploadedFile.status = "uploading";
                    uploadedFile.progress = 0;

                    try {
                        await onUpload(file);
                        uploadedFile.status = "success";
                        uploadedFile.progress = 100;
                    } catch (err) {
                        uploadedFile.status = "error";
                        uploadedFile.error = err instanceof Error ? err.message : "Upload failed";
                    }
                }
            }

            const updatedFiles = multiple ? [...files, ...newFiles] : newFiles;
            setFiles(updatedFiles);
            onChange?.(updatedFiles);
        };

        const handleDragOver = (e: React.DragEvent) => {
            e.preventDefault();
            if (!disabled) {
                setIsDragging(true);
            }
        };

        const handleDragLeave = (e: React.DragEvent) => {
            e.preventDefault();
            setIsDragging(false);
        };

        const handleDrop = (e: React.DragEvent) => {
            e.preventDefault();
            setIsDragging(false);
            handleFiles(e.dataTransfer.files);
        };

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            handleFiles(e.target.files);
            // Reset input value to allow selecting the same file again
            e.target.value = "";
        };

        const removeFile = (id: string) => {
            const updatedFiles = files.filter(f => f.id !== id);
            setFiles(updatedFiles);
            onChange?.(updatedFiles);
        };

        const triggerFileInput = () => {
            inputRef.current?.click();
        };

        return (
            <div ref={ref} className={cn("w-full", wrapperClassName)}>
                {label && (
                    <Label
                        htmlFor={uploaderId}
                        required={labelRequired}
                        disabled={disabled}
                        className="mb-2 block"
                    >
                        {label}
                    </Label>
                )}

                <input
                    ref={inputRef}
                    id={uploaderId}
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    onChange={handleInputChange}
                    disabled={disabled}
                    className="sr-only"
                />

                {mode === "dropzone" ? (
                    <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={triggerFileInput}
                        className={cn(
                            "relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors cursor-pointer",
                            isDragging && "border-primary bg-primary/5",
                            !isDragging && "border-input hover:border-primary/50",
                            disabled && "opacity-50 cursor-not-allowed",
                            hasError && "border-destructive",
                            className
                        )}
                    >
                        <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                        <p className="text-sm font-medium text-center mb-1">
                            {isDragging ? "Drop files here" : "Click to upload or drag and drop"}
                        </p>
                        <p className="text-xs text-muted-foreground text-center">
                            {accept ? `Accepted: ${accept}` : "Any file type"}
                            {maxSize && ` • Max ${maxSize}MB`}
                            {multiple && ` • Up to ${maxFiles} files`}
                        </p>
                    </div>
                ) : (
                    <Button
                        type="button"
                        variant="outline"
                        onClick={triggerFileInput}
                        disabled={disabled}
                        className={className}
                    >
                        <Upload className="h-4 w-4 mr-2" />
                        Choose File{multiple ? "s" : ""}
                    </Button>
                )}

                {/* File List */}
                {files.length > 0 && (
                    <div className="mt-4 space-y-2">
                        {files.map((uploadedFile) => (
                            <div
                                key={uploadedFile.id}
                                className="flex items-center gap-3 p-3 rounded-lg border bg-card"
                            >
                                {/* Preview or Icon */}
                                <div className="flex-shrink-0">
                                    {uploadedFile.preview ? (
                                        <img
                                            src={uploadedFile.preview}
                                            alt={uploadedFile.file.name}
                                            className="h-12 w-12 rounded object-cover"
                                        />
                                    ) : (
                                        <div className="h-12 w-12 rounded bg-muted flex items-center justify-center">
                                            {getFileIcon(uploadedFile.file.type)}
                                        </div>
                                    )}
                                </div>

                                {/* File Info */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">
                                        {uploadedFile.file.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {formatFileSize(uploadedFile.file.size)}
                                    </p>

                                    {/* Progress Bar */}
                                    {uploadedFile.status === "uploading" && uploadedFile.progress !== undefined && (
                                        <div className="mt-2 h-1 bg-secondary rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary transition-all"
                                                style={{ width: `${uploadedFile.progress}%` }}
                                            />
                                        </div>
                                    )}

                                    {/* Error Message */}
                                    {uploadedFile.error && (
                                        <p className="text-xs text-destructive mt-1">
                                            {uploadedFile.error}
                                        </p>
                                    )}
                                </div>

                                {/* Status Badge */}
                                <div className="flex items-center gap-2">
                                    {uploadedFile.status === "success" && (
                                        <Badge variant="success">
                                            <Check className="h-3 w-3 mr-1" />
                                            Uploaded
                                        </Badge>
                                    )}
                                    {uploadedFile.status === "error" && (
                                        <Badge variant="destructive">
                                            <AlertCircle className="h-3 w-3 mr-1" />
                                            Error
                                        </Badge>
                                    )}
                                    {uploadedFile.status === "uploading" && (
                                        <Badge variant="warning">Uploading...</Badge>
                                    )}

                                    {/* Remove Button */}
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon-sm"
                                        onClick={() => removeFile(uploadedFile.id)}
                                        disabled={uploadedFile.status === "uploading"}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {error && (
                    <p className="mt-2 text-sm text-destructive">{error}</p>
                )}

                {helperText && !error && (
                    <p className="mt-2 text-sm text-muted-foreground">{helperText}</p>
                )}
            </div>
        );
    }
);

FileUploader.displayName = "FileUploader";

export { FileUploader };