import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, X, Sparkles, Palette, Smartphone, 
  Check, SlidersHorizontal, ArrowUpRight, ArrowRight, ChevronLeft, ChevronRight
} from "lucide-react";
import { useTemplates, type StyleTheme, type ColorTheme, type Template } from "@/hooks/use-templates";
import { TemplateCard } from "@/components/TemplateCard";
import { PhonePreviewModal } from "@/components/PhonePreviewModal";
import { cn } from "@/lib/utils";
import { SEO } from "@/components/SEO";

const COLLECTIONS = [
  { id: "All", label: "All Designs" },
  { id: "Websites", label: "Interactive Websites" },
  { id: "Royal Palace", label: "Royal Palace" },
  { id: "Emerald Grandeur", label: "Emerald Grandeur" },
  { id: "Temple Heritage", label: "Temple Heritage" },
  { id: "Floral Botanical", label: "Floral Botanical" },
  { id: "Modern Minimalist", label: "Modern Minimalist" },
  { id: "Imperial Gold", label: "Imperial Gold" },
];

const STYLES: StyleTheme[] = ["All", "Royal", "Minimalist", "Floral", "Modern", "Vintage"];
const COLORS: { id: ColorTheme; name: string; hex: string }[] = [
  { id: "All", name: "All Colors", hex: "#e5e7eb" },
  { id: "Crimson", name: "Royal Crimson", hex: "#5b1424" },
  { id: "Gold", name: "Imperial Gold", hex: "#d4af37" },
  { id: "Emerald", name: "Mughal Emerald", hex: "#0f5132" },
  { id: "Pastel", name: "Blush Rose", hex: "#d88a9a" },
  { id: "Navy", name: "Sapphire Navy", hex: "#16284f" },
  { id: "Ivory", name: "Warm Ivory", hex: "#fcfaf6" },
];

