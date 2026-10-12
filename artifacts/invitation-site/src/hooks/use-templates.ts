import { useQuery } from "@tanstack/react-query";
import { TEMPLATES, type Category, type StyleTheme, type ColorTheme, type TemplateData } from "@/data/templates";

export type { Category, StyleTheme, ColorTheme };
export type Template = TemplateData;

export interface FilterOptions {
  category?: Category;
  style?: StyleTheme;
  color?: ColorTheme;
  search?: string;
  sortBy?: "popular" | "trending" | "price-asc" | "price-desc";
}

export function useTemplates(filters?: Category | FilterOptions) {
  const options: FilterOptions =
    typeof filters === "string" ? { category: filters } : filters || {};

  return useQuery({
    queryKey: ["templates", options],
    queryFn: async () => {
      let result = [...TEMPLATES];

      // 1. Tradition / Category filter
      if (options.category && options.category !== "All") {
        result = result.filter((t) => t.category === options.category);
      }

      // 2. Style filter
      if (options.style && options.style !== "All") {
        result = result.filter((t) => t.style === options.style);
      }

      // 3. Color Theme filter
      if (options.color && options.color !== "All") {
        result = result.filter((t) => t.colorTheme === options.color);
      }

      // 4. Live Search query (name, category, style, tags)
      if (options.search && options.search.trim().length > 0) {
        const q = options.search.toLowerCase().trim();
        result = result.filter((t) => {
          const matchName = t.name.toLowerCase().includes(q);
          const matchCat = t.category.toLowerCase().includes(q);
          const matchStyle = t.style.toLowerCase().includes(q);
          const matchTags = t.tags.some((tag) => tag.toLowerCase().includes(q));
          const matchDefault = 
            t.defaultText.groomName.toLowerCase().includes(q) ||
            t.defaultText.brideName.toLowerCase().includes(q) ||
            t.defaultText.ceremony.toLowerCase().includes(q);
          return matchName || matchCat || matchStyle || matchTags || matchDefault;
        });
      }

      // 5. Sorting
      if (options.sortBy === "trending") {
        result.sort((a, b) => (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0));
      } else if (options.sortBy === "popular") {
        result.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
      } else if (options.sortBy === "price-asc") {
        result.sort((a, b) => a.price - b.price);
      } else if (options.sortBy === "price-desc") {
        result.sort((a, b) => b.price - a.price);
      }

      return result;
    },
  });
}
