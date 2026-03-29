import { Link } from "wouter";
import { type Template } from "@/hooks/use-templates";

const themeStyles: Record<string, { bg: string; border: string; accent: string; icon: string; pattern: string }> = {
  Hindu: {
    bg: "from-orange-50 via-amber-50 to-rose-50",
    border: "border-amber-300/60",
    accent: "text-amber-700",
    icon: "🪔",
    pattern: "bg-gradient-to-br from-orange-100/80 to-rose-100/80",
  },
  Muslim: {
    bg: "from-emerald-50 via-teal-50 to-cyan-50",
    border: "border-emerald-300/60",
    accent: "text-emerald-700",
    icon: "☪️",
    pattern: "bg-gradient-to-br from-emerald-100/80 to-teal-100/80",
  },
  Sikh: {
    bg: "from-sky-50 via-indigo-50 to-blue-50",
    border: "border-sky-300/60",
    accent: "text-sky-700",
    icon: "✡️",
    pattern: "bg-gradient-to-br from-sky-100/80 to-indigo-100/80",
  },
  Christian: {
    bg: "from-slate-50 via-blue-50 to-indigo-50",
    border: "border-blue-300/60",
    accent: "text-blue-700",
    icon: "✝️",
    pattern: "bg-gradient-to-br from-blue-100/80 to-slate-100/80",
  },
  "South Indian": {
    bg: "from-yellow-50 via-lime-50 to-emerald-50",
    border: "border-yellow-400/60",
    accent: "text-yellow-700",
    icon: "🌺",
    pattern: "bg-gradient-to-br from-yellow-100/80 to-lime-100/80",
  },
};

const defaultTheme = {
  bg: "from-pink-50 via-rose-50 to-amber-50",
  border: "border-rose-300/60",
  accent: "text-rose-700",
  icon: "💐",
  pattern: "bg-gradient-to-br from-rose-100/80 to-amber-100/80",
};

export function TemplateCard({ template }: { template: Template }) {
  const theme = themeStyles[template.category] || defaultTheme;
  const base = import.meta.env.BASE_URL;

  return (
    <div className="group relative bg-card rounded-2xl overflow-hidden card-shadow border border-border/50 hover:border-secondary/50 transition-all duration-300">
      <div className={`relative aspect-[3/4] overflow-hidden ${template.image ? "bg-gray-100" : `bg-gradient-to-br ${theme.bg}`}`}>

        {template.image ? (
          /* Real photo preview */
          <img
            src={`${base}${template.image}`}
            alt={template.name}
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          /* CSS art fallback */
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
            <div className={`w-full h-full rounded-xl ${theme.pattern} border-2 ${theme.border} flex flex-col items-center justify-center p-5 relative`}>
              <div className={`absolute top-3 left-3 right-3 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-30 ${theme.accent}`} />
              <div className={`absolute bottom-3 left-3 right-3 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-30 ${theme.accent}`} />
              <div className={`absolute top-3 left-3 bottom-3 w-px bg-gradient-to-b from-transparent via-current to-transparent opacity-30 ${theme.accent}`} />
              <div className={`absolute top-3 right-3 bottom-3 w-px bg-gradient-to-b from-transparent via-current to-transparent opacity-30 ${theme.accent}`} />
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 rounded-tl border-current opacity-40" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 rounded-tr border-current opacity-40" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 rounded-bl border-current opacity-40" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 rounded-br border-current opacity-40" />
              <div className="text-4xl mb-3 filter drop-shadow-sm">{theme.icon}</div>
              <div className={`font-display text-base font-semibold text-center leading-snug mb-1 ${theme.accent}`}>
                {template.name}
              </div>
              <div className="text-xs font-sans uppercase tracking-[0.15em] text-gray-500 mt-1">
                Wedding Invitation
              </div>
              <div className="flex gap-1 mt-3">
                {[...Array(3)].map((_, i) => (
                  <span key={i} className="text-[10px] opacity-60">✦</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
          <Link href={`/contact?template=${template.id}`}>
            <button className="px-7 py-3 bg-background text-primary font-medium text-sm rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:scale-105 shadow-lg">
              Customize This
            </button>
          </Link>
        </div>

        {template.isPopular && (
          <div className="absolute top-3 right-3 bg-secondary text-secondary-foreground text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm z-10">
            Popular
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-display text-base font-semibold text-foreground truncate pr-2">
            {template.name}
          </h3>
          <span className="font-sans font-semibold text-primary text-sm whitespace-nowrap">
            ₹{template.price}
          </span>
        </div>
        <div className="flex items-center mt-2">
          <span className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium px-2.5 py-0.5 bg-muted rounded-full">
            {template.category}
          </span>
        </div>
      </div>
    </div>
  );
}
