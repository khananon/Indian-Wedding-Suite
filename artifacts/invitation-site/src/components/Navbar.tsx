import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Templates", path: "/templates" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled || isMobileOpen ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border/50 py-3" : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-display text-2xl md:text-3xl font-bold text-primary tracking-wide group-hover:opacity-80 transition-opacity">
              Vows<span className="text-secondary">&</span>Knots
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={cn(
                  "text-sm font-medium tracking-wide uppercase transition-colors hover:text-primary",
                  location === link.path ? "text-primary border-b-2 border-secondary pb-1" : "text-foreground/80"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link href="/templates">
              <Button size="sm" className="rounded-full px-6">Get Started</Button>
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background border-b border-border shadow-lg py-4 px-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={cn(
                "p-3 rounded-lg text-sm font-medium uppercase tracking-wide",
                location === link.path ? "bg-primary/5 text-primary" : "text-foreground/80 hover:bg-muted"
              )}
              onClick={() => setIsMobileOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link href="/templates" onClick={() => setIsMobileOpen(false)}>
            <Button className="w-full mt-2">Get Started</Button>
          </Link>
        </div>
      )}
    </header>
  );
}
