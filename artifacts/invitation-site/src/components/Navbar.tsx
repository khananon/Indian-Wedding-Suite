import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";
import { motion, AnimatePresence } from "framer-motion";

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
    <div className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center pt-4 px-4">
      {/* Floating pill navbar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "w-full max-w-4xl rounded-full transition-all duration-500",
          "flex items-center justify-between px-5 py-2.5",
          isScrolled
            ? "bg-white/70 backdrop-blur-xl shadow-xl shadow-primary/10 border border-white/60"
            : "bg-white/50 backdrop-blur-lg shadow-lg shadow-primary/5 border border-white/50"
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <span className="font-display text-xl md:text-2xl font-bold text-primary tracking-wide hover:opacity-80 transition-opacity">
            Vows<span className="text-secondary">&</span>Knots
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={cn(
                "relative px-4 py-1.5 text-sm font-medium tracking-wide uppercase rounded-full transition-all duration-200",
                location === link.path
                  ? "text-primary bg-primary/8"
                  : "text-foreground/70 hover:text-primary hover:bg-primary/5"
              )}
            >
              {location === link.path && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute inset-0 rounded-full bg-primary/8"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{link.name}</span>
            </Link>
          ))}
        </div>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-2">
          <Link href="/templates" className="hidden md:block">
            <Button size="sm" className="rounded-full px-5 text-sm shadow-md shadow-primary/20">
              Get Started
            </Button>
          </Link>

          <button
            className="md:hidden p-2 rounded-full text-foreground hover:bg-primary/5 transition-colors"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile dropdown — floats below the pill */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="mt-2 w-full max-w-4xl rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl shadow-primary/10 py-4 px-4 flex flex-col gap-1"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={cn(
                  "px-4 py-3 rounded-2xl text-sm font-medium uppercase tracking-wide transition-colors",
                  location === link.path
                    ? "bg-primary/8 text-primary"
                    : "text-foreground/70 hover:bg-primary/5 hover:text-primary"
                )}
                onClick={() => setIsMobileOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link href="/templates" onClick={() => setIsMobileOpen(false)}>
              <Button className="w-full mt-2 rounded-2xl">Get Started</Button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
