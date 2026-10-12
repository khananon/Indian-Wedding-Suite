import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Calendar, Clock, Send, CheckCircle2, ChevronRight, ExternalLink } from "lucide-react";
import { type Template } from "@/hooks/use-templates";
import { getWhatsAppLink } from "@/config/site";

interface InvitationPreviewModalProps {
  template: Template | null;
  isOpen: boolean;
  onClose: () => void;
}

interface EventItineraryItem {
  title: string;
  time: string;
  venue: string;
  address: string;
}

const TRADITION_DETAILS: Record<
  string,
  {
    greeting: string;
    subGreeting: string;
    quote: string;
    couple: string;
    date: string;
    events: EventItineraryItem[];
  }
> = {
  Muslim: {
    greeting: "In the Name of Allah, the Most Gracious, the Most Merciful",
    subGreeting: "Together with their families, cordially invite you to celebrate the Nikah & Walima of",
    quote: "And among His signs is that He created for you mates from among yourselves, that you may dwell in tranquility with them.",
    couple: "Zayd & Aalia",
    date: "Sunday, December 20, 2026",
    events: [
      {
        title: "Nikah Ceremony",
        time: "11:00 AM",
        venue: "Dar-ul-Nikah Banquet",
        address: "Civil Lines, New Delhi",
      },
      {
        title: "Walima Banquet",
        time: "07:30 PM",
        venue: "The Grand Royal Palace",
        address: "Lutyens Boulevard, New Delhi",
      },
    ],
  },
  Hindu: {
    greeting: "Om Sri Ganeshaya Namah",
    subGreeting: "With the blessings of our elders and ancestors, we cordially invite you to the auspicious Vivah of",
    quote: "Mangalam Bhagwan Vishnu, Mangalam Garudadhwaja. Mangalam Pundarikaksha, Mangalaye Tano Harih.",
    couple: "Aarav & Ananya",
    date: "Thursday, November 26, 2026",
    events: [
      {
        title: "Haldi & Mehendi",
        time: "10:00 AM",
        venue: "Courtyard of Heritage Haveli",
        address: "Jaipur, Rajasthan",
      },
      {
        title: "Sangeet & Cocktail",
        time: "07:00 PM",
        venue: "The Royal Ballroom",
        address: "Jaipur, Rajasthan",
      },
      {
        title: "Shubh Vivah & Saat Phere",
        time: "11:30 AM (Muhurtham)",
        venue: "The Lotus Mandap Pavilion",
        address: "Jaipur, Rajasthan",
      },
    ],
  },
  Sikh: {
    greeting: "Ik Onkar Satnaam",
    subGreeting: "By the Grace of the Almighty, we seek your presence and blessings for the Anand Karaj of",
    quote: "They are not said to be husband and wife, who merely sit together. Rather, they alone are called husband and wife, who have one soul in two bodies.",
    couple: "Harpreet & Jasleen",
    date: "Sunday, November 15, 2026",
    events: [
      {
        title: "Milni & Tea",
        time: "09:30 AM",
        venue: "Gurdwara Sahib Complex",
        address: "Ring Road, New Delhi",
      },
      {
        title: "Anand Karaj (Lavaan)",
        time: "10:30 AM",
        venue: "Gurdwara Darbar Sahib",
        address: "Ring Road, New Delhi",
      },
      {
        title: "Guru Ka Langar",
        time: "01:00 PM",
        venue: "Langar Hall",
        address: "Gurdwara Complex, New Delhi",
      },
    ],
  },
  Christian: {
    greeting: "The Holy Matrimony",
    subGreeting: "Request the honor of your presence to witness the celebration of their love and holy union",
    quote: "Two are better than one, because they have a good return for their labor. Love is patient, love is kind.",
    couple: "Joshua & Rebecca",
    date: "Saturday, December 12, 2026",
    events: [
      {
        title: "Church Ceremony",
        time: "04:00 PM",
        venue: "Cathedral of the Redemption",
        address: "Church Road, New Delhi",
      },
      {
        title: "Reception Dinner & Toast",
        time: "07:00 PM",
        venue: "The Palm Lawns",
        address: "Golf Links, New Delhi",
      },
    ],
  },
  "South Indian": {
    greeting: "Subhamastu | Divine Blessings",
    subGreeting: "We seek your gracious presence and blessings on the auspicious occasion of the Muhurtham of",
    quote: "Dharmecha Arthecha Kaamecha Mokshecha Nathi Charami - In righteousness, prosperity, and purpose, united forever.",
    couple: "Karthik & Meenakshi",
    date: "Friday, December 04, 2026",
    events: [
      {
        title: "Vratham & Sumangali Prarthana",
        time: "07:30 AM",
        venue: "Sri Kalyana Mandapam",
        address: "Mylapore, Chennai",
      },
      {
        title: "Subha Muhurtham",
        time: "09:15 AM - 10:30 AM",
        venue: "Sri Kalyana Mandapam",
        address: "Mylapore, Chennai",
      },
      {
        title: "Traditional Sadhya Feast",
        time: "12:00 PM",
        venue: "Dining Hall",
        address: "Mylapore, Chennai",
      },
    ],
  },
};

