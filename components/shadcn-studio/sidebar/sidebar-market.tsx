"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { motion, AnimatePresence } from "motion/react";
import {
  Layers,
  Flower2,
  Gift,
  Sparkles,
  Cake,
  Palette,
  ShoppingBag,
  RotateCcw,
  ChevronRight,
  PanelLeftOpen,
  CalendarHeart,
  Search,
  X,
  Info,
  Check,
  Plus,
  ChevronDown,
} from "lucide-react";
import { useProducts } from "@/features/products/hooks/useProducts";
import {
  CONTROLLED_OCCASION_TAGS,
  CATEGORY_METADATA,
  getCategoryMeta,
} from "@/features/products/constants";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

const ALL_CATEGORIES = [
  {
    name: "Semua Kategori",
    value: "",
    subtext: "Jelajahi seluruh karya hadiah",
    icon: Layers,
  },
  {
    name: "Gift Box & Hampers",
    value: "Gift Box & Hampers",
    subtext: CATEGORY_METADATA["Gift Box & Hampers"].subtext,
    icon: Gift,
  },
  {
    name: "Bouquet & Floral Gifts",
    value: "Bouquet & Floral Gifts",
    subtext: CATEGORY_METADATA["Bouquet & Floral Gifts"].subtext,
    icon: Flower2,
  },
  {
    name: "Personalized & Custom Gifts",
    value: "Personalized & Custom Gifts",
    subtext: CATEGORY_METADATA["Personalized & Custom Gifts"].subtext,
    icon: Sparkles,
  },
  {
    name: "Food & Sweet Gifts",
    value: "Food & Sweet Gifts",
    subtext: CATEGORY_METADATA["Food & Sweet Gifts"].subtext,
    icon: Cake,
  },
  {
    name: "Handmade & Creative Gifts",
    value: "Handmade & Creative Gifts",
    subtext: CATEGORY_METADATA["Handmade & Creative Gifts"].subtext,
    icon: Palette,
  },
  {
    name: "Lifestyle & Accessories Gifts",
    value: "Lifestyle & Accessories Gifts",
    subtext: CATEGORY_METADATA["Lifestyle & Accessories Gifts"].subtext,
    icon: ShoppingBag,
  },
];

/**
 * Reusable Filter Form Fields (used in both Desktop Sidebar & Mobile/Tablet Drawer Sheet)
 */
