import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { 
  Download, Image as ImageIcon, Type, Layers, Palette, 
  Sparkles, Sliders, Trash2, Copy, Move, RotateCcw, 
  Upload, Link as LinkIcon, ZoomIn, ZoomOut, Check, 
  ArrowUp, ArrowDown, ChevronRight, ChevronLeft, X, Eye, FileText, Send, Maximize2,
  RotateCw, AlignLeft, AlignCenter, AlignRight, Underline, Baseline,
  HelpCircle, ShieldCheck, Share2, Printer, CheckCircle2,
  Square, Plus
} from "lucide-react";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import { TEMPLATES } from "@/data/templates";
import { SEO } from "@/components/SEO";
import { getWhatsAppLink } from "@/config/site";

const CARD_MAKER_JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": "https://indian-wedding-suite-api-server.vercel.app/create-free-wedding-invitation-card-pdf#app",
      "url": "https://indian-wedding-suite-api-server.vercel.app/create-free-wedding-invitation-card-pdf",
      "name": "Create Free Wedding Invitation Card PDF Studio",
      "applicationCategory": "DesignApplication",
      "operatingSystem": "All (Web, iOS, Android, Windows, macOS)",
      "browserRequirements": "Requires modern HTML5 browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR",
        "category": "Free"
      },
      "featureList": [
        "Export Print-Ready Vector PDF (A5 Format)",
        "Export 300 DPI High-Resolution PNG Image",
        "Custom Pinterest & Unsplash Background Import",
        "Real-Time Gaussian Background Blur and Dimming",
        "Luxury Indian Wedding Fonts & Multilingual Support",
        "Layered PNG Motifs (Ganesh, Peacock, Doli, Bismillah, Ik Onkar)",
        "Direct 1-Tap WhatsApp Sharing"
      ]
    },
    {
      "@type": "HowTo",
      "name": "How to Create a Free Wedding Invitation Card PDF Online",
      "description": "Step-by-step tutorial on designing and downloading a custom Indian wedding invitation card PDF 100% free with no watermarks.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Step 1: Choose or Upload Background",
          "text": "Select a solid luxury ivory paper or paste any Pinterest image URL to use as your background. Adjust blur and opacity for optimal readability."
        },
        {
          "@type": "HowToStep",
          "name": "Step 2: Customize Names, Dates & Royal Fonts",
          "text": "Personalize Bride and Groom names, parents' blessing, ceremony dates, and venue. Choose royal Indian serif fonts and religious shloks."
        },
        {
          "@type": "HowToStep",
          "name": "Step 3: Download Free Print-Ready PDF & Share",
          "text": "Click 'Download PDF' for a print-ready A5 vector document or 'Download Image' for WhatsApp sharing. 100% free with zero watermarks."
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is it completely free to create and download the wedding invitation card PDF?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, 100% free. You can design, customize, and export print-ready PDF and high-res PNG formats without watermarks, trial limitations, or credit card requirements."
          }
        },
        {
          "@type": "Question",
          "name": "Can I print the downloaded wedding invitation PDF at a local print shop?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. The generated PDF file is calibrated to standard A5 print dimensions (148mm x 210mm) at high print resolution, making it compatible with digital and offset commercial printers."
          }
        },
        {
          "@type": "Question",
          "name": "How do I share the downloaded wedding invitation on WhatsApp?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can download the card as either a PDF document or a PNG image. On your phone or WhatsApp Web, attach the downloaded file directly into chat messages, family groups, or WhatsApp status."
          }
        },
        {
          "@type": "Question",
          "name": "How can I use a Pinterest picture as my wedding card background?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Under the 'Canvas BG' tab in the studio editor, paste any Pinterest pin link or image address into the Pinterest URL field and click 'Load'. You can then soften the image with the built-in Gaussian blur slider."
          }
        },
        {
          "@type": "Question",
          "name": "Can I add religious invocations like Ganesh, Bismillah, or Ik Onkar?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. The studio includes 1-click religious presets for Hindu (Shree Ganeshaya Namah, Radha Krishna), Muslim (Bismillah Dua), Sikh (Ik Onkar), South Indian (Subhamastu), and Christian ceremonies."
          }
        },
        {
          "@type": "Question",
          "name": "Do I need to sign up or create an account to download my card?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No account or login is required. You can immediately design and download your wedding invitation card PDF in your browser with zero registration."
          }
        }
      ]
    }
  ]
};

const FAQS_LIST = [
  {
    q: "Is it completely free to create and download the wedding invitation card PDF?",
    a: "Yes, 100% free. You can customize every text element, upload Pinterest or custom backgrounds, add PNG motifs, and download print-ready vector PDF and high-res PNG formats without watermarks, subscriptions, or credit card."
  },
  {
    q: "Can I print the downloaded PDF at a professional printing shop?",
    a: "Yes. The exported PDF is formatted in standard A5 proportions (148mm × 210mm) at 300 DPI high resolution, ensuring sharp typography and crisp graphics for both digital press and offset printers."
  },
  {
    q: "How do I send the wedding invitation card on WhatsApp?",
    a: "You can download either a PDF or a PNG image. On your smartphone or computer, open WhatsApp, select your contact or family group, attach the downloaded PDF document or image file, and send instantly."
  },
  {
    q: "How do I use a Pinterest photo as my wedding card background?",
    a: "Open Pinterest, find any background you like, copy the pin link or image address, paste it into the 'Pinterest URL' box under the Canvas BG tab, and click 'Load'. You can then adjust the live blur (0-20px) to keep text perfectly legible."
  },
  {
    q: "Can I include religious shloks like Ganesh, Bismillah, or Khanda?",
    a: "Yes! Our studio comes with 1-click religious presets including Hindu (॥ श्री गणेशाय नमः ॥), Islamic Bismillah blessings, Sikh Ik Onkar, South Indian Subhamastu, and Christian matrimony verses. You can also upload your own transparent PNG motifs."
  },
  {
    q: "Do I need to create an account or sign in to download?",
    a: "No registration is needed. You can jump straight into the studio, design your wedding card, and download your free PDF instantly."
  }
];

// Canvas Element Definition
export interface CanvasElement {
  id: string;
  type: "text" | "image";
  x: number; // % of canvas width (0-100)
  y: number; // % of canvas height (0-100)
  width?: number; // % of canvas width
  height?: number; // % of canvas height
  zIndex: number;
  rotation?: number; // degrees -180 to 180
  // Text properties:
  text?: string;
  fontSize?: number; // in pt/px
  fontFamily?: string;
  color?: string;
  textAlign?: "left" | "center" | "right";
  fontWeight?: "normal" | "600" | "bold";
  fontStyle?: "normal" | "italic";
  textDecoration?: "none" | "underline";
  letterSpacing?: number;
  lineHeight?: number;
  textShadow?: boolean;
  // Image properties:
  src?: string;
  opacity?: number;
  scale?: number;
}

// Background Definition
export interface CanvasBackground {
  type: "color" | "image";
  color: string;
  imageUrl: string;
  blur: number; // 0 to 20 px
  opacity: number; // 0.1 to 1
  brightness: number; // 0.5 to 1.5
}

// Decorative Border Definition
export interface CanvasBorder {
  style: "none" | "royal-double" | "ornate-gold" | "vintage-arch" | "mughal-floral" | "modern-minimal" | "classic-dashed" | "double-solid";
  color: string;
  width: number; // 1 to 4 px
  inset: number; // 8 to 24 px
  showCorners: boolean; // corner stars / accents
}

// Multi-Page Card Definition
export interface CardPage {
  id: string;
  name: string;
  background: CanvasBackground;
  border: CanvasBorder;
  elements: CanvasElement[];
}

export interface TemplatePreset {
  id: string;
  name: string;
  category: "Hindu" | "Muslim" | "Sikh" | "South Indian" | "Christian";
  description: string;
  background: CanvasBackground;
  border: CanvasBorder;
  elements: CanvasElement[];
}

export const DEFAULT_BORDER: CanvasBorder = {
  style: "royal-double",
  color: "#cba135",
  width: 2,
  inset: 12,
  showCorners: true,
};

export const BORDER_STYLES = [
  { id: "royal-double", name: "Royal Double Line", desc: "Solid outer line + dashed inner line with ✦ corner stars" },
  { id: "ornate-gold", name: "Ornate Gold Brackets", desc: "Dual gold lines with luxury ornate corner brackets & diamonds" },
  { id: "vintage-arch", name: "Mandap / Temple Arch", desc: "Traditional temple arch dome header with pillar sides" },
  { id: "mughal-floral", name: "Mughal Crown Frame", desc: "Rounded frame with arched crown dome finials" },
  { id: "modern-minimal", name: "Modern Thin Line", desc: "Clean crisp minimalist single hairline border" },
  { id: "classic-dashed", name: "Classic Dashed", desc: "Traditional perimeter dashed line frame" },
  { id: "double-solid", name: "Double Solid Stroke", desc: "Dual parallel clean solid strokes" },
  { id: "none", name: "No Border", desc: "Clean frameless borderless presentation" },
];

export function RenderCardBorder({ border }: { border: CanvasBorder }) {
  if (border.style === "none") return null;

  const { color, width, inset, showCorners } = border;

  if (border.style === "modern-minimal") {
    return (
      <div
        style={{
          inset: `${inset}px`,
          borderColor: color,
          borderWidth: `${width}px`,
        }}
        className="absolute rounded-xl pointer-events-none"
      />
    );
  }

  if (border.style === "classic-dashed") {
    return (
      <div
        style={{
          inset: `${inset}px`,
          borderColor: color,
          borderWidth: `${width}px`,
        }}
        className="absolute rounded-xl border-dashed pointer-events-none"
      />
    );
  }

  if (border.style === "double-solid") {
    return (
      <div className="absolute inset-0 pointer-events-none">
        <div
          style={{
            inset: `${inset}px`,
            borderColor: color,
            borderWidth: `${width}px`,
          }}
          className="absolute rounded-xl"
        />
        <div
          style={{
            inset: `${inset + 4}px`,
            borderColor: color,
            borderWidth: `${width}px`,
          }}
          className="absolute rounded-lg"
        />
      </div>
    );
  }

  if (border.style === "royal-double") {
    return (
      <div className="absolute inset-0 pointer-events-none">
        {/* Outer border */}
        <div
          style={{
            inset: `${inset}px`,
            borderColor: color,
            borderWidth: `${width}px`,
          }}
          className="absolute rounded-xl"
        />
        {/* Inner dashed border */}
        <div
          style={{
            inset: `${inset + 5}px`,
            borderColor: color,
            borderWidth: `${Math.max(1, width - 1)}px`,
            opacity: 0.7,
          }}
          className="absolute rounded-lg border-dashed"
        />
        {/* Four Corner Accents */}
        {showCorners && (
          <>
            <span style={{ color }} className="absolute text-[11px] top-2.5 left-2.5 leading-none opacity-80">✦</span>
            <span style={{ color }} className="absolute text-[11px] top-2.5 right-2.5 leading-none opacity-80">✦</span>
            <span style={{ color }} className="absolute text-[11px] bottom-2.5 left-2.5 leading-none opacity-80">✦</span>
            <span style={{ color }} className="absolute text-[11px] bottom-2.5 right-2.5 leading-none opacity-80">✦</span>
          </>
        )}
      </div>
    );
  }

  if (border.style === "ornate-gold") {
    return (
      <div className="absolute inset-0 pointer-events-none">
        <div
          style={{
            inset: `${inset}px`,
            borderColor: color,
            borderWidth: `${width}px`,
          }}
          className="absolute rounded-xl"
        />
        <div
          style={{
            inset: `${inset + 6}px`,
            borderColor: color,
            borderWidth: `1px`,
          }}
          className="absolute rounded-lg"
        />
        {/* Corner Ornate Brackets */}
        <div style={{ borderColor: color }} className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 rounded-tl" />
        <div style={{ borderColor: color }} className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 rounded-tr" />
        <div style={{ borderColor: color }} className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 rounded-bl" />
        <div style={{ borderColor: color }} className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 rounded-br" />
        {showCorners && (
          <>
            <span style={{ color }} className="absolute text-[9px] top-4 left-4 leading-none opacity-90">◆</span>
            <span style={{ color }} className="absolute text-[9px] top-4 right-4 leading-none opacity-90">◆</span>
            <span style={{ color }} className="absolute text-[9px] bottom-4 left-4 leading-none opacity-90">◆</span>
            <span style={{ color }} className="absolute text-[9px] bottom-4 right-4 leading-none opacity-90">◆</span>
          </>
        )}
      </div>
    );
  }

  if (border.style === "vintage-arch") {
    return (
      <div className="absolute inset-0 pointer-events-none">
        <div
          style={{
            inset: `${inset}px`,
            borderColor: color,
            borderWidth: `${width}px`,
            borderTopLeftRadius: "60px",
            borderTopRightRadius: "60px",
          }}
          className="absolute"
        />
        <div
          style={{
            inset: `${inset + 5}px`,
            borderColor: color,
            borderWidth: `1px`,
            borderTopLeftRadius: "54px",
            borderTopRightRadius: "54px",
            opacity: 0.7,
          }}
          className="absolute border-dashed"
        />
        <div style={{ borderColor: color }} className="absolute top-2.5 left-1/2 -translate-x-1/2 w-8 h-4 border-b-2 rounded-b-full opacity-60" />
      </div>
    );
  }

  if (border.style === "mughal-floral") {
    return (
      <div className="absolute inset-0 pointer-events-none">
        <div
          style={{
            inset: `${inset}px`,
            borderColor: color,
            borderWidth: `${width}px`,
          }}
          className="absolute rounded-2xl"
        />
        <div
          style={{
            inset: `${inset + 5}px`,
            borderColor: color,
            borderWidth: `1px`,
          }}
          className="absolute rounded-xl border-dashed opacity-60"
        />
        {/* Crown dome arch accent on top */}
        <div 
          style={{ borderColor: color, backgroundColor: "transparent" }} 
          className="absolute top-1 left-1/2 -translate-x-1/2 px-4 py-0.5 border-b border-x rounded-b-xl text-[10px]"
        >
          <span style={{ color }} className="opacity-90">❖</span>
        </div>
        {/* Bottom floral accent */}
        <div 
          style={{ borderColor: color, backgroundColor: "transparent" }} 
          className="absolute bottom-1 left-1/2 -translate-x-1/2 px-4 py-0.5 border-t border-x rounded-t-xl text-[10px]"
        >
          <span style={{ color }} className="opacity-90">❖</span>
        </div>
      </div>
    );
  }

  return null;
}

