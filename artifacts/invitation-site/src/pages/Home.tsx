import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "wouter";
import { Star, CheckCircle2, ArrowRight, ChevronDown, Sparkles, MapPin, Calendar, Heart, ShieldCheck, Share2 } from "lucide-react";
import { Button } from "@/components/Button";
import { TemplateCard } from "@/components/TemplateCard";
import { useTemplates } from "@/hooks/use-templates";
import { getWhatsAppLink } from "@/config/site";
import { SEO } from "@/components/SEO";

export default function Home() {
  const { data: templates, isLoading } = useTemplates();
  const featuredTemplates = templates?.slice(0, 4) || [];
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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
  const accentRightY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const accentRightOpacity = useTransform(scrollYProgress, [0, 0.5], [0.65, 0]);

  return (
    <div className="flex flex-col min-h-screen">
      <SEO
        title="Vows & Knots | Indian Digital Wedding Invitations & Wedding Websites"
        description="Bespoke Indian digital wedding invitations and interactive wedding websites for Hindu, Muslim, Sikh, Christian, and South Indian celebrations with RSVP and Google Maps."
        canonicalPath="/"
      />
      {/* HERO SECTION */}
      <section ref={heroRef} className="relative pt-28 pb-0 md:pt-36 overflow-hidden min-h-[680px] md:min-h-[780px] flex items-center">
        {/* Background — clean ivory, no distracting pattern */}
        <div className="absolute inset-0 z-0 bg-background" />

        {/* LEFT LOTUS — bottom-left corner, slides down on scroll */}
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

        {/* RIGHT LOTUS — bottom-right corner, mirrored, slides down on scroll */}
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

        {/* SMALL ACCENT LOTUS — mid-left floating */}
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

        {/* COUPLE IMAGE — absolutely anchored to right edge + bottom, blends into background */}
        <motion.div
          className="absolute bottom-0 right-0 z-[3] pointer-events-none select-none hidden lg:block"
          style={{ width: "52%", maxWidth: "680px" }}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          {/* Left blend gradient — wide soft fade */}
          <div className="absolute inset-y-0 left-0 z-10 pointer-events-none" style={{ width: "60%", background: "linear-gradient(to right, hsl(45,60%,98%) 0%, hsl(45,60%,98%) 15%, rgba(253,248,240,0.85) 45%, rgba(253,248,240,0.3) 75%, transparent 100%)" }} />
          {/* Top blend gradient */}
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
                Set the perfect tone for your special day with our elegant, customizable digital invitations.
                {/* Available in Video, PDF, and interactive Website formats. */}
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Link href="/templates">
                  <Button size="lg" className="w-full sm:w-auto rounded-full group shadow-lg shadow-primary/25">
                    Browse Templates
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full bg-white/60 backdrop-blur-sm border-primary/30">
                    Request Custom Design
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION (Choose Your Format - Commented out)
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-primary mb-4">Choose Your Format</h2>
            <div className="w-24 h-1 bg-secondary mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: <FileText size={32} />,
                title: "PDF Invitations",
                desc: "Elegant, multi-page interactive PDFs with clickable map links and RSVP buttons. Perfect for WhatsApp sharing."
              },
              {
                icon: <Smartphone size={32} />,
                title: "Video Invitations",
                desc: "Cinematic animated videos with your favorite music. A beautiful storytelling format to announce your dates."
              },
              {
                icon: <Globe size={32} />,
                title: "Website Invitations",
                desc: "A dedicated personalized website with your story, gallery, event details, and digital RSVP management."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-background rounded-2xl p-8 text-center border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-16 h-16 mx-auto bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="font-display text-2xl font-bold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* HOW IT WORKS */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto">Three simple steps to your perfect wedding invitation.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-primary-foreground/20 -translate-y-1/2 z-0"></div>

            {[
              { step: "01", title: "Select a Design", desc: "Browse our curated collection and choose a template that matches your vibe." },
              { step: "02", title: "Share Details", desc: "Send us your text, dates, venues, and photos through our simple form." },
              { step: "03", title: "Review & Share", desc: "Get a draft in 24 hours. Approve it, and start sharing with your guests!" }
            ].map((item, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-background text-primary rounded-full flex items-center justify-center font-display text-3xl font-bold shadow-lg mb-6 border-4 border-primary">
                  {item.step}
                </div>
                <h3 className="font-sans text-xl font-bold mb-3 text-secondary">{item.title}</h3>
                <p className="text-primary-foreground/80 leading-relaxed px-4">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED TEMPLATES */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="font-display text-4xl font-bold text-primary mb-4">Featured Designs</h2>
              <p className="text-muted-foreground max-w-xl">Explore our most loved templates. Every design can be customized to your specific religious or cultural requirements.</p>
            </div>
            <Link href="/templates">
              <Button variant="outline" className="mt-6 md:mt-0">View All Designs</Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="animate-pulse">
                  <div className="bg-muted aspect-[3/4] rounded-xl mb-4"></div>
                  <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CULTURAL TRADITIONS & CEREMONIAL INVITATION SUITES (SEO & GEO Focus) */}
      <section className="py-24 bg-white border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-secondary font-semibold tracking-widest uppercase text-xs mb-3">
              Tailored For Every Heritage
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">
              Digital Invitations For Every Indian Wedding Tradition
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">
              Every culture celebrates love in its own sacred way. Our bespoke digital invitations are crafted with authentic ceremonial symbolism, ritual timings, and multi-event schedules.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Muslim Nikah & Walima */}
            <div className="bg-background rounded-2xl p-8 border border-border hover:border-secondary/50 hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">☪️</span>
                  <span className="text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
                    Nikah &amp; Walima
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold text-primary mb-2">
                  Muslim Digital Wedding Invitations
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Adorned with elegant Bismillah calligraphy, Quranic verses, Hijri calendar dates, separate timings for Nikah and Walima receptions, and seamless WhatsApp RSVP links.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["Bismillah Art", "Nikah Timings", "Walima RSVP", "Venue GPS Maps"].map((tag, i) => (
                    <span key={i} className="text-[11px] bg-muted px-2.5 py-1 rounded-full text-foreground/80 font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <Link href="/templates">
                <Button variant="outline" size="sm" className="w-full justify-between group">
                  <span>Browse Muslim Invites</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Hindu Vivah & Lagan Patrika */}
            <div className="bg-background rounded-2xl p-8 border border-border hover:border-secondary/50 hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">🪔</span>
                  <span className="text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-amber-100 text-amber-800">
                    Vivah &amp; Patrika
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold text-primary mb-2">
                  Hindu Digital Wedding Invitations
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Rooted in tradition with auspicious Ganesh stuti, Lagan Patrika schedules, Haldi, Mehendi, Sangeet, Baarat, and Saat Phere timelines with interactive Google Maps navigation.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["Ganesh Stuti", "Lagan Patrika", "Multi-Event RSVP", "Haldi & Sangeet"].map((tag, i) => (
                    <span key={i} className="text-[11px] bg-muted px-2.5 py-1 rounded-full text-foreground/80 font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <Link href="/templates">
                <Button variant="outline" size="sm" className="w-full justify-between group">
                  <span>Browse Hindu Invites</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Sikh Anand Karaj */}
            <div className="bg-background rounded-2xl p-8 border border-border hover:border-secondary/50 hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">✡️</span>
                  <span className="text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-sky-100 text-sky-800">
                    Anand Karaj
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold text-primary mb-2">
                  Sikh Digital Wedding Invitations
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Featuring holy Ik Onkar motifs, Gurdwara Lavaan ceremony timings, Langar guidelines, Milni introductions, and vibrant Punjabi reception celebration details.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["Ik Onkar", "Gurdwara Maps", "Langar Notes", "Milni & Sangeet"].map((tag, i) => (
                    <span key={i} className="text-[11px] bg-muted px-2.5 py-1 rounded-full text-foreground/80 font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <Link href="/templates">
                <Button variant="outline" size="sm" className="w-full justify-between group">
                  <span>Browse Sikh Invites</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Christian Holy Matrimony */}
            <div className="bg-background rounded-2xl p-8 border border-border hover:border-secondary/50 hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">✝️</span>
                  <span className="text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-indigo-100 text-indigo-800">
                    Holy Matrimony
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold text-primary mb-2">
                  Christian Digital Wedding Invitations
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Graceful and modern digital wedding websites featuring favorite Bible verses, Church ceremony orders, choir announcements, and dinner &amp; dance reception RSVP.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["Scripture Verses", "Church Location", "Bridal Party", "Reception RSVP"].map((tag, i) => (
                    <span key={i} className="text-[11px] bg-muted px-2.5 py-1 rounded-full text-foreground/80 font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <Link href="/templates">
                <Button variant="outline" size="sm" className="w-full justify-between group">
                  <span>Browse Christian Invites</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* South Indian Muhurtham */}
            <div className="bg-background rounded-2xl p-8 border border-border hover:border-secondary/50 hover:shadow-lg transition-all flex flex-col justify-between md:col-span-2 lg:col-span-2">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">🌺</span>
                  <span className="text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-yellow-100 text-yellow-800">
                    South Indian Muhurtham
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold text-primary mb-2">
                  South Indian Digital Wedding Invitations (Tamil, Telugu, Kannada, Malayalam)
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Rich cultural aesthetics inspired by temple architecture, banana leaf mandapams, and Kolam patterns. Perfect for auspicious Muhurtham timings, Kanyadaan, Mangalya Dharanam, and grand feast hospitality.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["Temple Motifs", "Kolam Borders", "Muhurtham Countdown", "Kalyanam Details", "Google Maps"].map((tag, i) => (
                    <span key={i} className="text-[11px] bg-muted px-2.5 py-1 rounded-full text-foreground/80 font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <Link href="/templates">
                <Button variant="outline" size="sm" className="w-full sm:w-auto self-start justify-between group">
                  <span>Browse South Indian Invites</span>
                  <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS (FAQ) - AI Search & Google Featured Snippets */}
      <section className="py-24 bg-background border-t border-border/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-secondary font-semibold tracking-widest uppercase text-xs mb-3">
              Answers &amp; Support
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about our Indian digital wedding invitations, customization, RSVP tracking, and WhatsApp sharing.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "What is an Indian digital wedding invitation website?",
                a: "An Indian digital wedding invitation is a personalized, interactive wedding website designed specifically for multi-day Indian weddings. Unlike static paper cards or simple images, it features animated countdowns, separate schedules for ceremonies (Haldi, Mehendi, Sangeet, Shaadi, Reception), direct Google Maps navigation pins, and instant WhatsApp RSVP collection."
              },
              {
                q: "Do you design Muslim Nikah and Walima digital invitations?",
                a: "Yes! We specialize in Islamic wedding digital invites with Bismillah calligraphy, Quranic Ayahs, Hijri dates, separate itineraries for Nikah, Mehndi, and Walima banquets, and dress code guidance for guests."
              },
              {
                q: "Can we include all Hindu Vivah rituals like Haldi, Mehendi, and Sangeet?",
                a: "Yes, our Hindu wedding invitation suites are built for multi-event festivities. You can include Ganesh Puja, Lagan Patrika, Mehendi, Haldi, Sangeet, Baarat, Saat Phere, and Reception, with separate venues, timings, and attire suggestions for each."
              },
              {
                q: "How do Sikh Anand Karaj wedding invitations work?",
                a: "Our Sikh wedding invitations feature revered Ik Onkar iconography, Gurdwara etiquette reminders, Lavaan ceremony timings, Langar details, and reception locations accessible via GPS maps."
              },
              {
                q: "Can guests open the wedding invitation directly on WhatsApp?",
                a: "Yes! Every invitation is engineered to generate a beautiful rich thumbnail preview on WhatsApp with the couple's portrait, wedding date, and names. Guests simply tap the link to view the complete invitation."
              },
              {
                q: "How does the Google Maps venue navigation work?",
                a: "Every ceremony card has a direct 'Get Directions' button linked to the exact Google Maps coordinates of your venue or banquet hall, ensuring your guests arrive punctually without calling for directions."
              },
              {
                q: "How do guests submit their RSVP?",
                a: "Guests can confirm their attendance in seconds via a one-tap online RSVP form or direct WhatsApp message, providing real-time guest counts for caterers and event planners."
              },
              {
                q: "Why choose digital wedding invitations over printed cards?",
                a: "Digital wedding invitations are 100% eco-friendly with zero paper waste. They can be sent globally in seconds without courier fees, allow instant updates if event timings change, and cost a fraction of traditional printing."
              }
            ].map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-border overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-display text-xl font-bold text-primary hover:text-primary/80 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-secondary shrink-0 transition-transform duration-200 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 text-muted-foreground text-base leading-relaxed border-t border-border/30 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 relative overflow-hidden bg-background">
        <div className="absolute inset-0 bg-secondary/10"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">Ready to create your dream invitation?</h2>
          <p className="text-lg text-foreground/70 mb-10">Our design team is ready to craft something truly special for your big day.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="rounded-full px-8">Contact Us Now</Button>
            </Link>
            <Button variant="outline" size="lg" className="rounded-full px-8 bg-white" onClick={() => window.open(getWhatsAppLink(), '_blank')}>
              Chat on WhatsApp
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
