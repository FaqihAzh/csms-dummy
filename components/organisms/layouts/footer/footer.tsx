'use client';

import { useState } from 'react';
import { Shield, Slash } from 'lucide-react';
import { cn } from '@/lib';
import { useMediaQuery } from '@/hooks';
import { Button, Typography, PrivacyPolicyModal } from '@/components';

export function Footer() {
    const [isOpen, setIsOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width: 768px)');

    return (
        <>
            <footer className="flex-shrink-0 border-t border-[#e8eaed] bg-white">
                <div className="py-1 bg-transparent flex items-center justify-center gap-2">
                    <Typography variant="p" className="text-center text-xs text-[#5f6368]">
                        © {new Date().getFullYear()} New CSMS
                    </Typography>
                    <Slash className="h-3 w-3 text-[#5f6368] rotate-135" />
                    <Button
                        variant="ghost"
                        onClick={() => setIsOpen(true)}
                        className={cn(
                            "!px-0 flex items-center gap-1 text-xs text-[#5f6368] hover:text-[#1967d2] hover:bg-transparent transition-colors",
                            "group"
                        )}
                    >
                        <Shield className="h-4 w-4 group-hover:text-[#1967d2] transition-colors" />
                        <span className="font-medium underline">Privacy Policy</span>
                    </Button>
                </div>
            </footer>

            <PrivacyPolicyModal
                open={isOpen}
                onOpenChange={setIsOpen}
                mode={isMobile ? 'drawer' : 'dialog'}
            />
        </>
    );
}