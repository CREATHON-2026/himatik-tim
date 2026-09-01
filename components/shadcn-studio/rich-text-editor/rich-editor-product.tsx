"use client";

import * as React from "react";
import {
  List,
  ListOrdered,
  AlignLeft,
  Link as LinkIcon,
  Quote,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RichEditorProductProps {
  /** HTML value of the editor (controlled via react-hook-form or state) */
  value?: string;
  /** Called on every keystroke with the new innerHTML */
  onChange?: (html: string) => void;
  /** Max character count (plain-text, HTML tags stripped) */
  maxLength?: number;
  /** Placeholder text */
  placeholder?: string;
  /** Additional className for the outer wrapper */
  className?: string;
}

/**
 * Lightweight & accessible WYSIWYG editor for product descriptions.
 * Uses native contenteditable + document.execCommand + Markdown Auto-Rules.
 * Conforms to Bicket Typography System (typo-system.md).
 */
export function RichEditorProduct({
  value,
  onChange,
  maxLength = 2000,
  placeholder = "Jelaskan detail tentang produk, bahan, ukuran, dan keunikan produk Anda...",
  className,
}: RichEditorProductProps) {
  const editorRef = React.useRef<HTMLDivElement>(null);

  // Active state for formatting buttons
  const [activeFormats, setActiveFormats] = React.useState({
    isBold: false,
    isItalic: false,
    isUnderline: false,
    isUl: false,
    isOl: false,
    blockType: "p",
  });

  const updateActiveFormats = React.useCallback(() => {
    if (!editorRef.current) return;
    try {
      const isBold = document.queryCommandState("bold");
      const isItalic = document.queryCommandState("italic");
      const isUnderline = document.queryCommandState("underline");
      const isUl = document.queryCommandState("insertUnorderedList");
      const isOl = document.queryCommandState("insertOrderedList");

      let blockType = "p";
      const selection = window.getSelection();
      if (selection && selection.anchorNode) {
        let parent: HTMLElement | null =
          selection.anchorNode.nodeType === Node.ELEMENT_NODE
            ? (selection.anchorNode as HTMLElement)
            : selection.anchorNode.parentElement;

        while (parent && parent !== editorRef.current) {
          const tag = parent.tagName.toLowerCase();
          if (["h1", "h2", "h3", "blockquote", "p"].includes(tag)) {
            blockType = tag;
            break;
          }
          parent = parent.parentElement;
        }
      }

      setActiveFormats({
        isBold,
        isItalic,
        isUnderline,
        isUl,
        isOl,
        blockType,
      });
    } catch {
      // document.queryCommandState fallback
    }
  }, []);

  // Populate editor with initial / controlled value on mount
  React.useEffect(() => {
    if (editorRef.current && value && editorRef.current.innerHTML === "") {
      editorRef.current.innerHTML = value;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally run once on mount only

  // Clear editor when controlled value is emptied externally
  React.useEffect(() => {
    if (editorRef.current && (value === "" || value === undefined)) {
      if (editorRef.current.innerHTML !== "") {
        editorRef.current.innerHTML = "";
      }
    }
  }, [value]);

  const exec = (command: string, val = "") => {
    document.execCommand(command, false, val);
    if (editorRef.current) {
      onChange?.(editorRef.current.innerHTML);
      updateActiveFormats();
    }
  };

  const handleLink = () => {
    const url = prompt("Masukkan URL tautan (misal: https://...):");
    if (url) {
      const formattedUrl =
        url.startsWith("http://") || url.startsWith("https://")
          ? url
          : `https://${url}`;
      exec("createLink", formattedUrl);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // 1. Keyboard shortcuts: Ctrl+B, Ctrl+I, Ctrl+U, Ctrl+K
    if ((e.ctrlKey || e.metaKey) && !e.shiftKey && !e.altKey) {
      if (e.key === "b" || e.key === "B") {
        e.preventDefault();
        exec("bold");
        return;
      }
      if (e.key === "i" || e.key === "I") {
        e.preventDefault();
        exec("italic");
        return;
      }
      if (e.key === "u" || e.key === "U") {
        e.preventDefault();
        exec("underline");
        return;
      }
      if (e.key === "k" || e.key === "K") {
        e.preventDefault();
        handleLink();
        return;
      }
    }

    // 2. Markdown Auto-Input Rules on Space key
    if (e.key === " ") {
      const selection = window.getSelection();
      if (selection && selection.isCollapsed && selection.anchorNode) {
        const node = selection.anchorNode;
        const text = node.textContent || "";
        const offset = selection.anchorOffset;
        const textBeforeCursor = text.slice(0, offset).trim();

        // Bullet List: "-" or "*" + Space
        if (textBeforeCursor === "-" || textBeforeCursor === "*") {
          e.preventDefault();
          const remainingText = text.slice(offset);
          node.textContent = remainingText;
          exec("insertUnorderedList");
          return;
        }

        // Ordered List: "1." + Space
        if (textBeforeCursor === "1.") {
          e.preventDefault();
          const remainingText = text.slice(offset);
          node.textContent = remainingText;
          exec("insertOrderedList");
          return;
        }

        // Heading 1: "#" + Space
        if (textBeforeCursor === "#") {
          e.preventDefault();
          const remainingText = text.slice(offset);
          node.textContent = remainingText;
          exec("formatBlock", "<h1>");
          return;
        }

        // Heading 2: "##" + Space
        if (textBeforeCursor === "##") {
          e.preventDefault();
          const remainingText = text.slice(offset);
          node.textContent = remainingText;
          exec("formatBlock", "<h2>");
          return;
        }

        // Blockquote: ">" + Space
        if (textBeforeCursor === ">") {
          e.preventDefault();
          const remainingText = text.slice(offset);
          node.textContent = remainingText;
          exec("formatBlock", "<blockquote>");
          return;
        }
      }
    }
  };

  const charCount = value ? value.replace(/<[^>]*>/g, "").length : 0;

  const toolbarBtn =
    "h-8 w-8 flex items-center justify-center rounded-lg hover:bg-muted text-foreground/80 transition-all cursor-pointer active:scale-90 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:outline-none";

  const activeBtnStyle =
    "bg-primary/15 text-primary-dark font-bold shadow-xs border border-primary/30";

  return (
    <div
      className={cn(
        "border border-border/30 rounded-xl overflow-hidden bg-card focus-within:ring-2 focus-within:ring-primary/20 transition-all",
        className
      )}
    >
      {/* ── Formatting Toolbar ── */}
      <div className="border-b border-border/20 bg-muted/10 px-3 py-2 flex items-center gap-1.5 flex-wrap select-none">
        {/* Block format dropdown */}
        <select
          value={activeFormats.blockType === "h1" ? "<h1>" : activeFormats.blockType === "h2" ? "<h2>" : activeFormats.blockType === "blockquote" ? "<blockquote>" : "<p>"}
          onChange={(e) => exec("formatBlock", e.target.value)}
          className="h-8 text-xs bg-card border border-border/40 rounded-lg px-2 text-foreground outline-none font-medium cursor-pointer transition-shadow focus-visible:ring-2 focus-visible:ring-primary/40"
          aria-label="Format blok teks"
        >
          <option value="<p>">Normal (Paragraf)</option>
          <option value="<h1>">Heading 1 (Judul Utama)</option>
          <option value="<h2>">Heading 2 (Sub-Judul)</option>
          <option value="<blockquote>">Kutipan (Blockquote)</option>
        </select>

        <div className="h-4 w-px bg-border/40 mx-1" aria-hidden />

        {/* Inline formatting */}
        <button
          type="button"
          onClick={() => exec("bold")}
          className={cn(
            toolbarBtn,
            "font-serif font-bold text-xs",
            activeFormats.isBold && activeBtnStyle
          )}
          title="Tebalkan (Ctrl+B)"
          aria-label="Tebalkan"
          aria-pressed={activeFormats.isBold}
        >
          B
        </button>
        <button
          type="button"
          onClick={() => exec("italic")}
          className={cn(
            toolbarBtn,
            "font-serif italic text-xs",
            activeFormats.isItalic && activeBtnStyle
          )}
          title="Miringkan (Ctrl+I)"
          aria-label="Miringkan"
          aria-pressed={activeFormats.isItalic}
        >
          I
        </button>
        <button
          type="button"
          onClick={() => exec("underline")}
          className={cn(
            toolbarBtn,
            "font-serif underline text-xs",
            activeFormats.isUnderline && activeBtnStyle
          )}
          title="Garis Bawah (Ctrl+U)"
          aria-label="Garis Bawah"
          aria-pressed={activeFormats.isUnderline}
        >
          U
        </button>

        <div className="h-4 w-px bg-border/40 mx-1" aria-hidden />

        {/* Lists & Block formatting */}
        <button
          type="button"
          onClick={() => exec("insertUnorderedList")}
          className={cn(
            toolbarBtn,
            activeFormats.isUl && activeBtnStyle
          )}
          title="Daftar Bullet (- atau * + Spasi)"
          aria-label="Daftar Bullet"
          aria-pressed={activeFormats.isUl}
        >
          <List className="size-3.5" />
        </button>
        <button
          type="button"
          onClick={() => exec("insertOrderedList")}
          className={cn(
            toolbarBtn,
            activeFormats.isOl && activeBtnStyle
          )}
          title="Daftar Angka (1. + Spasi)"
          aria-label="Daftar Angka"
          aria-pressed={activeFormats.isOl}
        >
          <ListOrdered className="size-3.5" />
        </button>
        <button
          type="button"
          onClick={() => exec("formatBlock", "<blockquote>")}
          className={cn(
            toolbarBtn,
            activeFormats.blockType === "blockquote" && activeBtnStyle
          )}
          title="Kutipan (> + Spasi)"
          aria-label="Kutipan"
          aria-pressed={activeFormats.blockType === "blockquote"}
        >
          <Quote className="size-3.5" />
        </button>
        <button
          type="button"
          onClick={() => exec("justifyLeft")}
          className={toolbarBtn}
          title="Rata Kiri"
          aria-label="Rata Kiri"
        >
          <AlignLeft className="size-3.5" />
        </button>
        <button
          type="button"
          onClick={handleLink}
          className={toolbarBtn}
          title="Tambah Tautan (Ctrl+K)"
          aria-label="Tambah Tautan"
        >
          <LinkIcon className="size-3.5" />
        </button>
      </div>

      {/* ── Editor Body (Styled according to typo-system.md) ── */}
      <div className="relative">
        <div
          ref={editorRef}
          contentEditable
          role="textbox"
          aria-multiline="true"
          aria-label="Deskripsi Produk"
          id="description"
          data-placeholder={placeholder}
          onInput={(e) => {
            onChange?.(e.currentTarget.innerHTML);
            updateActiveFormats();
          }}
          onKeyDown={handleKeyDown}
          onKeyUp={updateActiveFormats}
          onMouseUp={updateActiveFormats}
          onPaste={handlePaste}
          className={cn(
            "w-full px-3.5 py-3 text-sm bg-transparent border-0 outline-none text-foreground/90",
            "resize-none focus:ring-0 focus:outline-none leading-relaxed",
            "min-h-40 max-h-90 overflow-y-auto",
            // Placeholder styling
            "empty:before:content-[attr(data-placeholder)] empty:before:text-muted-foreground/50 empty:before:pointer-events-none empty:before:text-xs sm:empty:before:text-sm",
            // Typography rules compliant styles (counters Tailwind preflight reset)
            "[&_h1]:font-heading [&_h1]:text-xl sm:[&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-foreground [&_h1]:mt-3 [&_h1]:mb-1.5 [&_h1]:leading-tight [&_h1]:tracking-tight",
            "[&_h2]:font-heading [&_h2]:text-base sm:[&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-2.5 [&_h2]:mb-1 [&_h2]:leading-snug",
            "[&_p]:font-sans [&_p]:text-sm [&_p]:text-foreground/90 [&_p]:leading-relaxed [&_p]:my-1.5",
            "[&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-2 [&_ul]:space-y-1 [&_ul]:font-sans [&_ul]:text-sm [&_ul]:text-foreground/90 [&_ul]:marker:text-[#B89A57]",
            "[&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-2 [&_ol]:space-y-1 [&_ol]:font-sans [&_ol]:text-sm [&_ol]:text-foreground/90 [&_ol]:marker:font-bold [&_ol]:marker:text-[#78865C]",
            "[&_li]:leading-relaxed",
            "[&_blockquote]:italic [&_blockquote]:border-l-2 [&_blockquote]:pl-3.5 [&_blockquote]:border-[#B89A57] [&_blockquote]:text-[#78865C] [&_blockquote]:my-2 [&_blockquote]:font-serif",
            "[&_strong]:font-bold [&_strong]:text-foreground",
            "[&_b]:font-bold [&_b]:text-foreground",
            "[&_em]:italic",
            "[&_u]:underline [&_u]:decoration-[#78865C]/40 [&_u]:underline-offset-2",
            "[&_a]:text-primary [&_a]:underline [&_a]:font-semibold hover:[&_a]:text-primary-dark [&_a]:transition-colors"
          )}
        />

        {/* Character counter & Helper tip */}
        <div className="flex items-center justify-between px-3 py-1.5 border-t border-border/10 bg-muted/5 text-[10px] text-muted-foreground/60 select-none">
          <span className="hidden sm:inline">
            Tips: Ketik <kbd className="bg-muted px-1 rounded border border-border/40 font-mono">-</kbd> atau <kbd className="bg-muted px-1 rounded border border-border/40 font-mono">1.</kbd> lalu spasi untuk daftar otomatis
          </span>
          <span className="ml-auto font-semibold">
            {charCount}/{maxLength}
          </span>
        </div>
      </div>
    </div>
  );
}