export function MarketFilterFields({ onAction }: { onAction?: () => void }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read current parameters from URL
  const currentCategory =
    searchParams.get("category") || searchParams.get("flowerType") || "";
  const currentMinPrice = searchParams.get("minPrice") || "";
  const currentMaxPrice = searchParams.get("maxPrice") || "";
  const currentOccasion =
    searchParams.get("occasion") || searchParams.get("moment") || "";

  // Local state for occasion search input & dropdown open state
  const [occasionSearch, setOccasionSearch] = useState("");
  const [isOccasionDropdownOpen, setIsOccasionDropdownOpen] = useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOccasionDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Parse multi-selected occasion tags
  const selectedOccasions = currentOccasion
    ? currentOccasion
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  // Temporary local state for price range — initialized directly from URL params
  const [priceRange, setPriceRange] = useState<[number, number]>(() => [
    currentMinPrice ? parseInt(currentMinPrice, 10) : 0,
    currentMaxPrice ? parseInt(currentMaxPrice, 10) : 2000000,
  ]);

  // Fetch product search metadata (counts) dynamically
  const { data: searchData } = useProducts({
    category: currentCategory || null,
    minPrice: currentMinPrice || null,
    maxPrice: currentMaxPrice || null,
    occasion: currentOccasion || null,
  });

  const updateParams = (newParams: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    // Cleanup old legacy parameter keys if present
    params.delete("flowerType");
    params.delete("moment");
    params.delete("color");
    params.delete("creatorLocation");
    params.delete("rating");

    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    params.delete("page");
    router.push(`/market?${params.toString()}`);
    onAction?.();
  };

  const handleCategorySelect = (categoryVal: string) => {
    updateParams({
      category: categoryVal === currentCategory ? null : categoryVal || null,
    });
  };

  const handleToggleOccasion = (tag: string) => {
    const exists = selectedOccasions.includes(tag);
    const next = exists
      ? selectedOccasions.filter((t) => t !== tag)
      : [...selectedOccasions, tag];
    updateParams({ occasion: next.length > 0 ? next.join(",") : null });
  };

  const handlePriceChange = (val: number | readonly number[]) => {
    if (Array.isArray(val)) {
      setPriceRange([val[0], val[1]]);
    }
  };

  const handlePriceRelease = (val: number | readonly number[]) => {
    if (Array.isArray(val)) {
      updateParams({
        minPrice: val[0] > 0 ? val[0].toString() : null,
        maxPrice: val[1] < 2000000 ? val[1].toString() : null,
      });
    }
  };

  const handleResetFilters = () => {
    setPriceRange([0, 2000000]);
    setOccasionSearch("");
    router.push("/market");
    onAction?.();
  };

  // Dynamic count getters
  const getCategoryCount = (val: string) => {
    if (!val) return searchData?.categoryCounts?.total ?? 0;
    return searchData?.categoryCounts?.[val] ?? 0;
  };

  // Filter occasion tags by search query
  const filteredOccasions = CONTROLLED_OCCASION_TAGS.filter((tag) =>
    tag.toLowerCase().includes(occasionSearch.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full justify-between space-y-4">
      <div className="space-y-4">
        {/* SECTION 1: KATEGORI PRODUK (COMPACT + VERTICAL HOVER TOOLTIP) */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold tracking-wider text-[#3E5237] uppercase">
              Kategori Hadiah
            </h3>
            <span className="text-[10px] text-[#78865C] font-medium hidden lg:inline-flex items-center gap-1 opacity-75">
              <Info className="size-2.5" />
              <span>Hover info</span>
            </span>
          </div>

          <TooltipProvider delay={120}>
            <div className="space-y-0.5">
              {ALL_CATEGORIES.map((cat) => {
                const isSelected = currentCategory === cat.value;
                const Icon = cat.icon;
                const count = getCategoryCount(cat.value);
                const meta = cat.value ? getCategoryMeta(cat.value) : null;

                return (
                  <Tooltip key={cat.name}>
                    {/* TooltipTrigger renders a native button directly without nested button tag */}
                    <TooltipTrigger
                      onClick={() => handleCategorySelect(cat.value)}
                      className={`flex w-full items-center justify-between px-2.5 py-1.5 rounded-xl transition-all duration-150 cursor-pointer text-left select-none ${
                        isSelected
                          ? "skeuo-category-active text-[#3E5237]"
                          : "text-[#3E5237]/85 hover:bg-[#78865C]/10 hover:text-[#3E5237]"
                      }`}
                    >
                      <span className="flex items-center gap-1.5 truncate">
                        <Icon className="h-3.5 w-3.5 shrink-0 text-[#78865C]" />
                        <span className="truncate text-[11.5px] font-bold tracking-tight">
                          {cat.name}
                        </span>
                      </span>
                      <span className="flex items-center gap-1 shrink-0 ml-1">
                        <span className="skeuo-badge-sunken select-none text-[9.5px]">
                          {count}
                        </span>
                        <ChevronRight className="h-2.5 w-2.5 text-[#78865C]/60" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent
                      side="right"
                      sideOffset={10}
                      className="flex flex-col items-start block max-w-[270px] p-3 rounded-xl skeuo-flat bg-[#FAF4EC] border border-[#B89A57]/30 text-[#3E5237] shadow-xl z-50 text-left space-y-1.5"
                    >
                      <div className="flex items-center justify-between w-full border-b border-[#78865C]/15 pb-1">
                        <span className="font-heading font-bold text-xs text-[#3E5237]">
                          {cat.name}
                        </span>
                        {meta?.badge && (
                          <span className="text-[9px] font-bold bg-[#78865C]/15 text-[#566B4D] px-1.5 py-0.5 rounded-full">
                            {meta.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#78865C] leading-snug font-sans w-full">
                        {meta?.description || cat.subtext}
                      </p>
                      {meta?.examples && (
                        <div className="text-[10px] text-[#78865C]/80 pt-1 border-t border-[#78865C]/10 w-full">
                          <span className="font-semibold text-[#3E5237]">Contoh: </span>
                          {meta.examples}
                        </div>
                      )}
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          </TooltipProvider>
        </div>

        {/* SECTION 2: MOMEN & OCCASION (SEARCH DROPDOWN + SELECTED TAGS ONLY) */}
        <div className="space-y-2 border-t border-[#78865C]/20 pt-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold tracking-wider text-[#3E5237] uppercase flex items-center gap-1.5">
              <CalendarHeart className="h-3.5 w-3.5 text-[#566B4D]" />
              <span>Momen & Acara</span>
            </h3>
            {selectedOccasions.length > 0 && (
              <button
                type="button"
                onClick={() => updateParams({ occasion: null })}
                className="text-[10px] text-[#78865C] hover:underline font-semibold cursor-pointer flex items-center gap-0.5"
                title="Reset semua pilihan momen"
              >
                <X className="size-2.5" />
                <span>Reset ({selectedOccasions.length})</span>
              </button>
            )}
          </div>

          {/* Search Tag & Floating Selection Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <Input
              value={occasionSearch}
              onFocus={() => setIsOccasionDropdownOpen(true)}
              onChange={(e) => {
                setOccasionSearch(e.target.value);
                setIsOccasionDropdownOpen(true);
              }}
              placeholder="Cari & pilih momen..."
              startIcon={<Search className="size-3.5 text-[#78865C]" />}
              endIcon={
                <div className="flex items-center gap-1">
                  {occasionSearch && (
                    <button
                      type="button"
                      onClick={() => setOccasionSearch("")}
                      className="cursor-pointer text-[#78865C] hover:text-[#3E5237] p-0.5"
                    >
                      <X className="size-3" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() =>
                      setIsOccasionDropdownOpen(!isOccasionDropdownOpen)
                    }
                    className="cursor-pointer text-[#78865C] hover:text-[#3E5237] p-0.5"
                  >
                    <ChevronDown
                      className={`size-3.5 transition-transform duration-200 ${
                        isOccasionDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>
              }
              className="h-8 text-xs bg-card border-[#78865C]/25 text-[#3E5237] placeholder:text-[#78865C]/60 rounded-xl"
            />

            {/* Floating Suggestions Dropdown */}
            {isOccasionDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-[#FAF4EC] border border-[#B89A57]/30 rounded-xl shadow-xl z-50 p-1.5 max-h-48 overflow-y-auto space-y-0.5 no-scrollbar">
                {filteredOccasions.map((tag) => {
                  const isSelected = selectedOccasions.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        handleToggleOccasion(tag);
                        setOccasionSearch("");
                      }}
                      className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#3E5237]/15 text-[#3E5237] font-bold"
                          : "hover:bg-[#78865C]/10 text-[#3E5237]/90 font-medium"
                      }`}
                    >
                      <span>{tag}</span>
                      {isSelected ? (
                        <Check className="size-3.5 text-[#3E5237]" />
                      ) : (
                        <Plus className="size-3 text-[#78865C]/60" />
                      )}
                    </button>
                  );
                })}
                {filteredOccasions.length === 0 && (
                  <p className="text-[11px] text-[#78865C]/70 italic py-2 px-2 text-center">
                    Momen tidak ditemukan
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Selected Active Tags Only (Underneath Search Field) */}
          {selectedOccasions.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-0.5">
              {selectedOccasions.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleToggleOccasion(tag)}
                  className="px-2 py-0.5 rounded-lg text-[11px] font-semibold bg-[#3E5237] text-white border border-[#3E5237] shadow-xs flex items-center gap-1 cursor-pointer select-none hover:bg-[#2F3E2A] active:scale-95 transition-all"
                  title={`Hapus filter ${tag}`}
                >
                  <span>✓ {tag}</span>
                  <X className="size-2.5 opacity-80 hover:opacity-100" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* SECTION 3: RENTANG HARGA */}
        <div className="space-y-3 border-t border-[#78865C]/20 pt-3">
          <h3 className="text-xs font-bold tracking-wider text-[#3E5237] uppercase px-1">
            Rentang Harga
          </h3>
          <div className="space-y-2 px-0.5">
            <div className="flex items-center justify-between text-xs font-semibold text-[#2D3829] font-sans">
              <span>Rp {priceRange[0].toLocaleString("id-ID")}</span>
              <span>
                Rp{" "}
                {priceRange[1] >= 2000000
                  ? "2.000.000+"
                  : priceRange[1].toLocaleString("id-ID")}
              </span>
            </div>
            <div className="px-1.5 pt-1">
              <Slider
                variant="skeuo-forest"
                min={0}
                max={2000000}
                step={25000}
                value={priceRange}
                onValueChange={handlePriceChange}
                onValueCommitted={handlePriceRelease}
                aria-label="Atur rentang harga minimal dan maksimal"
              />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 4: RESET ALL FILTERS BUTTON */}
      <div className="border-t border-[#78865C]/20 pt-3 pb-0.5 shrink-0">
        <Button
          variant="skeuo-forest"
          onClick={handleResetFilters}
          className="w-full h-9 gap-1.5 text-xs font-bold shadow-md cursor-pointer rounded-xl"
          aria-label="Reset Semua Filter"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset Semua Filter</span>
        </Button>
      </div>
    </div>
  );
}

/**
 * Desktop Permanent Collapsible Sidebar (Visible on lg: >= 1024px)
 */
function SidebarMarketContent() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      aria-label="Panel Saringan Filter Katalog Bicket"
      className={`sticky top-20 z-40 h-[calc(100vh-6rem)] shrink-0 hidden lg:block select-none transition-all duration-300 ${
        isCollapsed ? "w-10" : "w-64"
      }`}
    >
      {/* Floating Toggle Button */}
      <motion.div
        className={`absolute top-3 transition-all duration-300 z-50 ${
          isCollapsed ? "left-2" : "-right-4.5"
        }`}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <Button
          variant={isCollapsed ? "skeuo-forest-secondary" : "skeuo-paper-secondary"}
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="shadow-xl cursor-pointer border border-[#D8C4A7]/80"
          aria-label={isCollapsed ? "Buka Panel Filter Sidebar" : "Sembunyikan Panel Filter Sidebar"}
          title={isCollapsed ? "Buka Sidebar Filter" : "Sembunyikan Sidebar Filter"}
        >
          <motion.div
            animate={{ rotate: isCollapsed ? 0 : 180 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
          >
            <PanelLeftOpen className={`h-4 w-4 ${isCollapsed ? "text-[#FAF4EC]" : "text-[#3E5237]"}`} />
          </motion.div>
        </Button>
      </motion.div>

      {/* Embossed Paper Container */}
      <AnimatePresence initial={false}>
        {!isCollapsed && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 256, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="w-64 h-full flex flex-col justify-between overflow-hidden skeuo-sidebar-card p-4"
          >
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.06, duration: 0.25, ease: "easeOut" }}
              className="no-scrollbar flex-1 overflow-y-auto pr-0.5"
            >
              <MarketFilterFields />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}

/**
 * Mobile & Tablet Slide-over Drawer Sheet (Visible on < lg screens)
 */
export function MarketFilterDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();

  // Active filter counter
  const activeFilterCount = [
    searchParams.get("category") || searchParams.get("flowerType"),
    searchParams.get("minPrice"),
    searchParams.get("maxPrice"),
    searchParams.get("occasion") || searchParams.get("moment"),
  ].filter(Boolean).length;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger
        render={
          <Button
            variant="skeuo-forest-secondary"
            className="h-10 gap-2 px-4 shadow-sm cursor-pointer lg:hidden rounded-xl font-bold text-xs"
            aria-label="Buka Filter Katalog"
          >
            <Layers className="size-4" />
            <span>Filter</span>
            {activeFilterCount > 0 && (
              <span className="bg-[#B89A57] text-[#FAF4EC] px-1.5 py-0.2 text-[10px] font-bold rounded-full">
                {activeFilterCount}
              </span>
            )}
          </Button>
        }
      />
      <SheetContent
        side="left"
        className="w-80 sm:w-96 p-5 skeuo-sheet bg-[#F4EBE1] flex flex-col justify-between overflow-hidden z-50 border-r border-[#D8C4A7]"
      >
        <SheetHeader className="pb-3 border-b border-[#78865C]/20">
          <SheetTitle className="text-left font-heading text-lg font-bold text-[#3E5237]">
            Saring Hadiah
          </SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto py-3 no-scrollbar">
          <MarketFilterFields onAction={() => setIsOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

/**
 * Wrapper Export with Suspense boundary
 */
export function SidebarMarket() {
  return (
    <Suspense fallback={<div className="w-64 h-[calc(100vh-6rem)] hidden lg:block" />}>
      <SidebarMarketContent />
    </Suspense>
  );
}
