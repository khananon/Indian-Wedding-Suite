import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, ArrowUpRight, Volume2, VolumeX, Sparkles, MapPin, 
  Calendar, RotateCcw, Smartphone, Wifi, Battery, 
  ExternalLink, Loader2, Music, Check
} from "lucide-react";
import { Link } from "wouter";
import { type Template } from "@/hooks/use-templates";

interface PhonePreviewModalProps {
  template: Template | null;
  isOpen: boolean;
  onClose: () => void;
}

// Standard iPhone 15/16 Pro viewport dimensions
const PHONE_WIDTH = 390;
const PHONE_HEIGHT = 844;

export function PhonePreviewModal({ template, isOpen, onClose }: PhonePreviewModalProps) {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [scale, setScale] = useState(0.72);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const [viewMode, setViewMode] = useState<"chassis" | "native">("native");
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect mobile viewport and dynamically compute scale for chassis mode
  useEffect(() => {
    if (!isOpen) return;

    const handleResize = () => {
      const isMobile = window.innerWidth < 640;
      setIsMobileScreen(isMobile);

      if (!containerRef.current) return;
      const availableHeight = containerRef.current.clientHeight - 16;
      const availableWidth = containerRef.current.clientWidth - 16;

      const totalFrameWidth = PHONE_WIDTH + 24;
      const totalFrameHeight = PHONE_HEIGHT + 24;

      const scaleH = availableHeight / totalFrameHeight;
      const scaleW = availableWidth / totalFrameWidth;
      const computedScale = Math.min(1, Math.min(scaleH, scaleW));

      setScale(Math.max(0.5, Math.min(0.88, computedScale)));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setIframeLoaded(false);
      setIframeKey((prev) => prev + 1);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, template?.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen || !template) return null;

  const base = import.meta.env.BASE_URL;
  const imageSrc = template.image ? `${base}${template.image}` : null;
  const hasLiveLink = Boolean(template.link && template.link.startsWith("http"));

  const handleRefresh = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIframeLoaded(false);
    setIframeKey((prev) => prev + 1);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 overflow-hidden">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 bg-stone-950/80 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Modal Container — Fullscreen on phone, elegant centered card on desktop */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-full sm:h-[92vh] sm:max-h-[880px] sm:max-w-[560px] bg-[#FAF8F5] rounded-none sm:rounded-[32px] p-3 sm:p-6 shadow-2xl border-0 sm:border border-stone-200/80 z-10 flex flex-col justify-between"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Bar / Header */}
          <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-stone-200/70 shrink-0">
            <div className="flex-1 min-w-0 pr-2">
              <div className="flex items-center gap-2">
                <h3 className="font-display text-lg sm:text-2xl font-bold text-stone-900 tracking-tight leading-snug truncate">
                  {template.name}
                </h3>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-stone-900 text-stone-100">
                  <Smartphone size={10} />
                  <span>390 &times; 844</span>
                </span>
              </div>
              <p className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold truncate mt-0.5">
                {template.isWebsite ? "Interactive Wedding Website" : "Retina Digital Invitation"} &bull; Live Preview
              </p>
            </div>

            {/* Controls (Reload, View Mode Toggle, Close) */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Desktop View Switcher */}
              <div className="hidden sm:flex items-center bg-stone-200/80 p-0.5 rounded-full text-[10px] font-bold">
                <button
                  onClick={() => setViewMode("native")}
                  className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                    viewMode === "native" ? "bg-stone-900 text-white shadow-xs" : "text-stone-600 hover:text-stone-900"
                  }`}
                  title="Edge to Edge View"
                >
                  Full View
                </button>
                <button
                  onClick={() => setViewMode("chassis")}
                  className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                    viewMode === "chassis" ? "bg-stone-900 text-white shadow-xs" : "text-stone-600 hover:text-stone-900"
                  }`}
                  title="Phone Chassis Mockup"
                >
                  iPhone Frame
                </button>
              </div>

              {hasLiveLink && (
                <button
                  onClick={handleRefresh}
                  className="w-8 h-8 rounded-full bg-stone-200/70 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors cursor-pointer"
                  title="Reload website"
                >
                  <RotateCcw size={14} />
                </button>
              )}

              {hasLiveLink && (
                <a
                  href={template.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-stone-200/70 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors"
                  title="Open in new browser tab"
                >
                  <ExternalLink size={14} />
                </a>
              )}

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-stone-900 text-stone-100 hover:bg-stone-800 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close preview"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Center Phone Emulator Viewport */}
          <div 
            ref={containerRef}
            className="relative flex-1 w-full flex items-center justify-center overflow-hidden my-1.5 sm:my-2"
          >
            {/* 1. NATIVE EDGE-TO-EDGE VIEW (Default on phones, zero miniaturization, 100% readable) */}
            {(isMobileScreen || viewMode === "native") ? (
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-white shadow-md border border-stone-200 flex flex-col">
                {hasLiveLink ? (
                  <>
                    {!iframeLoaded && (
                      <div className="absolute inset-0 bg-[#FAF8F5] flex flex-col items-center justify-center gap-3 z-20 p-8 text-center">
                        <Loader2 className="w-8 h-8 text-stone-800 animate-spin" />
                        <span className="text-sm font-bold text-stone-800 font-display">
                          Loading Live Interactive Website...
                        </span>
                        <span className="text-xs text-stone-500 max-w-[240px] leading-relaxed">
                          Opening full mobile layout with live RSVP and ceremonial audio
                        </span>
                      </div>
                    )}
                    <iframe
                      key={iframeKey}
                      src={template.link}
                      title={`${template.name} Live Wedding Website Preview`}
                      className="w-full h-full border-0"
                      onLoad={() => setIframeLoaded(true)}
                      sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                    />
                  </>
                ) : (
                  /* High-End Mobile Invitation Screen */
                  <div className="relative w-full h-full overflow-y-auto bg-gradient-to-b from-[#FAF7F2] via-[#F4EDE2] to-[#FAF7F2] p-5 pt-8 flex flex-col items-center justify-between text-center select-none">
                    {imageSrc && (
                      <div className="absolute inset-0 z-0">
                        <img
                          src={imageSrc}
                          alt={template.name}
                          className="w-full h-full object-cover object-top opacity-50"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/85 to-transparent" />
                      </div>
                    )}

                    <div className="relative z-10 pt-2 px-3">
                      <span className="text-[11px] tracking-[0.25em] uppercase font-bold text-amber-900 block mb-1">
                        {template.defaultText?.invocation || "॥ श्री गणेशाय नमः ॥"}
                      </span>
                      <h4 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
                        {template.defaultText?.groomName}
                        <span className="block text-xl font-light text-amber-800 font-serif my-1">&amp;</span>
                        {template.defaultText?.brideName}
                      </h4>
                      <p className="text-xs text-stone-600 mt-2 max-w-[260px] mx-auto italic font-serif leading-relaxed">
                        {template.defaultText?.hostText}
                      </p>
                    </div>

                    <div className="relative z-10 my-4 flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#A88B57] text-white flex items-center justify-center shadow-xl border-2 border-amber-200/80 mb-2 cursor-pointer hover:scale-105 transition-transform">
                        <Sparkles size={24} className="text-amber-100" />
                      </div>
                      <span className="text-[10px] tracking-wider uppercase bg-stone-900/90 text-white px-3.5 py-1 rounded-full backdrop-blur-md font-semibold shadow-md">
                        Tap To Open Invitation
                      </span>
                    </div>

                    <div className="relative z-10 w-full max-w-sm space-y-2 mb-2">
                      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-stone-200/80 shadow-sm text-left">
                        <div className="flex items-center gap-2.5 text-stone-900 text-xs font-bold mb-1.5">
                          <Calendar size={14} className="text-amber-700 shrink-0" />
                          <span>{template.defaultText?.date}</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-stone-600 text-xs">
                          <MapPin size={14} className="text-amber-700 shrink-0" />
                          <span className="truncate">{template.defaultText?.venue}, {template.defaultText?.city}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between px-2 text-[10px] text-stone-500 font-medium">
                        <span>Google Maps Directions</span>
                        <span>WhatsApp RSVP</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* 2. CHASSIS EMULATOR VIEW (For desktop users who want the realistic iPhone mockup) */
              <div 
                style={{
                  width: PHONE_WIDTH + 24,
                  height: PHONE_HEIGHT + 24,
                  transform: `scale(${scale})`,
                  transformOrigin: "center center",
                }}
                className="relative shrink-0 select-none transition-transform duration-200"
              >
                {/* Hardware Buttons */}
                <div className="absolute -left-[5px] top-[115px] w-[5px] h-[28px] bg-stone-700 rounded-l-md shadow-sm" />
                <div className="absolute -left-[5px] top-[165px] w-[5px] h-[48px] bg-stone-700 rounded-l-md shadow-sm" />
                <div className="absolute -left-[5px] top-[225px] w-[5px] h-[48px] bg-stone-700 rounded-l-md shadow-sm" />
                <div className="absolute -right-[5px] top-[170px] w-[5px] h-[70px] bg-stone-700 rounded-r-md shadow-sm" />

                {/* Titanium Phone Chassis */}
                <div className="relative w-full h-full rounded-[52px] p-[12px] bg-gradient-to-b from-[#3A393E] via-[#1F1E22] to-[#3A393E] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.18)] flex flex-col">
                  <div className="relative w-full h-full rounded-[42px] bg-black p-[2px] overflow-hidden flex flex-col">
                    <div 
                      style={{ width: PHONE_WIDTH, height: PHONE_HEIGHT }}
                      className="relative w-full h-full bg-[#FAF8F5] rounded-[40px] overflow-hidden flex flex-col"
                    >
                      {/* iOS Status Bar */}
                      <div className="absolute top-0 inset-x-0 h-[46px] z-40 px-7 flex items-center justify-between pointer-events-none text-stone-900 select-none">
                        <span className="text-xs font-semibold tracking-tight text-stone-900/90 font-sans pl-1">
                          9:41
                        </span>
                        <div className="flex items-center gap-1.5 text-stone-900/90 pr-1">
                          <div className="flex items-end gap-0.5 h-3">
                            <span className="w-0.5 h-1 bg-stone-900 rounded-full" />
                            <span className="w-0.5 h-1.5 bg-stone-900 rounded-full" />
                            <span className="w-0.5 h-2 bg-stone-900 rounded-full" />
                            <span className="w-0.5 h-2.5 bg-stone-900 rounded-full" />
                          </div>
                          <Wifi size={12} className="text-stone-900" />
                          <div className="w-5 h-2.5 rounded-[4px] border border-stone-900 p-0.5 flex items-center">
                            <div className="w-full h-full bg-stone-900 rounded-[2px]" />
                          </div>
                        </div>
                      </div>

                      {/* Dynamic Island */}
                      <div className="absolute top-[11px] left-1/2 -translate-x-1/2 z-40 w-[116px] h-[32px] bg-black rounded-full shadow-md flex items-center justify-between px-3 pointer-events-none">
                        <div className="w-3 h-3 rounded-full bg-[#0D1017] border border-[#1C202B] flex items-center justify-center">
                          <div className="w-1 h-1 rounded-full bg-[#182B49]" />
                        </div>
                        <div className="w-2.5 h-2.5 rounded-full bg-[#0A0C10]" />
                      </div>

                      {/* Screen Content */}
                      <div className="relative flex-1 w-full h-full overflow-hidden">
                        {hasLiveLink ? (
                          <>
                            {!iframeLoaded && (
                              <div className="absolute inset-0 bg-[#FAF8F5] flex flex-col items-center justify-center gap-3 z-20 p-8 text-center">
                                <Loader2 className="w-8 h-8 text-stone-800 animate-spin" />
                                <span className="text-sm font-bold text-stone-800 font-display">
                                  Initializing Live Website...
                                </span>
                              </div>
                            )}
                            <iframe
                              key={iframeKey}
                              src={template.link}
                              title={`${template.name} Live Wedding Website Preview`}
                              className="w-full h-full border-0"
                              style={{ width: `${PHONE_WIDTH}px`, height: `${PHONE_HEIGHT}px` }}
                              onLoad={() => setIframeLoaded(true)}
                              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                            />
                          </>
                        ) : (
                          <div className="relative w-full h-full overflow-y-auto bg-gradient-to-b from-[#FAF7F2] via-[#F4EDE2] to-[#FAF7F2] p-5 pt-16 flex flex-col items-center justify-between text-center select-none">
                            {imageSrc && (
                              <div className="absolute inset-0 z-0">
                                <img
                                  src={imageSrc}
                                  alt={template.name}
                                  className="w-full h-full object-cover object-top opacity-50"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/85 to-transparent" />
                              </div>
                            )}

                            <div className="relative z-10 pt-4 px-3">
                              <span className="text-[11px] tracking-[0.25em] uppercase font-bold text-amber-900 block mb-1">
                                {template.defaultText?.invocation || "॥ श्री गणेशाय नमः ॥"}
                              </span>
                              <h4 className="font-display text-3xl font-bold text-stone-900 leading-tight">
                                {template.defaultText?.groomName}
                                <span className="block text-xl font-light text-amber-800 font-serif my-1">&amp;</span>
                                {template.defaultText?.brideName}
                              </h4>
                              <p className="text-xs text-stone-600 mt-2 max-w-[240px] mx-auto italic font-serif leading-relaxed">
                                {template.defaultText?.hostText}
                              </p>
                            </div>

                            <div className="relative z-10 my-4 flex flex-col items-center">
                              <div className="w-18 h-18 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#A88B57] text-white flex items-center justify-center shadow-xl border-2 border-amber-200/80 mb-2 cursor-pointer hover:scale-105 transition-transform">
                                <Sparkles size={28} className="text-amber-100" />
                              </div>
                              <span className="text-[11px] tracking-wider uppercase bg-stone-900/90 text-white px-4 py-1.5 rounded-full backdrop-blur-md font-semibold shadow-md">
                                Tap To Open Invitation
                              </span>
                            </div>

                            <div className="relative z-10 w-full space-y-2 mb-6">
                              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-stone-200/80 shadow-sm text-left">
                                <div className="flex items-center gap-2.5 text-stone-900 text-xs font-bold mb-1.5">
                                  <Calendar size={14} className="text-amber-700 shrink-0" />
                                  <span>{template.defaultText?.date}</span>
                                </div>
                                <div className="flex items-center gap-2.5 text-stone-600 text-xs">
                                  <MapPin size={14} className="text-amber-700 shrink-0" />
                                  <span className="truncate">{template.defaultText?.venue}, {template.defaultText?.city}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* iOS Bottom Home Bar Indicator */}
                        <div className="absolute bottom-2 inset-x-0 z-40 flex justify-center pointer-events-none">
                          <div className="w-[134px] h-[5px] bg-stone-900/50 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Modal Bottom Action Bar — with safe area padding for phones */}
          <div className="flex items-center justify-between pt-2.5 sm:pt-3 border-t border-stone-200/70 shrink-0 gap-3 pb-[max(0.25rem,env(safe-area-inset-bottom))]">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-xl sm:text-2xl font-bold text-stone-900">
                ₹{template.price.toLocaleString("en-IN")}
              </span>
              {template.originalPrice && (
                <span className="text-xs text-stone-400 line-through">
                  ₹{template.originalPrice.toLocaleString("en-IN")}
                </span>
              )}
              <span className="text-[10px] text-stone-500 hidden xs:inline uppercase tracking-wider font-semibold">
                &bull; Full Suite
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Link href={`/contact?template=${template.id}`}>
                <button
                  onClick={onClose}
                  className="px-5 sm:px-6 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Select Suite</span>
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
