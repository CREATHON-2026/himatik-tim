"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

function Dialog({ ...props }: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        "skeuo-dialog-overlay fixed inset-0 isolate z-50 bg-black/10 backdrop-blur-xs",
        className
      )}
      {...props}
    />
  )
}

interface DialogContentProps extends DialogPrimitive.Popup.Props {
  variant?: "default" | "skeuo" | "skeuo-forest"
  showCloseButton?: boolean
}

function DialogContent({
  className,
  children,
  variant = "default",
  showCloseButton = true,
  ...props
}: DialogContentProps) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(
          // Default Flat Styling
          variant === "default" && "fixed top-1/2 left-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg",
          
          // Skeuo Paper Styling
          variant === "skeuo" && "skeuo-dialog-content fixed top-1/2 left-1/2 z-50",
          
          // Skeuo Forest Styling
          variant === "skeuo-forest" && "skeuo-dialog-content-forest fixed top-1/2 left-1/2 z-50",
          
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          variant === "default" ? (
            <DialogPrimitive.Close
              className="absolute right-4 top-4 rounded-xs opacity-70 hover:opacity-100 outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer text-muted-foreground"
              aria-label="Close Dialog"
            >
              <X className="size-4" />
            </DialogPrimitive.Close>
          ) : (
            <DialogPrimitive.Close
              style={{ position: "absolute", right: "1rem", top: "1rem", zIndex: 60 }}
              aria-label="Close Dialog"
              render={
                <Button
                  variant={variant}
                  size="icon-xs"
                  style={{ position: "absolute", right: "1rem", top: "1rem", zIndex: 60 }}
                >
                  <X className="size-3" />
                </Button>
              }
            />
          )
        )}
      </DialogPrimitive.Popup>
    </DialogPortal>
  )
}

function DialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-1.5 text-center sm:text-left", className)}
      {...props}
    />
  )
}

function DialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end gap-2 mt-4",
        className
      )}
      {...props}
    />
  )
}

function DialogTitle({
  className,
  ...props
}: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg font-bold tracking-tight", className)}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
