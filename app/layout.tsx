import "@/app/globals.css";
import { QueryProvider } from "@/lib/utils/providers";
import { Sidebar } from "@/components/organisms/layouts/sidebar/sidebar";
import { Footer } from "@/components/organisms/layouts/footer/footer";
import { BackToTop } from "@/components";
import { SidebarStoreProvider } from "@/lib/store/sidebar-store-provider";
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
      <body>
        <SidebarStoreProvider
          defaultCollapsed={defaultCollapsed}
          defaultExpandedMenus={defaultExpandedMenus}
        >
          <div className="flex h-screen">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
              <main className="flex-1 overflow-auto p-6">
                <QueryProvider>
                  {children}
                </QueryProvider>
              </main>
              <Footer />

              <BackToTop />
            </div>
          </div>
        </SidebarStoreProvider>
      </body>
    </html>
  );
}