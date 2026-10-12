import { Link } from "wouter";
import { Instagram, Facebook, Mail, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground border-t border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-display text-3xl font-bold text-secondary mb-4">Vows & Knots</h3>
            <p className="text-primary-foreground/80 leading-relaxed max-w-md text-sm">
              Crafting elegant digital invitations for modern Indian weddings. 
              We blend traditional motifs with contemporary design to create 
              unforgettable first impressions for your special day.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-secondary hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-secondary hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-secondary hover:text-primary transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-sans font-semibold uppercase tracking-wider text-sm mb-6 text-secondary">Traditions</h4>
            <ul className="space-y-3">
              <li><Link href="/templates/muslim-wedding-invitations" className="text-primary-foreground/80 hover:text-white transition-colors text-sm">Muslim Nikah &amp; Walima</Link></li>
              <li><Link href="/templates/hindu-wedding-invitations" className="text-primary-foreground/80 hover:text-white transition-colors text-sm">Hindu Shubh Vivah</Link></li>
              <li><Link href="/templates/sikh-wedding-invitations" className="text-primary-foreground/80 hover:text-white transition-colors text-sm">Sikh Anand Karaj</Link></li>
              <li><Link href="/templates/south-indian-wedding-invitations" className="text-primary-foreground/80 hover:text-white transition-colors text-sm">South Indian Muhurtham</Link></li>
              <li><Link href="/templates/christian-wedding-invitations" className="text-primary-foreground/80 hover:text-white transition-colors text-sm">Christian Holy Matrimony</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-sans font-semibold uppercase tracking-wider text-sm mb-6 text-secondary">Explore</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-primary-foreground/80 hover:text-white transition-colors text-sm">Home</Link></li>
              <li><Link href="/templates" className="text-primary-foreground/80 hover:text-white transition-colors text-sm">All Templates</Link></li>
              <li><Link href="/create-free-wedding-invitation-card-pdf" className="text-primary-foreground/80 hover:text-white transition-colors text-sm font-semibold text-secondary">Create Free Wedding Card (PDF &amp; PNG)</Link></li>
              <li><Link href="/about" className="text-primary-foreground/80 hover:text-white transition-colors text-sm">Our Story</Link></li>
              <li><Link href="/contact" className="text-primary-foreground/80 hover:text-white transition-colors text-sm">Contact &amp; Custom Requests</Link></li>
            </ul>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} Vows & Knots. All rights reserved.
          </p>
          <p className="text-sm text-primary-foreground/60 flex items-center gap-1">
            Made with <Heart size={14} className="text-secondary" /> in India
          </p>
        </div>
      </div>
    </footer>
  );
}