// Solid Pure Colors for Indian Weddings
const PLAIN_BACKGROUND_COLORS = [
  { id: "pure-ivory", name: "Pure Ivory Cream", hex: "#fdfbf7" },
  { id: "warm-linen", name: "Warm Linen", hex: "#f7f3eb" },
  { id: "soft-pearl", name: "Soft Pearl White", hex: "#ffffff" },
  { id: "champagne", name: "Royal Champagne", hex: "#f4ede1" },
  { id: "pale-blush", name: "Vintage Blush", hex: "#faedf0" },
  { id: "pale-sage", name: "Mehendi Pale Sage", hex: "#edf4ee" },
  { id: "royal-crimson", name: "Velvet Crimson", hex: "#3d0710" },
  { id: "deep-maroon", name: "Mughal Maroon", hex: "#4a0e17" },
  { id: "royal-emerald", name: "Emerald Green", hex: "#0b2b18" },
  { id: "midnight-navy", name: "Midnight Sapphire", hex: "#0c1833" },
  { id: "regal-charcoal", name: "Regal Charcoal", hex: "#1c1c1f" },
  { id: "pure-gold", name: "Imperial Dark Ochre", hex: "#2b1e06" },
];

// Rich Library of Wedding Google Fonts
const FONTS = [
  { id: "cormorant", name: "Royal Cormorant (Traditional)", value: "'Cormorant Garamond', Georgia, serif" },
  { id: "playfair", name: "Playfair Display (Luxury Editorial)", value: "'Playfair Display', Georgia, serif" },
  { id: "cinzel", name: "Cinzel Decorative (Imperial Royal)", value: "'Cinzel', Georgia, serif" },
  { id: "marcellus", name: "Marcellus (Heritage Classical)", value: "'Marcellus', serif" },
  { id: "rozha", name: "Rozha One (Devanagari / Royal Headline)", value: "'Rozha One', serif" },
  { id: "great-vibes", name: "Great Vibes (Calligraphy Script)", value: "'Great Vibes', cursive" },
  { id: "alex-brush", name: "Alex Brush (Flowing Signature Script)", value: "'Alex Brush', cursive" },
  { id: "montserrat", name: "Montserrat (Clean Modern Sans)", value: "'Montserrat', sans-serif" },
  { id: "inter", name: "Inter (Minimalist Clean)", value: "'Inter', sans-serif" },
];

const LUXURY_COLORS = [
  "#5b1424", // Royal Maroon
  "#80182a", // Crimson
  "#cba135", // Royal Gold
  "#dfb76c", // Champagne Gold
  "#e5c158", // Bright Gold
  "#0f5132", // Emerald Green
  "#16284f", // Sapphire Navy
  "#803c4f", // Rose Pink
  "#2c2c2c", // Rich Charcoal
  "#6b7280", // Slate Grey
  "#ffffff", // Pure White
];

// Preset Wedding Invocations
const INVOCATION_TEMPLATES = [
  { label: "Ganesh Vandana (Hindu)", text: "॥ श्री गणेशाय नमः ॥" },
  { label: "Radha Krishna Shlok", text: "॥ ॐ श्री राधाकृष्णाभ्यां नमः ॥" },
  { label: "Bismillah Dua (Muslim)", text: "In the Name of Allah, the Most Gracious, the Most Merciful" },
  { label: "Ik Onkar (Sikh)", text: "ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ ॥" },
  { label: "Subhamastu (South Indian)", text: "॥ शुभमस्तु ॥ Divine Blessings" },
  { label: "Holy Matrimony (Christian)", text: "United in God's Holy Grace & Love" },
];

// Initial Starting Template with Plain Cream Paper Background (No unwanted stock photo)
const INITIAL_ELEMENTS: CanvasElement[] = [
  {
    id: "el-invoc",
    type: "text",
    x: 50,
    y: 12,
    zIndex: 1,
    text: "॥ श्री गणेशाय नमः ॥",
    fontSize: 16,
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    color: "#cba135",
    textAlign: "center",
    fontWeight: "600",
    letterSpacing: 2,
    lineHeight: 1.2,
  },
  {
    id: "el-host",
    type: "text",
    x: 50,
    y: 28,
    zIndex: 2,
    text: "Together with their families, cordially invite you to celebrate the wedding of",
    fontSize: 12,
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    color: "#555555",
    textAlign: "center",
    fontStyle: "italic",
    lineHeight: 1.3,
  },
  {
    id: "el-groom",
    type: "text",
    x: 50,
    y: 42,
    zIndex: 3,
    text: "Aarav Sharma",
    fontSize: 32,
    fontFamily: "'Playfair Display', Georgia, serif",
    color: "#5b1424",
    textAlign: "center",
    fontWeight: "bold",
    letterSpacing: 1,
    lineHeight: 1.2,
  },
  {
    id: "el-amp",
    type: "text",
    x: 50,
    y: 50,
    zIndex: 4,
    text: "&",
    fontSize: 22,
    fontFamily: "'Great Vibes', cursive",
    color: "#cba135",
    textAlign: "center",
    fontStyle: "normal",
    lineHeight: 1,
  },
  {
    id: "el-bride",
    type: "text",
    x: 50,
    y: 58,
    zIndex: 5,
    text: "Ananya Verma",
    fontSize: 32,
    fontFamily: "'Playfair Display', Georgia, serif",
    color: "#5b1424",
    textAlign: "center",
    fontWeight: "bold",
    letterSpacing: 1,
    lineHeight: 1.2,
  },
  {
    id: "el-ceremony",
    type: "text",
    x: 50,
    y: 70,
    zIndex: 6,
    text: "Shubh Vivah & Saat Phere",
    fontSize: 14,
    fontFamily: "'Montserrat', sans-serif",
    color: "#5b1424",
    textAlign: "center",
    fontWeight: "600",
    letterSpacing: 2,
    lineHeight: 1.3,
  },
  {
    id: "el-datetime",
    type: "text",
    x: 50,
    y: 78,
    zIndex: 7,
    text: "Thursday, November 26, 2026 | 11:30 AM Auspicious Muhurtham",
    fontSize: 12,
    fontFamily: "'Montserrat', sans-serif",
    color: "#444444",
    textAlign: "center",
    fontWeight: "normal",
    lineHeight: 1.3,
  },
  {
    id: "el-venue",
    type: "text",
    x: 50,
    y: 86,
    zIndex: 8,
    text: "The Royal Palace Heritage Lawns, Jaipur",
    fontSize: 12,
    fontFamily: "'Montserrat', sans-serif",
    color: "#666666",
    textAlign: "center",
    fontWeight: "normal",
    lineHeight: 1.3,
  },
];

