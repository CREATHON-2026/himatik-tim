/**
 * Order Brief Utility Functions
 */

import crypto from "crypto";
import type {
  OrderBriefSnapshot,
  FieldWithEvidence,
  BriefCompleteness,
} from "./types";
import { getRequiredFields, calculateCompleteness } from "./validation";

// =============================================================================
// SNAPSHOT HASHING
// =============================================================================

/**
 * Generate SHA-256 hash of snapshot for integrity verification
 */
export function generateSnapshotHash(snapshot: OrderBriefSnapshot): string {
  const canonical = canonicalizeJSON(snapshot);
  return crypto.createHash("sha256").update(canonical).digest("hex");
}

/**
 * Canonicalize JSON for consistent hashing
 * Sorts keys recursively
 */
function canonicalizeJSON(obj: any): string {
  if (obj === null) return "null";
  if (typeof obj !== "object") return JSON.stringify(obj);
  if (Array.isArray(obj)) {
    return "[" + obj.map((item) => canonicalizeJSON(item)).join(",") + "]";
  }

  const sorted = Object.keys(obj)
    .sort()
    .map((key) => `"${key}":${canonicalizeJSON(obj[key])}`)
    .join(",");

  return `{${sorted}}`;
}

/**
 * Verify snapshot hash matches
 */
export function verifySnapshotHash(
  snapshot: OrderBriefSnapshot,
  expectedHash: string
): boolean {
  const actualHash = generateSnapshotHash(snapshot);
  return actualHash === expectedHash;
}

// =============================================================================
// FIELD HELPERS
// =============================================================================

/**
 * Get field value by path (e.g., "product.quantity")
 */
export function getFieldByPath(
  snapshot: Partial<OrderBriefSnapshot>,
  path: string
): FieldWithEvidence | undefined {
  const [section, field] = path.split(".");
  return (snapshot as any)?.[section]?.[field];
}

/**
 * Set field value by path
 */
export function setFieldByPath(
  snapshot: Partial<OrderBriefSnapshot>,
  path: string,
  value: FieldWithEvidence
): Partial<OrderBriefSnapshot> {
  const [section, field] = path.split(".");
  const updated = JSON.parse(JSON.stringify(snapshot));

  if (!updated[section as keyof typeof updated]) {
    updated[section as keyof typeof updated] = {} as any;
  }

  (updated[section as keyof typeof updated] as any)[field] = value;

  return updated;
}

/**
 * Get all non-empty fields from snapshot
 */
export function getFilledFields(
  snapshot: Partial<OrderBriefSnapshot>
): Array<{ path: string; field: FieldWithEvidence }> {
  const filled: Array<{ path: string; field: FieldWithEvidence }> = [];

  const sections = Object.keys(snapshot) as Array<keyof OrderBriefSnapshot>;

  for (const section of sections) {
    const sectionData = snapshot[section];
    if (!sectionData) continue;

    const fields = Object.keys(sectionData);
    for (const fieldName of fields) {
      const field = (sectionData as any)[fieldName] as FieldWithEvidence;
      if (field && field.state !== "MISSING" && field.value !== null) {
        filled.push({
          path: `${section}.${fieldName}`,
          field,
        });
      }
    }
  }

  return filled;
}

/**
 * Get fields by state
 */
export function getFieldsByState(
  snapshot: Partial<OrderBriefSnapshot>,
  state: FieldWithEvidence["state"]
): Array<{ path: string; field: FieldWithEvidence }> {
  const result: Array<{ path: string; field: FieldWithEvidence }> = [];

  const sections = Object.keys(snapshot) as Array<keyof OrderBriefSnapshot>;

  for (const section of sections) {
    const sectionData = snapshot[section];
    if (!sectionData) continue;

    const fields = Object.keys(sectionData);
    for (const fieldName of fields) {
      const field = (sectionData as any)[fieldName] as FieldWithEvidence;
      if (field && field.state === state) {
        result.push({
          path: `${section}.${fieldName}`,
          field,
        });
      }
    }
  }

  return result;
}

// =============================================================================
// COMPLETENESS CALCULATION
// =============================================================================

/**
 * Calculate brief completeness with category context
 */
export function calculateBriefCompleteness(
  snapshot: Partial<OrderBriefSnapshot>
): BriefCompleteness {
  // Try to get category from snapshot
  const categoryField = snapshot.product?.categoryId;
  const category =
    categoryField && categoryField.value
      ? String(categoryField.value)
      : undefined;

  const requiredFields = getRequiredFields(category);
  return calculateCompleteness(snapshot, requiredFields);
}

/**
 * Check if brief is ready for agreement (Phase 3)
 */