export default function Templates() {
  const [search, setSearch] = useState("");
  const [activeCollection, setActiveCollection] = useState<string>("All");
  const [activeStyle, setActiveStyle] = useState<StyleTheme>("All");
  const [activeColor, setActiveColor] = useState<ColorTheme>("All");
  const [sortBy, setSortBy] = useState<"popular" | "trending" | "price-asc" | "price-desc">("popular");
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [mobileLayout, setMobileLayout] = useState<"horizontal" | "grid">("horizontal");

  // Query templates with website first and collection filters
  const { data: templates, isLoading } = useTemplates({
    format: activeCollection === "Websites" ? "website" : undefined,
    collection: activeCollection !== "All" && activeCollection !== "Websites" ? activeCollection : undefined,
    style: activeStyle,
    color: activeColor,
    search,
    sortBy,
  });

  const isFiltered = activeCollection !== "All" || activeStyle !== "All" || activeColor !== "All" || search.trim().length > 0;

  const handleResetFilters = () => {
    setActiveCollection("All");
    setActiveStyle("All");
    setActiveColor("All");
    setSearch("");
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-32 pb-24">
      <SEO
        title="Indian Digital Wedding Invitations & Interactive Website Suites | Vows & Knots"
        description="Browse handcrafted Indian wedding invitation website templates with live RSVP tracking, Google Maps directions, background music, and instant WhatsApp sharing."
        canonicalPath="/templates"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Feature Banner */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/70 border border-amber-300/40 text-amber-900 text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles size={14} className="text-amber-700" />
            <span>Curated Wedding Suites</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-stone-900 mb-4 tracking-tight">
            Wedding Invitation Templates
          </h1>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            Explore interactive mobile wedding websites and digital suites. Each design includes live guest RSVP tracking, Google Maps venue navigation, ceremonial music, and instant WhatsApp sharing.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-stone-200/80 shadow-sm mb-10 space-y-5">
          
          {/* Top Search & Sort Row */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:max-w-lg">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search templates by style (Royal, Floral, Minimalist), ceremony, or vibe..."
                className="w-full pl-11 pr-10 py-3 rounded-full border border-stone-200 bg-[#FAF8F5] text-sm focus:outline-none focus:border-stone-800 focus:bg-white transition-all shadow-inner text-stone-800"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Sort & Quick Counter */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              <span className="text-xs font-semibold text-stone-500 whitespace-nowrap">
                {templates ? `${templates.length} Designs` : "Loading..."}
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2.5 rounded-full border border-stone-200 bg-[#FAF8F5] text-xs font-semibold text-stone-800 focus:outline-none focus:border-stone-800 cursor-pointer"
              >
                <option value="popular">Most Popular</option>
                <option value="trending">Trending Now</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Filter 1: Collections (Website first, aesthetic names) */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Collection:
              </span>
              <span className="text-[10px] text-stone-400 font-medium md:hidden">Swipe &rarr;</span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1 md:flex-wrap">
              {COLLECTIONS.map((col) => (
                <button
                  key={col.id}
                  onClick={() => setActiveCollection(col.id)}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-xs font-semibold transition-all border cursor-pointer whitespace-nowrap shrink-0",
                    activeCollection === col.id
                      ? "bg-stone-900 text-stone-50 border-stone-900 shadow-sm"
                      : "bg-[#FAF8F5] text-stone-700 border-stone-200 hover:bg-stone-100"
                  )}
                >
                  {col.label}
                </button>
              ))}
            </div>
          </div>

          {/* Filter 2: Aesthetic Styles */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Aesthetic Style:
              </span>
              <span className="text-[10px] text-stone-400 font-medium md:hidden">Swipe &rarr;</span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1 md:flex-wrap">
              {STYLES.map((st) => (
                <button
                  key={st}
                  onClick={() => setActiveStyle(st)}
                  className={cn(
                    "px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border cursor-pointer whitespace-nowrap shrink-0",
                    activeStyle === st
                      ? "bg-amber-100 text-amber-900 border-amber-300 shadow-sm"
                      : "bg-[#FAF8F5] text-stone-700 border-stone-200 hover:bg-stone-100"
                  )}
                >
                  {st === "All" ? "All Styles" : st}
                </button>
              ))}
            </div>
          </div>

          {/* Filter 3: Color Palette Swatches */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-1.5">
                <Palette size={13} className="text-stone-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Color Tone:
                </span>
              </div>
              <span className="text-[10px] text-stone-400 font-medium md:hidden">Swipe &rarr;</span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1 md:flex-wrap">
              {COLORS.map((col) => (
                <button
                  key={col.id}
                  onClick={() => setActiveColor(col.id)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border transition-all cursor-pointer whitespace-nowrap shrink-0",
                    activeColor === col.id
                      ? "border-stone-900 bg-stone-900 text-white font-bold shadow-sm"
                      : "border-stone-200 bg-[#FAF8F5] text-stone-700 hover:bg-stone-100"
                  )}
                >
                  {col.id !== "All" && (
                    <span
                      style={{ backgroundColor: col.hex }}
                      className="w-3.5 h-3.5 rounded-full border border-black/15 shrink-0"
                    />
                  )}
                  <span>{col.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Filter Chips & Reset Row */}
          {isFiltered && (
            <div className="flex flex-wrap items-center justify-between pt-3 border-t border-stone-200 gap-2">
              <div className="flex flex-wrap items-center gap-1.5 text-xs text-stone-500">
                <span>Active Filters:</span>
                {activeCollection !== "All" && (
                  <span className="bg-stone-100 px-2.5 py-0.5 rounded-full text-stone-800 font-medium flex items-center gap-1">
                    Collection: {activeCollection}
                    <X size={12} className="cursor-pointer" onClick={() => setActiveCollection("All")} />
                  </span>
                )}
                {activeStyle !== "All" && (
                  <span className="bg-stone-100 px-2.5 py-0.5 rounded-full text-stone-800 font-medium flex items-center gap-1">
                    Style: {activeStyle}
                    <X size={12} className="cursor-pointer" onClick={() => setActiveStyle("All")} />
                  </span>
                )}
                {activeColor !== "All" && (
                  <span className="bg-stone-100 px-2.5 py-0.5 rounded-full text-stone-800 font-medium flex items-center gap-1">
                    Color: {activeColor}
                    <X size={12} className="cursor-pointer" onClick={() => setActiveColor("All")} />
                  </span>
                )}
                {search && (
                  <span className="bg-stone-100 px-2.5 py-0.5 rounded-full text-stone-800 font-medium flex items-center gap-1">
                    &ldquo;{search}&rdquo;
                    <X size={12} className="cursor-pointer" onClick={() => setSearch("")} />
                  </span>
                )}
              </div>
              <button
                onClick={handleResetFilters}
                className="text-xs text-amber-800 font-bold hover:underline cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>

        {/* Mobile View Toggle & Swipe Hint */}
        <div className="flex md:hidden items-center justify-between mb-4 px-1">
          <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
            {mobileLayout === "horizontal" && (
              <>
                <span>Swipe cards to explore</span>
                <ArrowRight size={13} className="text-stone-400 animate-pulse" />
              </>
            )}
          </div>
          <div className="flex items-center gap-1 bg-white border border-stone-200 p-0.5 rounded-full shadow-xs">
            <button
              onClick={() => setMobileLayout("horizontal")}
              className={cn(
                "px-2.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer",
                mobileLayout === "horizontal"
                  ? "bg-stone-900 text-white shadow-xs"
                  : "text-stone-600 hover:text-stone-900"
              )}
            >
              Horizontal Swipe
            </button>
            <button
              onClick={() => setMobileLayout("grid")}
              className={cn(
                "px-2.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer",
                mobileLayout === "grid"
                  ? "bg-stone-900 text-white shadow-xs"
                  : "text-stone-600 hover:text-stone-900"
              )}
            >
              Grid
            </button>
          </div>
        </div>

        {/* Templates Grid / Horizontal Scroll with Website First */}
        {isLoading ? (
          <div className="flex md:grid overflow-x-auto md:overflow-visible gap-4 sm:gap-7 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-4 md:pb-0">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="w-[260px] xs:w-[280px] shrink-0 md:w-auto animate-pulse bg-white rounded-2xl p-4 border border-stone-200">
                <div className="bg-stone-200 aspect-[3/4] rounded-xl mb-4" />
                <div className="h-5 bg-stone-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-stone-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : templates && templates.length > 0 ? (
          mobileLayout === "horizontal" ? (
            /* COMPACT HORIZONTAL SCROLL ON PHONE, GRID ON DESKTOP */
            <div className="flex md:grid overflow-x-auto overscroll-x-contain md:overflow-visible snap-x snap-mandatory gap-4 sm:gap-6 md:gap-7 pb-4 md:pb-0 scrollbar-none -mx-4 px-4 md:mx-0 md:px-0 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {templates.map((template) => (
                <div 
                  key={template.id} 
                  className="w-[76vw] max-w-[290px] shrink-0 snap-start md:w-auto flex flex-col"
                >
                  <TemplateCard 
                    template={template} 
                    onPreview={(tpl) => setPreviewTemplate(tpl)}
                  />
                </div>
              ))}
            </div>
          ) : (
            /* COMPACT 2-COLUMN GRID ON PHONE */
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 md:gap-7">
              {templates.map((template) => (
                <TemplateCard 
                  key={template.id} 
                  template={template} 
                  onPreview={(tpl) => setPreviewTemplate(tpl)}
                />
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 max-w-lg mx-auto p-8 shadow-sm">
            <h3 className="font-display text-2xl font-bold text-stone-900 mb-2">No Matching Designs Found</h3>
            <p className="text-stone-500 text-sm mb-6">
              Try adjusting your search terms or clearing your filters to see our full wedding suite catalog.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-2.5 rounded-full bg-stone-900 text-stone-50 text-xs font-bold uppercase tracking-wider shadow-md hover:bg-stone-800 transition-all cursor-pointer"
            >
              Show All Designs
            </button>
          </div>
        )}
      </div>

      {/* Live Phone Preview Centered Modal */}
      <PhonePreviewModal
        template={previewTemplate}
        isOpen={Boolean(previewTemplate)}
        onClose={() => setPreviewTemplate(null)}
      />
    </div>
  );
}
