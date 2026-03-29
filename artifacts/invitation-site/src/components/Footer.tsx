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
            <h4 className="font-sans font-semibold uppercase tracking-wider text-sm mb-6 text-secondary">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-primary-foreground/80 hover:text-white transition-colors text-sm">Home</Link></li>
              <li><Link href="/templates" className="text-primary-foreground/80 hover:text-white transition-colors text-sm">Template Gallery</Link></li>
              <li><Link href="/about" className="text-primary-foreground/80 hover:text-white transition-colors text-sm">Our Story</Link></li>
              <li><Link href="/contact" className="text-primary-foreground/80 hover:text-white transition-colors text-sm">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-sans font-semibold uppercase tracking-wider text-sm mb-6 text-secondary">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-primary-foreground/80 hover:text-white transition-colors text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-white transition-colors text-sm">Terms of Service</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-white transition-colors text-sm">Refund Policy</a></li>
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
