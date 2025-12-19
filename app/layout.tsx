"use client";

import "@/app/globals.css";
import { QueryProvider } from "@/lib/utils/providers";
import { useState } from "react";
import { Sidebar } from "@/components/organisms/layouts/sidebar/sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <html lang="en">
      <body>
        <div className="flex h-screen">
          <Sidebar
            collapsed={collapsed}
            onToggleCollapse={() => setCollapsed(!collapsed)}
          />
          <main className="flex-1 overflow-auto">
            <QueryProvider>
              {children}
            </QueryProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
