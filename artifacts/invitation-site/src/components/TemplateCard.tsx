import { useState } from "react";
import { Link } from "wouter";
import { Eye, ArrowUpRight, Check, Sparkles, Smartphone } from "lucide-react";
import { type Template } from "@/hooks/use-templates";
import { PhonePreviewModal } from "./PhonePreviewModal";

interface TemplateCardProps {
  template: Template;
  onPreview?: (template: Template) => void;
}

export function TemplateCard({ template, onPreview }: TemplateCardProps) {
  const [isLocalModalOpen, setIsLocalModalOpen] = useState(false);
  const base = import.meta.env.BASE_URL;

  const handleOpenPreview = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onPreview) {
      onPreview(template);
    } else {
      setIsLocalModalOpen(true);
    }
  };

  return (
    <>
      <div 
        onClick={handleOpenPreview}
        className="group relative bg-white rounded-2xl overflow-hidden border border-stone-200/80 hover:border-amber-400/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
      >
        {/* Card Image Area */}
        <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
          {template.image ? (
            <img
              src={`${base}${template.image}`}
              alt={`${template.name} - ${template.subtitle || "Wedding Invitation Suite"}`}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50/60 via-stone-100 to-rose-50/50 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-full h-full border border-amber-300/40 rounded-xl p-4 flex flex-col items-center justify-center">
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-amber-800/70 mb-2">
                  {template.collection || "Wedding Suite"}
                </span>
                <h4 className="font-display text-lg font-bold text-stone-900 leading-snug">
                  {template.name}
                </h4>
                <span className="text-xs text-stone-500 mt-2 font-serif italic">
                  {template.subtitle}
                </span>
              </div>
            </div>
          )}

          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
            {template.isWebsite ? (
              <span className="bg-stone-950/85 text-amber-200 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md backdrop-blur-md border border-amber-400/30 flex items-center gap-1">
                <Smartphone size={11} className="text-amber-300" />
                <span>Website</span>
              </span>
            ) : (
              <span className="bg-stone-900/80 text-stone-100 text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-md">
                Digital Suite
              </span>
            )}
            {template.isPopular && (
              <span className="bg-amber-100/95 text-amber-900 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm border border-amber-300/50">
                Popular
              </span>
            )}
          </div>

          {/* Quick Direct Link Icon in top right */}
          {template.link && (
            <a
              href={template.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md hover:bg-white hover:scale-110 transition-all text-stone-800"
              title="Open website in new tab"
            >
              <ArrowUpRight size={14} />
            </a>
          )}

          {/* Bottom "LIVE PREVIEW" Pill Button (In-vitely signature style) */}
          <div className="absolute inset-x-0 bottom-3 flex justify-center z-10 px-4">
            <button
              onClick={handleOpenPreview}
              className="w-full max-w-[200px] py-2 px-4 rounded-full bg-stone-950/75 hover:bg-stone-950 text-white text-[11px] font-bold tracking-wider uppercase shadow-lg backdrop-blur-md border border-white/20 transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2 group/btn cursor-pointer"
            >
              <Eye size={13} className="text-amber-300" />
              <span>Live Preview</span>
            </button>
          </div>
        </div>

        {/* Card Content Information */}
        <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow">
          <div>
            {/* Aesthetic Style / Collection Label */}
            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1">
              <span>{template.collection || "Wedding Suite"}</span>
              <span className="text-[10px] text-stone-400 font-medium">
                {template.isWebsite ? "Interactive" : "Retina PDF"}
              </span>
            </div>

            {/* Template Name in Editorial Serif */}
            <h3 className="font-display text-lg font-bold text-stone-900 group-hover:text-amber-900 transition-colors leading-snug">
              {template.name}
            </h3>

            {/* Features summary */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-stone-500 mt-2 font-medium">
              <span>Live RSVP</span>
              <span className="text-stone-300">&bull;</span>
              <span>Google Maps</span>
              <span className="text-stone-300">&bull;</span>
              <span>Audio</span>
            </div>
          </div>

          {/* Pricing & CTA Row */}
          <div className="pt-3.5 mt-3.5 border-t border-stone-100 flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-lg font-bold text-stone-900">
                  ₹{template.price.toLocaleString("en-IN")}
                </span>
                {template.originalPrice && (
                  <span className="text-xs text-stone-400 line-through">
                    ₹{template.originalPrice.toLocaleString("en-IN")}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-stone-400 block -mt-0.5">
                {template.isWebsite ? "Full Website Suite" : "Print & WhatsApp"}
              </span>
            </div>

            <Link 
              href={`/contact?template=${template.id}`}
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-50 transition-colors shadow-sm inline-block cursor-pointer">
                Select
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Embedded Modal if not passed from parent */}
      {!onPreview && (
        <PhonePreviewModal
          template={template}
          isOpen={isLocalModalOpen}
          onClose={() => setIsLocalModalOpen(false)}
        />
      )}
    </>
  );
}
