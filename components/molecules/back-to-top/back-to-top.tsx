'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib';
import {
    Button, Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
    Typography,
} from '@/components';

interface BackToTopProps {
    threshold?: number;
    smooth?: boolean;
    className?: string;
    targetSelector?: string;
}

export function BackToTop({
    threshold = 300,
    smooth = true,
    className,
    targetSelector = 'main',
}: BackToTopProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const targetElement = document.querySelector(targetSelector);
        if (!targetElement) return;

        const toggleVisibility = () => {
            setIsVisible(targetElement.scrollTop > threshold);
        };

        targetElement.addEventListener('scroll', toggleVisibility);
        return () => targetElement.removeEventListener('scroll', toggleVisibility);
    }, [threshold, targetSelector]);

    const scrollToTop = () => {
        const targetElement = document.querySelector(targetSelector);
        if (!targetElement) return;

        targetElement.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
    };

    if (!isVisible) return null;

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={scrollToTop}
                        className={cn(
                            'fixed bottom-6 right-6 z-50 cursor-pointer',
                            'h-11 w-11 rounded-full',
                            'flex items-center justify-center',
                            'transition-all duration-300 ease-in-out',
                            'hover:scale-110 active:scale-95',
                            'bg-white/80 backdrop-blur-md',
                            'text-text-secondary',
                            'hover:bg-text-primary hover:text-white',
                            'shadow-md hover:shadow-lg',
                            className
                        )}
                        aria-label="Back to top"
                    >
                        <ArrowUp className="h-5 w-5" strokeWidth={2.5} />
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="left" align="center">
                    <Typography variant="p" className='text-xs'>Back to Top</Typography>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}