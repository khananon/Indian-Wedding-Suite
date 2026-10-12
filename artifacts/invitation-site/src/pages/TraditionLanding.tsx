import { Link } from "wouter";
import { ArrowLeft, CheckCircle2, MapPin, Send, MessageCircle, Calendar, Sparkles } from "lucide-react";
import { SEO } from "@/components/SEO";
import { TemplateCard } from "@/components/TemplateCard";
import { useTemplates, type Category } from "@/hooks/use-templates";
import { getWhatsAppLink } from "@/config/site";

interface TraditionInfo {
  slug: string;
  category: Category;
  title: string;
  metaTitle: string;
  metaDescription: string;
  badge: string;
  heroHeading: string;
  heroDescription: string;
  features: string[];
  wordingTitle: string;
  wordingDescription: string;
  wordingExample: {
    heading: string;
    subheading: string;
    body: string;
    footer: string;
  };
  faqs: Array<{ q: string; a: string }>;
}

const TRADITION_CONFIGS: Record<string, TraditionInfo> = {
  "muslim-wedding-invitations": {
    slug: "muslim-wedding-invitations",
    category: "Muslim",
    title: "Muslim Digital Wedding Invitations",
    metaTitle: "Muslim Digital Wedding Invitations | Nikah & Walima E-Invites | Vows & Knots",
    metaDescription: "Discover bespoke Muslim digital wedding invitations. Elegant Bismillah calligraphy, Quranic blessings, Nikah & Walima schedules, instant WhatsApp RSVP, and Google Maps venue navigation.",
    badge: "Nikah & Walima Digital Suite",
    heroHeading: "Bespoke Muslim Digital Wedding Invitations",
    heroDescription: "Celebrate your sacred union with graceful Islamic digital invitations. Thoughtfully designed with authentic Bismillah calligraphy, Quranic verses, dual Nikah and Walima banquet schedules, and 1-tap WhatsApp RSVP for your guests.",
    features: [
      "Bismillah & Quranic Calligraphy Motifs",
      "Separate Nikah & Walima Ceremony Timelines",
      "Hijri Calendar & Gregorian Dates",
      "Direct Google Maps Venue Navigation",
      "1-Tap Instant WhatsApp RSVP Tracking",
      "Mobile-Optimized Fast Loading Architecture"
    ],
    wordingTitle: "Islamic Wedding Invitation Wording & Dua Guide",
    wordingDescription: "Our invitations incorporate traditional Islamic invocations paired with modern, graceful wording for multi-family announcements.",
    wordingExample: {
      heading: "In the Name of Allah, the Most Gracious, the Most Merciful",
      subheading: "\"And among His signs is that He created for you mates from among yourselves, that you may dwell in tranquility with them.\" — Surah Ar-Rum (30:21)",
      body: "Mr. & Mrs. Farooqui request the pleasure of your company to celebrate the auspicious Nikah & Walima ceremony of their beloved son with the daughter of Mr. & Mrs. Siddiqui.",
      footer: "Nikah Ceremony: 11:00 AM | Walima Banquet: 07:30 PM | RSVP via WhatsApp"
    },
    faqs: [
      {
        q: "Can we include separate timings and venues for Nikah and Walima?",
        a: "Yes. Our invitations are designed specifically for multi-day Islamic celebrations. You can display distinct timings, addresses, and individual Google Maps navigation links for the Nikah ceremony, Mehndi/Haldi, and the Walima banquet."
      },
      {
        q: "How do guests receive and open the digital invite on WhatsApp?",
        a: "Your invitation generates a rich WhatsApp preview card with your names, wedding date, and a custom artwork thumbnail. When guests tap the link, the interactive invitation opens instantly in their mobile browser with no app download required."
      },
      {
        q: "Can we include both families' names and host greetings?",
        a: "Absolutely. We customize all host announcements, warm family welcomes, and contact persons for both the bride's and groom's sides."
      }
    ]
  },

  "hindu-wedding-invitations": {
    slug: "hindu-wedding-invitations",
    category: "Hindu",
    title: "Hindu Digital Wedding Invitations",
    metaTitle: "Hindu Digital Wedding Invitations | Vivah & Lagan Patrika E-Invites | Vows & Knots",
    metaDescription: "Bespoke Hindu digital wedding invitations & Lagan Patrika website suites. Multi-event schedules for Haldi, Mehendi, Sangeet & Saat Phere with WhatsApp RSVP and GPS venue directions.",
    badge: "Shubh Vivah & Lagan Patrika",
    heroHeading: "Authentic Hindu Digital Wedding Invitations",
    heroDescription: "Honor sacred traditions with bespoke Hindu wedding invitations. Designed with auspicious Ganesh stuti, Lagan Patrika timelines, multi-event schedules for Haldi, Mehendi, Sangeet, and Saat Phere, coupled with live Google Maps venue directions.",
    features: [
      "Auspicious Ganesh Vandana & Shlokas",
      "Complete Lagan Patrika Digital Presentation",
      "Multi-Event Schedule (Haldi, Mehendi, Sangeet, Phere)",
      "Auspicious Muhurtham & Ritual Timings",
      "Interactive GPS Venue Directions",
      "Automated WhatsApp Guest List & RSVP"
    ],
    wordingTitle: "Traditional Vivah Invitation Wording & Shlokas",
    wordingDescription: "Incorporate auspicious Sanskrit shlokas and respectful multi-generational family invitations.",
    wordingExample: {
      heading: "॥ श्री गणेशाय नमः ॥",
      subheading: "मंगलम् भगवान विष्णु, मंगलम् गरुड़ध्वजः। मंगलम् पुण्डरीकाक्ष, मंगलाय तनो हरिः॥",
      body: "With the divine blessings of our beloved elders, the Sharma and Verma families solicit your gracious presence to celebrate the sacred wedding ceremony of their children.",
      footer: "Haldi: 10:00 AM | Sangeet: 07:00 PM | Shubh Vivah: 11:30 AM | Reception to follow"
    },
    faqs: [
      {
        q: "Can we include all wedding rituals like Haldi, Mehendi, Sangeet, and Baarat?",
        a: "Yes! Our Hindu digital suites are built specifically for multi-day Indian weddings. Each ceremony gets its own dedicated card with its date, auspicious time (Muhurtham), dress code guide, and one-tap Google Maps link."
      },
      {
        q: "How does the guest RSVP tracking work for multiple events?",
        a: "Guests can confirm their attendance for all events or specific celebrations (e.g. Sangeet, Wedding, Reception). Responses are instantly tracked and sent directly to your WhatsApp or organized spreadsheet."
      },
      {
        q: "Can we add traditional Sanskrit shlokas and personalized family blessings?",
        a: "Yes, every template is fully customizable with your choice of Ganesha stuti, Radha Krishna verses, or personalized messages from grandparents and parents."
      }
    ]
  },

  "sikh-wedding-invitations": {
    slug: "sikh-wedding-invitations",
    category: "Sikh",
    title: "Sikh Digital Wedding Invitations",
    metaTitle: "Sikh Digital Wedding Invitations | Anand Karaj Online Cards | Vows & Knots",
    metaDescription: "Exquisite Sikh Anand Karaj digital wedding invitations. Features Ik Onkar motifs, Gurdwara ceremony schedules, Langar guidelines, Milni timings, WhatsApp RSVP, and GPS navigation.",
    badge: "Anand Karaj Digital Suite",
    heroHeading: "Royal Sikh Anand Karaj Digital Invitations",
    heroDescription: "Commemorate your blessed union in the presence of Sri Guru Granth Sahib Ji with our regal Sikh wedding invitations. Features Ik Onkar motifs, Gurdwara Lavaan timings, Langar guidelines, Milni introductions, and WhatsApp RSVP.",
    features: [
      "Sacred Ik Onkar & Khanda Artwork Motifs",
      "Gurdwara Darbar Sahib GPS Navigation",
      "Lavaan Timings & Ceremony Protocol Guidelines",
      "Milni, Tea & Langar Schedule Integration",
      "Pre-Wedding Celebrations (Mayian, Jaggo, Sangeet)",
      "Instant WhatsApp Distribution & Guest Confirmation"
    ],
    wordingTitle: "Anand Karaj Gurbani Verses & Ceremony Wording",
    wordingDescription: "Authentic Gurbani hymns paired with regal Punjabi wedding invitation traditions.",
    wordingExample: {
      heading: "ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ ॥",
      subheading: "\"They are not said to be husband and wife, who merely sit together. Rather, they alone are called husband and wife, who have one soul in two bodies.\" — Guru Amar Das Ji",
      body: "By the Grace of the Almighty, the Dhillon and Gill families request the honour of your presence and blessings for the Anand Karaj of their beloved children.",
      footer: "Baraat & Milni: 09:30 AM | Anand Karaj: 10:30 AM | Guru Ka Langar: 01:00 PM"
    },
    faqs: [
      {
        q: "Can we include Gurdwara protocols and head covering reminders for guests?",
        a: "Yes. We include a helpful 'Ceremony Etiquette' section with respectful reminders about head coverings, removing shoes, and Gurdwara seating guidelines for guests attending an Anand Karaj for the first time."
      },
      {
        q: "Can we add pre-wedding events like Mayian, Jaggo, and Sangeet?",
        a: "Absolutely. You can list all vibrant pre-wedding celebrations with their respective venues, times, and dress codes."
      },
      {
        q: "Is it easy for older relatives to open the invite on WhatsApp?",
        a: "Yes! The invitation is built for 1-tap viewing on any smartphone, with large, clear typography and zero complex app downloads."
      }
    ]
  },

  "south-indian-wedding-invitations": {
    slug: "south-indian-wedding-invitations",
    category: "South Indian",
    title: "South Indian Digital Wedding Invitations",
    metaTitle: "South Indian Digital Wedding Invitations | Muhurtham E-Invites | Vows & Knots",
    metaDescription: "Traditional South Indian digital wedding invitations for Tamil, Telugu, Kannada & Malayalam Muhurtham ceremonies. Temple motifs, Kuthu Vilakku, WhatsApp RSVP, and Google Maps.",
    badge: "Subha Muhurtham Digital Suite",
    heroHeading: "Timeless South Indian Digital Wedding Invitations",
    heroDescription: "Celebrate your sacred Muhurtham with bespoke South Indian digital wedding invitations. Specially crafted for Tamil, Telugu, Kannada, and Malayalam weddings featuring temple gopuram motifs, Kuthu Vilakku art, auspicious timings, and WhatsApp RSVP.",
    features: [
      "Traditional Kolam, Banana Tree & Kuthu Vilakku Art",
      "Precise Subha Muhurtham Astrological Timings",
      "Vratham, Nichayathartham & Reception Schedules",
      "Traditional Sadhya / Feast Timing Announcements",
      "Interactive Kalyana Mandapam Google Maps Navigation",
      "Seamless WhatsApp Guest Distribution"
    ],
    wordingTitle: "Traditional Muhurtham Invocations & Wording",
    wordingDescription: "Honoring ancestral traditions with auspicious Sanskrit invocations and respectful invitations.",
    wordingExample: {
      heading: "॥ शुभमस्तु ॥ Divine Blessings",
      subheading: "\"Dharmecha Arthecha Kaamecha Mokshecha Nathi Charami\" — United in Dharma, Purpose, and Eternal Love",
      body: "With the divine grace of the Almighty and our elders, the Iyer and Raman families warmly invite you to grace the auspicious Muhurtham of their children.",
      footer: "Vratham: 07:30 AM | Subha Muhurtham: 09:15 AM - 10:30 AM | Traditional Sadhya: 12:00 PM"
    },
    faqs: [
      {
        q: "Can we highlight the exact Muhurtham lagna timings clearly?",
        a: "Yes! The exact Muhurtham lagna window is highlighted prominently so guests know precisely when the sacred thali/mangalsutra tying ritual takes place."
      },
      {
        q: "Do you design for Tamil, Telugu, Kannada, and Malayalam weddings?",
        a: "Yes, our team creates bespoke cultural designs tailored to the specific ceremonial traditions of Tamil Brahmin, Telugu, Kannada, and Kerala Nair/Christian celebrations."
      },
      {
        q: "Can we add directions to the Kalyana Mandapam for out-of-town guests?",
        a: "Yes, an interactive Google Maps button is included that opens step-by-step turn navigation directly on guests' phones."
      }
    ]
  },

  "christian-wedding-invitations": {
    slug: "christian-wedding-invitations",
    category: "Christian",
    title: "Christian Digital Wedding Invitations",
    metaTitle: "Christian Digital Wedding Invitations | Holy Matrimony E-Invites | Vows & Knots",
    metaDescription: "Elegant Christian Holy Matrimony digital wedding invitations. Scripture verses, church ceremony schedules, reception dinner RSVP, and interactive Google Maps.",
    badge: "Holy Matrimony Digital Suite",
    heroHeading: "Graceful Christian Digital Wedding Invitations",
    heroDescription: "Commemorate your Holy Matrimony with refined digital invitations. Designed with beloved Scripture verses, Church service itineraries, dinner reception RSVPs, and seamless WhatsApp delivery.",
    features: [
      "Scripture Verses (1 Corinthians 13, Ecclesiastes 4:9)",
      "Church Nuptial Mass & Ceremony Timelines",
      "Reception Dinner & Toast Itinerary",
      "Direct Google Maps Navigation to Church & Reception",
      "Dietary Preference & RSVP Collection",
      "Instant WhatsApp Guest Link Previews"
    ],
    wordingTitle: "Holy Matrimony Invitation Wording & Scripture",
    wordingDescription: "Scripture-centered invitation phrasing with timeless elegance.",
    wordingExample: {
      heading: "In God's Grace & Love",
      subheading: "\"Love is patient, love is kind. It does not envy, it does not boast, it is not proud... Love never fails.\" — 1 Corinthians 13:4-8",
      body: "Together with their families, Joshua & Rebecca request the honour of your presence as they exchange vows of Holy Matrimony.",
      footer: "Church Service: 04:00 PM | Reception Dinner & Dancing: 07:00 PM | Kindly RSVP"
    },
    faqs: [
      {
        q: "Can we include the order of the church nuptial service?",
        a: "Yes. You can outline the ceremony hymns, reading order, and priest's blessings directly within the invitation website."
      },
      {
        q: "Can guests submit dietary requirements in their RSVP?",
        a: "Yes. Our digital RSVP form allows guests to note dietary preferences or allergies for the reception banquet."
      },
      {
        q: "Can we link a wedding gift registry or honeymoon fund?",
        a: "Yes! You can optionally include an elegant registry link for guests who wish to send wedding blessings."
      }
    ]
  }
};

