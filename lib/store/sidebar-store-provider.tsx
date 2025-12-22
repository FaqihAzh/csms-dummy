'use client';

import { type ReactNode, createContext, useRef, useContext, useEffect } from 'react';
import { useStore } from 'zustand';
import { type SidebarStore, createSidebarStore } from '@/lib';

export type SidebarStoreApi = ReturnType<typeof createSidebarStore>;

export const SidebarStoreContext = createContext<SidebarStoreApi | undefined>(
    undefined,
);

export interface SidebarStoreProviderProps {
    children: ReactNode;
    defaultCollapsed?: boolean;
    defaultExpandedMenus?: Record<string, boolean>;
}

export const SidebarStoreProvider = ({
    children,
    defaultCollapsed = false,
    defaultExpandedMenus = {},
}: SidebarStoreProviderProps) => {
    const storeRef = useRef<SidebarStoreApi | undefined>(undefined);

    if (!storeRef.current) {
        storeRef.current = createSidebarStore(defaultCollapsed, defaultExpandedMenus);
    }

    useEffect(() => {
        const unsubscribe = storeRef.current?.subscribe((state) => {
            document.cookie = `sidebar:state=${state.isCollapsed}; path=/; max-age=31536000`;

            const expandedMenusStr = JSON.stringify(state.expandedMenus);
            document.cookie = `sidebar:expanded=${encodeURIComponent(expandedMenusStr)}; path=/; max-age=31536000`;
        });

        return () => {
            unsubscribe?.();
        };
    }, []);

    return (
        <SidebarStoreContext.Provider value={storeRef.current}>
            {children}
        </SidebarStoreContext.Provider>
    );
};

export const useSidebarStoreContext = <T,>(
    selector: (store: SidebarStore) => T,
): T => {
    const sidebarStoreContext = useContext(SidebarStoreContext);

    if (!sidebarStoreContext) {
        throw new Error(`useSidebarStoreContext must be used within SidebarStoreProvider`);
    }

    return useStore(sidebarStoreContext, selector);
};