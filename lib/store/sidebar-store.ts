import { createStore } from 'zustand/vanilla';

export interface SidebarState {
    isCollapsed: boolean;
    expandedMenus: Record<string, boolean>;
}

export interface SidebarActions {
    toggleSidebar: () => void;
    setSidebarCollapsed: (value: boolean) => void;
    toggleMenu: (key: string) => void;
    setMenuExpanded: (key: string, value: boolean) => void;
    setExpandedMenus: (menus: Record<string, boolean>) => void;
    resetExpandedMenus: () => void;
}

export type SidebarStore = SidebarState & SidebarActions;

export const createSidebarStore = (
    defaultCollapsed: boolean = false,
    defaultExpandedMenus: Record<string, boolean> = {}
) => {
    return createStore<SidebarStore>()((set) => ({
        isCollapsed: defaultCollapsed,
        expandedMenus: defaultExpandedMenus,
        toggleSidebar: () =>
            set((state) => ({ isCollapsed: !state.isCollapsed })),
        setSidebarCollapsed: (value) => set({ isCollapsed: value }),
        toggleMenu: (key) =>
            set((state) => ({
                expandedMenus: {
                    ...state.expandedMenus,
                    [key]: !state.expandedMenus[key],
                },
            })),
        setMenuExpanded: (key, value) =>
            set((state) => ({
                expandedMenus: {
                    ...state.expandedMenus,
                    [key]: value,
                },
            })),
        setExpandedMenus: (menus) => set({ expandedMenus: menus }),
        resetExpandedMenus: () => set({ expandedMenus: {} }),
    }));
};