export function InvitationPreviewModal({
  template,
  isOpen,
  onClose,
}: InvitationPreviewModalProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [activeTab, setActiveTab] = useState<number>(0);

  if (!isOpen || !template) return null;

  const tradition = TRADITION_DETAILS[template.category] || TRADITION_DETAILS["Hindu"];
  const base = import.meta.env.BASE_URL;
  const imageSrc = template.image ? `${base}${template.image}` : `${base}images/hero-couple.jpg`;

  const handleClose = () => {
    setIsOpened(false);
    setActiveTab(0);
    onClose();
  };

  const whatsappMessage = `Hi Vows & Knots team, I loved the "${template.name}" (${template.category}) digital invitation preview! I would like to customize this design for my wedding.`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-md">
        {/* Backdrop click */}
        <div className="fixed inset-0" onClick={handleClose} />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-xl max-h-[92vh] flex flex-col bg-[#fdfbf7] rounded-3xl shadow-2xl border border-secondary/40 z-10 overflow-hidden"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 bg-primary text-primary-foreground border-b border-primary/20 shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="text-xs font-semibold tracking-wider uppercase text-secondary">
                Interactive Invitation Demo
              </span>
              <span className="text-xs text-primary-foreground/60">•</span>
              <span className="text-xs text-primary-foreground/80 font-medium">
                {template.name} ({template.category})
              </span>
            </div>
            <button
              onClick={handleClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-primary-foreground/80 hover:text-white transition-colors"
              aria-label="Close Preview"
            >
              <X size={18} />
            </button>
          </div>

          {/* Modal Body */}
          <div className="flex-grow overflow-y-auto p-4 sm:p-6">
            {!isOpened ? (
              /* Envelope View */
              <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-center">
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full max-w-sm aspect-[4/3] bg-gradient-to-br from-[#4a0e1b] to-[#2c050e] rounded-2xl p-6 shadow-2xl border-2 border-[#dfb76c]/40 flex flex-col items-center justify-between cursor-pointer group"
                  onClick={() => setIsOpened(true)}
                >
                  {/* Decorative envelope flaps */}
                  <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-[#5c1323] to-[#400b17] border-b border-[#dfb76c]/30 rounded-t-2xl flex items-end justify-center pb-2">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[#dfb76c]/70 font-serif">
                      Royal Digital Suite
                    </span>
                  </div>

                  {/* Envelope Crest / Wax Seal */}
                  <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-tr from-[#9c7524] via-[#dfb76c] to-[#fdedbe] p-0.5 shadow-xl group-hover:scale-105 transition-transform">
                    <div className="w-full h-full rounded-full bg-[#3d0914] flex flex-col items-center justify-center border border-[#dfb76c]/50">
                      <span className="font-serif text-xs font-bold text-[#dfb76c] tracking-widest">
                        V&K
                      </span>
                      <span className="text-[8px] uppercase tracking-wider text-[#dfb76c]/80 mt-0.5">
                        OPEN
                      </span>
                    </div>
                  </div>

                  {/* Recipient info on envelope */}
                  <div className="relative z-10 text-center">
                    <p className="text-xs text-[#dfb76c]/80 font-serif italic">
                      Specially Crafted for
                    </p>
                    <p className="text-base font-serif font-bold text-[#f7e2b2] tracking-wide mt-0.5">
                      Honored Family & Friends
                    </p>
                  </div>
                </motion.div>

                <p className="text-xs text-muted-foreground mt-6 font-medium">
                  Tap the royal wax seal to experience what your wedding guests see when opening your link
                </p>

                <button
                  onClick={() => setIsOpened(true)}
                  className="mt-4 px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold tracking-wider uppercase hover:bg-primary/90 transition-all shadow-md flex items-center gap-2"
                >
                  <span>Open Digital Invitation</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            ) : (
              /* Unfolded Card View */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                {/* Clean Artwork Section */}
                <div className="relative rounded-2xl overflow-hidden border border-secondary/30 shadow-md bg-white">
                  <div className="aspect-[16/10] overflow-hidden bg-stone-100">
                    <img
                      src={imageSrc}
                      alt={`${template.name} Artwork Preview`}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  {/* Gold Filigree Line */}
                  <div className="h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-80" />

                  {/* Invitation Header Text */}
                  <div className="p-5 sm:p-6 text-center space-y-2">
                    <p className="text-xs uppercase tracking-[0.2em] font-semibold text-secondary">
                      {tradition.greeting}
                    </p>
                    <p className="text-xs text-muted-foreground max-w-md mx-auto italic">
                      {tradition.subGreeting}
                    </p>
                    <h3 className="font-display text-3xl sm:text-4xl font-bold text-primary py-1">
                      {tradition.couple}
                    </h3>
                    <p className="text-sm font-medium text-foreground tracking-wide">
                      {tradition.date}
                    </p>
                    <div className="w-16 h-0.5 bg-secondary/50 mx-auto my-3" />
                    <p className="text-xs text-muted-foreground italic max-w-sm mx-auto">
                      "{tradition.quote}"
                    </p>
                  </div>
                </div>

                {/* Multi-Event Itinerary Section */}
                <div className="bg-white rounded-2xl p-5 border border-border shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <h4 className="font-display text-lg font-bold text-primary">
                      Ceremonial Itinerary
                    </h4>
                    <span className="text-[11px] font-medium text-secondary bg-secondary/10 px-2.5 py-0.5 rounded-full">
                      {tradition.events.length} Celebrations
                    </span>
                  </div>

                  {/* Event Selectors */}
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {tradition.events.map((ev, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveTab(idx)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                          activeTab === idx
                            ? "bg-primary text-primary-foreground border-primary shadow-sm"
                            : "bg-muted text-foreground/70 border-transparent hover:bg-muted/80"
                        }`}
                      >
                        {ev.title}
                      </button>
                    ))}
                  </div>

                  {/* Active Event Card */}
                  {tradition.events[activeTab] && (
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-4 rounded-xl bg-background border border-border space-y-3"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-display text-base font-bold text-primary">
                            {tradition.events[activeTab].title}
                          </p>
                          <div className="flex items-center gap-1.5 text-xs text-secondary font-medium mt-0.5">
                            <Clock size={13} />
                            <span>{tradition.events[activeTab].time}</span>
                          </div>
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-secondary/15 text-secondary border border-secondary/30">
                          Confirmed
                        </span>
                      </div>

                      <div className="flex items-start gap-2 text-xs text-muted-foreground pt-1 border-t border-border/60">
                        <MapPin size={14} className="text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-foreground">
                            {tradition.events[activeTab].venue}
                          </p>
                          <p className="text-[11px] text-muted-foreground">
                            {tradition.events[activeTab].address}
                          </p>
                        </div>
                      </div>

                      {/* Google Maps Button */}
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          `${tradition.events[activeTab].venue} ${tradition.events[activeTab].address}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-secondary transition-colors"
                      >
                        <MapPin size={13} />
                        <span>Navigate with Google Maps</span>
                        <ExternalLink size={11} />
                      </a>
                    </motion.div>
                  )}
                </div>

                {/* Interactive RSVP & Guest Actions */}
                <div className="bg-white rounded-2xl p-5 border border-border shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-display text-base font-bold text-primary">
                        Guest RSVP Response
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Guests confirm attendance directly on WhatsApp in one tap.
                      </p>
                    </div>
                    <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() =>
                        alert(
                          "Guest RSVP Confirmed: 'Joyfully Attending with 2 Guests!'"
                        )
                      }
                      className="px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-semibold text-center transition-colors"
                    >
                      Joyfully Attending
                    </button>
                    <button
                      onClick={() =>
                        alert(
                          "Guest RSVP Recorded: 'Regretfully Declining with Warm Wishes.'"
                        )
                      }
                      className="px-3 py-2 rounded-xl bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200 text-xs font-semibold text-center transition-colors"
                    >
                      Sending Blessings
                    </button>
                  </div>
                </div>

                {/* External Live Demo Link if Available */}
                {template.link && (
                  <div className="text-center pt-1">
                    <a
                      href={template.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-primary font-semibold hover:underline"
                    >
                      <span>Open Full Standalone Wedding Website Demo</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {/* Footer Bar / WhatsApp CTA */}
          <div className="p-4 bg-stone-50 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            <p className="text-xs text-muted-foreground text-center sm:text-left">
              Want this design tailored for your celebrations?
            </p>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <a
                href={getWhatsAppLink(whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold tracking-wide flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <Send size={13} />
                <span>Order on WhatsApp</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
