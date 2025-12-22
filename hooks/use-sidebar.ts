'use client';

import { useSidebarStoreContext } from '@/lib/store/sidebar-store-provider';
import { useShallow } from 'zustand/react/shallow';

export function useSidebar() {
    const {
        isCollapsed,
        expandedMenus,
        toggleSidebar,
        setSidebarCollapsed,
        toggleMenu,
        setMenuExpanded,
        resetExpandedMenus,
    } = useSidebarStoreContext(
        useShallow((state) => ({
            isCollapsed: state.isCollapsed,
            expandedMenus: state.expandedMenus,
            toggleSidebar: state.toggleSidebar,
            setSidebarCollapsed: state.setSidebarCollapsed,
            toggleMenu: state.toggleMenu,
            setMenuExpanded: state.setMenuExpanded,
            resetExpandedMenus: state.resetExpandedMenus,
        }))
    );

    return {
        isCollapsed,
        expandedMenus,
        toggleSidebar,
        setSidebarCollapsed,
        toggleMenu,
        setMenuExpanded,
        resetExpandedMenus,
    };
}
