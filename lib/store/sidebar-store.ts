import { createStore } from 'zustand/vanilla';
import { persist } from 'zustand/middleware';

export interface SidebarState {
    isCollapsed: boolean;
    expandedMenus: Record<string, boolean>;
}

export interface SidebarActions {
    toggleSidebar: () => void;
    setSidebarCollapsed: (value: boolean) => void;
    toggleMenu: (key: string) => void;
    setMenuExpanded: (key: string, value: boolean) => void;
    resetExpandedMenus: () => void;
}

export type SidebarStore = SidebarState & SidebarActions;

export const createSidebarStore = (defaultCollapsed: boolean = false) => {
    return createStore<SidebarStore>()(
        persist(
            (set, get) => ({
                isCollapsed: defaultCollapsed,
                expandedMenus: {},
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
                resetExpandedMenus: () => set({ expandedMenus: {} }),
            }),
            {
                name: 'sidebar-storage',
                partialize: (state) => ({ expandedMenus: state.expandedMenus }),
            }
        )
    );
};
