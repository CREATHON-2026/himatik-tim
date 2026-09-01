import React from "react";

/**
 * Parses and renders rich HTML or formatted Markdown-style text description.
 */
export function renderFormattedDescription(text: string | null): React.ReactNode {
  if (!text) return null;

  // Detect if the string contains HTML tags (e.g. <div>, <span>, <p>)
  const isHtml = /<[a-z][\s\S]*>/i.test(text);
  if (isHtml) {
    return (
      <div
        className="rich-text-description text-sm text-neutral-800 leading-relaxed font-sans"
        dangerouslySetInnerHTML={{ __html: text }}
      />
    );
  }

  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  let currentListItems: string[] = [];
  let listType: "disc" | "decimal" | null = null;

  const flushList = (key: string | number) => {
    if (currentListItems.length > 0) {
      if (listType === "decimal") {
        elements.push(
          <ol
            key={`ol-${key}`}
            className="list-decimal pl-5 my-2 flex flex-col gap-1 text-sm text-neutral-800 font-sans leading-relaxed"
          >
            {currentListItems.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ol>
        );
      } else {
        elements.push(
          <ul
            key={`ul-${key}`}
            className="list-disc pl-5 my-2 flex flex-col gap-1 text-sm text-neutral-800 font-sans leading-relaxed"
          >
            {currentListItems.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        );
      }
      currentListItems = [];
      listType = null;
    }
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    const bulletMatch = line.match(/^(\s*)[-\*•]\s+(.*)/);
    const decimalMatch = line.match(/^(\s*)\d+\.\s+(.*)/);

    if (bulletMatch) {
      if (listType === "decimal") {
        flushList(idx);
      }
      listType = "disc";
      currentListItems.push(bulletMatch[2]);
    } else if (decimalMatch) {
      if (listType === "disc") {
        flushList(idx);
      }
      listType = "decimal";
      currentListItems.push(decimalMatch[2]);
    } else {
      flushList(idx);
      if (trimmed.length > 0) {
        if (
          trimmed.endsWith(":") ||
          (trimmed.startsWith("**") && trimmed.endsWith("**"))
        ) {
          const headerText = trimmed.replace(/\*\*/g, "");
          elements.push(
            <h5
              key={`h5-${idx}`}
              className="font-heading font-bold text-[#3E5237] text-base mt-4 mb-2 first:mt-0"
            >
              {headerText}
            </h5>
          );
        } else {
          elements.push(
            <p
              key={`p-${idx}`}
              className="text-sm text-neutral-800 font-sans leading-relaxed mb-2 last:mb-0"
            >
              {trimmed}
            </p>
          );
        }
      } else {
        elements.push(<div key={`space-${idx}`} className="h-2" />);
      }
    }
  });

  flushList("end");
  return <div className="flex flex-col gap-1">{elements}</div>;
}
