'use client';

import { usePathname, useRouter } from 'next/navigation';
import { SidebarHeader, MenuItem } from '@/components/organisms/layouts/sidebar';
import { ScrollArea } from '@/components';
import { cn } from '@/lib/utils/cn';
import { getSidebarMenuItems } from '@/lib/constants';
import { useSidebar } from '@/hooks/use-sidebar';
import { motion } from 'framer-motion';

export function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { isCollapsed, toggleSidebar } = useSidebar();

    const currentPage = pathname.split('/').filter(Boolean).pop() || 'dashboard';

    const handleNavigate = (page: string) => {
        router.push(`/${page}`);
    };

    const menuItems = getSidebarMenuItems(currentPage, handleNavigate);

    return (
        <motion.aside
            initial={false}
            animate={{ width: isCollapsed ? 72 : 280 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={cn(
                'flex flex-col flex-shrink-0 border-r border-[#e8eaed] h-screen bg-white overflow-hidden'
            )}
        >
            <SidebarHeader collapsed={isCollapsed} onToggleCollapse={toggleSidebar} />

            <ScrollArea className="flex-1 pt-2.5 pb-2.5">
                <nav>
                    {menuItems.map((item, index) => (
                        <MenuItem key={index} {...item} collapsed={isCollapsed} />
                    ))}
                </nav>
            </ScrollArea>
        </motion.aside>
    );
}