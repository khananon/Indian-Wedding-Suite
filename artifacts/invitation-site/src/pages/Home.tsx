import { motion } from "framer-motion";
import { Link } from "wouter";
import { Smartphone, FileText, Globe, Star, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/Button";
import { TemplateCard } from "@/components/TemplateCard";
import { useTemplates } from "@/hooks/use-templates";

export default function Home() {
  const { data: templates, isLoading } = useTemplates();
  const featuredTemplates = templates?.slice(0, 4) || [];

  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background Image/Pattern */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={`${import.meta.env.BASE_URL}images/hero-floral.jpg`}
            alt="Decorative floral background"
            className="absolute inset-0 w-full h-full object-cover origin-center"
            style={{ transform: "rotate(90deg) scale(1.6)", opacity: 0.55 }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-secondary font-semibold tracking-widest uppercase text-sm mb-6 block">
                The New Standard of Wedding Invites
              </span>
              <h1 className="font-display text-5xl md:text-7xl font-bold text-primary leading-tight mb-6">
                Beautiful Digital <br className="hidden md:block" />
                Wedding Invitations
              </h1>
              <p className="text-lg md:text-xl text-foreground/80 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                Set the perfect tone for your special day with our elegant, customizable digital invites. Available in Video, PDF, and interactive Website formats.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/templates">
                  <Button size="lg" className="w-full sm:w-auto rounded-full group">
                    Browse Templates
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full bg-background/50 backdrop-blur-sm">
                    Request Custom Design
                  </Button>
                </Link>
              </div>
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
