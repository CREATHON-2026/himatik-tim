import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface FormCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
  /** Opsional: badge di header (misal: status verifikasi atau tag) */
  headerBadge?: React.ReactNode;
  /** Footer opsional untuk tombol aksi atau link navigasi */
  footer?: React.ReactNode;
}

/**
 * FormCard — Base Art Nouveau Card Wrapper untuk Form di Gifteria.
 * Fitur Visual:
 *  - Default: bg-card (Ivory), border-border/50, shadow-soft, rounded-3xl
 *  - Hover: subtle elevation shadow-md & border transition
 *  - Focus-within: ring emas/sage halus saat input di dalam aktif
 *  - Header dipisahkan dengan floral-divider ❀ Art Nouveau
 */
function FormCard({
  title,
  description,
  children,
  className,
  animate = true,
  headerBadge,
  footer,
}: FormCardProps) {
  return (
    <Card
      className={cn(
        "w-full max-w-md mx-auto transition-all duration-300 ease-out border border-border/50 shadow-soft rounded-3xl bg-card overflow-hidden",
        "hover:shadow-md hover:border-border/80",
        "focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/40",
        animate && "animate-fade-up",
        className
      )}
    >
      <CardHeader className="pb-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-h4 text-foreground font-heading">{title}</CardTitle>
            {description && (
              <CardDescription className="text-muted mt-1 text-sm">
                {description}
              </CardDescription>
            )}
          </div>
          {headerBadge && <div className="shrink-0">{headerBadge}</div>}
        </div>
      </CardHeader>

      {/* Floral divider — Art Nouveau separator */}
      <div className="floral-divider mx-4 my-2 text-xs select-none">❀</div>

      <CardContent className="pt-1 pb-5">{children}</CardContent>

      {footer && (
        <div className="border-t border-border/40 bg-muted/30 px-6 py-3 text-xs text-muted-foreground flex items-center justify-between">
          {footer}
        </div>
      )}
    </Card>
  );
}

export { FormCard };
export type { FormCardProps };
