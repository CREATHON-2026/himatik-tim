"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";

interface DashboardHeaderProps {
  shopName: string;
  photoUrl?: string | null;
  onLogout: () => void;
}

export function DashboardHeader({
  shopName,
  photoUrl,
  onLogout,
}: DashboardHeaderProps) {
  const avatarFallback = shopName.slice(0, 2).toUpperCase();

  return (
    <header className="animate-fade-up border-border/50 bg-background/80 sticky top-0 z-40 border-b backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo */}
        <span className="font-heading text-h4 text-foreground">Bicket</span>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <span className="text-small text-muted-foreground hidden sm:block">
            {shopName}
          </span>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                variant="ghost"
                size="icon"
                className="ring-offset-background focus-visible:ring-ring hover:ring-ring/50 cursor-pointer rounded-full transition-all hover:ring-2 hover:ring-offset-1 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                aria-label="Buka menu akun"
              >
                <Avatar>
                  {photoUrl && <AvatarImage src={photoUrl} alt={shopName} />}
                  <AvatarFallback>{avatarFallback}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="bg-card shadow-soft w-52 rounded-2xl"
            >
              {/* Header section */}
              <div className="px-3 py-2">
                <p className="text-foreground text-sm font-medium">
                  {shopName}
                </p>
                <p className="text-muted-foreground text-xs">Kreator</p>
              </div>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="hover:bg-muted/50 cursor-pointer gap-2 transition-colors duration-150"
                onClick={() => {
                  window.location.href = "/dashboard/profile";
                }}
              >
                <User className="size-4" aria-hidden="true" />
                Profil
              </DropdownMenuItem>

              <DropdownMenuItem
                className="text-destructive hover:bg-destructive/10 focus:text-destructive cursor-pointer gap-2 transition-colors duration-150"
                onClick={onLogout}
              >
                <LogOut className="size-4" aria-hidden="true" />
                Keluar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
