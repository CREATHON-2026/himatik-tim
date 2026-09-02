// Simple toast implementation
// In production, use a proper toast library like sonner or react-hot-toast

import { useState, useCallback } from "react";

interface Toast {
  title: string;
  description?: string;
  variant?: "default" | "destructive";
}

export function useToast() {
  const [, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((props: Toast) => {
    // Simple console logging for now
    // In production, this would show actual toast notifications
    console.log("[Toast]", props.title, props.description);
    
    setToasts((prev) => [...prev, props]);

    // Auto-remove after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, 3000);
  }, []);

  return { toast };
}
