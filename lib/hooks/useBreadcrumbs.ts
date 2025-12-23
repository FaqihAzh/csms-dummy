'use client'

import { usePathname } from "next/navigation"
import { generateBreadcrumbs } from "../utils/breadcrumbs";

export function useBreadcrumbs() {
    const pathname = usePathname();
    return generateBreadcrumbs(pathname);
}
