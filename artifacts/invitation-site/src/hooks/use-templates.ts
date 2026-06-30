import { useQuery } from "@tanstack/react-query";
import { TEMPLATES, type Category, type TemplateData } from "@/data/templates";

export type { Category };
export type Template = TemplateData;

export function useTemplates(category?: Category) {
  return useQuery({
    queryKey: ["templates", category],
    queryFn: async () => {
      if (!category || category === "All") {
        return TEMPLATES;
      }
      return TEMPLATES.filter((t) => t.category === category);
    },
  });
}
