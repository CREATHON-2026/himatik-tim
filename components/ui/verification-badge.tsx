import { CheckCircle, Clock, XCircle } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export type VerificationStatus = "PENDING" | "APPROVED" | "REJECTED"

interface VerificationBadgeProps {
  status: VerificationStatus
  showLabel?: boolean
  className?: string
}

const config: Record<
  VerificationStatus,
  {
    icon: React.ElementType
    label: string
    className?: string
    style?: React.CSSProperties
    variant?: "destructive" | "outline"
  }
> = {
  PENDING: {
    icon: Clock,
    label: "Menunggu Verifikasi",
    variant: "outline",
    style: {
      backgroundColor: "oklch(0.95 0.05 85)",
      color: "oklch(0.45 0.12 85)",
      borderColor: "oklch(0.82 0.08 85)",
    },
  },
  APPROVED: {
    icon: CheckCircle,
    label: "Terverifikasi",
    className: "bg-primary/10 text-primary border-primary/20",
  },
  REJECTED: {
    icon: XCircle,
    label: "Ditolak",
    variant: "destructive",
  },
}

export function VerificationBadge({
  status,
  showLabel = true,
  className,
}: VerificationBadgeProps) {
  const { icon: Icon, label, className: variantClass, style, variant } = config[status]

  return (
    <Badge
      variant={variant ?? "outline"}
      className={cn(
        "animate-scale-in transition-all duration-200 ease-out select-none cursor-default",
        "hover:scale-105 hover:-translate-y-0.5 hover:shadow-xs",
        "active:scale-95 active:translate-y-0",
        variantClass,
        className
      )}
      style={style}
    >
      <Icon aria-hidden="true" className="size-3.5 shrink-0" />
      {showLabel && <span>{label}</span>}
    </Badge>
  )
}
