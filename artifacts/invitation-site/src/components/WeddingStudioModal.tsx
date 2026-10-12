import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, Download, FileText, Image as ImageIcon, Send, Sparkles, 
  Check, RefreshCw, Palette, Type, Calendar, MapPin, Heart
} from "lucide-react";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import { type TemplateData } from "@/data/templates";
import { getWhatsAppLink } from "@/config/site";

interface WeddingStudioModalProps {
  template: TemplateData | null;
  isOpen: boolean;
  onClose: () => void;
}

const COLOR_THEMES = [
  { id: "Crimson", name: "Royal Crimson", primary: "#5b1424", accent: "#cba135", bg: "#fdfbf7" },
  { id: "Gold", name: "Imperial Gold", primary: "#825d16", accent: "#d4af37", bg: "#fffdf9" },
  { id: "Emerald", name: "Mughal Emerald", primary: "#0d4529", accent: "#dfb76c", bg: "#f9fcf9" },
  { id: "Navy", name: "Midnight Sapphire", primary: "#16284f", accent: "#d4af37", bg: "#f9faff" },
  { id: "Pastel", name: "Blush Rose", primary: "#803c4f", accent: "#c49750", bg: "#fffbfc" },
];

const FONT_OPTIONS = [
  { id: "font-serif", name: "Royal Cormorant", family: "'Cormorant Garamond', Georgia, serif" },
  { id: "font-display", name: "Classical Serif", family: "'Playfair Display', Georgia, serif" },
  { id: "font-sans", name: "Modern Minimalist", family: "'Montserrat', sans-serif" },
];

const INVOCATION_PRESETS: Record<string, string[]> = {
  Hindu: [
    "॥ श्री गणेशाय नमः ॥",
    "॥ ॐ श्री गणेशाय नमः ॥",
    "॥ शुभ विवाह ॥",
    "॥ ॐ नमो नारायणाय ॥",
  ],
  Muslim: [
    "In the Name of Allah, the Most Gracious, the Most Merciful",
    "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    "Bismillahir Rahmanir Rahim",
    "Blessed with Love, United by Grace",
  ],
  Sikh: [
    "ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ ॥",
    "Ik Onkar Satnaam",
    "Anand Karaj - Blissful Union",
  ],
  Christian: [
    "United in God's Holy Grace",
    "The Holy Matrimony",
    "Two Hearts, One Journey in Christ",
  ],
  "South Indian": [
    "॥ शुभमस्तु ॥ Divine Blessings",
    "॥ श्री रंगा ॥ Subha Muhurtham",
    "Subhamastu | Auspicious Wedding",
  ],
};

