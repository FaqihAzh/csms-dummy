import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { MenuItemProps } from "@/components";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function findParentMenus(items: MenuItemProps[], targetLabel?: string): string[] {
    const parents: string[] = [];

    function traverse(items: MenuItemProps[], parentChain: string[] = []): boolean {
        for (const item of items) {
            if (item.active || item.label === targetLabel) {
                parents.push(...parentChain);
                return true;
            }

            if (item.children) {
                const found = traverse(item.children, [...parentChain, item.label]);
                if (found) return true;
            }
        }
        return false;
    }

    traverse(items);
    return parents;
}
