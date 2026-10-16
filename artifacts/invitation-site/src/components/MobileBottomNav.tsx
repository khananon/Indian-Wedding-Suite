import { Link, useLocation } from "wouter";
import { Home, Smartphone, Sparkles, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { getWhatsAppLink } from "@/config/site";

export function MobileBottomNav() {
  const [location] = useLocation();

  // Hide on studio editor screens to avoid overlapping the studio toolbars
  if (
    location === "/card-maker" || 
    location === "/create-free-wedding-invitation-card-pdf" || 
    location === "/free-wedding-invitation-card-pdf"
  ) {
    return null;
  }

  const isTabActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  const waEnquiryLink = getWhatsAppLink("Hi Vows & Knots! I'm browsing on my phone and would like to know more about your digital wedding websites and invitations.");

  return (
    <div className="fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))] inset-x-3 z-40 md:hidden pointer-events-none">
      <nav 
        className={cn(
          "w-full max-w-md mx-auto pointer-events-auto",
          "bg-stone-950/92 text-stone-100 backdrop-blur-2xl",
          "rounded-full py-2 px-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.45)] border border-white/15",
          "flex items-center justify-around select-none"
        )}
      >
        {/* 1. Home */}
        <Link 
          href="/" 
          className={cn(
            "flex flex-col items-center gap-0.5 px-3 py-1 rounded-full transition-all text-center active:scale-90",
            isTabActive("/") 
              ? "text-amber-300 font-bold" 
              : "text-stone-400 hover:text-stone-200"
          )}
        >
          <Home size={18} className={isTabActive("/") ? "text-amber-300 scale-105" : ""} />
          <span className="text-[10px] tracking-wider font-semibold">Home</span>
        </Link>

        {/* 2. Templates */}
        <Link 
          href="/templates" 
          className={cn(
            "flex flex-col items-center gap-0.5 px-3 py-1 rounded-full transition-all text-center active:scale-90",
            isTabActive("/templates") 
              ? "text-amber-300 font-bold" 
              : "text-stone-400 hover:text-stone-200"
          )}
        >
          <Smartphone size={18} className={isTabActive("/templates") ? "text-amber-300 scale-105" : ""} />
          <span className="text-[10px] tracking-wider font-semibold">Designs</span>
        </Link>

        {/* 3. Free Card Studio */}
        <Link 
          href="/create-free-wedding-invitation-card-pdf" 
          className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-full transition-all text-center relative group active:scale-90"
        >
          <div className="relative">
            <Sparkles size={18} className="text-secondary" />
            <span className="absolute -top-1.5 -right-3 text-[8px] bg-secondary text-primary font-black px-1 rounded-full leading-none py-0.5 shadow-xs">
              FREE
            </span>
          </div>
          <span className="text-[10px] tracking-wider font-semibold text-stone-300">Card Maker</span>
        </Link>

        {/* 4. WhatsApp Quick Chat */}
        <a 
          href={waEnquiryLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-full transition-all text-center text-emerald-400 hover:text-emerald-300 active:scale-90"
          title="Direct WhatsApp Consultation"
        >
          <MessageCircle size={18} className="text-emerald-400" />
          <span className="text-[10px] tracking-wider font-semibold">WhatsApp</span>
        </a>
      </nav>
    </div>
  );
}
