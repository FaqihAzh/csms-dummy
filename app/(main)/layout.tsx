import "@/app/globals.css";
import { QueryProvider, SidebarStoreProvider } from "@/lib";
import { Sidebar, Footer, BackToTop, Header } from "@/components";
import { cookies } from "next/headers";

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookieStore = await cookies();
    const defaultCollapsed = cookieStore.get("sidebar:state")?.value === "true";

    const expandedMenusCookie = cookieStore.get("sidebar:expanded")?.value;
    let defaultExpandedMenus: Record<string, boolean> = {};

    if (expandedMenusCookie) {
        try {
            defaultExpandedMenus = JSON.parse(decodeURIComponent(expandedMenusCookie));
        } catch (e) {
            defaultExpandedMenus = {};
        }
    }

    return (
        <html lang="en">
            <body className="overflow-hidden">
                <SidebarStoreProvider
                    defaultCollapsed={defaultCollapsed}
                    defaultExpandedMenus={defaultExpandedMenus}
                >
                    <div className="flex h-screen">
                        <Sidebar />
                        <div className="flex flex-col flex-1 overflow-auto">
                            <Header />
                            <main className="flex-1 overflow-auto">
                                <QueryProvider>
                                    <div className="bg-secondary-background">{children}</div>
                                </QueryProvider>
                                <Footer />
                            </main>
                            <BackToTop />
                        </div>
                    </div>
                </SidebarStoreProvider>
            </body>
        </html>
    );
}