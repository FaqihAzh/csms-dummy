'use client';

import React, { useState, useRef, useMemo } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { cn } from '@/lib';
import { useSidebar } from '@/hooks';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Button,
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components';

export interface MenuItemProps {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    onClick?: () => void;
    children?: MenuItemProps[];
    expanded?: boolean;
    level?: number;
    collapsed?: boolean;
}

export const MenuItem = React.memo(function MenuItem({
    icon,
    label,
    active = false,
    onClick,
    children,
    expanded = false,
    level = 0,
    collapsed = false,
}: MenuItemProps) {
    const { expandedMenus, toggleMenu } = useSidebar();
    const isExpanded = expandedMenus[label] || false;
    const [showFlyout, setShowFlyout] = useState(false);
    const [flyoutPosition, setFlyoutPosition] = useState({ top: 0, left: 0 });
    const [flyoutAlign, setFlyoutAlign] = useState<'top' | 'bottom'>('top');
    const [isHovered, setIsHovered] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleClick = () => {
        if (children && !collapsed) {
            toggleMenu(label);
        }
        if (children && collapsed) {
            if (buttonRef.current) {
                const rect = buttonRef.current.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                const spaceBelow = windowHeight - rect.top;
                const flyoutHeight = 300;

                if (spaceBelow < flyoutHeight && rect.top > spaceBelow) {
                    setFlyoutAlign('bottom');
                    setFlyoutPosition({ top: rect.bottom, left: rect.right });
                } else {
                    setFlyoutAlign('top');
                    setFlyoutPosition({ top: rect.top, left: rect.right });
                }
            }
            setShowFlyout(!showFlyout);
        }
        if (onClick) {
            onClick();
        }
    };

    const hasActiveChild = useMemo(() => {
        return children?.some(
            (child) => child.active || child.children?.some((subChild) => subChild.active)
        );
    }, [children]);

    const isActiveOrHasActiveChild = active || hasActiveChild;

    if (collapsed && level === 0) {
        return (
            <>
                <div className="relative flex justify-center w-full">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    ref={buttonRef}
                                    variant="ghost"
                                    size="icon"
                                    onClick={handleClick}
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                    className={cn(
                                        'w-10 h-10 mx-auto my-1 transition-all duration-200 flex items-center justify-center',
                                        (active || showFlyout) && 'bg-gradient-to-b from-[#e8f0fe] to-[#f1f7ff] shadow-md'
                                    )}
                                >
                                    <div
                                        className={cn(
                                            'transition-colors duration-200 flex items-center justify-center',
                                            active || isActiveOrHasActiveChild || showFlyout
                                                ? 'text-[#1967d2]'
                                                : isHovered
                                                    ? 'text-[#1967d2]'
                                                    : 'text-[#5f6368]'
                                        )}
                                    >
                                        {icon}
                                    </div>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={8}>
                                {label}
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    {isActiveOrHasActiveChild && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#1967d2] rounded-r" />
                    )}
                </div>

                {showFlyout && children && (
                    <>
                        <div className="fixed inset-0 z-[100]" onClick={() => setShowFlyout(false)} />
                        <div
                            className={cn(
                                "fixed left-20 w-60 bg-white border border-[#e8eaed] rounded-lg shadow-lg z-[101] py-2 animate-in slide-in-from-left-2",
                                flyoutAlign === 'bottom' ? "origin-bottom-left" : "origin-top-left"
                            )}
                            style={{
                                top: flyoutAlign === 'top' ? `${flyoutPosition.top}px` : 'auto',
                                bottom: flyoutAlign === 'bottom' ? `${window.innerHeight - flyoutPosition.top}px` : 'auto'
                            }}
                        >
                            <div className="px-4 mb-2 pb-2 border-b border-[#e8eaed]">
                                <div className="text-[13px] font-semibold text-[#202124]">{label}</div>
                            </div>

                            {children.map((child, index) => {
                                const childMaxLength = 25;
                                const isChildTextTooLong = child.label.length > childMaxLength;
                                const truncatedChildLabel = isChildTextTooLong
                                    ? `${child.label.substring(0, childMaxLength)}...`
                                    : child.label;

                                return (
                                    <div key={index} className="group/flyout-item relative">
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        onClick={() => {
                                                            if (child.onClick) {
                                                                child.onClick();
                                                            }
                                                            setShowFlyout(false);
                                                        }}
                                                        className={cn(
                                                            'w-full justify-start text-[13px] font-medium px-4 py-2.5 h-auto transition-all',
                                                            child.active
                                                                ? 'bg-[#f1f7ff] text-[#1967d2]'
                                                                : 'text-[#5f6368] hover:bg-[#fafbfc] hover:text-[#1967d2]'
                                                        )}
                                                    >
                                                        {child.active && (
                                                            <div className="w-1 h-1 rounded-full bg-[#1967d2] mr-2.5 flex-shrink-0" />
                                                        )}
                                                        <span className="truncate min-w-0">{truncatedChildLabel}</span>
                                                    </Button>
                                                </TooltipTrigger>
                                                {isChildTextTooLong && (
                                                    <TooltipContent side="right" sideOffset={8}>
                                                        {child.label}
                                                    </TooltipContent>
                                                )}
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </>
        );
    }

    const paddingLeft = level === 0 ? 'pl-[19px]' : level === 1 ? 'pl-[47px]' : 'pl-[67px]';

    const maxLength = level === 0 ? 25 : level === 1 ? 20 : 18;
    const isTextTooLong = label.length > maxLength;
    const truncatedLabel = isTextTooLong ? `${label.substring(0, maxLength)}...` : label;

    return (
        <>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            onClick={handleClick}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            className={cn(
                                'w-[calc(100%-16px)] justify-start h-10 pr-4 gap-3 transition-all duration-200 text-[13px] font-medium hover:text-primary mx-2',
                                paddingLeft,
                                level === 0 && 'my-1',
                                level > 0 && 'mb-1',
                                active && 'bg-gradient-to-b from-[#e8f0fe] to-[#f1f7ff] border-l-[3px] border-l-[#1967d2] shadow-md',
                                !active && level === 0 && 'border-l-[3px] border-l-transparent',
                                active || isActiveOrHasActiveChild
                                    ? 'text-[#1967d2] font-semibold'
                                    : isHovered
                                        ? 'text-[#1967d2] bg-[#fafbfc]'
                                        : 'text-[#5f6368]'
                            )}
                        >
                            {level === 0 ? (
                                <div
                                    className={cn(
                                        'w-5 h-5 flex items-center justify-center flex-shrink-0 transition-colors duration-200',
                                        active || isActiveOrHasActiveChild ? 'text-[#1967d2]' : isHovered ? 'text-[#1967d2]' : 'text-[#5f6368]'
                                    )}
                                >
                                    {icon}
                                </div>
                            ) : null}

                            <span className="flex-1 text-left truncate min-w-0">{truncatedLabel}</span>

                            {children && (
                                <div className={cn(
                                    'transition-colors duration-200 flex-shrink-0',
                                    active || isActiveOrHasActiveChild ? 'text-[#1967d2]' : isHovered ? 'text-[#1967d2]' : 'text-[#9aa0a6]'
                                )}>
                                    {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                </div>
                            )}
                        </Button>
                    </TooltipTrigger>
                    {isTextTooLong && (
                        <TooltipContent side="right" sideOffset={4}>
                            {label}
                        </TooltipContent>
                    )}
                </Tooltip>
            </TooltipProvider>

            <AnimatePresence>
                {children && isExpanded && !collapsed && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="bg-[#fafbfc] rounded-lg mx-2 mt-0 pt-1 pb-1">
                            {children.map((child, index) => (
                                <MenuItem key={index} {...child} level={level + 1} collapsed={collapsed} />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
});