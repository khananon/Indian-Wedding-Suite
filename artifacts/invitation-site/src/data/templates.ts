// Featured / gallery template data.
// To add, remove, or redesign a template, just edit this list — no other files need to change.
// `image` is the preview photo (path relative to /public). `link` is optional —
// when set, a small "open" arrow button appears on the card so visitors can view the live demo.

export type Category = "All" | "Hindu" | "Muslim" | "Sikh" | "Christian" | "South Indian";

export interface TemplateData {
  id: string;
  name: string;
  category: Category;
  price: number;
  isPopular?: boolean;
  image?: string;
  link?: string;
}

export const TEMPLATES: TemplateData[] = [
  {
    id: "t1",
    name: "Royal Rajasthan",
    category: "Hindu",
    price: 2000,
    isPopular: true,
    image: "images/royal-rajasthan-preview.png",
    link: "https://digital-invite-beryl.vercel.app/",
  },
  {
    id: "t2",
    name: "Awadhi Elegance",
    category: "Muslim",
    price: 2000,
    image: "images/awadhi-elegance-preview.png",
    link: "https://royal-union-three.vercel.app/",
  },
  {
    id: "t3",
    name: "Golden Temple",
    category: "Sikh",
    price: 2000,
    image: "images/sikh-wedding.jpg",
  },
  {
    id: "t4",
    name: "Classic White",
    category: "Christian",
    price: 2000,
    image: "images/christian-wedding.jpg",
    link: "https://sikhi-wedding-invitaion.vercel.app/",
  },
  {
    id: "t5",
    name: "Kanjeevaram Silk",
    category: "South Indian",
    price: 2000,
    isPopular: true,
    image: "images/south-indian-wedding.jpg",
    link: "https://invitation-gem-engine.vercel.app/",
  },
  {
    id: "t6",
    name: "Peacock Motif",
    category: "Hindu",
    price: 2000,
    image: "images/hindu-wedding.jpg",
  },
  {
    id: "t7",
    name: "Jashn-e-Bahara",
    category: "Muslim",
    price: 2000,
    image: "images/muslim-wedding.jpg",
  },
  {
    id: "t8",
    name: "Minimalist Marigold",
    category: "Hindu",
    price: 2000,
    image: "images/marigold-haldi-wedding.jpg",
  },
];
