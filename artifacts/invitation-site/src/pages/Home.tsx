import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";
import { Smartphone, FileText, Globe, Star, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/Button";
import { TemplateCard } from "@/components/TemplateCard";
import { useTemplates } from "@/hooks/use-templates";

export default function Home() {
  const { data: templates, isLoading } = useTemplates();
  const featuredTemplates = templates?.slice(0, 4) || [];

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
      {/* HERO SECTION */}
      <section ref={heroRef} className="relative pt-28 pb-0 md:pt-36 overflow-hidden min-h-[680px] md:min-h-[780px] flex items-center">
        {/* Background — floral pattern left side */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={`${import.meta.env.BASE_URL}images/hero-floral.jpg`}
            alt=""
            className="absolute inset-0 w-full h-full object-cover origin-center"
            style={{ transform: "rotate(90deg) scale(1.6)", opacity: 0.45 }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
        </div>

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
          className="absolute bottom-0 right-0 z-[2] pointer-events-none select-none"
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

        {/* SMALL ACCENT LOTUS — mid-right floating */}
        <motion.div
          className="absolute bottom-16 right-36 z-[2] pointer-events-none select-none hidden lg:block"
          style={{ y: accentRightY, opacity: accentRightOpacity }}
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 0.65 }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
        >
          <img
            src={`${import.meta.env.BASE_URL}images/lotus3.png`}
            alt=""
            className="w-28 h-auto"
            style={{ transform: "scaleX(-1)", filter: "drop-shadow(0 8px 16px rgba(180,60,80,0.12))" }}
          />
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="flex flex-col lg:flex-row items-end justify-between gap-0">

            {/* LEFT — Text */}
            <motion.div
              className="flex-1 max-w-xl pb-16 z-10"
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
                Set the perfect tone for your special day with our elegant, customizable digital invites. Available in Video, PDF, and interactive Website formats.
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

            {/* RIGHT — Couple image, natural size, slight zoom */}
            <motion.div
              className="hidden lg:flex flex-1 relative items-end justify-end self-stretch"
              initial={{ opacity: 0, x: 40, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              {/* Left fade so it blends into the page */}
              <div className="absolute inset-y-0 left-0 w-2/5 z-10"
                style={{ background: "linear-gradient(to right, hsl(45 60% 98%), transparent)" }} />
              <img
                src={`${import.meta.env.BASE_URL}images/hero-couple.jpg`}
                alt="Indian wedding couple illustration"
                className="relative w-full h-auto object-contain object-bottom"
                style={{
                  maxHeight: "560px",
                  transform: "scale(1.08)",
                  transformOrigin: "right bottom",
                  filter: "drop-shadow(0 20px 40px rgba(160,80,40,0.12))",
                }}
              />
            </motion.div>

          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
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

      {/* PRICING */}
      <section className="py-24 bg-white border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-primary mb-4">Transparent Pricing</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Premium quality without the premium price tag. Choose the package that suits you best.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center">
            {/* Basic */}
            <div className="bg-background rounded-2xl p-8 border border-border shadow-sm">
              <h3 className="text-xl font-bold text-foreground mb-2">Essential PDF</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-bold text-primary">₹499</span>
              </div>
              <ul className="space-y-4 mb-8">
                {['Up to 4 Pages', 'Clickable Maps/Links', 'Custom Text & Colors', '1 Revision', 'Delivery in 24 hrs'].map((f, i) => (
                  <li key={i} className="flex items-center text-muted-foreground text-sm">
                    <CheckCircle2 size={16} className="text-secondary mr-3 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/contact?package=basic">
                <Button variant="outline" className="w-full">Choose Basic</Button>
              </Link>
            </div>

            {/* Standard */}
            <div className="bg-primary text-primary-foreground rounded-2xl p-8 border border-primary shadow-xl transform md:-translate-y-4 relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary text-secondary-foreground text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                Most Popular
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Video + PDF</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-white">₹999</span>
              </div>
              <ul className="space-y-4 mb-8">
                {['60 Sec Animated Video', 'Matching 4-Page PDF', 'Background Music', 'Custom Caricatures (+₹500)', '3 Revisions', 'Delivery in 48 hrs'].map((f, i) => (
                  <li key={i} className="flex items-center text-primary-foreground/80 text-sm">
                    <CheckCircle2 size={16} className="text-secondary mr-3 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/contact?package=standard">
                <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 border-0">Choose Standard</Button>
              </Link>
            </div>

            {/* Premium */}
            <div className="bg-background rounded-2xl p-8 border border-border shadow-sm">
              <h3 className="text-xl font-bold text-foreground mb-2">The Full Suite</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-bold text-primary">₹1,999</span>
              </div>
              <ul className="space-y-4 mb-8">
                {['Custom Website', 'Animated Video', 'Matching PDF', 'RSVP Management', 'Photo Gallery', 'Unlimited Revisions'].map((f, i) => (
                  <li key={i} className="flex items-center text-muted-foreground text-sm">
                    <CheckCircle2 size={16} className="text-secondary mr-3 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/contact?package=premium">
                <Button variant="outline" className="w-full">Choose Premium</Button>
              </Link>
            </div>
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
            <Button variant="outline" size="lg" className="rounded-full px-8 bg-white" onClick={() => window.open('https://wa.me/1234567890', '_blank')}>
              Chat on WhatsApp
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
