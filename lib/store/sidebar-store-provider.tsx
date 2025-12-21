'use client';

import { type ReactNode, createContext, useRef, useContext, useEffect } from 'react';
import { useStore } from 'zustand';
import { type SidebarStore, createSidebarStore } from '@/lib/store/sidebar-store';
import Cookies from 'js-cookie';

export type SidebarStoreApi = ReturnType<typeof createSidebarStore>;

export const SidebarStoreContext = createContext<SidebarStoreApi | undefined>(
    undefined,
);

export interface SidebarStoreProviderProps {
    children: ReactNode;
    defaultCollapsed?: boolean;
}

export const SidebarStoreProvider = ({
    children,
    defaultCollapsed = false,
}: SidebarStoreProviderProps) => {
    const storeRef = useRef<SidebarStoreApi>(null);
    if (!storeRef.current) {
        storeRef.current = createSidebarStore(defaultCollapsed);
    }

    useEffect(() => {
        const unsubscribe = storeRef.current?.subscribe((state) => {
            Cookies.set('sidebar:state', String(state.isCollapsed));
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
