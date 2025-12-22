'use client';

import { useSidebarStoreContext } from '@/lib';
import { useShallow } from 'zustand/react/shallow';

export function useSidebar() {
    const {
        isCollapsed,
        expandedMenus,
        toggleSidebar,
        setSidebarCollapsed,
        toggleMenu,
        setMenuExpanded,
        setExpandedMenus,
        resetExpandedMenus,
    } = useSidebarStoreContext(
        useShallow((state) => ({
            isCollapsed: state.isCollapsed,
            expandedMenus: state.expandedMenus,
            toggleSidebar: state.toggleSidebar,
            setSidebarCollapsed: state.setSidebarCollapsed,
            toggleMenu: state.toggleMenu,
            setMenuExpanded: state.setMenuExpanded,
            setExpandedMenus: state.setExpandedMenus,
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
        setExpandedMenus,
        resetExpandedMenus,
    };
}