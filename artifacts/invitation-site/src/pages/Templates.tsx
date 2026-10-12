import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, X, SlidersHorizontal, Sparkles, Download, 
  RotateCcw, Check, Palette, Tag
} from "lucide-react";
import { useTemplates, type Category, type StyleTheme, type ColorTheme } from "@/hooks/use-templates";
import { TemplateCard } from "@/components/TemplateCard";
import { cn } from "@/lib/utils";
import { SEO } from "@/components/SEO";

const CATEGORIES: Category[] = ["All", "Hindu", "Muslim", "Sikh", "South Indian", "Christian"];
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
  const [activeCategory, setActiveCategory] = useState<Category>(() => {
    if (typeof window !== "undefined") {
      const param = new URLSearchParams(window.location.search).get("category");
      if (param && CATEGORIES.includes(param as Category)) {
        return param as Category;
      }
    }
    return "All";
  });
  const [activeStyle, setActiveStyle] = useState<StyleTheme>("All");
  const [activeColor, setActiveColor] = useState<ColorTheme>("All");
  const [sortBy, setSortBy] = useState<"popular" | "trending" | "price-asc" | "price-desc">("popular");

  // Query templates with combined Canva-style filters
  const { data: templates, isLoading } = useTemplates({
    category: activeCategory,
    style: activeStyle,
    color: activeColor,
    search,
    sortBy,
  });

  const isFiltered = activeCategory !== "All" || activeStyle !== "All" || activeColor !== "All" || search.trim().length > 0;

  const handleResetFilters = () => {
    setActiveCategory("All");
    setActiveStyle("All");
    setActiveColor("All");
    setSearch("");
  };

  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <SEO
        title="Indian Digital Wedding Invitation Templates & Website Suites | Vows & Knots"
        description="Browse handcrafted Indian wedding invitation website templates for Hindu Vivah, Muslim Nikah, Sikh Anand Karaj, South Indian Muhurtham, and Christian Holy Matrimony."
        canonicalPath="/templates"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Feature Banner */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/15 border border-secondary/30 text-secondary text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles size={14} />
            <span>Bespoke Wedding Invitation Suites</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-primary mb-4">
            Wedding Invitation Templates
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Explore handcrafted digital wedding invitation designs and interactive website suites. Each template features live RSVP management, Google Maps venue navigation, photo galleries, and tradition-specific rituals.
          </p>
        </div>

        {/* Canva-Style Search & Discovery Bar */}
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-border shadow-sm mb-10 space-y-5">
          
          {/* Top Search & Sort Row */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:max-w-lg">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search templates by tradition (Nikah, Vivah, Haldi), style, or vibe..."
                className="w-full pl-11 pr-10 py-3 rounded-full border border-border bg-stone-50/60 text-sm focus:outline-none focus:border-primary focus:bg-white transition-all shadow-inner"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Sort & Quick Counter */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap">
                {templates ? `${templates.length} Designs` : "Loading..."}
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2.5 rounded-full border border-border bg-stone-50/60 text-xs font-semibold text-foreground focus:outline-none focus:border-primary cursor-pointer"
              >
                <option value="popular">Most Popular</option>
                <option value="trending">Trending Now</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Filter 1: Cultural Traditions */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Tradition:
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-xs font-semibold transition-all border",
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-stone-50 text-foreground/80 border-border hover:bg-stone-100"
                  )}
                >
                  {cat === "All" ? "All Traditions" : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Filter 2: Aesthetic Styles */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Style:
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {STYLES.map((st) => (
                <button
                  key={st}
                  onClick={() => setActiveStyle(st)}
                  className={cn(
                    "px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border",
                    activeStyle === st
                      ? "bg-secondary text-secondary-foreground border-secondary shadow-sm"
                      : "bg-stone-50 text-foreground/80 border-border hover:bg-stone-100"
                  )}
                >
                  {st === "All" ? "All Styles" : st}
                </button>
              ))}
            </div>
          </div>

          {/* Filter 3: Color Palette Swatches */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Palette size={13} className="text-muted-foreground" />
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Color Palette:
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {COLORS.map((col) => (
                <button
                  key={col.id}
                  onClick={() => setActiveColor(col.id)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border transition-all",
                    activeColor === col.id
                      ? "border-primary bg-primary/10 text-primary font-bold shadow-sm"
                      : "border-border bg-stone-50/80 text-stone-700 hover:bg-stone-100"
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
            <div className="flex flex-wrap items-center justify-between pt-3 border-t border-border gap-2">
              <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                <span>Active Filters:</span>
                {activeCategory !== "All" && (
                  <span className="bg-muted px-2.5 py-0.5 rounded-full text-foreground font-medium flex items-center gap-1">
                    Tradition: {activeCategory}
                    <X size={12} className="cursor-pointer" onClick={() => setActiveCategory("All")} />
                  </span>
                )}
                {activeStyle !== "All" && (
                  <span className="bg-muted px-2.5 py-0.5 rounded-full text-foreground font-medium flex items-center gap-1">
                    Style: {activeStyle}
                    <X size={12} className="cursor-pointer" onClick={() => setActiveStyle("All")} />
                  </span>
                )}
                {activeColor !== "All" && (
                  <span className="bg-muted px-2.5 py-0.5 rounded-full text-foreground font-medium flex items-center gap-1">
                    Color: {activeColor}
                    <X size={12} className="cursor-pointer" onClick={() => setActiveColor("All")} />
                  </span>
                )}
                {search && (
                  <span className="bg-muted px-2.5 py-0.5 rounded-full text-foreground font-medium flex items-center gap-1">
                    Query: "{search}"
                    <X size={12} className="cursor-pointer" onClick={() => setSearch("")} />
                  </span>
                )}
              </div>

              <button
                onClick={handleResetFilters}
                className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
              >
                <RotateCcw size={12} />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}

        </div>

        {/* Templates Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="animate-pulse bg-white rounded-xl p-4 border border-border shadow-sm">
                <div className="bg-muted aspect-[3/4] rounded-lg mb-4" />
                <div className="h-5 bg-muted rounded w-3/4 mb-3" />
                <div className="h-4 bg-muted rounded w-1/4" />
              </div>
            ))}
          </div>
        ) : templates && templates.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {templates.map((template) => (
                <motion.div
                  key={template.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                >
                  <TemplateCard template={template} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-border max-w-lg mx-auto p-8 shadow-sm">
            <Search size={36} className="mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="font-display text-2xl font-bold text-foreground mb-2">
              No matching templates found
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Try adjusting your search terms or clearing your filters to explore our full collection.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-xs font-bold tracking-wider uppercase hover:bg-primary/90 transition-all shadow-md"
            >
              Clear Filters &amp; View All
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
