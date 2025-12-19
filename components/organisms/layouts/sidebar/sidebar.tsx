'use client';

import { usePathname, useRouter } from 'next/navigation';
import { SidebarHeader, MenuItem } from '@/components/organisms/layouts/sidebar';
import { ScrollArea } from '@/components';
import { cn } from '@/lib/utils/cn';
import { getSidebarMenuItems } from '@/lib/constants';

interface SidebarProps {
    collapsed?: boolean;
    onToggleCollapse?: () => void;
}

export function Sidebar({ collapsed = false, onToggleCollapse }: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();

    const currentPage = pathname.split('/').filter(Boolean).pop() || 'dashboard';

    const handleNavigate = (page: string) => {
        router.push(`/${page}`);
    };

    const menuItems = getSidebarMenuItems(currentPage, handleNavigate);

    return (
        <aside
            className={cn(
                'flex flex-col flex-shrink-0 border-r border-[#e8eaed] h-screen bg-white transition-all duration-300 overflow-hidden',
                collapsed ? 'w-[72px]' : 'w-[280px]'
            )}
        >
            <SidebarHeader collapsed={collapsed} onToggleCollapse={onToggleCollapse} />

            <ScrollArea className="flex-1 pt-2.5 pb-2.5">
                <nav>
                    {menuItems.map((item, index) => (
                        <MenuItem key={index} {...item} collapsed={collapsed} />
                    ))}
                </nav>
            </ScrollArea>
        </aside>
    );
}