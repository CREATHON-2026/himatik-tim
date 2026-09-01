import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
  icon: React.ReactNode
  title: string
  description?: string
  action?: { label: string; onClick: () => void }
  className?: string
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "animate-fade-up flex flex-col items-center justify-center gap-4 p-8 text-center",
        className
      )}
    >
      <div
        className="flex size-16 items-center justify-center rounded-full bg-muted/50 [animation:float_3s_ease-in-out_infinite] motion-reduce:[animation:none]"
      >
        {icon}
      </div>

      <div className="flex flex-col gap-1">
        <h4 className="text-h4">{title}</h4>
        {description && (
          <p className="text-muted">{description}</p>
        )}
      </div>

      {action && (
        <Button variant="outline" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  )
}
