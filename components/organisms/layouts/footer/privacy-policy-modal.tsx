'use client';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    ScrollArea,
    Typography,
    Collapsible,
    CollapsibleTrigger,
    CollapsibleContent,
    Button
} from '@/components';
import { ChevronDown, Shield } from 'lucide-react';
import { useState } from 'react';

interface PrivacyPolicyModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    mode?: 'dialog' | 'drawer';
}

const privacyPolicies = [
    {
        id: 1,
        title: 'Information Collection',
        content: 'We collect information that you provide directly to us, including when you create an account, use our services, or communicate with us. This may include your name, email address, company information, and other contact details.'
    },
    {
        id: 2,
        title: 'Use of Information',
        content: 'We use the information we collect to provide, maintain, and improve our services, to process your transactions, to send you technical notices and support messages, and to respond to your comments and questions.'
    },
    {
        id: 3,
        title: 'Information Sharing',
        content: 'We do not share your personal information with third parties except as described in this policy. We may share information with service providers who perform services on our behalf, or when required by law.'
    },
    {
        id: 4,
        title: 'Data Security',
        content: 'We implement appropriate technical and organizational measures to protect the security of your personal information. However, no method of transmission over the Internet is 100% secure.'
    },
    {
        id: 5,
        title: 'Cookies and Tracking',
        content: 'We use cookies and similar tracking technologies to collect information about your browsing activities. You can control cookies through your browser settings.'
    },
    {
        id: 6,
        title: 'Your Rights',
        content: 'You have the right to access, correct, or delete your personal information. You may also object to or restrict certain processing of your data. Contact us to exercise these rights.'
    },
    {
        id: 7,
        title: 'Data Retention',
        content: 'We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law.'
    },
    {
        id: 8,
        title: 'International Transfers',
        content: 'Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers.'
    }
];

function PrivacyPolicyContent() {
    const [openItems, setOpenItems] = useState<number[]>([]);

    const toggleItem = (id: number) => {
        setOpenItems(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-[#e8eaed]">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-b from-[#1967d2] to-[#1557b0] shadow-md flex-shrink-0">
                    <Shield className="h-5 w-5 text-white" />
                </div>
                <div>
                    <Typography variant="h3" className="text-[#202124]">
                        CSMS Privacy Policy
                    </Typography>
                    <Typography variant="muted" className="text-[#5f6368] mt-1">
                        Last updated: {new Date().toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </Typography>
                </div>
            </div>

            <div className="space-y-3">
                <Typography variant="p" className="text-[#202124] leading-relaxed">
                    Welcome to the Contractor Safety Management System (CSMS). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
                </Typography>
                <Typography variant="p" className="text-[#202124] leading-relaxed">
                    By accessing or using CSMS, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy. If you do not agree with the terms of this policy, please do not access or use our services.
                </Typography>
            </div>

            <div className="space-y-2">
                <Typography variant="h4" className="text-[#202124] mb-3">
                    Privacy Policy Details
                </Typography>

                {privacyPolicies.map((policy) => (
                    <Collapsible key={policy.id}>
                        <CollapsibleTrigger asChild>
                            <Button
                                variant="ghost"
                                onClick={() => toggleItem(policy.id)}
                                className="w-full justify-between h-auto py-3 px-4 hover:bg-[#fafbfc] border border-[#e8eaed] rounded-lg"
                            >
                                <span className="text-[14px] font-medium text-[#202124] text-left">
                                    {policy.id}. {policy.title}
                                </span>
                                <ChevronDown
                                    className={`h-4 w-4 text-[#5f6368] transition-transform duration-200 flex-shrink-0 ml-2 ${openItems.includes(policy.id) ? 'rotate-180' : ''
                                        }`}
                                />
                            </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <div className="px-4 py-3 bg-[#fafbfc] rounded-b-lg border border-t-0 border-[#e8eaed] -mt-1">
                                <Typography variant="p" className="text-[13px] text-[#5f6368] leading-relaxed">
                                    {policy.content}
                                </Typography>
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                ))}
            </div>

            <div className="pt-4 border-t border-[#e8eaed]">
                <Typography variant="h4" className="text-[#202124] mb-3">
                    Contact Us
                </Typography>
                <Typography variant="p" className="text-[#5f6368] leading-relaxed">
                    If you have any questions about this Privacy Policy or our data practices, please contact us at:
                </Typography>
                <div className="mt-3 space-y-1 text-[13px] text-[#5f6368]">
                    <p>Email: privacy@csms.example.com</p>
                    <p>Phone: +1 (555) 123-4567</p>
                    <p>Address: 123 Safety Street, Security City, SC 12345</p>
                </div>
            </div>
        </div>
    );
}

export function PrivacyPolicyModal({ open, onOpenChange, mode = 'dialog' }: PrivacyPolicyModalProps) {
    if (mode === 'drawer') {
        return (
            <Drawer open={open} onOpenChange={onOpenChange}>
                <DrawerContent className="max-h-[65vh]">
                    <DrawerHeader className="border-b border-[#e8eaed]">
                        <DrawerTitle className="text-[#202124]">Privacy Policy</DrawerTitle>
                    </DrawerHeader>
                    <ScrollArea className="flex-1 px-4 py-4">
                        <PrivacyPolicyContent />
                    </ScrollArea>
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[85vh] p-0">
                <DialogHeader className="px-6 pt-6 pb-4 border-b border-[#e8eaed]">
                    <DialogTitle className="text-[#202124]">Privacy Policy</DialogTitle>
                </DialogHeader>
                <ScrollArea className="px-6 py-4" style={{ maxHeight: 'calc(85vh - 120px)' }}>
                    <PrivacyPolicyContent />
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}