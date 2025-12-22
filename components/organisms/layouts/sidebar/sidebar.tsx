'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo, useCallback } from 'react';
import { SidebarHeader, MenuItem, ScrollArea } from '@/components';
import { findParentMenus, cn, getSidebarMenuItems } from '@/lib';
import { useSidebar } from '@/hooks';

export function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { isCollapsed, toggleSidebar, setExpandedMenus } = useSidebar();

    const currentPage = pathname.split('/').filter(Boolean).pop() || 'dashboard';

    const handleNavigate = useCallback((page: string) => {
        router.push(`/${page}`);
    }, [router]);

    const menuItems = useMemo(() => getSidebarMenuItems(currentPage, handleNavigate), [currentPage, handleNavigate]);

    useEffect(() => {
        const parentMenusToExpand = findParentMenus(menuItems);

        const newExpandedMenus: Record<string, boolean> = {};

        parentMenusToExpand.forEach(menuLabel => {
            newExpandedMenus[menuLabel] = true;
        });

        setExpandedMenus(newExpandedMenus);
    }, [currentPage, menuItems, setExpandedMenus]);

    return (
        <aside
            className={cn(
                'flex flex-col flex-shrink-0 border-r border-[#e8eaed] h-screen bg-white transition-[width] duration-300 ease-in-out',
                isCollapsed ? 'w-[72px]' : 'w-[280px]'
            )}
            style={{
                width: isCollapsed ? '72px' : '280px',
            }}
        >
            <SidebarHeader collapsed={isCollapsed} onToggleCollapse={toggleSidebar} />

            <ScrollArea className="flex-1 pt-2.5 pb-2.5">
                <nav>
                    {menuItems.map((item, index) => (
                        <MenuItem key={index} {...item} collapsed={isCollapsed} />
                    ))}
                </nav>
            </ScrollArea>
        </aside>
    );
}