"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Type, Palette, LayoutGrid } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function SidebarDesign() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const isRouteActive = (route: string) => {
    return pathname === route;
  };

  return (
    <Sidebar 
      collapsible="icon" 
      className="border-r border-divider bg-card/60 backdrop-blur-md rounded-r-[40px] overflow-hidden"
    >
      <SidebarContent className="px-4 py-6 group-data-[state=collapsed]:px-2 flex flex-col justify-between h-full bg-card/10">
        <div>
          {/* Header Logo */}
          <div className="flex items-center gap-2 mb-8 px-2 transition-all group-data-[state=collapsed]:justify-center group-data-[state=collapsed]:px-0">
            <Heart className="w-5 h-5 text-accent animate-pulse shrink-0" />
            <h1 className="text-xl font-heading font-bold tracking-wider text-primary group-data-[state=collapsed]:hidden truncate">
              BICKET STUDIO
            </h1>
          </div>

          {/* Navigation Menu */}
          <SidebarGroup className="p-0">
            <SidebarGroupLabel className="text-[10px] font-sans font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2 group-data-[state=collapsed]:hidden">
              FOUNDATION
            </SidebarGroupLabel>
            <SidebarMenu className="space-y-1">
              <SidebarMenuItem>
                <Link href="/design-system/typography" className="w-full">
                  <SidebarMenuButton
                    isActive={isRouteActive("/design-system/typography")}
                    tooltip="Typography"
                    className={`w-full px-3 py-2 rounded-lg text-sm font-sans flex items-center gap-2 transition-all cursor-pointer ${
                      isRouteActive("/design-system/typography")
                        ? "bg-primary text-primary-foreground font-semibold shadow-sm hover:bg-primary hover:text-primary-foreground"
                        : "hover:bg-secondary/40 text-foreground"
                    }`}
                  >
                    <Type className="w-4 h-4 shrink-0" />
                    <span className="group-data-[state=collapsed]:hidden">Typography</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <Link href="/design-system/colors" className="w-full">
                  <SidebarMenuButton
                    isActive={isRouteActive("/design-system/colors")}
                    tooltip="Colors & Swatches"
                    className={`w-full px-3 py-2 rounded-lg text-sm font-sans flex items-center gap-2 transition-all cursor-pointer ${
                      isRouteActive("/design-system/colors")
                        ? "bg-primary text-primary-foreground font-semibold shadow-sm hover:bg-primary hover:text-primary-foreground"
                        : "hover:bg-secondary/40 text-foreground"
                    }`}
                  >
                    <Palette className="w-4 h-4 shrink-0" />
                    <span className="group-data-[state=collapsed]:hidden">Colors & Swatches</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <div className="my-4 group-data-[state=collapsed]:hidden border-t border-divider/40" />
              </SidebarMenuItem>

              <SidebarGroupLabel className="text-[10px] font-sans font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2 group-data-[state=collapsed]:hidden">
                COMPONENTS
              </SidebarGroupLabel>

              <SidebarMenuItem>
                <Link href="/design-system/components" className="w-full">
                  <SidebarMenuButton
                    isActive={isRouteActive("/design-system/components")}
                    tooltip="Component Library"
                    className={`w-full px-3 py-2 rounded-lg text-sm font-sans flex items-center gap-2 transition-all cursor-pointer ${
                      isRouteActive("/design-system/components")
                        ? "bg-primary text-primary-foreground font-semibold shadow-sm hover:bg-primary hover:text-primary-foreground"
                        : "hover:bg-secondary/40 text-foreground"
                    }`}
                  >
                    <LayoutGrid className="w-4 h-4 shrink-0" />
                    <span className="group-data-[state=collapsed]:hidden">Component Library</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </div>

        {/* Sidebar Footer info */}
        <div className="border-t border-divider pt-4 text-[10px] text-muted-foreground font-sans px-2 truncate group-data-[state=collapsed]:flex group-data-[state=collapsed]:justify-center group-data-[state=collapsed]:px-0">
          {isCollapsed ? (
            <span className="text-primary font-bold">DEV</span>
          ) : (
            <>
              Mode: <span className="text-primary font-bold">Development Only</span>
            </>
          )}
        </div>
      </SidebarContent>
    </Sidebar>
  );
}