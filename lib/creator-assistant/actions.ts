/**
 * Action management for Ask Gifteria Creator Assistant
 * Maps action keys to actual URLs based on user context
 */

import type { UserContext, ActionConfig } from "./types";
import { ALLOWED_ACTIONS } from "./config";

/**
 * Get filtered actions based on user context and requested action keys
 */
export function resolveActions(
  actionKeys: string[],
  userContext: UserContext
): ActionConfig[] {
  const uniqueKeys = Array.from(new Set(actionKeys));
  
  return ALLOWED_ACTIONS.filter((action) => {
    // Must be in requested keys
    if (!uniqueKeys.includes(action.key)) return false;
    
    // Check auth requirement
    if (action.requiresAuth && !userContext.isAuthenticated) {
      return false;
    }
    
    // Check visibility rule
    if (action.visibilityRule && !action.visibilityRule(userContext)) {
      return false;
    }
    
    return true;
  }).map((action) => ({
    key: action.key,
    label: action.label,
    href: action.href,
    variant: action.variant,
  }));
}

/**
 * Determine default action keys based on user context
 * Used when LLM doesn't specify actions or when we need fallback
 */
export function getDefaultActions(userContext: UserContext): string[] {
  const actions: string[] = [];
  
  if (!userContext.isAuthenticated) {
    actions.push("REGISTER_CREATOR", "LOGIN");
  } else if (!userContext.hasCreatorProfile) {
    actions.push("REGISTER_CREATOR");
  } else if (userContext.creatorStatus === "PENDING_VERIFICATION") {
    actions.push("VIEW_APPLICATION_STATUS", "START_ONBOARDING");
  } else if (userContext.creatorStatus === "APPROVED") {
    actions.push("OPEN_CREATOR_DASHBOARD");
  }
  
  // Always available
  actions.push("VIEW_CREATOR_GUIDE");
  
  return actions;
}

/**
 * Get escalation actions when knowledge is insufficient
 */
export function getEscalationActions(): string[] {
  return ["CONTACT_OPERATIONS", "VIEW_CREATOR_GUIDE"];
}

/**
 * Validate that action keys are in the allowlist
 */
export function validateActionKeys(actionKeys: string[]): {
  valid: string[];
  invalid: string[];
} {
  const allowedKeys = new Set(ALLOWED_ACTIONS.map((a) => a.key));
  const valid: string[] = [];
  const invalid: string[] = [];
  
  for (const key of actionKeys) {
    if (allowedKeys.has(key)) {
      valid.push(key);
    } else {
      invalid.push(key);
    }
  }
  
  return { valid, invalid };
}

/**
 * Extract action keys from LLM response (if LLM outputs structured JSON)
 * This is defensive parsing - we don't rely on LLM generating valid action keys
 */
export function extractActionKeysFromResponse(response: string): string[] {
  const actionKeys: string[] = [];
  
  // Look for action key patterns in response
  // This is a safety measure - we prefer explicit action selection
  const allowedKeys = ALLOWED_ACTIONS.map((a) => a.key);
  
  for (const key of allowedKeys) {
    // Case-insensitive search for action key mentions
    if (response.toLowerCase().includes(key.toLowerCase().replace(/_/g, " "))) {
      actionKeys.push(key);
    }
  }
  
  return actionKeys;
}
