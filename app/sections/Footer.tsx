"use client";

import { motion } from "framer-motion";

const sitemap = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
];

const socials = [
  { label: "LinkedIn", href: "https://linkedin.com", abbr: "Li" },
  { label: "GitHub", href: "https://github.com", abbr: "Gh" },
  { label: "Twitter / X", href: "https://twitter.com", abbr: "Tw" },
];

export default function Footer() {
  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-dark border-t border-border pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 mb-12">
          <div>
            <div className="font-[var(--font-mono)] text-[1.2rem] text-green tracking-[3px] mb-4">
              ALEX MERCER
            </div>
            <p className="text-text-dim text-[0.95rem] leading-[1.7]">
              Senior Security Engineer specializing in offensive security, threat intelligence, and
              proactive defense strategies. Based in the United States, working globally.
            </p>
          </div>

          <div>
            <h4 className="text-[0.9rem] mb-4 text-white tracking-[1px] font-semibold">Sitemap</h4>
            {sitemap.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="block text-text-dim text-[0.9rem] mb-2 transition-colors hover:text-green"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div>
            <h4 className="text-[0.9rem] mb-4 text-white tracking-[1px] font-semibold">Connect</h4>
            {socials.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-text-dim text-[0.9rem] mb-2 transition-colors hover:text-green"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-wrap justify-between items-center gap-4">
          <p className="font-[var(--font-mono)] text-[0.75rem] text-text-muted">
            &copy; 2024 Alex Mercer. All rights reserved. | Built with security in mind.
          </p>
          <div className="flex gap-4">
            {socials.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, borderColor: "var(--color-green)", color: "var(--color-green)", boxShadow: "0 5px 15px rgba(0,255,136,0.2)" }}
                className="w-10 h-10 bg-dark3 border border-border flex items-center justify-center text-text-dim rounded-sm transition-all font-[var(--font-mono)] text-[0.8rem]"
                aria-label={link.label}
              >
                {link.abbr}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
