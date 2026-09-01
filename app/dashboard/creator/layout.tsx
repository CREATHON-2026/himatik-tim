"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { SidebarCreator } from "@/components/shadcn-studio/sidebar/sidebar-creator";

export default function CreatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen w-full bg-[#FAFAF9] text-[#111827] antialiased">
          <SidebarCreator />
          <SidebarInset className="flex flex-1 flex-col overflow-x-hidden bg-[#FAFAF9]">
            {children}
          </SidebarInset>
        </div>
      </SidebarProvider>
    </QueryClientProvider>
  );
}