export const PRESET_TEMPLATES: TemplatePreset[] = [
  // 1. HINDU - Template 1
  {
    id: "hindu-royal-crimson",
    name: "Royal Crimson & Gold Vivah",
    category: "Hindu",
    description: "Rich velvet crimson background with ornate gold borders & Ganesh Vandana",
    background: { type: "color", color: "#3d0710", imageUrl: "", blur: 0, opacity: 1, brightness: 1 },
    border: { style: "ornate-gold", color: "#dfb76c", width: 2, inset: 12, showCorners: true },
    elements: [
      { id: "h1-invoc", type: "text", x: 50, y: 12, zIndex: 1, text: "॥ श्री गणेशाय नमः ॥", fontSize: 18, fontFamily: "'Rozha One', serif", color: "#dfb76c", textAlign: "center", fontWeight: "bold", letterSpacing: 2 },
      { id: "h1-host", type: "text", x: 50, y: 24, zIndex: 2, text: "Together with their families, cordially invite you to celebrate the holy union of", fontSize: 11, fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#f4ede1", textAlign: "center", fontStyle: "italic", lineHeight: 1.3 },
      { id: "h1-groom", type: "text", x: 50, y: 36, zIndex: 3, text: "AARAV", fontSize: 32, fontFamily: "'Playfair Display', Georgia, serif", color: "#dfb76c", textAlign: "center", fontWeight: "bold", letterSpacing: 2 },
      { id: "h1-amp", type: "text", x: 50, y: 44, zIndex: 4, text: "weds", fontSize: 20, fontFamily: "'Great Vibes', cursive", color: "#ffffff", textAlign: "center" },
      { id: "h1-bride", type: "text", x: 50, y: 52, zIndex: 5, text: "ANANYA", fontSize: 32, fontFamily: "'Playfair Display', Georgia, serif", color: "#dfb76c", textAlign: "center", fontWeight: "bold", letterSpacing: 2 },
      { id: "h1-sub", type: "text", x: 50, y: 60, zIndex: 6, text: "Son of Mrs. & Mr. Sharma   •   Daughter of Mrs. & Mr. Verma", fontSize: 10, fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#e5d7bd", textAlign: "center" },
      { id: "h1-date", type: "text", x: 50, y: 70, zIndex: 7, text: "THURSDAY, 18TH DECEMBER 2026 | MUHURTHAM 7:00 PM", fontSize: 11, fontFamily: "'Cinzel', Georgia, serif", color: "#dfb76c", textAlign: "center", fontWeight: "600", letterSpacing: 1 },
      { id: "h1-venue", type: "text", x: 50, y: 78, zIndex: 8, text: "The Grand Palace Heritage Lawns, Jaipur", fontSize: 11, fontFamily: "'Montserrat', sans-serif", color: "#f7f3eb", textAlign: "center" },
      { id: "h1-bless", type: "text", x: 50, y: 86, zIndex: 9, text: "Your presence & blessings are earnestly requested", fontSize: 10, fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#e5d7bd", textAlign: "center", fontStyle: "italic" },
    ],
  },
  // 1. HINDU - Template 2
  {
    id: "hindu-ivory-lagan",
    name: "Ivory Linen & Marigold Lagan Patrika",
    category: "Hindu",
    description: "Classic warm ivory linen texture with royal double gold border & Radha Krishna shlok",
    background: { type: "color", color: "#fdfbf7", imageUrl: "", blur: 0, opacity: 1, brightness: 1 },
    border: { style: "royal-double", color: "#cba135", width: 2, inset: 12, showCorners: true },
    elements: [
      { id: "h2-invoc", type: "text", x: 50, y: 12, zIndex: 1, text: "॥ ॐ श्री राधाकृष्णाभ्यां नमः ॥", fontSize: 16, fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#80182a", textAlign: "center", fontWeight: "600", letterSpacing: 1 },
      { id: "h2-host", type: "text", x: 50, y: 25, zIndex: 2, text: "With the divine blessings of our elders, we request the pleasure of your company on the wedding of", fontSize: 11, fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#555555", textAlign: "center", fontStyle: "italic", lineHeight: 1.3 },
      { id: "h2-groom", type: "text", x: 50, y: 38, zIndex: 3, text: "Rohan", fontSize: 36, fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#5b1424", textAlign: "center", fontWeight: "bold" },
      { id: "h2-amp", type: "text", x: 50, y: 46, zIndex: 4, text: "&", fontSize: 26, fontFamily: "'Alex Brush', cursive", color: "#cba135", textAlign: "center" },
      { id: "h2-bride", type: "text", x: 50, y: 54, zIndex: 5, text: "Pooja", fontSize: 36, fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#5b1424", textAlign: "center", fontWeight: "bold" },
      { id: "h2-event", type: "text", x: 50, y: 65, zIndex: 6, text: "SHUBH VIVAH CEREMONY", fontSize: 12, fontFamily: "'Cinzel', Georgia, serif", color: "#cba135", textAlign: "center", fontWeight: "bold", letterSpacing: 2 },
      { id: "h2-date", type: "text", x: 50, y: 73, zIndex: 7, text: "Sunday, 24th January 2027 at 6:30 PM", fontSize: 12, fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#333333", textAlign: "center" },
      { id: "h2-venue", type: "text", x: 50, y: 81, zIndex: 8, text: "Taj Jai Mahal Palace, Jaipur, Rajasthan", fontSize: 11, fontFamily: "'Montserrat', sans-serif", color: "#555555", textAlign: "center" },
      { id: "h2-rsvp", type: "text", x: 50, y: 88, zIndex: 9, text: "RSVP: Sharma & Gupta Families", fontSize: 10, fontFamily: "'Montserrat', sans-serif", color: "#80182a", textAlign: "center", fontWeight: "600" },
    ],
  },
  // 2. MUSLIM - Template 1
  {
    id: "muslim-emerald-nikah",
    name: "Emerald Green & Foil Gold Nikah",
    category: "Muslim",
    description: "Deep emerald green with Mughal arch dome border and Bismillah calligraphy",
    background: { type: "color", color: "#0b2b18", imageUrl: "", blur: 0, opacity: 1, brightness: 1 },
    border: { style: "mughal-floral", color: "#dfb76c", width: 2, inset: 12, showCorners: true },
    elements: [
      { id: "m1-bism", type: "text", x: 50, y: 12, zIndex: 1, text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", fontSize: 20, fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#dfb76c", textAlign: "center", fontWeight: "bold" },
      { id: "m1-trans", type: "text", x: 50, y: 19, zIndex: 2, text: "In the Name of Allah, the Most Gracious, the Most Merciful", fontSize: 10, fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#d1e7dd", textAlign: "center", fontStyle: "italic" },
      { id: "m1-host", type: "text", x: 50, y: 28, zIndex: 3, text: "Mr. & Mrs. Farooqui request the honor of your presence at the Nikah of their son", fontSize: 11, fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#e5f3eb", textAlign: "center" },
      { id: "m1-groom", type: "text", x: 50, y: 40, zIndex: 4, text: "ZAYN", fontSize: 34, fontFamily: "'Playfair Display', Georgia, serif", color: "#dfb76c", textAlign: "center", fontWeight: "bold", letterSpacing: 2 },
      { id: "m1-amp", type: "text", x: 50, y: 48, zIndex: 5, text: "with", fontSize: 18, fontFamily: "'Great Vibes', cursive", color: "#ffffff", textAlign: "center" },
      { id: "m1-bride", type: "text", x: 50, y: 56, zIndex: 6, text: "AYESHA", fontSize: 34, fontFamily: "'Playfair Display', Georgia, serif", color: "#dfb76c", textAlign: "center", fontWeight: "bold", letterSpacing: 2 },
      { id: "m1-parent", type: "text", x: 50, y: 64, zIndex: 7, text: "Daughter of Mr. & Mrs. Tariq Siddiqui", fontSize: 10, fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#c1dfcf", textAlign: "center" },
      { id: "m1-date", type: "text", x: 50, y: 73, zIndex: 8, text: "FRIDAY, 14TH NOVEMBER 2026 | NIKAH AT 6:00 PM", fontSize: 11, fontFamily: "'Cinzel', Georgia, serif", color: "#dfb76c", textAlign: "center", fontWeight: "600", letterSpacing: 1 },
      { id: "m1-venue", type: "text", x: 50, y: 81, zIndex: 9, text: "The Royal Orchid Banquets, Hazratganj, Lucknow", fontSize: 11, fontFamily: "'Montserrat', sans-serif", color: "#ffffff", textAlign: "center" },
      { id: "m1-bless", type: "text", x: 50, y: 88, zIndex: 10, text: "Followed by Dinner & Dawat-e-Walima", fontSize: 10, fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#a3cfbb", textAlign: "center", fontStyle: "italic" },
    ],
  },
  // 2. MUSLIM - Template 2
  {
    id: "muslim-walima-blush",
    name: "Vintage Blush & Champagne Walima",
    category: "Muslim",
    description: "Warm royal champagne background with elegant double gold borders and banquet details",
    background: { type: "color", color: "#f4ede1", imageUrl: "", blur: 0, opacity: 1, brightness: 1 },
    border: { style: "royal-double", color: "#803c4f", width: 2, inset: 12, showCorners: true },
    elements: [
      { id: "m2-head", type: "text", x: 50, y: 12, zIndex: 1, text: "DAWAT-E-WALIMA", fontSize: 16, fontFamily: "'Cinzel', Georgia, serif", color: "#803c4f", textAlign: "center", fontWeight: "bold", letterSpacing: 3 },
      { id: "m2-host", type: "text", x: 50, y: 24, zIndex: 2, text: "Together with their families, cordially invite you to celebrate the Walima reception of", fontSize: 11, fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#666666", textAlign: "center", fontStyle: "italic" },
      { id: "m2-couple", type: "text", x: 50, y: 38, zIndex: 3, text: "Hamza & Sana", fontSize: 32, fontFamily: "'Playfair Display', Georgia, serif", color: "#4a0e17", textAlign: "center", fontWeight: "bold" },
      { id: "m2-date", type: "text", x: 50, y: 50, zIndex: 4, text: "SATURDAY, 28TH NOVEMBER 2026", fontSize: 12, fontFamily: "'Cinzel', Georgia, serif", color: "#803c4f", textAlign: "center", fontWeight: "600", letterSpacing: 1 },
      { id: "m2-sched", type: "text", x: 50, y: 58, zIndex: 5, text: "Reception: 7:30 PM   |   Dinner: 9:00 PM", fontSize: 11, fontFamily: "'Montserrat', sans-serif", color: "#555555", textAlign: "center" },
      { id: "m2-venue", type: "text", x: 50, y: 68, zIndex: 6, text: "ITC Grand Central, Grand Ballroom, Mumbai", fontSize: 12, fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#333333", textAlign: "center", fontWeight: "600" },
      { id: "m2-note", type: "text", x: 50, y: 78, zIndex: 7, text: "No boxed gifts please, your presence & prayers are our blessing", fontSize: 9, fontFamily: "'Montserrat', sans-serif", color: "#777777", textAlign: "center", fontStyle: "italic" },
      { id: "m2-rsvp", type: "text", x: 50, y: 86, zIndex: 8, text: "RSVP: Khan & Qureshi Families", fontSize: 10, fontFamily: "'Cinzel', Georgia, serif", color: "#803c4f", textAlign: "center", fontWeight: "bold" },
    ],
  },
  // 3. SIKH - Template 1
  {
    id: "sikh-imperial-ochre",
    name: "Imperial Dark Ochre Anand Karaj",
    category: "Sikh",
    description: "Imperial dark ochre with luxury gold ornate frame and Ik Onkar invocation",
    background: { type: "color", color: "#2b1e06", imageUrl: "", blur: 0, opacity: 1, brightness: 1 },
    border: { style: "ornate-gold", color: "#dfb76c", width: 2, inset: 12, showCorners: true },
    elements: [
      { id: "s1-invoc", type: "text", x: 50, y: 12, zIndex: 1, text: "ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ ॥", fontSize: 20, fontFamily: "'Rozha One', serif", color: "#dfb76c", textAlign: "center", fontWeight: "bold" },
      { id: "s1-shabad", type: "text", x: 50, y: 20, zIndex: 2, text: "Lakh Khushian Patshahian Je Satgur Nader Kare", fontSize: 10, fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#e5d7bd", textAlign: "center", fontStyle: "italic" },
      { id: "s1-host", type: "text", x: 50, y: 30, zIndex: 3, text: "Sardar & Sardarni Gurpreet Singh invite you to grace the Anand Karaj of their son", fontSize: 11, fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#f7f3eb", textAlign: "center" },
      { id: "s1-groom", type: "text", x: 50, y: 42, zIndex: 4, text: "JASPREET SINGH", fontSize: 28, fontFamily: "'Playfair Display', Georgia, serif", color: "#dfb76c", textAlign: "center", fontWeight: "bold", letterSpacing: 1 },
      { id: "s1-amp", type: "text", x: 50, y: 50, zIndex: 5, text: "with", fontSize: 20, fontFamily: "'Great Vibes', cursive", color: "#ffffff", textAlign: "center" },
      { id: "s1-bride", type: "text", x: 50, y: 58, zIndex: 6, text: "SIMRAN KAUR", fontSize: 28, fontFamily: "'Playfair Display', Georgia, serif", color: "#dfb76c", textAlign: "center", fontWeight: "bold", letterSpacing: 1 },
      { id: "s1-cerem", type: "text", x: 50, y: 68, zIndex: 7, text: "ANAND KARAJ CEREMONY", fontSize: 12, fontFamily: "'Cinzel', Georgia, serif", color: "#dfb76c", textAlign: "center", fontWeight: "bold", letterSpacing: 2 },
      { id: "s1-date", type: "text", x: 50, y: 76, zIndex: 8, text: "SUNDAY, 6TH DECEMBER 2026 | GURDWARA BANGLA SAHIB", fontSize: 11, fontFamily: "'Montserrat', sans-serif", color: "#ffffff", textAlign: "center" },
      { id: "s1-langar", type: "text", x: 50, y: 85, zIndex: 9, text: "Guru Ka Langar will be served thereafter", fontSize: 10, fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#dfb76c", textAlign: "center", fontStyle: "italic" },
    ],
  },
  // 3. SIKH - Template 2
  {
    id: "sikh-pearl-rose",
    name: "Pearl White & Royal Gold Anand Karaj",
    category: "Sikh",
    description: "Pure pearl white stationery with royal double gold borders and elegant typography",
    background: { type: "color", color: "#ffffff", imageUrl: "", blur: 0, opacity: 1, brightness: 1 },
    border: { style: "royal-double", color: "#cba135", width: 2, inset: 12, showCorners: true },
    elements: [
      { id: "s2-invoc", type: "text", x: 50, y: 12, zIndex: 1, text: "ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ ॥", fontSize: 18, fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#cba135", textAlign: "center", fontWeight: "bold" },
      { id: "s2-host", type: "text", x: 50, y: 25, zIndex: 2, text: "With blessings of Sri Guru Granth Sahib Ji, we invite you to celebrate the marriage of", fontSize: 11, fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#555555", textAlign: "center", fontStyle: "italic" },
      { id: "s2-groom", type: "text", x: 50, y: 38, zIndex: 3, text: "Harpreet", fontSize: 34, fontFamily: "'Playfair Display', Georgia, serif", color: "#2b1e06", textAlign: "center", fontWeight: "bold" },
      { id: "s2-amp", type: "text", x: 50, y: 46, zIndex: 4, text: "&", fontSize: 24, fontFamily: "'Alex Brush', cursive", color: "#cba135", textAlign: "center" },
      { id: "s2-bride", type: "text", x: 50, y: 54, zIndex: 5, text: "Manpreet", fontSize: 34, fontFamily: "'Playfair Display', Georgia, serif", color: "#2b1e06", textAlign: "center", fontWeight: "bold" },
      { id: "s2-date", type: "text", x: 50, y: 65, zIndex: 6, text: "Saturday, 12th December 2026 at 10:00 AM", fontSize: 12, fontFamily: "'Cinzel', Georgia, serif", color: "#444444", textAlign: "center", fontWeight: "600" },
      { id: "s2-venue", type: "text", x: 50, y: 74, zIndex: 7, text: "Gurdwara Sri Guru Singh Sabha, Sector 19, Chandigarh", fontSize: 11, fontFamily: "'Montserrat', sans-serif", color: "#222222", textAlign: "center" },
      { id: "s2-bless", type: "text", x: 50, y: 83, zIndex: 8, text: "Followed by lunch and blessings", fontSize: 10, fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#777777", textAlign: "center", fontStyle: "italic" },
    ],
  },
  // 4. SOUTH INDIAN - Template 1
  {
    id: "south-silk-ivory",
    name: "Temple Silk Ivory & Gold Muhurtham",
    category: "South Indian",
    description: "Traditional temple arch border with Lord Venkateswara blessings and auspicious timings",
    background: { type: "color", color: "#fdfbf7", imageUrl: "", blur: 0, opacity: 1, brightness: 1 },
    border: { style: "vintage-arch", color: "#cba135", width: 2, inset: 12, showCorners: true },
    elements: [
      { id: "si1-invoc", type: "text", x: 50, y: 12, zIndex: 1, text: "॥ शुभमस्तु ॥", fontSize: 18, fontFamily: "'Rozha One', serif", color: "#80182a", textAlign: "center", fontWeight: "bold" },
      { id: "si1-sub", type: "text", x: 50, y: 19, zIndex: 2, text: "Divine Blessings of Lord Venkateswara", fontSize: 10, fontFamily: "'Cinzel', Georgia, serif", color: "#cba135", textAlign: "center", letterSpacing: 2 },
      { id: "si1-host", type: "text", x: 50, y: 28, zIndex: 3, text: "Mrs. & Mr. K. Ramanathan cordially invite you with family to the Kalyanam of their daughter", fontSize: 11, fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#555555", textAlign: "center", fontStyle: "italic" },
      { id: "si1-bride", type: "text", x: 50, y: 40, zIndex: 4, text: "MEENAKSHI", fontSize: 30, fontFamily: "'Playfair Display', Georgia, serif", color: "#5b1424", textAlign: "center", fontWeight: "bold", letterSpacing: 2 },
      { id: "si1-amp", type: "text", x: 50, y: 48, zIndex: 5, text: "weds", fontSize: 20, fontFamily: "'Great Vibes', cursive", color: "#cba135", textAlign: "center" },
      { id: "si1-groom", type: "text", x: 50, y: 56, zIndex: 6, text: "KARTHIK", fontSize: 30, fontFamily: "'Playfair Display', Georgia, serif", color: "#5b1424", textAlign: "center", fontWeight: "bold", letterSpacing: 2 },
      { id: "si1-muh", type: "text", x: 50, y: 66, zIndex: 7, text: "AUSPICIOUS MUHURTHAM", fontSize: 12, fontFamily: "'Cinzel', Georgia, serif", color: "#80182a", textAlign: "center", fontWeight: "bold", letterSpacing: 2 },
      { id: "si1-date", type: "text", x: 50, y: 74, zIndex: 8, text: "Friday, 22nd January 2027 between 6:00 AM - 7:30 AM", fontSize: 11, fontFamily: "'Montserrat', sans-serif", color: "#333333", textAlign: "center", fontWeight: "600" },
      { id: "si1-venue", type: "text", x: 50, y: 82, zIndex: 9, text: "The Leela Palace, Grand Ballroom, Chennai", fontSize: 11, fontFamily: "'Montserrat', sans-serif", color: "#555555", textAlign: "center" },
    ],
  },
  // 4. SOUTH INDIAN - Template 2
  {
    id: "south-crimson-mandap",
    name: "Royal Crimson & Gold Temple Mandap",
    category: "South Indian",
    description: "Deep auspicious maroon with ornate gold frame and Dhanur Lagna muhurtham timings",
    background: { type: "color", color: "#4a0e17", imageUrl: "", blur: 0, opacity: 1, brightness: 1 },
    border: { style: "ornate-gold", color: "#dfb76c", width: 2, inset: 12, showCorners: true },
    elements: [
      { id: "si2-invoc", type: "text", x: 50, y: 12, zIndex: 1, text: "॥ श्री महागणपतये नमः ॥", fontSize: 18, fontFamily: "'Rozha One', serif", color: "#dfb76c", textAlign: "center", fontWeight: "bold" },
      { id: "si2-host", type: "text", x: 50, y: 24, zIndex: 2, text: "We seek your gracious presence on the auspicious occasion of the wedding of", fontSize: 11, fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#f4ede1", textAlign: "center", fontStyle: "italic" },
      { id: "si2-groom", type: "text", x: 50, y: 38, zIndex: 3, text: "Aditya", fontSize: 32, fontFamily: "'Playfair Display', Georgia, serif", color: "#dfb76c", textAlign: "center", fontWeight: "bold" },
      { id: "si2-amp", type: "text", x: 50, y: 47, zIndex: 4, text: "&", fontSize: 26, fontFamily: "'Alex Brush', cursive", color: "#ffffff", textAlign: "center" },
      { id: "si2-bride", type: "text", x: 50, y: 56, zIndex: 5, text: "Shruti", fontSize: 32, fontFamily: "'Playfair Display', Georgia, serif", color: "#dfb76c", textAlign: "center", fontWeight: "bold" },
      { id: "si2-muh", type: "text", x: 50, y: 67, zIndex: 6, text: "MUHURTHAM: DHANUR LAGNA", fontSize: 11, fontFamily: "'Cinzel', Georgia, serif", color: "#dfb76c", textAlign: "center", fontWeight: "bold", letterSpacing: 2 },
      { id: "si2-date", type: "text", x: 50, y: 75, zIndex: 7, text: "Sunday, 14th February 2027 | 9:15 AM to 10:30 AM", fontSize: 11, fontFamily: "'Montserrat', sans-serif", color: "#ffffff", textAlign: "center" },
      { id: "si2-venue", type: "text", x: 50, y: 83, zIndex: 8, text: "Mayor Ramanathan Chettiar Hall, Raja Annamalaipuram, Chennai", fontSize: 11, fontFamily: "'Montserrat', sans-serif", color: "#e5d7bd", textAlign: "center" },
    ],
  },
  // 5. CHRISTIAN - Template 1
  {
    id: "christian-alabaster-gold",
    name: "Classic Alabaster & Foliage Gold Matrimony",
    category: "Christian",
    description: "Pure alabaster white paper with royal double gold frame and scripture vows",
    background: { type: "color", color: "#ffffff", imageUrl: "", blur: 0, opacity: 1, brightness: 1 },
    border: { style: "royal-double", color: "#cba135", width: 2, inset: 12, showCorners: true },
    elements: [
      { id: "c1-script", type: "text", x: 50, y: 12, zIndex: 1, text: "What therefore God has joined together, let not man put asunder.", fontSize: 9, fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#888888", textAlign: "center", fontStyle: "italic" },
      { id: "c1-host", type: "text", x: 50, y: 22, zIndex: 2, text: "Together with their families", fontSize: 12, fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#555555", textAlign: "center", fontStyle: "italic" },
      { id: "c1-groom", type: "text", x: 50, y: 34, zIndex: 3, text: "DAVID JOSEPH", fontSize: 28, fontFamily: "'Playfair Display', Georgia, serif", color: "#16284f", textAlign: "center", fontWeight: "bold", letterSpacing: 2 },
      { id: "c1-amp", type: "text", x: 50, y: 43, zIndex: 4, text: "and", fontSize: 22, fontFamily: "'Great Vibes', cursive", color: "#cba135", textAlign: "center" },
      { id: "c1-bride", type: "text", x: 50, y: 52, zIndex: 5, text: "SARAH ELIZABETH", fontSize: 28, fontFamily: "'Playfair Display', Georgia, serif", color: "#16284f", textAlign: "center", fontWeight: "bold", letterSpacing: 2 },
      { id: "c1-word", type: "text", x: 50, y: 62, zIndex: 6, text: "Request the honour of your presence at their Holy Matrimony", fontSize: 11, fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#555555", textAlign: "center" },
      { id: "c1-date", type: "text", x: 50, y: 72, zIndex: 7, text: "SATURDAY, 19TH DECEMBER 2026 AT 4:00 PM", fontSize: 11, fontFamily: "'Cinzel', Georgia, serif", color: "#16284f", textAlign: "center", fontWeight: "bold", letterSpacing: 1 },
      { id: "c1-venue", type: "text", x: 50, y: 80, zIndex: 8, text: "St. Mary's Cathedral, Richmond Road, Bangalore", fontSize: 11, fontFamily: "'Montserrat', sans-serif", color: "#333333", textAlign: "center" },
      { id: "c1-rec", type: "text", x: 50, y: 88, zIndex: 9, text: "Reception to follow at The Taj West End", fontSize: 10, fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#777777", textAlign: "center", fontStyle: "italic" },
    ],
  },
  // 5. CHRISTIAN - Template 2
  {
    id: "christian-sapphire-cathedral",
    name: "Midnight Sapphire & Foil Silver Matrimony",
    category: "Christian",
    description: "Deep midnight sapphire navy with ornate silver/white borders and grand cathedral details",
    background: { type: "color", color: "#0c1833", imageUrl: "", blur: 0, opacity: 1, brightness: 1 },
    border: { style: "ornate-gold", color: "#ffffff", width: 2, inset: 12, showCorners: true },
    elements: [
      { id: "c2-head", type: "text", x: 50, y: 12, zIndex: 1, text: "CELEBRATING LOVE & HOLY MATRIMONY", fontSize: 11, fontFamily: "'Cinzel', Georgia, serif", color: "#ffffff", textAlign: "center", letterSpacing: 3 },
      { id: "c2-host", type: "text", x: 50, y: 24, zIndex: 2, text: "You are cordially invited to witness the wedding vows of", fontSize: 11, fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#c7d2fe", textAlign: "center", fontStyle: "italic" },
      { id: "c2-couple", type: "text", x: 50, y: 38, zIndex: 3, text: "Kevin & Michelle", fontSize: 32, fontFamily: "'Playfair Display', Georgia, serif", color: "#ffffff", textAlign: "center", fontWeight: "bold" },
      { id: "c2-date", type: "text", x: 50, y: 52, zIndex: 4, text: "FRIDAY, 8TH JANUARY 2027", fontSize: 13, fontFamily: "'Cinzel', Georgia, serif", color: "#93c5fd", textAlign: "center", fontWeight: "bold", letterSpacing: 1 },
      { id: "c2-church", type: "text", x: 50, y: 62, zIndex: 5, text: "Church Service: 3:30 PM | Sacred Heart Church", fontSize: 11, fontFamily: "'Montserrat', sans-serif", color: "#e0e7ff", textAlign: "center" },
      { id: "c2-rec", type: "text", x: 50, y: 72, zIndex: 6, text: "Gala Dinner & Dance: 7:00 PM | Grand Hyatt, Goa", fontSize: 11, fontFamily: "'Montserrat', sans-serif", color: "#ffffff", textAlign: "center" },
      { id: "c2-rsvp", type: "text", x: 50, y: 84, zIndex: 7, text: "RSVP: D'Souza & Fernandes Families", fontSize: 10, fontFamily: "'Cinzel', Georgia, serif", color: "#93c5fd", textAlign: "center", fontWeight: "bold" },
    ],
  },
];

export default function CardMaker() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pngInputRef = useRef<HTMLInputElement>(null);

  // Active Tab & Mobile Drawer state
  const [activeTab, setActiveTab] = useState<"templates" | "borders" | "background" | "elements" | "text" | "layers">("templates");
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [selectedPresetCategory, setSelectedPresetCategory] = useState<string>("All");

  // Multi-Page Canvas State (Allows adding unlimited pages to wedding suite)
  const [pages, setPages] = useState<CardPage[]>([
    {
      id: "page-1",
      name: "Page 1 - Main Invitation",
      background: {
        type: "color",
        color: "#fdfbf7",
        imageUrl: "",
        blur: 0,
        opacity: 1,
        brightness: 1,
      },
      border: DEFAULT_BORDER,
      elements: INITIAL_ELEMENTS,
    },
  ]);
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Active page helpers
  const currentPage = pages[currentPageIndex] || pages[0];
  const elements = currentPage.elements;
  const background = currentPage.background;
  const border = currentPage.border;

  // Proxy state mutators for currently active page
  const setElements = (updater: CanvasElement[] | ((prev: CanvasElement[]) => CanvasElement[])) => {
    setPages((prevPages) => {
      const updated = [...prevPages];
      const targetIndex = Math.min(currentPageIndex, updated.length - 1);
      const curr = updated[targetIndex].elements;
      const next = typeof updater === "function" ? updater(curr) : updater;
      updated[targetIndex] = { ...updated[targetIndex], elements: next };
      return updated;
    });
  };

  const setBackground = (updater: CanvasBackground | ((prev: CanvasBackground) => CanvasBackground)) => {
    setPages((prevPages) => {
      const updated = [...prevPages];
      const targetIndex = Math.min(currentPageIndex, updated.length - 1);
      const curr = updated[targetIndex].background;
      const next = typeof updater === "function" ? updater(curr) : updater;
      updated[targetIndex] = { ...updated[targetIndex], background: next };
      return updated;
    });
  };

  const setBorder = (updater: CanvasBorder | ((prev: CanvasBorder) => CanvasBorder)) => {
    setPages((prevPages) => {
      const updated = [...prevPages];
      const targetIndex = Math.min(currentPageIndex, updated.length - 1);
      const curr = updated[targetIndex].border;
      const next = typeof updater === "function" ? updater(curr) : updater;
      updated[targetIndex] = { ...updated[targetIndex], border: next };
      return updated;
    });
  };

  // Add New Blank / Event Page
  const handleAddPage = () => {
    const newPageId = `page-${Date.now()}`;
    const currPage = pages[currentPageIndex] || pages[0];
    const newPage: CardPage = {
      id: newPageId,
      name: `Page ${pages.length + 1} - Sangeet & Mehendi`,
      background: { ...currPage.background },
      border: { ...currPage.border },
      elements: [
        {
          id: `el-page-title-${Date.now()}`,
          type: "text",
          x: 50,
          y: 18,
          zIndex: 1,
          text: "SANGEET & MEHENDI CELEBRATION",
          fontSize: 16,
          fontFamily: "'Cinzel', Georgia, serif",
          color: currPage.elements[0]?.color || "#cba135",
          textAlign: "center",
          fontWeight: "bold",
          letterSpacing: 2,
        },
        {
          id: `el-page-body-${Date.now()}`,
          type: "text",
          x: 50,
          y: 45,
          zIndex: 2,
          text: "Join us for an evening of music, dance & festive joy\n\nWednesday, December 16, 2026\n7:00 PM Onwards\n\nDress Code: Vibrant & Festive",
          fontSize: 13,
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          color: currPage.elements[0]?.color || "#333333",
          textAlign: "center",
          lineHeight: 1.5,
        },
        {
          id: `el-page-venue-${Date.now()}`,
          type: "text",
          x: 50,
          y: 80,
          zIndex: 3,
          text: "Poolside Lawns, The Heritage Palace, Jaipur",
          fontSize: 12,
          fontFamily: "'Montserrat', sans-serif",
          color: "#666666",
          textAlign: "center",
        },
      ],
    };
    setPages((prev) => [...prev, newPage]);
    setCurrentPageIndex(pages.length);
    setSelectedId(null);
  };

  // Duplicate Current Page
  const handleDuplicatePage = () => {
    const currPage = pages[currentPageIndex];
    const newPage: CardPage = {
      id: `page-${Date.now()}`,
      name: `${currPage.name} (Copy)`,
      background: { ...currPage.background },
      border: { ...currPage.border },
      elements: currPage.elements.map((el) => ({
        ...el,
        id: `el-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      })),
    };
    const nextPages = [...pages];
    nextPages.splice(currentPageIndex + 1, 0, newPage);
    setPages(nextPages);
    setCurrentPageIndex(currentPageIndex + 1);
    setSelectedId(null);
  };

  // Delete Current Page
  const handleDeletePage = () => {
    if (pages.length <= 1) return;
    const nextPages = pages.filter((_, idx) => idx !== currentPageIndex);
    setPages(nextPages);
    setCurrentPageIndex((prev) => Math.min(prev, nextPages.length - 1));
    setSelectedId(null);
  };

  // 1-Tap Apply Full Preset Template to Current Page
  const handleApplyPreset = (preset: TemplatePreset) => {
    setPages((prevPages) => {
      const updated = [...prevPages];
      const targetIndex = Math.min(currentPageIndex, updated.length - 1);
      updated[targetIndex] = {
        ...updated[targetIndex],
        name: preset.name,
        background: { ...preset.background },
        border: { ...preset.border },
        elements: preset.elements.map((el) => ({ ...el })),
      };
      return updated;
    });
    setSelectedId(null);
  };

  // URL input for background
  const [customUrl, setCustomUrl] = useState("");
  const [isResolvingUrl, setIsResolvingUrl] = useState(false);
  const [urlError, setUrlError] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isExporting, setIsExporting] = useState<"pdf" | "image" | null>(null);

  // Dragging & Resizing tracking
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ mouseX: number; mouseY: number; elemX: number; elemY: number } | null>(null);

  const [isResizing, setIsResizing] = useState(false);
  const resizeStartRef = useRef<{ mouseX: number; mouseY: number; startWidth: number; startFontSize?: number } | null>(null);

  const selectedElement = elements.find((el) => el.id === selectedId) || null;

  // Auto-populate template if user arrived via link with ?template=<id>
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const templateId = params.get("template");
    if (!templateId) return;

    const matched = TEMPLATES.find((t) => t.id === templateId);
    if (!matched) return;

    const dt = matched.defaultText;
    setElements([
      {
        id: "el-invoc",
        type: "text",
        x: 50,
        y: 12,
        zIndex: 1,
        text: dt.invocation,
        fontSize: 16,
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        color: matched.colorTheme === "Gold" ? "#cba135" : "#5b1424",
        textAlign: "center",
        fontWeight: "600",
        letterSpacing: 2,
        lineHeight: 1.2,
      },
      {
        id: "el-host",
        type: "text",
        x: 50,
        y: 28,
        zIndex: 2,
        text: dt.hostText,
        fontSize: 12,
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        color: "#555555",
        textAlign: "center",
        fontStyle: "italic",
        lineHeight: 1.3,
      },
      {
        id: "el-groom",
        type: "text",
        x: 50,
        y: 42,
        zIndex: 3,
        text: dt.groomName,
        fontSize: 32,
        fontFamily: "'Playfair Display', Georgia, serif",
        color: "#5b1424",
        textAlign: "center",
        fontWeight: "bold",
        letterSpacing: 1,
        lineHeight: 1.2,
      },
      {
        id: "el-amp",
        type: "text",
        x: 50,
        y: 50,
        zIndex: 4,
        text: "&",
        fontSize: 22,
        fontFamily: "'Great Vibes', cursive",
        color: "#cba135",
        textAlign: "center",
        lineHeight: 1,
      },
      {
        id: "el-bride",
        type: "text",
        x: 50,
        y: 58,
        zIndex: 5,
        text: dt.brideName,
        fontSize: 32,
        fontFamily: "'Playfair Display', Georgia, serif",
        color: "#5b1424",
        textAlign: "center",
        fontWeight: "bold",
        letterSpacing: 1,
        lineHeight: 1.2,
      },
      {
        id: "el-ceremony",
        type: "text",
        x: 50,
        y: 70,
        zIndex: 6,
        text: dt.ceremony,
        fontSize: 14,
        fontFamily: "'Montserrat', sans-serif",
        color: "#5b1424",
        textAlign: "center",
        fontWeight: "600",
        letterSpacing: 2,
        lineHeight: 1.3,
      },
      {
        id: "el-datetime",
        type: "text",
        x: 50,
        y: 78,
        zIndex: 7,
        text: `${dt.date} | ${dt.time}`,
        fontSize: 12,
        fontFamily: "'Montserrat', sans-serif",
        color: "#444444",
        textAlign: "center",
        fontWeight: "normal",
        lineHeight: 1.3,
      },
      {
        id: "el-venue",
        type: "text",
        x: 50,
        y: 86,
        zIndex: 8,
        text: `${dt.venue}, ${dt.city}`,
        fontSize: 12,
        fontFamily: "'Montserrat', sans-serif",
        color: "#666666",
        textAlign: "center",
        fontWeight: "normal",
        lineHeight: 1.3,
      },
    ]);
  }, []);

  // 1. Move element layer up/down
  const moveLayer = (id: string, direction: "up" | "down" | "top" | "bottom") => {
    setElements((prev) => {
      const idx = prev.findIndex((el) => el.id === id);
      if (idx === -1) return prev;
      const copy = [...prev];
      const target = copy[idx];

      if (direction === "up" && idx < copy.length - 1) {
        copy.splice(idx, 1);
        copy.splice(idx + 1, 0, target);
      } else if (direction === "down" && idx > 0) {
        copy.splice(idx, 1);
        copy.splice(idx - 1, 0, target);
      } else if (direction === "top") {
        copy.splice(idx, 1);
        copy.push(target);
      } else if (direction === "bottom") {
        copy.splice(idx, 1);
        copy.unshift(target);
      }

      // Re-normalize zIndex
      return copy.map((el, i) => ({ ...el, zIndex: i + 1 }));
    });
  };

  // 2. Delete active element
  const deleteElement = (id: string) => {
    setElements((prev) => prev.filter((el) => el.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  // 3. Duplicate element
  const duplicateElement = (id: string) => {
    const orig = elements.find((el) => el.id === id);
    if (!orig) return;
    const newId = `el-${Date.now()}`;
    const clone: CanvasElement = {
      ...orig,
      id: newId,
      x: Math.min(orig.x + 3, 90),
      y: Math.min(orig.y + 3, 90),
      zIndex: elements.length + 1,
    };
    setElements((prev) => [...prev, clone]);
    setSelectedId(newId);
  };

  // 4. Update element property
  const updateSelected = (props: Partial<CanvasElement>) => {
    if (!selectedId) return;
    setElements((prev) =>
      prev.map((el) => (el.id === selectedId ? { ...el, ...props } : el))
    );
  };

  // 5. Add new Text Element
  const addTextElement = (text: string, fontSize = 16, fontWeight: "normal" | "600" | "bold" = "normal", fontFamily = "'Cormorant Garamond', Georgia, serif") => {
    const newId = `el-${Date.now()}`;
    const newEl: CanvasElement = {
      id: newId,
      type: "text",
      x: 50,
      y: 50,
      zIndex: elements.length + 1,
      text,
      fontSize,
      fontFamily,
      color: "#5b1424",
      textAlign: "center",
      fontWeight,
      lineHeight: 1.25,
      rotation: 0,
    };
    setElements((prev) => [...prev, newEl]);
    setSelectedId(newId);
  };

  // 6. Add PNG / Image Element
  const addImageElement = (src: string, width = 35) => {
    const newId = `el-${Date.now()}`;
    const newEl: CanvasElement = {
      id: newId,
      type: "image",
      x: 50,
      y: 50,
      width,
      zIndex: elements.length + 1,
      src,
      opacity: 1,
      rotation: 0,
    };
    setElements((prev) => [...prev, newEl]);
    setSelectedId(newId);
  };

  // 7. Handle Background File Upload (User can upload any Pinterest or computer image)
  const handleBgFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setBackground((prev) => ({
        ...prev,
        type: "image",
        imageUrl: result,
      }));
    };
    reader.readAsDataURL(file);
    // Reset file input so re-selecting same file triggers onChange
    e.target.value = "";
  };

  // 7b. Apply Pinterest / Web Image URL with auto-proxy & resolution
  const applyCustomBackgroundUrl = async () => {
    const raw = customUrl.trim();
    if (!raw) return;

    setIsResolvingUrl(true);
    setUrlError(null);

    try {
      // 1. If it's a Pinterest webpage or shortlink, or any external image that might have CORS restrictions:
      // Try resolving through local proxy
      const proxyUrl = `/api/proxy-image?url=${encodeURIComponent(raw)}`;
      
      const res = await fetch(proxyUrl);
      if (!res.ok) {
        throw new Error("Could not load image from URL. Make sure it is a valid image or Pinterest link.");
      }

      // Convert to blob / data URL so canvas export html-to-image never has CORS issues
      const blob = await res.blob();
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setBackground((prev) => ({
          ...prev,
          type: "image",
          imageUrl: dataUrl,
          blur: prev.blur || 0,
        }));
        setIsResolvingUrl(false);
      };
      reader.readAsDataURL(blob);
    } catch (err: any) {
      console.warn("Proxy resolution failed, falling back to direct URL:", err);
      // Fallback: If proxy failed (e.g. standalone preview mode), test direct image load
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        setBackground((prev) => ({
          ...prev,
          type: "image",
          imageUrl: raw,
        }));
        setIsResolvingUrl(false);
      };
      img.onerror = () => {
        setIsResolvingUrl(false);
        setUrlError("Failed to load image. If this is a Pinterest pin, right-click the image -> 'Copy image address', or save it and use 'Choose Image File'.");
      };
      img.src = raw;
    }
  };

  // 8. Handle Custom PNG File Upload as a Layer
  const handlePngFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      addImageElement(result, 35);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  // 9. Export to High-Res Image (PNG)
  const handleExportPng = async (exportAll = false) => {
    if (!canvasRef.current) return;
    try {
      setIsExporting("image");
      const currentSelected = selectedId;
      setSelectedId(null); // Clear selection outline before capture
      const origPageIndex = currentPageIndex;

      if (!exportAll || pages.length === 1) {
        await new Promise((r) => setTimeout(r, 120)); // wait for rerender
        const dataUrl = await toPng(canvasRef.current, {
          cacheBust: true,
          pixelRatio: 2.5,
        });
        const link = document.createElement("a");
        link.download = `wedding-invitation-page-${currentPageIndex + 1}-${Date.now()}.png`;
        link.href = dataUrl;
        link.click();
        setSelectedId(currentSelected);
      } else {
        // Export all pages sequentially
        for (let i = 0; i < pages.length; i++) {
          setCurrentPageIndex(i);
          await new Promise((r) => setTimeout(r, 150));
          if (canvasRef.current) {
            const dataUrl = await toPng(canvasRef.current, {
              cacheBust: true,
              pixelRatio: 2.5,
            });
            const link = document.createElement("a");
            link.download = `wedding-invitation-page-${i + 1}-${Date.now()}.png`;
            link.href = dataUrl;
            link.click();
            await new Promise((r) => setTimeout(r, 80));
          }
        }
        setCurrentPageIndex(origPageIndex);
        setSelectedId(currentSelected);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to export image. Please try again.");
    } finally {
      setIsExporting(null);
    }
  };

  // 10. Export to Multi-Page Print-Ready Vector PDF
  const handleExportPdf = async () => {
    if (!canvasRef.current) return;
    try {
      setIsExporting("pdf");
      const currentSelected = selectedId;
      setSelectedId(null);
      const origPageIndex = currentPageIndex;

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [148, 210], // standard A5 print size
      });

      // Capture all pages in order
      for (let i = 0; i < pages.length; i++) {
        setCurrentPageIndex(i);
        // Wait for page canvas elements and background to mount
        await new Promise((r) => setTimeout(r, 160));

        if (canvasRef.current) {
          const dataUrl = await toPng(canvasRef.current, {
            cacheBust: true,
            pixelRatio: 2.5,
          });

          if (i > 0) {
            pdf.addPage([148, 210], "portrait");
          }
          pdf.addImage(dataUrl, "PNG", 0, 0, 148, 210);
        }
      }

      pdf.save(`wedding-invitation-suite-${Date.now()}.pdf`);
      setCurrentPageIndex(origPageIndex);
      setSelectedId(currentSelected);
    } catch (err) {
      console.error(err);
      alert("Failed to export PDF. Please try again.");
    } finally {
      setIsExporting(null);
    }
  };

  // Dragging logic for element movement
  const handlePointerDown = (e: React.PointerEvent, el: CanvasElement) => {
    e.stopPropagation();
    setSelectedId(el.id);
    setIsDragging(true);
    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      elemX: el.x,
      elemY: el.y,
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isResizing && resizeStartRef.current && selectedId) {
      const deltaX = e.clientX - resizeStartRef.current.mouseX;
      if (selectedElement?.type === "image") {
        const newWidth = Math.max(10, Math.min(95, resizeStartRef.current.startWidth + deltaX * 0.25));
        updateSelected({ width: Math.round(newWidth) });
      } else if (selectedElement?.type === "text" && resizeStartRef.current.startFontSize) {
        const newFontSize = Math.max(10, Math.min(72, resizeStartRef.current.startFontSize + deltaX * 0.2));
        updateSelected({ fontSize: Math.round(newFontSize) });
      }
      return;
    }

    if (!isDragging || !dragStartRef.current || !selectedId || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const deltaX = ((e.clientX - dragStartRef.current.mouseX) / rect.width) * 100;
    const deltaY = ((e.clientY - dragStartRef.current.mouseY) / rect.height) * 100;

    const newX = Math.max(5, Math.min(95, dragStartRef.current.elemX + deltaX));
    const newY = Math.max(5, Math.min(95, dragStartRef.current.elemY + deltaY));

    setElements((prev) =>
      prev.map((item) =>
        item.id === selectedId ? { ...item, x: Math.round(newX), y: Math.round(newY) } : item
      )
    );
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    dragStartRef.current = null;
    setIsResizing(false);
    resizeStartRef.current = null;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  // Corner handle for interactive resizing
  const startResizing = (e: React.PointerEvent, el: CanvasElement) => {
    e.stopPropagation();
    setIsResizing(true);
    resizeStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      startWidth: el.width || 30,
      startFontSize: el.fontSize || 16,
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  return (
    <div className="min-h-screen bg-[#18191d] text-white flex flex-col pt-16 sm:pt-20 select-none">
      <SEO
        title="Create Free Wedding Invitation Card PDF | 100% Free Online Studio - Vows & Knots"
        description="Create free wedding invitation card PDF online in minutes. Upload custom Pinterest backgrounds, insert royal PNG motifs, customize luxury fonts, and download print-ready vector PDF & high-res PNG 100% free with no watermarks."
        keywords="create free wedding invitation card pdf, free wedding invitation card pdf, wedding invitation card pdf download, free digital wedding invitation pdf, online wedding card maker with photo and pdf download, shadi card maker free pdf download, free wedding card maker, download wedding invitation pdf"
        canonicalPath="/create-free-wedding-invitation-card-pdf"
        jsonLd={CARD_MAKER_JSONLD}
      />

      {/* TOP STUDIO TOOLBAR */}
      <header className="h-14 bg-[#212228] border-b border-white/10 px-3 sm:px-6 flex items-center justify-between shrink-0 z-30">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <Link href="/templates" className="text-xs text-white/70 hover:text-white flex items-center gap-1 transition-colors shrink-0">
            &larr; <span className="hidden sm:inline">Templates</span>
          </Link>
          <span className="text-white/20 shrink-0">|</span>
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-secondary animate-pulse shrink-0" />
            <h1 className="text-xs sm:text-sm font-bold text-white tracking-wide truncate max-w-[120px] xs:max-w-[170px] sm:max-w-none">
              Free Card Studio
            </h1>
            <span className="hidden md:inline-block text-[10px] bg-secondary/20 text-secondary border border-secondary/30 px-2 py-0.5 rounded-full font-semibold uppercase shrink-0">
              100% Free Studio
            </span>
          </div>
        </div>

        {/* Zoom & Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Zoom controls for desktop */}
          <div className="hidden md:flex items-center gap-1 bg-black/40 rounded-lg px-2 py-1 text-xs border border-white/10">
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.6, z - 0.1))}
              className="p-1 hover:text-secondary text-white/70"
              title="Zoom Out"
            >
              <ZoomOut size={14} />
            </button>
            <span className="text-[11px] font-mono px-1">{Math.round(zoomLevel * 100)}%</span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.1))}
              className="p-1 hover:text-secondary text-white/70"
              title="Zoom In"
            >
              <ZoomIn size={14} />
            </button>
          </div>

          {/* Quick Clear Background */}
          {background.imageUrl && (
            <button
              onClick={() => setBackground((prev) => ({ ...prev, imageUrl: "", blur: 0 }))}
              className="hidden lg:flex px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs items-center gap-1 border border-white/10 transition-colors"
              title="Reset to plain color background"
            >
              <RotateCcw size={12} />
              <span>Reset BG</span>
            </button>
          )}

          {/* Download as Image */}
          <button
            onClick={() => handleExportPng(false)}
            disabled={isExporting !== null}
            className="px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[11px] sm:text-xs font-semibold flex items-center gap-1 sm:gap-1.5 transition-all active:scale-95 border border-white/15 cursor-pointer shrink-0"
            title="Download active page as high-res PNG image"
          >
            <ImageIcon size={13} />
            <span className="hidden xs:inline">Image</span>
          </button>

          {/* Download as PDF */}
          <button
            onClick={handleExportPdf}
            disabled={isExporting !== null}
            className="px-3 sm:px-5 py-1.5 sm:py-2 rounded-xl bg-secondary hover:bg-secondary/90 text-primary font-bold text-[11px] sm:text-xs flex items-center gap-1 sm:gap-1.5 transition-all active:scale-95 shadow-md shadow-secondary/20 cursor-pointer shrink-0"
            title={`Download print-ready PDF (${pages.length} page${pages.length > 1 ? "s" : ""})`}
          >
            <FileText size={13} />
            <span>
              {isExporting === "pdf" ? "Exporting..." : pages.length > 1 ? `PDF (${pages.length}P)` : "Download PDF"}
            </span>
          </button>
        </div>
      </header>

      {/* MAIN WORKSPACE: SIDEBAR + CANVAS + INSPECTOR */}
      <div className="flex-grow flex flex-col md:flex-row overflow-hidden relative min-h-[500px] md:h-[calc(100vh-130px)]">

        {/* 1. TOOLBAR TAB SELECTOR (Bottom on Mobile, Left on Desktop) */}
        <div className="order-last md:order-first fixed md:static inset-x-0 bottom-0 z-30 h-[calc(4rem+env(safe-area-inset-bottom,0px))] md:h-auto pb-[env(safe-area-inset-bottom,0px)] w-full md:w-16 bg-[#141518] border-t md:border-t-0 md:border-r border-white/10 flex md:flex-col items-center justify-around md:justify-start px-2 py-1.5 md:py-4 gap-1 sm:gap-2.5 shrink-0">
          {[
            { id: "templates", label: "Presets", icon: Sparkles },
            { id: "borders", label: "Borders", icon: Square },
            { id: "background", label: "Canvas BG", icon: ImageIcon },
            { id: "text", label: "Text", icon: Type },
            { id: "elements", label: "Stickers", icon: Palette },
            { id: "layers", label: "Layers", icon: Layers },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  if (activeTab === tab.id && isMobileDrawerOpen) {
                    setIsMobileDrawerOpen(false);
                  } else {
                    setActiveTab(tab.id as any);
                    setIsMobileDrawerOpen(true);
                  }
                }}
                className={`flex flex-col items-center justify-center gap-0.5 md:gap-1 p-1.5 md:p-2.5 rounded-xl transition-all w-12 sm:w-14 cursor-pointer active:scale-95 ${
                  isActive
                    ? "bg-secondary text-primary font-bold shadow-md"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon size={16} />
                <span className="text-[9px] uppercase tracking-wider font-semibold truncate max-w-full">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Mobile Drawer Backdrop */}
        {isMobileDrawerOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-35 md:hidden backdrop-blur-xs"
            onClick={() => setIsMobileDrawerOpen(false)}
          />
        )}

        {/* 2. ASSETS DRAWER / EXPANDED PANEL (Bottom Sheet on Mobile, Left Panel on Desktop) */}
        <div className={`fixed md:static inset-x-0 bottom-[calc(4rem+env(safe-area-inset-bottom,0px))] md:bottom-auto z-40 max-h-[70vh] md:max-h-none md:w-80 bg-[#1f2026] rounded-t-3xl md:rounded-none shadow-2xl md:shadow-none border-t md:border-t-0 md:border-r border-white/15 p-4 overflow-y-auto flex-col shrink-0 ${isMobileDrawerOpen ? "flex" : "hidden md:flex"}`}>
          
          {/* Mobile Drawer Header */}
          <div className="flex md:hidden items-center justify-between pb-3 mb-2 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-8 h-1 bg-white/30 rounded-full" />
              <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                {activeTab === "templates" ? "Presets & Templates" :
                 activeTab === "borders" ? "Frames & Borders" :
                 activeTab === "background" ? "Background & Wallpaper" :
                 activeTab === "text" ? "Add & Format Text" :
                 activeTab === "elements" ? "Stickers & Art" : "Canvas Layers"}
              </span>
            </div>
            <button
              onClick={() => setIsMobileDrawerOpen(false)}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white/80 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close drawer"
            >
              <X size={15} />
            </button>
          </div>

          {/* A. BACKGROUND TAB (Plain solid papers + Upload custom image + Pinterest link) */}
          {activeTab === "background" && (
            <div className="space-y-5 text-xs">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                  Card Background &amp; Paper
                </h3>
                <p className="text-[11px] text-white/50 mt-0.5">
                  Start with a clean paper base or upload your own background image.
                </p>
              </div>

              {/* Upload Image from Pinterest / Computer */}
              <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10 space-y-2.5">
                <label className="block text-[11px] font-bold text-white/90">
                  Upload Background Image
                </label>
                <p className="text-[10px] text-white/50">
                  Upload any photo from Pinterest or your phone to use as the card wallpaper.
                </p>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleBgFileUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-2.5 rounded-xl bg-secondary/15 hover:bg-secondary/25 border border-dashed border-secondary/40 text-secondary font-bold text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <Upload size={14} />
                  <span>Choose Image File</span>
                </button>
              </div>

              {/* Paste Image URL (from Pinterest or Web) */}
              <div>
                <label className="block text-[11px] font-bold text-white/80 mb-1">
                  Or Paste Pinterest Link / Image URL
                </label>
                <p className="text-[10px] text-white/50 mb-1.5">
                  Paste any Pinterest Pin link (e.g. pin.it/... or pinterest.com/pin/...) or direct image URL.
                </p>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={customUrl}
                    onChange={(e) => {
                      setCustomUrl(e.target.value);
                      if (urlError) setUrlError(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        applyCustomBackgroundUrl();
                      }
                    }}
                    placeholder="https://pin.it/... or image URL"
                    className="flex-grow px-3 py-2 rounded-xl bg-black/40 border border-white/20 text-xs text-white focus:outline-none focus:border-secondary"
                  />
                  <button
                    onClick={applyCustomBackgroundUrl}
                    disabled={isResolvingUrl || !customUrl.trim()}
                    className="px-3.5 py-2 rounded-xl bg-secondary disabled:opacity-50 text-primary font-bold text-xs shrink-0 flex items-center gap-1.5 transition-all"
                  >
                    {isResolvingUrl ? (
                      <>
                        <span className="w-3 h-3 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                        <span>Loading...</span>
                      </>
                    ) : (
                      <span>Apply</span>
                    )}
                  </button>
                </div>

                {/* Error feedback if URL fails */}
                {urlError && (
                  <p className="text-[10px] text-rose-400 mt-1.5 bg-rose-500/10 p-2 rounded-lg border border-rose-500/20 leading-relaxed">
                    {urlError}
                  </p>
                )}
              </div>

              {/* LIVE BLUR SLIDER (Only when an image is active) */}
              {background.imageUrl && (
                <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10 space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-[11px] font-bold text-secondary flex items-center gap-1.5">
                      <Sliders size={13} />
                      <span>Background Blur</span>
                    </label>
                    <span className="text-[11px] font-mono text-white/70">{background.blur}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    step="1"
                    value={background.blur}
                    onChange={(e) =>
                      setBackground((prev) => ({ ...prev, blur: Number(e.target.value) }))
                    }
                    className="w-full accent-secondary cursor-pointer"
                  />
                  <p className="text-[10px] text-white/40">
                    Blur busy background photos so your invitation text stays clear and readable.
                  </p>

                  <div className="flex justify-between items-center pt-2 border-t border-white/10">
                    <label className="text-[11px] font-bold text-white/80">
                      Background Opacity
                    </label>
                    <span className="text-[11px] font-mono text-white/70">
                      {Math.round(background.opacity * 100)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.05"
                    value={background.opacity}
                    onChange={(e) =>
                      setBackground((prev) => ({ ...prev, opacity: Number(e.target.value) }))
                    }
                    className="w-full accent-secondary cursor-pointer"
                  />

                  <button
                    onClick={() => setBackground((prev) => ({ ...prev, imageUrl: "", blur: 0 }))}
                    className="w-full py-1.5 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 text-[11px] font-semibold border border-rose-500/30"
                  >
                    Remove Image (Keep Plain Color)
                  </button>
                </div>
              )}

              {/* Pure Plain Paper Colors */}
              <div>
                <label className="block text-[11px] font-bold text-white/80 mb-2">
                  Plain Paper Colors
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {PLAIN_BACKGROUND_COLORS.map((bg) => (
                    <button
                      key={bg.id}
                      onClick={() =>
                        setBackground((prev) => ({
                          ...prev,
                          color: bg.hex,
                          imageUrl: "", // clear image to show clean plain background
                          blur: 0,
                        }))
                      }
                      className={`p-2 rounded-xl border text-left transition-all flex flex-col items-center gap-1.5 ${
                        background.color === bg.hex && !background.imageUrl
                          ? "border-secondary ring-1 ring-secondary bg-white/10"
                          : "border-white/10 bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      <div
                        style={{ backgroundColor: bg.hex }}
                        className="w-full h-8 rounded-lg border border-black/20 shadow-inner"
                      />
                      <span className="text-[10px] font-medium text-white/80 text-center truncate w-full">
                        {bg.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Hex Color Picker for Background */}
              <div>
                <label className="block text-[11px] font-bold text-white/80 mb-1.5">
                  Or Pick Custom Background Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={background.color}
                    onChange={(e) =>
                      setBackground((prev) => ({ ...prev, color: e.target.value, imageUrl: "" }))
                    }
                    className="w-10 h-9 rounded-lg cursor-pointer bg-black/30 border border-white/20 shrink-0"
                  />
                  <input
                    type="text"
                    value={background.color}
                    onChange={(e) =>
                      setBackground((prev) => ({ ...prev, color: e.target.value, imageUrl: "" }))
                    }
                    className="flex-grow px-3 py-2 rounded-xl bg-black/40 border border-white/20 text-xs font-mono text-white focus:outline-none focus:border-secondary"
                  />
                </div>
              </div>
            </div>
          )}

          {/* B. PNG MOTIFS & ELEMENTS TAB */}
          {activeTab === "elements" && (
            <div className="space-y-4 text-xs">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                  Custom PNG Layers &amp; Motifs
                </h3>
                <p className="text-[11px] text-white/50 mt-0.5">
                  Upload your own PNG images or add traditional golden wedding motifs.
                </p>
              </div>

              {/* Upload Custom PNG Layer */}
              <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10 space-y-2">
                <label className="block text-[11px] font-bold text-white/90">
                  Upload PNG / Transparent Image
                </label>
                <input
                  type="file"
                  accept="image/png,image/webp,image/svg+xml,image/*"
                  ref={pngInputRef}
                  onChange={handlePngFileUpload}
                  className="hidden"
                />
                <button
                  onClick={() => pngInputRef.current?.click()}
                  className="w-full py-2.5 rounded-xl bg-secondary text-primary font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
                >
                  <Upload size={14} />
                  <span>Upload Custom PNG as Layer</span>
                </button>
                <p className="text-[10px] text-white/40">
                  Adds an independent layer that can be resized, dragged, rotated, and layered anywhere.
                </p>
              </div>

              {/* Traditional Golden Motifs */}
              <div>
                <label className="block text-[11px] font-bold text-white/80 mb-2">
                  Golden Lotus &amp; Royal Filigree Motifs
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { id: "lotus1", name: "Lotus Bloom", src: "/images/lotus1.png" },
                    { id: "lotus2", name: "Lotus Flourish", src: "/images/lotus2.png" },
                    { id: "lotus3", name: "Royal Crest", src: "/images/lotus3.png" },
                    { id: "lotus4", name: "Lotus Corner", src: "/images/lotus4.png" },
                    { id: "ornament", name: "Gold Filigree", src: "/images/ornament.png" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => addImageElement(item.src, 28)}
                      className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 flex flex-col items-center gap-2 group transition-all"
                    >
                      <div className="w-14 h-14 flex items-center justify-center p-1 bg-black/20 rounded-lg">
                        <img
                          src={item.src}
                          alt={item.name}
                          className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform"
                        />
                      </div>
                      <span className="text-[10px] text-white/70 text-center font-medium truncate w-full">
                        {item.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* C. TEXT TAB */}
          {activeTab === "text" && (
            <div className="space-y-4 text-xs">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                  Add Wedding Typography
                </h3>
                <p className="text-[11px] text-white/50 mt-0.5">
                  Click to add new text blocks formatted with Indian wedding fonts.
                </p>
              </div>

              {/* Quick Text Add Buttons */}
              <div className="space-y-2">
                <button
                  onClick={() => addTextElement("॥ श्री गणेशाय नमः ॥", 16, "600", "'Cormorant Garamond', Georgia, serif")}
                  className="w-full p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left font-serif text-sm font-bold text-secondary"
                >
                  + Add Sacred Invocation
                </button>
                <button
                  onClick={() => addTextElement("Aarav & Ananya", 32, "bold", "'Playfair Display', Georgia, serif")}
                  className="w-full p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left font-display text-base font-bold text-white"
                >
                  + Add Couple Names Heading
                </button>
                <button
                  onClick={() => addTextElement("Together with their families cordially invite you", 12, "normal", "'Cormorant Garamond', Georgia, serif")}
                  className="w-full p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left text-xs italic text-white/80"
                >
                  + Add Host Invitation Line
                </button>
                <button
                  onClick={() => addTextElement("Shubh Vivah & Saat Phere", 14, "600", "'Montserrat', sans-serif")}
                  className="w-full p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left text-xs font-bold text-white/90"
                >
                  + Add Ceremony Title
                </button>
                <button
                  onClick={() => addTextElement("Thursday, November 26, 2026 | 11:30 AM", 12, "normal", "'Montserrat', sans-serif")}
                  className="w-full p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left text-xs text-white/70"
                >
                  + Add Date &amp; Timing
                </button>
                <button
                  onClick={() => addTextElement("The Royal Palace Heritage Lawns, Jaipur", 12, "normal", "'Montserrat', sans-serif")}
                  className="w-full p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left text-xs text-white/70"
                >
                  + Add Venue &amp; Address
                </button>
              </div>

              {/* Cultural Invocations Quick Insert */}
              <div className="pt-2 border-t border-white/10">
                <span className="text-[11px] font-bold text-white/70 block mb-2">
                  Cultural Invocations Presets:
                </span>
                <div className="space-y-1.5">
                  {INVOCATION_TEMPLATES.map((inv, idx) => (
                    <button
                      key={idx}
                      onClick={() => addTextElement(inv.text, 14, "600", "'Cormorant Garamond', Georgia, serif")}
                      className="w-full text-left p-2 rounded-lg bg-black/30 hover:bg-black/50 text-[10px] text-secondary font-medium truncate block border border-white/5"
                      title={inv.text}
                    >
                      {inv.label}: {inv.text}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* D. LAYERS TAB (Full layer stack management) */}
          {activeTab === "layers" && (
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                  Canvas Layers ({elements.length})
                </h3>
              </div>
              <p className="text-[10px] text-white/50">
                Click any layer to select it and open properties. Reorder layers to control z-index depth.
              </p>

              <div className="space-y-1.5 max-h-[50vh] overflow-y-auto pr-1">
                {[...elements].reverse().map((el) => {
                  const isSel = el.id === selectedId;
                  return (
                    <div
                      key={el.id}
                      onClick={() => setSelectedId(el.id)}
                      className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        isSel
                          ? "bg-secondary/20 border-secondary text-white"
                          : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        {el.type === "text" ? <Type size={13} /> : <ImageIcon size={13} />}
                        <span className="text-xs truncate font-medium">
                          {el.type === "text" ? el.text || "Text" : "PNG Motif"}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            moveLayer(el.id, "up");
                          }}
                          className="p-1 hover:text-secondary text-white/60"
                          title="Bring Forward"
                        >
                          <ArrowUp size={12} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            moveLayer(el.id, "down");
                          }}
                          className="p-1 hover:text-secondary text-white/60"
                          title="Send Backward"
                        >
                          <ArrowDown size={12} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteElement(el.id);
                          }}
                          className="p-1 hover:text-rose-400 text-white/60"
                          title="Delete Layer"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* E. PRESET TEMPLATES TAB (Canva / Pinterest Style: 2 for every category) */}
          {activeTab === "templates" && (
            <div className="space-y-4 text-xs">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                  Canva &amp; Pinterest Wedding Templates
                </h3>
                <p className="text-[11px] text-white/50 mt-0.5">
                  10 curated design templates. 2 for every tradition. 1-click apply to active page.
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-1.5 pb-1 border-b border-white/10">
                {(["All", "Hindu", "Muslim", "Sikh", "South Indian", "Christian"] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedPresetCategory(cat)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                      selectedPresetCategory === cat
                        ? "bg-secondary text-primary shadow-sm"
                        : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Preset Cards List */}
              <div className="space-y-3 max-h-[60vh] md:max-h-[500px] overflow-y-auto pr-1">
                {PRESET_TEMPLATES
                  .filter((tpl) => selectedPresetCategory === "All" || tpl.category === selectedPresetCategory)
                  .map((tpl) => (
                    <div
                      key={tpl.id}
                      className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all space-y-2 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-secondary/20 text-secondary border border-secondary/30">
                          {tpl.category}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span
                            className="w-4 h-4 rounded-full border border-white/20 inline-block shadow-sm"
                            style={{ backgroundColor: tpl.background.color }}
                            title="Background Color"
                          />
                          <span
                            className="w-4 h-4 rounded border border-white/20 inline-block shadow-sm"
                            style={{ borderColor: tpl.border.color }}
                            title="Border Style"
                          />
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold text-white group-hover:text-secondary transition-colors">
                          {tpl.name}
                        </h4>
                        <p className="text-[10px] text-white/60 leading-relaxed mt-0.5">
                          {tpl.description}
                        </p>
                      </div>

                      {/* Preview typography snippets */}
                      <div className="p-2 rounded-xl bg-black/30 border border-white/5 text-center">
                        <span className="text-[10px] text-white/50 block font-serif truncate">
                          {tpl.elements[0]?.text}
                        </span>
                        <span className="text-xs font-bold text-secondary block truncate mt-0.5">
                          {tpl.elements[2]?.text} {tpl.elements[3]?.text} {tpl.elements[4]?.text}
                        </span>
                      </div>

                      <button
                        onClick={() => handleApplyPreset(tpl)}
                        className="w-full py-2 rounded-xl bg-secondary/15 hover:bg-secondary text-secondary hover:text-primary font-bold text-[11px] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        <Sparkles size={12} />
                        <span>Apply Template to Page</span>
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* F. BORDERS & FRAMES TAB (Customizable Decorative Border Lines) */}
          {activeTab === "borders" && (
            <div className="space-y-4 text-xs">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                  Card Border Lines &amp; Frames
                </h3>
                <p className="text-[11px] text-white/50 mt-0.5">
                  Customize traditional gold &amp; royal wedding border frames.
                </p>
              </div>

              {/* 1. Border Style Selector */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-white/80 block">
                  Frame Style
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {BORDER_STYLES.map((bs) => {
                    const isSelected = border.style === bs.id;
                    return (
                      <button
                        key={bs.id}
                        onClick={() => setBorder((prev) => ({ ...prev, style: bs.id as any }))}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? "bg-secondary/20 border-secondary text-white font-bold shadow-sm"
                            : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <span className="text-xs font-semibold block truncate">
                          {bs.name}
                        </span>
                        <span className="text-[9px] text-white/40 block truncate mt-0.5">
                          {bs.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Border Color Picker */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <label className="text-[11px] font-bold text-white/80 block">
                  Border Line Color
                </label>
                <div className="grid grid-cols-6 gap-1.5">
                  {[
                    "#cba135", // Royal Gold
                    "#dfb76c", // Champagne Gold
                    "#e5c158", // Bright Gold
                    "#80182a", // Crimson
                    "#5b1424", // Royal Maroon
                    "#0f5132", // Emerald Green
                    "#16284f", // Sapphire Navy
                    "#803c4f", // Rose Gold
                    "#ffffff", // Pure White
                    "#f4ede1", // Cream Linen
                    "#2c2c2c", // Charcoal
                    "#e5d7bd", // Soft Pearl
                  ].map((hex) => (
                    <button
                      key={hex}
                      onClick={() => setBorder((prev) => ({ ...prev, color: hex }))}
                      style={{ backgroundColor: hex }}
                      className={`h-7 rounded-lg border transition-all cursor-pointer ${
                        border.color.toLowerCase() === hex.toLowerCase()
                          ? "ring-2 ring-secondary ring-offset-2 ring-offset-black scale-105"
                          : "border-white/20 hover:scale-105"
                      }`}
                      title={hex}
                    />
                  ))}
                </div>
              </div>

              {/* 3. Border Stroke Width */}
              <div className="space-y-1.5 pt-2 border-t border-white/10">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="font-bold text-white/80">Stroke Thickness</span>
                  <span className="font-mono text-white/60">{border.width}px</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="4"
                  step="1"
                  value={border.width}
                  onChange={(e) => setBorder((prev) => ({ ...prev, width: Number(e.target.value) }))}
                  className="w-full accent-secondary cursor-pointer"
                />
              </div>

              {/* 4. Border Inset / Padding */}
              <div className="space-y-1.5 pt-2 border-t border-white/10">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="font-bold text-white/80">Border Margin (Inset)</span>
                  <span className="font-mono text-white/60">{border.inset}px</span>
                </div>
                <input
                  type="range"
                  min="6"
                  max="24"
                  step="2"
                  value={border.inset}
                  onChange={(e) => setBorder((prev) => ({ ...prev, inset: Number(e.target.value) }))}
                  className="w-full accent-secondary cursor-pointer"
                />
              </div>

              {/* 5. Corner Accents Toggle */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-white block">Corner Star Accents (✦)</span>
                  <span className="text-[10px] text-white/50">Display decorative ornaments in all 4 corners</span>
                </div>
                <button
                  onClick={() => setBorder((prev) => ({ ...prev, showCorners: !prev.showCorners }))}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    border.showCorners ? "bg-secondary" : "bg-white/20"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${
                      border.showCorners ? "translate-x-5 bg-primary" : ""
                    }`}
                  />
                </button>
              </div>
            </div>
          )}

        </div>

        {/* 3. CENTER INTERACTIVE CANVAS WORKSPACE */}
        <div 
          className="flex-grow flex flex-col items-center justify-center p-2 sm:p-8 pb-24 md:pb-8 overflow-auto bg-[#101114] relative min-h-[500px]"
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onClick={(e) => {
            // Dismiss selection if clicking on outer canvas container backdrop
            if (e.target === e.currentTarget) {
              setSelectedId(null);
            }
          }}
        >
          {/* Mobile Floating Zoom Controls */}
          <div className="flex md:hidden items-center gap-1.5 bg-black/60 backdrop-blur-md rounded-full px-3 py-1 text-xs border border-white/15 shadow-md mb-2 shrink-0">
            <button 
              onClick={() => setZoomLevel((z) => Math.max(0.5, Number((z - 0.1).toFixed(1))))} 
              className="p-1 text-white/70 hover:text-white" 
              title="Zoom Out"
            >
              <ZoomOut size={13} />
            </button>
            <span className="text-[10px] font-mono px-1 text-white/90">{Math.round(zoomLevel * 100)}%</span>
            <button 
              onClick={() => setZoomLevel((z) => Math.min(1.4, Number((z + 0.1).toFixed(1))))} 
              className="p-1 text-white/70 hover:text-white" 
              title="Zoom In"
            >
              <ZoomIn size={13} />
            </button>
            <span className="text-white/20">|</span>
            <button 
              onClick={() => setZoomLevel(1)} 
              className="text-[10px] font-semibold text-secondary hover:underline px-1"
            >
              Reset
            </button>
          </div>

          {/* Multi-Page Controller Bar */}
          <div className="flex items-center justify-between w-[calc(100vw-32px)] max-w-[360px] sm:max-w-[420px] sm:w-[420px] mb-3 px-1 text-xs select-none shrink-0">
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-[200px] xs:max-w-[240px] sm:max-w-[300px] py-1">
              {pages.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setSelectedId(null);
                    setCurrentPageIndex(idx);
                  }}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all whitespace-nowrap cursor-pointer ${
                    currentPageIndex === idx
                      ? "bg-secondary text-primary shadow-md shadow-secondary/20"
                      : "bg-white/10 text-white/70 hover:text-white hover:bg-white/20"
                  }`}
                >
                  <span>Page {idx + 1}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={handleAddPage}
                className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer border border-white/15"
                title="Add new event page (e.g. Sangeet / Reception)"
              >
                <Plus size={12} />
                <span>Page</span>
              </button>

              <button
                onClick={handleDuplicatePage}
                className="p-1.5 rounded-full hover:bg-white/15 text-white/70 hover:text-white transition-colors cursor-pointer"
                title="Duplicate Current Page"
              >
                <Copy size={13} />
              </button>

              {pages.length > 1 && (
                <button
                  onClick={handleDeletePage}
                  className="p-1.5 rounded-full hover:bg-rose-500/20 text-rose-300 transition-colors cursor-pointer"
                  title="Delete Current Page"
                >
                  <Trash2 size={13} />
                </button>
              )}
            </div>
          </div>

          {/* Canvas Zoom Container */}
          <div
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: "center center" }}
            className="transition-transform duration-150"
          >
            {/* THE WEDDING CARD CANVAS (Standard 5x7 Aspect Ratio) */}
            <div
              ref={canvasRef}
              style={{
                backgroundColor: background.color,
              }}
              onClick={(e) => {
                // If user clicks directly on card background itself, deselect
                if (e.target === e.currentTarget) {
                  setSelectedId(null);
                }
              }}
              className="w-[calc(100vw-32px)] max-w-[360px] sm:max-w-[420px] sm:w-[420px] aspect-[1/1.42] rounded-2xl shadow-2xl relative overflow-hidden select-none border-2 border-stone-300"
            >
              {/* Background Layer with Live Blur and Opacity */}
              {background.imageUrl && (
                <div
                  style={{
                    backgroundImage: `url(${background.imageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: `blur(${background.blur}px)`,
                    opacity: background.opacity,
                  }}
                  className="absolute inset-0 pointer-events-none transform scale-105"
                />
              )}

              {/* Customizable Background Border & Frame Lines */}
              <RenderCardBorder border={border} />

              {/* RENDER ALL MOVABLE & RESIZABLE CANVAS ELEMENTS */}
              {elements.map((el) => {
                const isSelected = el.id === selectedId;

                return (
                  <div
                    key={el.id}
                    onPointerDown={(e) => handlePointerDown(e, el)}
                    style={{
                      left: `${el.x}%`,
                      top: `${el.y}%`,
                      transform: `translate(-50%, -50%) rotate(${el.rotation || 0}deg)`,
                      zIndex: el.zIndex,
                    }}
                    className={`absolute cursor-move transition-shadow ${
                      isSelected
                        ? "ring-2 ring-secondary ring-offset-2 ring-offset-black/20 rounded-md"
                        : "hover:outline hover:outline-1 hover:outline-secondary/60 rounded-sm"
                    }`}
                  >
                    {/* Render TEXT */}
                    {el.type === "text" && (
                      <div
                        style={{
                          fontSize: `${el.fontSize}px`,
                          fontFamily: el.fontFamily,
                          color: el.color,
                          textAlign: el.textAlign,
                          fontWeight: el.fontWeight,
                          fontStyle: el.fontStyle,
                          textDecoration: el.textDecoration || "none",
                          letterSpacing: `${el.letterSpacing || 0}px`,
                          lineHeight: el.lineHeight || 1.25,
                          textShadow: el.textShadow ? "0 2px 8px rgba(0,0,0,0.4)" : "none",
                        }}
                        className="px-2 py-1 whitespace-pre-wrap max-w-[340px]"
                      >
                        {el.text}
                      </div>
                    )}

                    {/* Render PNG / IMAGE MOTIF */}
                    {el.type === "image" && (
                      <div
                        style={{
                          width: `${(el.width || 30) * 3.6}px`,
                          opacity: el.opacity ?? 1,
                        }}
                        className="pointer-events-none p-1"
                      >
                        <img
                          src={el.src}
                          alt="Sticker"
                          crossOrigin="anonymous"
                          className="w-full h-auto object-contain"
                        />
                      </div>
                    )}

                    {/* Active Floating Action Pill */}
                    {isSelected && (
                      <>
                        <div
                          onPointerDown={(e) => e.stopPropagation()}
                          className="absolute -top-9 left-1/2 -translate-x-1/2 bg-[#212228] text-white border border-white/20 rounded-full px-2 py-1 flex items-center gap-1.5 shadow-xl text-[10px] whitespace-nowrap z-50"
                        >
                          <button
                            onClick={() => duplicateElement(el.id)}
                            className="p-1 hover:text-secondary text-white/80"
                            title="Duplicate"
                          >
                            <Copy size={12} />
                          </button>
                          <button
                            onClick={() => moveLayer(el.id, "top")}
                            className="p-1 hover:text-secondary text-white/80"
                            title="Bring to Front"
                          >
                            <ArrowUp size={12} />
                          </button>
                          <button
                            onClick={() => moveLayer(el.id, "bottom")}
                            className="p-1 hover:text-secondary text-white/80"
                            title="Send to Back"
                          >
                            <ArrowDown size={12} />
                          </button>
                          <button
                            onClick={() => deleteElement(el.id)}
                            className="p-1 hover:text-rose-400 text-white/80"
                            title="Delete"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>

                        {/* Interactive Resize Handle on Bottom-Right Corner */}
                        <div
                          onPointerDown={(e) => startResizing(e, el)}
                          className="absolute -bottom-2.5 -right-2.5 w-6 h-6 sm:w-4 sm:h-4 rounded-full bg-secondary text-primary border-2 border-white cursor-se-resize flex items-center justify-center shadow-md z-50 touch-none"
                          title="Drag to resize"
                        />
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 4. RIGHT INSPECTOR PROPERTY PANEL (Opens reliably when Element is Selected) */}
        {selectedElement && (
          <>
            {/* Mobile backdrop for inspector */}
            <div 
              className="fixed inset-0 bg-black/60 z-35 md:hidden backdrop-blur-xs"
              onClick={() => setSelectedId(null)}
            />
            <aside className="fixed md:static inset-x-0 bottom-[calc(4rem+env(safe-area-inset-bottom,0px))] md:bottom-auto z-40 max-h-[65vh] md:max-h-none md:w-80 bg-[#1f2026] rounded-t-3xl md:rounded-none shadow-2xl md:shadow-none border-t md:border-t-0 md:border-l border-white/15 p-4 overflow-y-auto text-xs space-y-4 flex flex-col shrink-0">
              <div className="flex items-center justify-between pb-2 border-b border-white/10 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-1 bg-white/30 rounded-full md:hidden" />
                  <span className="font-bold uppercase tracking-wider text-secondary flex items-center gap-1.5">
                    <Sliders size={13} />
                    <span>Element Properties</span>
                  </span>
                </div>
                <button
                  onClick={() => setSelectedId(null)}
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white/80 flex items-center justify-center transition-colors cursor-pointer"
                  title="Close Inspector Panel"
                >
                  <X size={15} />
                </button>
              </div>

            {/* If TEXT ELEMENT is Selected */}
            {selectedElement.type === "text" && (
              <div className="space-y-4">
                {/* Text Content Editor */}
                <div>
                  <label className="block text-[11px] font-bold text-white/80 mb-1">
                    Edit Text
                  </label>
                  <textarea
                    rows={2}
                    value={selectedElement.text || ""}
                    onChange={(e) => updateSelected({ text: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/20 text-white text-xs focus:outline-none focus:border-secondary resize-none"
                  />
                </div>

                {/* Font Family (Downloadable Luxury Google Fonts) */}
                <div>
                  <label className="block text-[11px] font-bold text-white/80 mb-1">
                    Font Style (Indian Wedding Google Fonts)
                  </label>
                  <select
                    value={selectedElement.fontFamily}
                    onChange={(e) => updateSelected({ fontFamily: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/20 text-white text-xs focus:outline-none focus:border-secondary cursor-pointer"
                  >
                    {FONTS.map((f) => (
                      <option key={f.id} value={f.value} style={{ fontFamily: f.value }}>
                        {f.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Font Size Slider */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[11px] font-bold text-white/80">
                      Font Size
                    </label>
                    <span className="font-mono text-white/60">{selectedElement.fontSize}px</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="64"
                    step="1"
                    value={selectedElement.fontSize || 16}
                    onChange={(e) => updateSelected({ fontSize: Number(e.target.value) })}
                    className="w-full accent-secondary cursor-pointer"
                  />
                </div>

                {/* Text Alignment & Formatting Toolbar */}
                <div>
                  <label className="block text-[11px] font-bold text-white/80 mb-1.5">
                    Formatting &amp; Alignment
                  </label>
                  <div className="grid grid-cols-4 gap-1.5 bg-black/30 p-1 rounded-xl border border-white/10">
                    <button
                      onClick={() =>
                        updateSelected({
                          fontWeight: selectedElement.fontWeight === "bold" ? "normal" : "bold",
                        })
                      }
                      className={`py-1 rounded-lg text-xs font-bold transition-colors ${
                        selectedElement.fontWeight === "bold"
                          ? "bg-secondary text-primary"
                          : "text-white/70 hover:text-white"
                      }`}
                      title="Bold"
                    >
                      B
                    </button>
                    <button
                      onClick={() =>
                        updateSelected({
                          fontStyle: selectedElement.fontStyle === "italic" ? "normal" : "italic",
                        })
                      }
                      className={`py-1 rounded-lg text-xs font-serif italic transition-colors ${
                        selectedElement.fontStyle === "italic"
                          ? "bg-secondary text-primary"
                          : "text-white/70 hover:text-white"
                      }`}
                      title="Italic"
                    >
                      I
                    </button>
                    <button
                      onClick={() =>
                        updateSelected({
                          textDecoration: selectedElement.textDecoration === "underline" ? "none" : "underline",
                        })
                      }
                      className={`py-1 rounded-lg text-xs underline transition-colors ${
                        selectedElement.textDecoration === "underline"
                          ? "bg-secondary text-primary"
                          : "text-white/70 hover:text-white"
                      }`}
                      title="Underline"
                    >
                      U
                    </button>
                    <button
                      onClick={() =>
                        updateSelected({
                          textShadow: !selectedElement.textShadow,
                        })
                      }
                      className={`py-1 rounded-lg text-[10px] font-semibold transition-colors ${
                        selectedElement.textShadow
                          ? "bg-secondary text-primary"
                          : "text-white/70 hover:text-white"
                      }`}
                      title="Soft Drop Shadow"
                    >
                      Shadow
                    </button>
                  </div>

                  {/* Alignment buttons */}
                  <div className="grid grid-cols-3 gap-1.5 mt-1.5">
                    {(["left", "center", "right"] as const).map((align) => (
                      <button
                        key={align}
                        onClick={() => updateSelected({ textAlign: align })}
                        className={`py-1 rounded-lg text-[11px] font-medium capitalize border transition-colors ${
                          selectedElement.textAlign === align
                            ? "bg-secondary text-primary border-secondary"
                            : "bg-white/5 border-white/10 text-white/70 hover:text-white"
                        }`}
                      >
                        {align}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Text Color Swatches & Picker */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-[11px] font-bold text-white/80">
                      Text Color
                    </label>
                    <span className="font-mono text-white/60 text-[10px] uppercase">
                      {selectedElement.color}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {LUXURY_COLORS.map((hex) => (
                      <button
                        key={hex}
                        onClick={() => updateSelected({ color: hex })}
                        style={{ backgroundColor: hex }}
                        className={`w-6 h-6 rounded-full border border-white/30 transition-transform ${
                          selectedElement.color === hex ? "scale-125 ring-2 ring-secondary" : "hover:scale-110"
                        }`}
                      />
                    ))}
                  </div>
                  <input
                    type="color"
                    value={selectedElement.color || "#5b1424"}
                    onChange={(e) => updateSelected({ color: e.target.value })}
                    className="w-full h-8 rounded-lg cursor-pointer bg-black/30 border border-white/20"
                  />
                </div>

                {/* Letter Spacing & Line Height */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-white/70 mb-1">
                      Letter Spacing
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="8"
                      step="1"
                      value={selectedElement.letterSpacing || 0}
                      onChange={(e) => updateSelected({ letterSpacing: Number(e.target.value) })}
                      className="w-full accent-secondary cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-white/70 mb-1">
                      Rotation ({selectedElement.rotation || 0}°)
                    </label>
                    <input
                      type="range"
                      min="-45"
                      max="45"
                      step="5"
                      value={selectedElement.rotation || 0}
                      onChange={(e) => updateSelected({ rotation: Number(e.target.value) })}
                      className="w-full accent-secondary cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* If PNG MOTIF is Selected */}
            {selectedElement.type === "image" && (
              <div className="space-y-4">
                {/* Size Slider */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[11px] font-bold text-white/80">
                      Motif Width
                    </label>
                    <span className="font-mono text-white/60">{selectedElement.width}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    step="2"
                    value={selectedElement.width || 30}
                    onChange={(e) => updateSelected({ width: Number(e.target.value) })}
                    className="w-full accent-secondary cursor-pointer"
                  />
                </div>

                {/* Opacity Slider */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[11px] font-bold text-white/80">
                      Motif Opacity
                    </label>
                    <span className="font-mono text-white/60">
                      {Math.round((selectedElement.opacity ?? 1) * 100)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.05"
                    value={selectedElement.opacity ?? 1}
                    onChange={(e) => updateSelected({ opacity: Number(e.target.value) })}
                    className="w-full accent-secondary cursor-pointer"
                  />
                </div>

                {/* Rotation */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[11px] font-bold text-white/80">
                      Rotation
                    </label>
                    <span className="font-mono text-white/60">{selectedElement.rotation || 0}°</span>
                  </div>
                  <input
                    type="range"
                    min="-180"
                    max="180"
                    step="5"
                    value={selectedElement.rotation || 0}
                    onChange={(e) => updateSelected({ rotation: Number(e.target.value) })}
                    className="w-full accent-secondary cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* Layer Depth Controls */}
            <div className="pt-2 border-t border-white/10 space-y-1.5">
              <span className="text-[11px] font-bold text-white/80 block mb-1">
                Layer Arrangement
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => moveLayer(selectedElement.id, "top")}
                  className="py-1.5 px-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-medium"
                >
                  Bring to Front
                </button>
                <button
                  onClick={() => moveLayer(selectedElement.id, "bottom")}
                  className="py-1.5 px-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-medium"
                >
                  Send to Back
                </button>
              </div>
              <button
                onClick={() => deleteElement(selectedElement.id)}
                className="w-full py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-bold text-xs flex items-center justify-center gap-1.5 border border-rose-500/30 mt-2 transition-all"
              >
                <Trash2 size={13} />
                <span>Delete Element</span>
              </button>
            </div>
          </aside>
        </>
      )}

      </div>

      {/* COMPREHENSIVE SEO CONTENT & FAQ SECTION FOR GOOGLE RANKING */}
      <section id="seo-guide" className="bg-[#121316] text-white border-t border-white/10 px-4 sm:px-8 py-16">
        <div className="max-w-5xl mx-auto space-y-16">

          {/* Section 1: Intro Header & Value Proposition */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-secondary/15 border border-secondary/30 text-secondary text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck size={14} />
              <span>100% Free Online Studio • No Watermarks • No Registration</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-wide">
              Create Free Wedding Invitation Card PDF Online
            </h2>
            <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto leading-relaxed">
              Design a royal Indian wedding invitation card in minutes. Personalize bride &amp; groom names, 
              ceremony timings, and religious blessings. Download high-resolution vector PDF and PNG ready for 
              printing or direct WhatsApp sharing.
            </p>
          </div>

          {/* Section 2: 3-Step How-To Guide */}
          <div className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-display font-bold text-secondary text-center">
              How to Create Your Free Wedding Invitation Card PDF in 3 Easy Steps
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Step 1 */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-secondary/20 text-secondary font-bold flex items-center justify-center text-lg border border-secondary/30">
                  1
                </div>
                <h4 className="font-bold text-base text-white">Choose or Upload Background</h4>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  Start with a plain luxury ivory paper texture, or paste any Pinterest image URL / upload a custom background photo. Apply live blur (0–20px) to make text stand out.
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-secondary/20 text-secondary font-bold flex items-center justify-center text-lg border border-secondary/30">
                  2
                </div>
                <h4 className="font-bold text-base text-white">Personalize Names &amp; Details</h4>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  Customize couple names, wedding dates, muhurtham timings, and venue address. Pick royal wedding fonts (Cormorant, Playfair, Rozha One) and traditional religious invocations.
                </p>
              </div>

              {/* Step 3 */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-secondary/20 text-secondary font-bold flex items-center justify-center text-lg border border-secondary/30">
                  3
                </div>
                <h4 className="font-bold text-base text-white">Download Free PDF &amp; Share</h4>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  Click &ldquo;Download PDF&rdquo; to export a print-ready vector A5 document for local printing presses, or &ldquo;Download Image&rdquo; for high-res instant WhatsApp sharing.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Feature Highlights */}
          <div className="p-8 rounded-2xl bg-[#18191d] border border-white/10 space-y-6">
            <h3 className="text-lg sm:text-xl font-display font-bold text-white text-center">
              Key Features of Our Free Wedding Card PDF Maker
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <FileText className="text-secondary" size={20} />
                <h5 className="font-semibold text-sm text-white">Print-Ready Vector PDF</h5>
                <p className="text-xs text-white/60">Standard A5 format (148x210mm) at commercial print resolution.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <Share2 className="text-secondary" size={20} />
                <h5 className="font-semibold text-sm text-white">Instant WhatsApp Sharing</h5>
                <p className="text-xs text-white/60">Download as PDF or 300 DPI PNG image ready to send to family groups.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <ImageIcon className="text-secondary" size={20} />
                <h5 className="font-semibold text-sm text-white">Pinterest Integration</h5>
                <p className="text-xs text-white/60">Paste any Pinterest pin link with instant background preview &amp; blur.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <ShieldCheck className="text-secondary" size={20} />
                <h5 className="font-semibold text-sm text-white">100% Free Forever</h5>
                <p className="text-xs text-white/60">No watermarks, no account registration, no hidden upgrade fees.</p>
              </div>
            </div>
          </div>

          {/* Section 4: Traditions Supported */}
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-display font-bold text-secondary text-center">
              Indian Wedding Traditions Supported
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <strong className="text-white block text-sm mb-1">Hindu Shubh Vivah</strong>
                <p className="text-white/60">Includes ॥ श्री गणेशाय नमः ॥, Radha Krishna shloks, Haldi, Mehendi, and Sangeet ceremony details.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <strong className="text-white block text-sm mb-1">Muslim Nikah &amp; Walima</strong>
                <p className="text-white/60">Includes Bismillah calligraphy, Islamic Quranic duas, and Walima banquet invitations.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <strong className="text-white block text-sm mb-1">Sikh Anand Karaj</strong>
                <p className="text-white/60">Features ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ ॥, Gurdwara Laavan timings, and Langar details.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <strong className="text-white block text-sm mb-1">South Indian Muhurtham</strong>
                <p className="text-white/60">Features ॥ शुभमस्तु ॥ invocations for Tamil, Telugu, Kannada, and Malayalam weddings.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <strong className="text-white block text-sm mb-1">Christian Holy Matrimony</strong>
                <p className="text-white/60">Features Church wedding service details, scripture verses, and reception announcements.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-center">
                <strong className="text-white block text-sm mb-1">Interactive Website Suites</strong>
                <p className="text-white/60">Want an interactive invitation with RSVP and Google Maps? Explore our complete suites.</p>
              </div>
            </div>
          </div>

          {/* Section 5: Frequently Asked Questions (FAQ) */}
          <div className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-display font-bold text-secondary text-center">
              Frequently Asked Questions (FAQ)
            </h3>
            <div className="space-y-4">
              {FAQS_LIST.map((faq, i) => (
                <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <h4 className="font-semibold text-sm sm:text-base text-white flex items-center gap-2">
                    <HelpCircle size={16} className="text-secondary shrink-0" />
                    <span>{faq.q}</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed pl-6">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Back-to-Canvas Action Banner */}
          <div className="p-8 rounded-2xl bg-gradient-to-r from-primary/30 to-secondary/20 border border-secondary/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <h4 className="text-lg font-bold text-white">Ready to create your wedding invitation?</h4>
              <p className="text-xs sm:text-sm text-white/70 mt-1">Scroll back up to customize your invitation on the live studio canvas.</p>
            </div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="px-6 py-2.5 rounded-full bg-secondary text-primary font-bold text-xs uppercase tracking-wider hover:bg-secondary/90 transition-all shadow-md shrink-0 cursor-pointer"
            >
              Back to Studio &uarr;
            </button>
          </div>

        </div>
      </section>
    </div>
  );
}

