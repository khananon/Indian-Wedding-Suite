import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "wouter";
import { 
  CheckCircle2, ArrowRight, ChevronDown, Sparkles, MapPin, 
  Calendar, Heart, ShieldCheck, Share2, Download, Send, 
  Palette, Smartphone, Music, Check, Eye
} from "lucide-react";
import { Button } from "@/components/Button";
import { TemplateCard } from "@/components/TemplateCard";
import { PhonePreviewModal } from "@/components/PhonePreviewModal";
import { useTemplates, type Template } from "@/hooks/use-templates";
import { getWhatsAppLink } from "@/config/site";
import { SEO } from "@/components/SEO";

export default function Home() {
  const { data: templates, isLoading } = useTemplates();
  // Ensure interactive websites appear first, showing top curated designs
  const featuredTemplates = templates?.slice(0, 8) || [];
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [0, 260]);
  const rawRotateLeft = useTransform(scrollYProgress, [0, 1], [0, 18]);
  const rawRotateRight = useTransform(scrollYProgress, [0, 1], [0, -18]);
  const rawScale = useTransform(scrollYProgress, [0, 1], [1, 0.75]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const lotusY = useSpring(rawY, { stiffness: 80, damping: 18 });
  const rotateLeft = useSpring(rawRotateLeft, { stiffness: 80, damping: 18 });
  const rotateRight = useSpring(rawRotateRight, { stiffness: 80, damping: 18 });
  const lotusScale = useSpring(rawScale, { stiffness: 80, damping: 18 });

  const accentLeftY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const accentLeftOpacity = useTransform(scrollYProgress, [0, 0.5], [0.7, 0]);

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5]">
      <SEO
        title="Vows & Knots | Indian Digital Wedding Invitations & Interactive Wedding Websites"
        description="Bespoke Indian digital wedding invitations and interactive wedding websites with real-time RSVP, Google Maps venue navigation, background music, and instant WhatsApp sharing."
        canonicalPath="/"
      />

      {/* HERO SECTION — Core design preserved */}
      <section ref={heroRef} className="relative pt-28 pb-0 md:pt-36 overflow-hidden min-h-[680px] md:min-h-[780px] flex items-center">
        {/* Background — clean ivory */}
        <div className="absolute inset-0 z-0 bg-background" />

        {/* LEFT LOTUS — bottom-left corner */}
        <motion.div
          className="absolute bottom-0 left-0 z-[2] pointer-events-none select-none"
          style={{ y: lotusY, rotate: rotateLeft, scale: lotusScale, opacity: rawOpacity, transformOrigin: "bottom left" }}
          initial={{ y: 120, opacity: 0, rotate: 12 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        >
          <img
            src={`${import.meta.env.BASE_URL}images/lotus4.png`}
            alt="Lotus decoration"
            className="w-52 md:w-72 lg:w-80 h-auto drop-shadow-xl"
            style={{ filter: "drop-shadow(0 16px 32px rgba(180,60,80,0.18))" }}
          />
        </motion.div>

        {/* RIGHT LOTUS — bottom-right corner */}
        <motion.div
          className="absolute bottom-0 right-0 z-[6] pointer-events-none select-none"
          style={{ y: lotusY, rotate: rotateRight, scale: lotusScale, opacity: rawOpacity, transformOrigin: "bottom right" }}
          initial={{ y: 120, opacity: 0, rotate: -12 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
        >
          <img
            src={`${import.meta.env.BASE_URL}images/lotus2.png`}
            alt="Lotus decoration"
            className="w-48 md:w-64 lg:w-72 h-auto drop-shadow-xl"
            style={{ transform: "scaleX(-1)", filter: "drop-shadow(0 16px 32px rgba(180,60,80,0.18))" }}
          />
        </motion.div>

        {/* SMALL ACCENT LOTUS */}
        <motion.div
          className="absolute bottom-16 left-36 z-[2] pointer-events-none select-none hidden lg:block"
          style={{ y: accentLeftY, opacity: accentLeftOpacity }}
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 0.7 }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
        >
          <img
            src={`${import.meta.env.BASE_URL}images/lotus1.png`}
            alt=""
            className="w-32 h-auto"
            style={{ filter: "drop-shadow(0 8px 16px rgba(180,60,80,0.12))" }}
          />
        </motion.div>

        {/* COUPLE IMAGE */}
        <motion.div
          className="absolute bottom-0 right-0 z-[3] pointer-events-none select-none hidden lg:block"
          style={{ width: "52%", maxWidth: "680px" }}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <div className="absolute inset-x-0 top-0 h-48 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, hsl(45,60%,98%) 0%, rgba(253,248,240,0.6) 55%, transparent 100%)" }} />
          <img
            src={`${import.meta.env.BASE_URL}images/hero-couple.jpg`}
            alt="Indian wedding couple illustration"
            className="w-full h-auto block"
            style={{ transform: "scale(1.08)", transformOrigin: "right bottom" }}
          />
        </motion.div>

        {/* TEXT CONTENT */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-xl pb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-block text-secondary font-semibold tracking-widest uppercase text-xs mb-5">
                The New Standard of Wedding Invites
              </span>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-primary leading-tight mb-6">
                Beautiful<br />Digital Wedding<br />Invitations
              </h1>
              <p className="text-lg md:text-xl text-foreground/75 mb-10 font-light leading-relaxed">
                Set the perfect tone for your special day with our elegant, customizable digital invitations and interactive websites.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Link href="/templates">
                  <Button size="lg" className="w-full sm:w-auto rounded-full group shadow-lg shadow-primary/25 bg-stone-900 hover:bg-stone-800 text-stone-50">
                    Browse All Designs
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full bg-white/70 backdrop-blur-sm border-stone-300 text-stone-800 hover:bg-white">
                    Request Custom Suite
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CURATED DESIGNS SHOWCASE (Website First with Price & Phone Preview) */}
      <section className="py-24 bg-[#FAF8F5] border-t border-stone-200/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6">
            <div>
              <span className="inline-block text-xs uppercase tracking-widest font-bold text-stone-500 mb-2">
                Curated Invitations &amp; Wedding Websites
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight">
                Featured Design Suites
              </h2>
              <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-xl">
                Interactive mobile wedding websites with real-time RSVP, Google Maps directions, and background music. Tap <strong>Live Preview</strong> to test directly on your screen.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Link href="/templates">
                <Button variant="outline" className="rounded-full border-stone-300 bg-white/80 hover:bg-white text-stone-800 text-xs uppercase tracking-wider font-bold px-6 py-2.5 shadow-sm">
                  View All {templates?.length || "16"} Designs
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Swipe Hint */}
          <div className="flex md:hidden items-center justify-between mb-3 px-1">
            <span className="text-xs text-stone-500 font-medium">Swipe cards to browse designs</span>
            <ArrowRight size={13} className="text-stone-400 animate-pulse" />
          </div>

          {isLoading ? (
            <div className="flex md:grid overflow-x-auto md:overflow-visible gap-4 sm:gap-7 md:grid-cols-2 lg:grid-cols-4 pb-4 md:pb-0">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="w-[260px] xs:w-[280px] shrink-0 md:w-auto animate-pulse bg-white rounded-2xl p-4 border border-stone-200">
                  <div className="bg-stone-200 aspect-[3/4] rounded-xl mb-4" />
                  <div className="h-5 bg-stone-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-stone-200 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex md:grid overflow-x-auto overscroll-x-contain md:overflow-visible snap-x snap-mandatory gap-4 sm:gap-6 md:gap-7 pb-4 md:pb-0 scrollbar-none -mx-4 px-4 md:mx-0 md:px-0 md:grid-cols-2 lg:grid-cols-4">
              {featuredTemplates.map((template) => (
                <div 
                  key={template.id} 
                  className="w-[76vw] max-w-[290px] shrink-0 snap-start md:w-auto flex flex-col"
                >
                  <TemplateCard 
                    template={template} 
                    onPreview={(tpl) => setPreviewTemplate(tpl)}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Value Callout Banner */}
          <div className="mt-14 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-800 flex items-center justify-center shrink-0">
                <Smartphone size={24} />
              </div>
              <div>
                <h4 className="font-display text-xl font-bold text-stone-900">
                  Complete Interactive Website + High-Res PDF
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
                  All website suites include instant WhatsApp sharing, unlimited guest RSVPs, and personalized ceremony schedules.
                </p>
              </div>
            </div>
            <Link href="/templates" className="shrink-0 w-full md:w-auto">
              <span className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer">
                Explore All Websites
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* WHAT WE OFFER — THE BESPOKE EXPERIENCE (In-vitely Inspired UX) */}
      <section className="py-24 bg-white border-t border-stone-200/70 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-xs uppercase tracking-widest font-bold text-amber-800 bg-amber-100/70 border border-amber-300/40 px-3.5 py-1 rounded-full mb-3">
              The Digital Wedding Experience
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 mb-4 tracking-tight">
              Thoughtfully Designed For You &amp; Your Guests
            </h2>
            <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
              Replace rigid paper invitations with an interactive wedding website that makes sharing your celebration simple, memorable, and stress-free.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1: Interactive Mobile Website */}
            <div className="bg-[#FAF8F5] rounded-3xl p-8 border border-stone-200 hover:border-amber-400/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-13 h-13 bg-stone-900 text-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Smartphone size={26} />
                </div>
                <span className="text-[11px] uppercase tracking-widest font-bold text-stone-400 block mb-1">
                  Mobile First
                </span>
                <h3 className="font-display text-2xl font-bold text-stone-900 mb-3">
                  Interactive Mobile Website
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed mb-6">
                  A personalized mobile link for your celebration. Works seamlessly on any phone browser with zero app downloads or logins required for guests.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-stone-700 pt-4 border-t border-stone-200">
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-amber-700 shrink-0" />
                  <span>Custom ceremony timeline &amp; countdown</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-amber-700 shrink-0" />
                  <span>High-resolution couple photo gallery</span>
                </li>
              </ul>
            </div>

            {/* Feature 2: WhatsApp RSVP Tracking */}
            <div className="bg-[#FAF8F5] rounded-3xl p-8 border border-stone-200 hover:border-amber-400/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-13 h-13 bg-stone-900 text-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Send size={26} />
                </div>
                <span className="text-[11px] uppercase tracking-widest font-bold text-stone-400 block mb-1">
                  Effortless RSVPs
                </span>
                <h3 className="font-display text-2xl font-bold text-stone-900 mb-3">
                  1-Tap WhatsApp Attendance
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed mb-6">
                  Guests confirm attendance, dietary preferences, and guest counts in a single tap directly through WhatsApp, eliminating follow-up calls.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-stone-700 pt-4 border-t border-stone-200">
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-amber-700 shrink-0" />
                  <span>Instant RSVP message generation</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-amber-700 shrink-0" />
                  <span>Track family and individual headcounts</span>
                </li>
              </ul>
            </div>

            {/* Feature 3: Venue GPS Navigation */}
            <div className="bg-[#FAF8F5] rounded-3xl p-8 border border-stone-200 hover:border-amber-400/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-13 h-13 bg-stone-900 text-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <MapPin size={26} />
                </div>
                <span className="text-[11px] uppercase tracking-widest font-bold text-stone-400 block mb-1">
                  Zero Lost Guests
                </span>
                <h3 className="font-display text-2xl font-bold text-stone-900 mb-3">
                  Google Maps GPS Navigation
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed mb-6">
                  Direct Google Maps links for every event (Mehendi, Sangeet, Baarat, Pheras, Reception) guide your guests straight to the venue gate.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-stone-700 pt-4 border-t border-stone-200">
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-amber-700 shrink-0" />
                  <span>Separate venue pins for multi-day events</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-amber-700 shrink-0" />
                  <span>Turn-by-turn driving directions</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Secondary feature row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="bg-[#FAF8F5] rounded-3xl p-7 border border-stone-200 flex items-start gap-5">
              <div className="w-12 h-12 rounded-2xl bg-amber-600/10 text-amber-800 flex items-center justify-center shrink-0 mt-1">
                <Music size={24} />
              </div>
              <div>
                <h4 className="font-display text-xl font-bold text-stone-900 mb-1">
                  Atmospheric Ceremonial Audio
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Traditional shehnai, sitar, or your favorite romantic song plays softly in the background as guests view your invitation.
                </p>
              </div>
            </div>

            <div className="bg-[#FAF8F5] rounded-3xl p-7 border border-stone-200 flex items-start gap-5">
              <div className="w-12 h-12 rounded-2xl bg-stone-900/10 text-stone-900 flex items-center justify-center shrink-0 mt-1">
                <Download size={24} />
              </div>
              <div>
                <h4 className="font-display text-xl font-bold text-stone-900 mb-1">
                  Retina Vector Print PDF Included
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Every website order also includes matching print-ready A5 PDF files with crisp vector typography for physical printing or WhatsApp forwards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FREE DIGITAL CARD & PDF MAKER SECTION */}
      <section className="py-20 bg-[#FAF8F5] border-t border-stone-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200/80 shadow-md flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100/60 px-3 py-1 rounded-full border border-amber-300/40 inline-block mb-3">
                100% Free Tool &bull; No Login Required
              </span>
              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 leading-snug">
                Need A Quick Single-Page Invitation Card?
              </h3>
              <p className="text-sm sm:text-base text-stone-600 mt-2 leading-relaxed">
                Use our built-in Free Card Maker to paste your own Pinterest background, customize luxury gold borders, pick royal wedding fonts, and download print-ready A5 PDFs with zero watermarks.
              </p>
              <div className="flex flex-wrap gap-4 mt-4 text-xs font-semibold text-stone-700">
                <span className="flex items-center gap-1.5">
                  <Check size={14} className="text-amber-700" />
                  <span>Upload Pinterest Backgrounds</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Check size={14} className="text-amber-700" />
                  <span>Custom Gold Border Frames</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Check size={14} className="text-amber-700" />
                  <span>Direct WhatsApp Sharing</span>
                </span>
              </div>
            </div>

            <div className="shrink-0 w-full sm:w-auto">
              <Link href="/card-maker">
                <Button size="lg" className="w-full sm:w-auto rounded-full bg-stone-900 hover:bg-stone-800 text-stone-50 font-bold px-8 py-3.5 shadow-lg">
                  <Sparkles className="mr-2 w-4 h-4 text-amber-300" />
                  <span>Launch Free Card Maker</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-stone-900 text-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block mb-2">
              Simple 3-Step Process
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3 tracking-tight">
              How Your Invitation Comes To Life
            </h2>
            <p className="text-stone-400 text-sm sm:text-base">
              From design selection to guest sharing in under 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {[
              { 
                step: "01", 
                title: "Choose Your Theme", 
                desc: "Explore our interactive website templates and test live previews on your screen." 
              },
              { 
                step: "02", 
                title: "Send Ceremony Details", 
                desc: "Share your couple names, wedding ritual dates, venue maps, and photos via WhatsApp or form." 
              },
              { 
                step: "03", 
                title: "Receive & Share Live", 
                desc: "Get your personalized website link in 24 hours. Review, approve, and send directly to guests." 
              }
            ].map((item, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center p-6 rounded-2xl bg-stone-800/40 border border-stone-700/50">
                <div className="w-16 h-16 bg-stone-800 text-amber-400 rounded-full flex items-center justify-center font-display text-2xl font-bold shadow-inner mb-5 border border-stone-700">
                  {item.step}
                </div>
                <h3 className="font-display text-xl font-bold mb-2 text-stone-100">{item.title}</h3>
                <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section className="py-24 bg-white border-t border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-stone-400 font-bold block mb-2">
              Clear &amp; Transparent
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "What is included with an interactive wedding website?",
                a: "Each interactive website includes a personalized link (URL), your couple story, ceremony event schedules, Google Maps GPS directions for every venue, background ceremonial music, real-time WhatsApp RSVP tracking, and high-resolution downloadable PDF files."
              },
              {
                q: "How do guests open and view the wedding website?",
                a: "You simply copy your custom link and share it on WhatsApp, text message, or Instagram. Guests tap the link and it instantly opens on any smartphone or desktop browser without needing to install any app or create an account."
              },
              {
                q: "Can I customize the wording for multiple ceremonies and rituals?",
                a: "Yes! Every template is fully tailored to your specific events (e.g. Haldi, Mehendi, Sangeet, Baarat, Pheras, Nikah, Walima, Anand Karaj, Muhurtham, or Church Nuptials) with distinct dates, times, and venue map locations."
              },
              {
                q: "How fast will my wedding website be delivered?",
                a: "Once you share your ceremony details and photos, our design team delivers your live draft within 24 hours. We offer unlimited revisions until you are completely satisfied before sending to guests."
              },
              {
                q: "Is there any hidden cost or recurring monthly fee?",
                a: "No. All our website packages are complete, one-time fees (₹2,000 all-inclusive) with zero recurring subscriptions or hidden costs."
              }
            ].map((faq, index) => (
              <div 
                key={index} 
                className="border border-stone-200 rounded-2xl overflow-hidden bg-[#FAF8F5] transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-display text-lg font-bold text-stone-900 hover:text-amber-900 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown 
                    size={18} 
                    className={`text-stone-500 transition-transform duration-200 shrink-0 ${openFaq === index ? "rotate-180 text-stone-900" : ""}`} 
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-5 pt-1 text-stone-600 text-sm leading-relaxed border-t border-stone-200/50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Phone Preview Centered Modal */}
      <PhonePreviewModal
        template={previewTemplate}
        isOpen={Boolean(previewTemplate)}
        onClose={() => setPreviewTemplate(null)}
      />
    </div>
  );
}