export default function TraditionLanding({ slug }: { slug: string }) {
  const config = TRADITION_CONFIGS[slug] || TRADITION_CONFIGS["hindu-wedding-invitations"];
  const { data: templates, isLoading } = useTemplates(config.category);

  const whatsappMessage = `Hi Vows & Knots, I'm interested in ordering a ${config.title} for our upcoming wedding.`;

  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <SEO
        title={config.metaTitle}
        description={config.metaDescription}
        canonicalPath={`/templates/${config.slug}`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/templates" className="hover:text-primary transition-colors">Templates</Link>
          <span>/</span>
          <span className="text-foreground font-medium">{config.title}</span>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/15 border border-secondary/30 text-secondary text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles size={13} />
            <span>{config.badge}</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-6 tracking-tight">
            {config.heroHeading}
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
            {config.heroDescription}
          </p>

          {/* Quick Feature Pills */}
          <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto mb-8">
            {config.features.map((feat, i) => (
              <span
                key={i}
                className="text-xs bg-white border border-border px-3 py-1.5 rounded-full text-foreground/80 font-medium shadow-sm flex items-center gap-1.5"
              >
                <CheckCircle2 size={13} className="text-secondary shrink-0" />
                <span>{feat}</span>
              </span>
            ))}
          </div>

          {/* Order / WhatsApp CTA */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={getWhatsAppLink(whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-sm flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
            >
              <Send size={15} />
              <span>Customize via WhatsApp</span>
            </a>
            <Link href="/contact">
              <button className="px-7 py-3 rounded-full bg-white hover:bg-stone-50 text-foreground border border-border font-medium text-sm transition-all shadow-sm">
                Request Custom Design
              </button>
            </Link>
          </div>
        </div>

        {/* Curated Templates Grid */}
        <div className="mb-20">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 pb-4 border-b border-border gap-4">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-primary">
                Curated {config.category} Designs
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Tap on any design to open the interactive digital invitation preview.
              </p>
            </div>
            <Link href="/templates">
              <span className="text-xs font-semibold text-secondary hover:underline flex items-center gap-1">
                <ArrowLeft size={13} />
                <span>Browse All Traditions</span>
              </span>
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="animate-pulse bg-white rounded-xl p-4 border border-border">
                  <div className="bg-muted aspect-[3/4] rounded-lg mb-4" />
                  <div className="h-5 bg-muted rounded w-3/4 mb-3" />
                  <div className="h-4 bg-muted rounded w-1/4" />
                </div>
              ))}
            </div>
          ) : templates && templates.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {templates.map((tpl) => (
                <TemplateCard key={tpl.id} template={tpl} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-border">
              <p className="text-muted-foreground text-sm">Loading curated collection...</p>
            </div>
          )}
        </div>

        {/* Ceremonial Wording & Etiquette Section (High SEO & AI Search Value) */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-border shadow-sm mb-20">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-secondary mb-2 block">
              Ceremonial Etiquette Guide
            </span>
            <h2 className="font-display text-3xl font-bold text-primary mb-3">
              {config.wordingTitle}
            </h2>
            <p className="text-sm text-muted-foreground">
              {config.wordingDescription}
            </p>
          </div>

          {/* Sample Card Box */}
          <div className="max-w-2xl mx-auto bg-[#fdfbf7] p-8 rounded-2xl border border-secondary/30 shadow-md text-center space-y-4">
            <p className="font-display text-lg font-bold text-secondary">
              {config.wordingExample.heading}
            </p>
            <p className="text-xs text-muted-foreground italic font-serif leading-relaxed">
              {config.wordingExample.subheading}
            </p>
            <div className="w-16 h-0.5 bg-secondary/40 mx-auto my-2" />
            <p className="text-sm text-foreground leading-relaxed">
              {config.wordingExample.body}
            </p>
            <div className="pt-2 border-t border-secondary/20">
              <p className="text-xs text-secondary font-semibold uppercase tracking-wider">
                {config.wordingExample.footer}
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section with SEO Schema Eligibility */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-primary mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-muted-foreground">
              Everything you need to know about customizing your {config.category} digital wedding invitation suite.
            </p>
          </div>

          <div className="space-y-4">
            {config.faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                <h3 className="font-display text-lg font-bold text-primary mb-2">
                  {faq.q}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="bg-primary text-primary-foreground rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="font-display text-3xl sm:text-4xl font-bold">
              Ready to Craft Your {config.category} Digital Invitation?
            </h2>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Connect with our design team on WhatsApp. Share your dates, venues, and wording, and we will deliver your interactive wedding suite within 24–48 hours.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <a
                href={getWhatsAppLink(whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-full bg-secondary hover:bg-secondary/90 text-primary font-semibold text-sm transition-all shadow-lg flex items-center gap-2"
              >
                <MessageCircle size={16} />
                <span>Start on WhatsApp</span>
              </a>
              <Link href="/contact">
                <button className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-all border border-white/20">
                  Send Design Brief
                </button>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
