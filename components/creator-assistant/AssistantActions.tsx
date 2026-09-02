"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ALLOWED_ACTIONS } from "@/lib/creator-assistant/config";

interface AssistantActionsProps {
  actionKeys: string[];
}

export function AssistantActions({ actionKeys }: AssistantActionsProps) {
  if (!actionKeys || actionKeys.length === 0) {
    return null;
  }

  const actions = ALLOWED_ACTIONS.filter((action) =>
    actionKeys.includes(action.key)
  );

  if (actions.length === 0) {
    return null;
  }

  return (
    <div className="px-4 pb-4">
      <div className="max-w-[85%] sm:max-w-[75%]">
        <div className="flex flex-wrap gap-2">
          {actions.map((action) => {
            const isExternal =
              action.href.startsWith("http") ||
              action.href.startsWith("https") ||
              action.href.startsWith("mailto") ||
              action.href.startsWith("tel");

            const buttonContent = (
              <>
                {action.label}
                {isExternal ? (
                  <ExternalLink className="size-3.5" />
                ) : (
                  <ArrowRight className="size-3.5" />
                )}
              </>
            );

            if (isExternal) {
              return (
                <Button
                  key={action.key}
                  variant={action.variant}
                  size="sm"
                  render={(props) => (
                    <a
                      {...props}
                      href={action.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {buttonContent}
                    </a>
                  )}
                />
              );
            }

            if (action.href === "#") {
              return (
                <Button
                  key={action.key}
                  variant={action.variant}
                  size="sm"
                  disabled
                >
                  {buttonContent}
                </Button>
              );
            }

            return (
              <Button
                key={action.key}
                variant={action.variant}
                size="sm"
                render={(props) => (
                  <Link {...props} href={action.href}>
                    {buttonContent}
                  </Link>
                )}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