export function isReadyForAgreement(
  snapshot: Partial<OrderBriefSnapshot>
): {
  isReady: boolean;
  reasons: string[];
} {
  const reasons: string[] = [];

  // Check critical fields
  const criticalPaths = [
    "product.productType",
    "product.quantity",
    "financial.buyerBudget",
    "fulfillment.requestedFulfillmentDate",
  ];

  for (const path of criticalPaths) {
    const field = getFieldByPath(snapshot, path);
    if (!field || field.state === "MISSING" || field.value === null) {
      reasons.push(`Field ${path} belum diisi`);
    } else if (field.state === "INFERRED_NEEDS_CONFIRMATION") {
      reasons.push(`Field ${path} masih perlu konfirmasi`);
    } else if (field.state === "CONFLICT") {
      reasons.push(`Field ${path} memiliki konflik`);
    }
  }

  // Check creator quote
  const creatorPrice = snapshot.financial?.creatorQuotedPrice;
  if (!creatorPrice || !creatorPrice.value) {
    reasons.push("Harga dari creator belum tersedia");
  }

  // Check committed date
  const committedDate = snapshot.fulfillment?.creatorCommittedDate;
  if (!committedDate || !committedDate.value) {
    reasons.push("Tanggal komitmen dari creator belum tersedia");
  }

  return {
    isReady: reasons.length === 0,
    reasons,
  };
}

// =============================================================================
// EVIDENCE HELPERS
// =============================================================================

/**
 * Format evidence quote for display
 */
export function formatEvidenceQuote(quote: string, maxLength = 100): string {
  if (quote.length <= maxLength) return quote;
  return quote.slice(0, maxLength - 3) + "...";
}

/**
 * Group evidence by message ID
 */
export function groupEvidenceByMessage(
  evidenceIds: string[],
  quotes: string[]
): Map<string, string[]> {
  const grouped = new Map<string, string[]>();

  evidenceIds.forEach((id, idx) => {
    const quote = quotes[idx] || "";
    const existing = grouped.get(id) || [];
    grouped.set(id, [...existing, quote]);
  });

  return grouped;
}

// =============================================================================
// DIFF CALCULATION
// =============================================================================

/**
 * Calculate diff between two snapshots
 */
export function calculateSnapshotDiff(
  oldSnapshot: Partial<OrderBriefSnapshot>,
  newSnapshot: Partial<OrderBriefSnapshot>
): Array<{
  path: string;
  oldValue: unknown;
  newValue: unknown;
  changeType: "added" | "modified" | "removed";
}> {
  const changes: Array<{
    path: string;
    oldValue: unknown;
    newValue: unknown;
    changeType: "added" | "modified" | "removed";
  }> = [];

  const allPaths = new Set<string>();

  // Collect all paths from both snapshots
  const collectPaths = (snapshot: any, prefix = "") => {
    if (!snapshot) return;
    for (const section of Object.keys(snapshot)) {
      const sectionData = snapshot[section];
      if (sectionData && typeof sectionData === "object") {
        for (const field of Object.keys(sectionData)) {
          allPaths.add(`${section}.${field}`);
        }
      }
    }
  };

  collectPaths(oldSnapshot);
  collectPaths(newSnapshot);

  // Compare each path
  for (const path of allPaths) {
    const oldField = getFieldByPath(oldSnapshot, path);
    const newField = getFieldByPath(newSnapshot, path);

    const oldValue = oldField?.value;
    const newValue = newField?.value;

    if (oldValue === undefined && newValue !== undefined) {
      changes.push({
        path,
        oldValue: null,
        newValue,
        changeType: "added",
      });
    } else if (oldValue !== undefined && newValue === undefined) {
      changes.push({
        path,
        oldValue,
        newValue: null,
        changeType: "removed",
      });
    } else if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
      changes.push({
        path,
        oldValue,
        newValue,
        changeType: "modified",
      });
    }
  }

  return changes;
}

// =============================================================================
// DATE HELPERS
// =============================================================================

/**
 * Parse and validate date string
 */
export function parseDateSafely(
  dateStr: string | null | undefined
): Date | null {
  if (!dateStr) return null;

  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return null;
    return date;
  } catch {
    return null;
  }
}

/**
 * Format date for display
 */
export function formatDisplayDate(date: Date | string | null): string {
  if (!date) return "-";

  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) return "-";

  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}

// =============================================================================
// CURRENCY HELPERS
// =============================================================================

/**
 * Format currency for display
 */
export function formatCurrency(amount: number | null, currency = "IDR"): string {
  if (amount === null || amount === undefined) return "-";

  if (currency === "IDR") {
    return `Rp${amount.toLocaleString("id-ID")}`;
  }

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency,
  }).format(amount);
}

/**
 * Parse currency string to number
 */
export function parseCurrency(str: string): number | null {
  if (!str) return null;

  // Remove common currency symbols and separators
  const cleaned = str
    .replace(/[Rp\s.,]/g, "")
    .replace(/[^\d]/g, "");

  const num = parseInt(cleaned, 10);
  return isNaN(num) ? null : num;
}
