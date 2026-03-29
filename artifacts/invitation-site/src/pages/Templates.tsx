import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTemplates, type Category } from "@/hooks/use-templates";
import { TemplateCard } from "@/components/TemplateCard";
import { cn } from "@/lib/utils";

const CATEGORIES: Category[] = ["All", "Hindu", "Muslim", "Sikh", "Christian", "South Indian"];

export default function Templates() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const { data: templates, isLoading } = useTemplates(activeCategory);

  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">Template Gallery</h1>
          <p className="text-lg text-muted-foreground">
            Browse our extensive collection of beautifully crafted digital invitations. 
            Filter by your cultural preference to find the perfect starting point.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 border",
                activeCategory === category
                  ? "bg-primary text-primary-foreground border-primary shadow-md"
                  : "bg-white text-foreground border-border hover:border-primary/50 hover:bg-primary/5"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="animate-pulse bg-white rounded-xl p-4 border border-border shadow-sm">
                <div className="bg-muted aspect-[3/4] rounded-lg mb-4"></div>
                <div className="h-5 bg-muted rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-muted rounded w-1/4"></div>
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
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <TemplateCard template={template} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-border">
            <h3 className="text-xl font-bold text-foreground mb-2">No templates found</h3>
            <p className="text-muted-foreground">We are currently updating our collection for this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
