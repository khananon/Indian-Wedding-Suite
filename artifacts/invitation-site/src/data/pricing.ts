// Pricing packages shown in the "Transparent Pricing" section on the Home page.
// To change prices, names, features, or add/remove a package, just edit this list —
// the Home page reads directly from here.

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  features: string[];
  isPopular?: boolean;
  ctaLabel: string;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "basic",
    name: "Essential PDF",
    price: "₹499",
    features: [
      "Up to 4 Pages",
      "Clickable Maps/Links",
      "Custom Text & Colors",
      "1 Revision",
      "Delivery in 24 hrs",
    ],
    ctaLabel: "Choose Basic",
  },
  {
    id: "standard",
    name: "Video + PDF",
    price: "₹999",
    isPopular: true,
    features: [
      "60 Sec Animated Video",
      "Matching 4-Page PDF",
      "Background Music",
      "Custom Caricatures (+₹500)",
      "3 Revisions",
      "Delivery in 48 hrs",
    ],
    ctaLabel: "Choose Standard",
  },
  {
    id: "premium",
    name: "The Full Suite",
    price: "₹1,999",
    features: [
      "Custom Website",
      "Animated Video",
      "Matching PDF",
      "RSVP Management",
      "Photo Gallery",
      "Unlimited Revisions",
    ],
    ctaLabel: "Choose Premium",
  },
];
