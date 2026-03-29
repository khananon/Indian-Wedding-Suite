import { useQuery } from "@tanstack/react-query";

export type Category = "All" | "Hindu" | "Muslim" | "Sikh" | "Christian" | "South Indian";

export interface Template {
  id: string;
  name: string;
  category: Category;
  price: number;
  isPopular?: boolean;
  image?: string;
}

const DUMMY_TEMPLATES: Template[] = [
  { id: "t1", name: "Royal Rajasthan", category: "Hindu", price: 999, isPopular: true, image: "images/hindu-wedding.jpg" },
  { id: "t2", name: "Awadhi Elegance", category: "Muslim", price: 999, image: "images/muslim-wedding.jpg" },
  { id: "t3", name: "Golden Temple", category: "Sikh", price: 899, image: "images/sikh-wedding.jpg" },
  { id: "t4", name: "Classic White", category: "Christian", price: 799, image: "images/christian-wedding.jpg" },
  { id: "t5", name: "Kanjeevaram Silk", category: "South Indian", price: 1099, isPopular: true },
  { id: "t6", name: "Peacock Motif", category: "Hindu", price: 899 },
  { id: "t7", name: "Jashn-e-Bahara", category: "Muslim", price: 1199 },
  { id: "t8", name: "Minimalist Marigold", category: "Hindu", price: 699 },
];

export function useTemplates(category?: Category) {
  return useQuery({
    queryKey: ["templates", category],
    queryFn: async () => {
      if (!category || category === "All") {
        return DUMMY_TEMPLATES;
      }
      return DUMMY_TEMPLATES.filter((t) => t.category === category);
    },
  });
}
