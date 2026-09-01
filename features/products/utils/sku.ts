/**
 * Generates an automatic 6-character SKU code based on product name
 * Format: 4 uppercase letters derived from product name + 2 random digits (e.g. BKWH28)
 */
export function generateProductSku(name?: string): string {
  const cleaned = (name || "PROD")
    .toUpperCase()
    .replace(/[^A-Z]/g, "");

  let prefix = "";
  if (cleaned.length >= 4) {
    prefix = cleaned.slice(0, 4);
  } else if (cleaned.length > 0) {
    prefix = cleaned.padEnd(4, "X");
  } else {
    prefix = "BCKT";
  }

  // 2 digit random number (10 - 99)
  const randomDigits = Math.floor(10 + Math.random() * 90).toString();
  return `${prefix}${randomDigits}`.slice(0, 6);
}
