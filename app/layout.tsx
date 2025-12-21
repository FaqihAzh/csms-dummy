import "@/app/globals.css";
import { QueryProvider } from "@/lib/utils/providers";
import { Sidebar } from "@/components/organisms/layouts/sidebar/sidebar";
import { SidebarStoreProvider } from "@/lib/store/sidebar-store-provider";
import { cookies } from "next/headers";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultCollapsed = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <html lang="en">
      <body>
        <SidebarStoreProvider defaultCollapsed={defaultCollapsed}>
          <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 overflow-auto">
              <QueryProvider>
                {children}
              </QueryProvider>
            </main>
          </div>
        </SidebarStoreProvider>
      </body>
    </html>
  );
}
