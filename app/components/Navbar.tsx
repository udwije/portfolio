"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#expertise", label: "Expertise" },
  { href: "#projects", label: "Projects" },
  { href: "#certs", label: "Certs" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = document.querySelectorAll("section[id]");
      let current = "home";
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute("id") || "home";
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const num = parseInt(e.key);
      if (num >= 1 && num <= 7) {
        e.preventDefault();
        const ids = ["home", "about", "experience", "skills", "projects", "certs", "contact"];
        const target = document.getElementById(ids[num - 1]);
        if (target) target.scrollIntoView({ behavior: "smooth" });
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 border-b ${
          scrolled
            ? "bg-[rgba(5,8,10,0.95)] shadow-[0_4px_30px_rgba(0,0,0,0.4)] border-border-light"
            : "bg-[rgba(5,8,10,0.85)] backdrop-blur-[24px] saturate-[1.2] border-border"
        }`}
      >
        <div className="container-custom flex items-center justify-between h-[70px]">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#home");
            }}
            className="font-[var(--font-mono)] text-[1.15rem] text-green tracking-[2px] font-bold relative inline-flex items-center gap-0 pl-3 transition-all hover:scale-[1.02]"
            style={{ textShadow: "0 0 10px var(--color-green-glow)" }}
          >
            <span
              className="absolute left-0 top-1/2 -translate-y-1/2 w-[6px] h-[6px] bg-green rounded-full"
              style={{
                boxShadow: "0 0 8px var(--color-green-glow)",
                animation: "pulse-dot 2s infinite",
              }}
            />
            AM<span className="text-text-dim opacity-70 font-normal tracking-[-2px] mx-[1px]">//</span>SEC
          </a>

          <ul className="hidden md:flex gap-8 list-none">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`font-[var(--font-mono)] text-[0.8rem] tracking-[1.5px] uppercase relative py-2 transition-colors duration-300 ${
                    activeSection === link.href.slice(1)
                      ? "text-green"
                      : "text-text-dim hover:text-green"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-[-2px] left-0 h-[2px] bg-green transition-all duration-300 ${
                      activeSection === link.href.slice(1) ? "w-full" : "w-0"
                    }`}
                    style={{ boxShadow: "0 0 8px var(--color-green-glow)" }}
                  />
                </a>
              </li>
            ))}
          </ul>

          <button
            className="md:hidden flex flex-col gap-[5px] bg-none border-none cursor-pointer p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block w-[25px] h-[2px] bg-green"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-[25px] h-[2px] bg-green"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block w-[25px] h-[2px] bg-green"
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-[rgba(5,8,10,0.98)] backdrop-blur-[10px] flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, idx) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="font-[var(--font-mono)] text-[1.5rem] text-text uppercase tracking-[3px]"
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
