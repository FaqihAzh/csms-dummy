'use client';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    Drawer,
    DrawerContent,
    DrawerHeader,
    ScrollArea,
} from '@/components';
import { PrivacyFAQContent } from './privacy-faq-content';

type contentData = {
    id: number;
    title: string;
    content: string;
}

interface PrivacyFAQModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    mode?: 'dialog' | 'drawer';
    modalName?: string;
    data: contentData[];
}

export function PrivacyFAQModal({ open, onOpenChange, mode = 'dialog', modalName, data }: PrivacyFAQModalProps) {
    if (mode === 'drawer') {
        return (
            <Drawer open={open} onOpenChange={onOpenChange}>
                <DrawerContent className="max-h-[60vh]">
                    <DrawerHeader className="px-6 pt-6 pb-4 border-b border-gray-200">
                        <DialogTitle className="text-gray-900">{modalName === "privacy-policy" ? "CSMS Privacy Policy" : "CSMS FAQ"}</DialogTitle>
                    </DrawerHeader>
                    <ScrollArea className="flex-1 px-4 py-4" style={{ maxHeight: 'calc(60vh - 120px)' }}>
                        <PrivacyFAQContent data={data} modalName={modalName} />
                    </ScrollArea>
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[90vh] p-0">
                <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-200">
                    <DialogTitle className="text-gray-900">{modalName === "privacy-policy" ? "CSMS Privacy Policy" : "CSMS FAQ"}</DialogTitle>
                </DialogHeader>
                <ScrollArea className="px-6 pb-4" style={{ maxHeight: 'calc(85vh - 120px)' }}>
                    <PrivacyFAQContent data={data} modalName={modalName} />
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}