export function WeddingStudioModal({ template, isOpen, onClose }: WeddingStudioModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"content" | "style">("content");
  const [isExporting, setIsExporting] = useState<"image" | "pdf" | null>(null);

  // Editable fields with template defaults
  const [groomName, setGroomName] = useState("");
  const [brideName, setBrideName] = useState("");
  const [hostText, setHostText] = useState("");
  const [ceremony, setCeremony] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [venue, setVenue] = useState("");
  const [city, setCity] = useState("");
  const [invocation, setInvocation] = useState("");
  const [quote, setQuote] = useState("");
  const [selectedColor, setSelectedColor] = useState(COLOR_THEMES[0]);
  const [selectedFont, setSelectedFont] = useState(FONT_OPTIONS[0]);

  // Sync state whenever modal opens or template changes
  const prevTemplateId = useRef<string | null>(null);
  if (template && template.id !== prevTemplateId.current) {
    prevTemplateId.current = template.id;
    setGroomName(template.defaultText.groomName);
    setBrideName(template.defaultText.brideName);
    setHostText(template.defaultText.hostText);
    setCeremony(template.defaultText.ceremony);
    setDate(template.defaultText.date);
    setTime(template.defaultText.time);
    setVenue(template.defaultText.venue);
    setCity(template.defaultText.city);
    setInvocation(template.defaultText.invocation);
    setQuote(template.defaultText.quote || "");

    const matchedColor = COLOR_THEMES.find((c) => c.id === template.colorTheme) || COLOR_THEMES[0];
    setSelectedColor(matchedColor);
  }

  if (!isOpen || !template) return null;

  const base = import.meta.env.BASE_URL;
  const imageSrc = template.image ? `${base}${template.image}` : `${base}images/hero-couple.jpg`;

  // 1. Download as High-Res Image (PNG)
  const handleDownloadImage = async () => {
    if (!cardRef.current) return;
    try {
      setIsExporting("image");
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2.5, // Crisp 2.5x retina export
      });
      const link = document.createElement("a");
      const cleanName = `${groomName}-${brideName}-wedding-invitation`.toLowerCase().replace(/[^a-z0-9]/g, "-");
      link.download = `${cleanName}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to export image", err);
      alert("Unable to generate image. Please try again.");
    } finally {
      setIsExporting(null);
    }
  };

  // 2. Download as Print-Ready PDF
  const handleDownloadPdf = async () => {
    if (!cardRef.current) return;
    try {
      setIsExporting("pdf");
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2.5,
      });

      // Standard A5 portrait card in mm (148 x 210)
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a5",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
      const cleanName = `${groomName}-${brideName}-wedding-invitation`.toLowerCase().replace(/[^a-z0-9]/g, "-");
      pdf.save(`${cleanName}.pdf`);
    } catch (err) {
      console.error("Failed to export PDF", err);
      alert("Unable to generate PDF. Please try again.");
    } finally {
      setIsExporting(null);
    }
  };

  // WhatsApp share link
  const shareMessage = `*Wedding Invitation: ${groomName} & ${brideName}*\n\n${invocation}\n${hostText}\n\n*${ceremony}*\nDate: ${date}\nTime: ${time}\nVenue: ${venue}, ${city}\n\n"${quote}"\n\nDesigned with Vows & Knots: https://indian-wedding-suite-api-server.vercel.app/`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-6xl max-h-[95vh] flex flex-col bg-[#fbf9f5] rounded-3xl shadow-2xl border border-secondary/40 z-10 overflow-hidden"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 py-3.5 bg-primary text-primary-foreground border-b border-primary/20 shrink-0">
            <div className="flex items-center gap-3">
              <span className="p-1 rounded-full bg-secondary/20 text-secondary">
                <Sparkles size={16} />
              </span>
              <div>
                <h3 className="text-sm font-bold tracking-wide text-secondary">
                  Wedding Invitation Studio
                </h3>
                <p className="text-[11px] text-primary-foreground/70">
                  Canva-Style Customizer • Real-Time PDF &amp; Image Download
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-white/10 text-primary-foreground/80 hover:text-white transition-colors"
                aria-label="Close Studio"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Main Studio Body: 2 Columns */}
          <div className="flex-grow overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* LEFT: Live Interactive Card Canvas (7 cols on lg) */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center">
              <div className="w-full flex items-center justify-between mb-3 px-1">
                <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live Card Canvas (Auto-Updating)
                </span>
                <span className="text-xs text-muted-foreground">
                  Ready for Print &amp; WhatsApp
                </span>
              </div>

              {/* The Actual Downloadable Card Container */}
              <div
                ref={cardRef}
                style={{
                  backgroundColor: selectedColor.bg,
                  fontFamily: selectedFont.family,
                }}
                className="w-full max-w-md mx-auto aspect-[1/1.42] rounded-2xl shadow-xl border-4 p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden select-none transition-all duration-300"
              >
                {/* Ornate Outer Filigree Border */}
                <div
                  style={{ borderColor: selectedColor.accent }}
                  className="absolute inset-2 sm:inset-3 rounded-xl border-2 pointer-events-none opacity-50 border-dashed"
                />
                <div
                  style={{ borderColor: selectedColor.accent }}
                  className="absolute inset-3 sm:inset-4 rounded-lg border pointer-events-none opacity-40"
                />

                {/* Top Section: Invocation & Artwork */}
                <div className="relative z-10 text-center space-y-2">
                  <p
                    style={{ color: selectedColor.accent }}
                    className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase line-clamp-1"
                  >
                    {invocation}
                  </p>

                  {/* Clean Faceless Artwork Image */}
                  <div className="relative w-full aspect-[16/8] rounded-xl overflow-hidden shadow-inner bg-stone-100 border border-stone-200/60">
                    <img
                      src={imageSrc}
                      alt="Ceremony Artwork"
                      crossOrigin="anonymous"
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Middle Section: Host Text & Grand Couple Names */}
                <div className="relative z-10 text-center space-y-1.5 my-auto py-2">
                  <p className="text-[10px] sm:text-[11px] text-stone-600 italic max-w-xs mx-auto leading-relaxed">
                    {hostText}
                  </p>

                  {/* Groom & Bride Names */}
                  <div className="py-1">
                    <h2
                      style={{ color: selectedColor.primary }}
                      className="text-2xl sm:text-3xl font-bold tracking-tight leading-none"
                    >
                      {groomName}
                    </h2>
                    <span
                      style={{ color: selectedColor.accent }}
                      className="text-sm sm:text-base font-serif italic my-0.5 inline-block opacity-80"
                    >
                      &amp;
                    </span>
                    <h2
                      style={{ color: selectedColor.primary }}
                      className="text-2xl sm:text-3xl font-bold tracking-tight leading-none"
                    >
                      {brideName}
                    </h2>
                  </div>

                  {/* Divider line */}
                  <div
                    style={{ backgroundColor: selectedColor.accent }}
                    className="w-20 h-0.5 mx-auto opacity-60 my-1"
                  />

                  {/* Ceremony Name */}
                  <p
                    style={{ color: selectedColor.primary }}
                    className="text-xs sm:text-sm font-bold tracking-wide uppercase"
                  >
                    {ceremony}
                  </p>
                </div>

                {/* Bottom Section: Date, Time, Venue, City */}
                <div className="relative z-10 text-center space-y-1 pt-2 border-t border-stone-200">
                  <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold text-stone-800">
                    <Calendar size={13} style={{ color: selectedColor.accent }} />
                    <span>{date}</span>
                  </div>

                  <p className="text-[11px] font-medium text-stone-600">
                    {time}
                  </p>

                  <div className="flex items-center justify-center gap-1 text-[11px] sm:text-xs text-stone-700 font-medium">
                    <MapPin size={12} style={{ color: selectedColor.primary }} />
                    <span>{venue}, {city}</span>
                  </div>

                  {quote && (
                    <p className="text-[9px] sm:text-[10px] text-stone-500 italic max-w-xs mx-auto pt-1 line-clamp-2">
                      "{quote}"
                    </p>
                  )}
                </div>
              </div>

              {/* Instant Download Action Buttons Under Canvas */}
              <div className="w-full max-w-md mt-4 grid grid-cols-2 gap-3">
                <button
                  onClick={handleDownloadPdf}
                  disabled={isExporting !== null}
                  className="py-3 px-4 rounded-2xl bg-primary hover:bg-primary/95 text-primary-foreground font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98] disabled:opacity-50"
                >
                  {isExporting === "pdf" ? (
                    <RefreshCw size={16} className="animate-spin" />
                  ) : (
                    <FileText size={16} />
                  )}
                  <span>Download as PDF</span>
                </button>

                <button
                  onClick={handleDownloadImage}
                  disabled={isExporting !== null}
                  className="py-3 px-4 rounded-2xl bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98] disabled:opacity-50"
                >
                  {isExporting === "image" ? (
                    <RefreshCw size={16} className="animate-spin" />
                  ) : (
                    <ImageIcon size={16} />
                  )}
                  <span>Download as Image</span>
                </button>
              </div>
            </div>

            {/* RIGHT: Canva-Style Control Panel (5 cols on lg) */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-border shadow-sm space-y-5">
              {/* Tabs: Content vs Style */}
              <div className="flex bg-muted p-1 rounded-xl">
                <button
                  onClick={() => setActiveTab("content")}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                    activeTab === "content"
                      ? "bg-white text-primary shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Wedding Details
                </button>
                <button
                  onClick={() => setActiveTab("style")}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                    activeTab === "style"
                      ? "bg-white text-primary shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Color &amp; Typography
                </button>
              </div>

              {activeTab === "content" ? (
                /* CONTENT FORM FIELDS */
                <div className="space-y-4 max-h-[58vh] overflow-y-auto pr-1 text-xs">
                  {/* Groom & Bride */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-foreground mb-1">
                        Groom's Name
                      </label>
                      <input
                        type="text"
                        value={groomName}
                        onChange={(e) => setGroomName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-border bg-stone-50/50 text-foreground focus:outline-none focus:border-primary text-xs"
                        placeholder="e.g. Aarav Sharma"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-foreground mb-1">
                        Bride's Name
                      </label>
                      <input
                        type="text"
                        value={brideName}
                        onChange={(e) => setBrideName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-border bg-stone-50/50 text-foreground focus:outline-none focus:border-primary text-xs"
                        placeholder="e.g. Ananya Verma"
                      />
                    </div>
                  </div>

                  {/* Sacred Invocation & Presets */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-[11px] font-bold text-foreground">
                        Sacred Greeting / Invocations
                      </label>
                      <span className="text-[10px] text-muted-foreground">
                        Tradition: {template.category}
                      </span>
                    </div>
                    <input
                      type="text"
                      value={invocation}
                      onChange={(e) => setInvocation(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-border bg-stone-50/50 text-foreground focus:outline-none focus:border-primary text-xs mb-1.5"
                    />
                    {/* Preset chips */}
                    <div className="flex flex-wrap gap-1.5">
                      {(INVOCATION_PRESETS[template.category] || []).map((preset, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setInvocation(preset)}
                          className="text-[10px] bg-stone-100 hover:bg-stone-200 px-2 py-0.5 rounded text-stone-700 truncate max-w-[200px]"
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Host / Family Announcement */}
                  <div>
                    <label className="block text-[11px] font-bold text-foreground mb-1">
                      Host &amp; Family Invitation Text
                    </label>
                    <textarea
                      rows={2}
                      value={hostText}
                      onChange={(e) => setHostText(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-border bg-stone-50/50 text-foreground focus:outline-none focus:border-primary text-xs resize-none"
                      placeholder="e.g. Mr. & Mrs. Sharma cordially invite you..."
                    />
                  </div>

                  {/* Ceremony & Timings */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-foreground mb-1">
                        Ceremony Name
                      </label>
                      <input
                        type="text"
                        value={ceremony}
                        onChange={(e) => setCeremony(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-border bg-stone-50/50 text-foreground focus:outline-none focus:border-primary text-xs"
                        placeholder="e.g. Shubh Vivah & Phere"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-foreground mb-1">
                        Time / Muhurtham
                      </label>
                      <input
                        type="text"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-border bg-stone-50/50 text-foreground focus:outline-none focus:border-primary text-xs"
                        placeholder="e.g. 11:30 AM Muhurtham"
                      />
                    </div>
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-[11px] font-bold text-foreground mb-1">
                      Wedding Date
                    </label>
                    <input
                      type="text"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-border bg-stone-50/50 text-foreground focus:outline-none focus:border-primary text-xs"
                      placeholder="e.g. Thursday, November 26, 2026"
                    />
                  </div>

                  {/* Venue & City */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-foreground mb-1">
                        Venue Name
                      </label>
                      <input
                        type="text"
                        value={venue}
                        onChange={(e) => setVenue(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-border bg-stone-50/50 text-foreground focus:outline-none focus:border-primary text-xs"
                        placeholder="e.g. Grand Royal Palace"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-foreground mb-1">
                        City / State
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-border bg-stone-50/50 text-foreground focus:outline-none focus:border-primary text-xs"
                        placeholder="e.g. Jaipur, Rajasthan"
                      />
                    </div>
                  </div>

                  {/* Quote / Shloka */}
                  <div>
                    <label className="block text-[11px] font-bold text-foreground mb-1">
                      Meaningful Quote / Blessing (Optional)
                    </label>
                    <input
                      type="text"
                      value={quote}
                      onChange={(e) => setQuote(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-border bg-stone-50/50 text-foreground focus:outline-none focus:border-primary text-xs"
                      placeholder="e.g. Seven vows, one eternal bond"
                    />
                  </div>
                </div>
              ) : (
                /* STYLE & PALETTE CONTROLS */
                <div className="space-y-6 text-xs">
                  {/* Color Palettes */}
                  <div>
                    <label className="block text-xs font-bold text-foreground mb-3 flex items-center gap-1.5">
                      <Palette size={14} className="text-secondary" />
                      <span>Select Luxury Color Palette</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {COLOR_THEMES.map((theme) => (
                        <button
                          key={theme.id}
                          onClick={() => setSelectedColor(theme)}
                          className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all text-left ${
                            selectedColor.id === theme.id
                              ? "border-primary bg-primary/5 shadow-sm"
                              : "border-border hover:bg-stone-50"
                          }`}
                        >
                          <div className="flex gap-1 shrink-0">
                            <span
                              style={{ backgroundColor: theme.primary }}
                              className="w-4 h-4 rounded-full border border-black/10 shadow-sm"
                            />
                            <span
                              style={{ backgroundColor: theme.accent }}
                              className="w-4 h-4 rounded-full border border-black/10 shadow-sm"
                            />
                          </div>
                          <span className="font-medium text-xs text-foreground truncate">
                            {theme.name}
                          </span>
                          {selectedColor.id === theme.id && (
                            <Check size={14} className="ml-auto text-primary shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Font Typography Selector */}
                  <div>
                    <label className="block text-xs font-bold text-foreground mb-3 flex items-center gap-1.5">
                      <Type size={14} className="text-secondary" />
                      <span>Invitation Typography</span>
                    </label>
                    <div className="space-y-2">
                      {FONT_OPTIONS.map((font) => (
                        <button
                          key={font.id}
                          onClick={() => setSelectedFont(font)}
                          className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                            selectedFont.id === font.id
                              ? "border-primary bg-primary/5 shadow-sm"
                              : "border-border hover:bg-stone-50"
                          }`}
                        >
                          <div>
                            <span className="font-semibold text-xs text-foreground block">
                              {font.name}
                            </span>
                            <span
                              style={{ fontFamily: font.family }}
                              className="text-sm text-muted-foreground"
                            >
                              {groomName} &amp; {brideName}
                            </span>
                          </div>
                          {selectedFont.id === font.id && (
                            <Check size={15} className="text-primary" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom WhatsApp Share & Order Assistance */}
              <div className="pt-4 border-t border-border space-y-2">
                <a
                  href={getWhatsAppLink(shareMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <Send size={14} />
                  <span>Send Preview to Guests on WhatsApp</span>
                </a>

                <p className="text-[10px] text-muted-foreground text-center">
                  Need custom illustrations, background music, or full interactive websites? Connect with our master designers on WhatsApp.
                </p>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
