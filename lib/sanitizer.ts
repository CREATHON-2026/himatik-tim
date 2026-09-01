/**
 * Defense-in-Depth HTML Sanitizer Utility
 *
 * Cleans user-generated HTML content before rendering via dangerouslySetInnerHTML.
 * Removes script tags, inline event handlers (onerror, onload, etc.), and dangerous URI protocols.
 */

export function sanitizeHtml(dirtyHtml: string): string {
  if (!dirtyHtml) return "";

  // 1. Remove <script> tags and contents
  let clean = dirtyHtml.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");

  // 2. Remove <iframe>, <object>, <embed>, <form> tags and contents
  clean = clean.replace(/<(iframe|object|embed|form)\b[^<]*(?:(?!<\/\1>)<[^<]*)*<\/\1>/gi, "");

  // 3. Remove inline event handlers (e.g., onclick=..., onerror=...)
  clean = clean.replace(/\s*on\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "");

  // 4. Remove dangerous javascript: and data: text/html URIs in href/src
  clean = clean.replace(/(href|src)\s*=\s*(?:"javascript:[^"]*"|'javascript:[^']*'|javascript:[^\s>]+)/gi, "");
  clean = clean.replace(/(href|src)\s*=\s*(?:"data:text\/html[^"]*"|'data:text\/html[^']*')/gi, "");

  return clean;
}
