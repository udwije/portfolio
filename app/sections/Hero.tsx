"use client";

import { motion } from "framer-motion";
import { useTypewriter } from "../hooks/useTypewriter";
import ParticleCanvas from "../components/ParticleCanvas";

export default function Hero() {
  const { displayText, isComplete } = useTypewriter({
    text: "Protecting organizations through offensive security, threat intelligence, and proactive defense strategies.",
    speed: 30,
    delay: 800,
  });

  const handleNavClick = (href: string) => {
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-[70px]"
    >
      <ParticleCanvas />

      <div className="relative z-[1] text-center max-w-[850px] px-6">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-[var(--font-mono)] text-[0.85rem] text-green tracking-[4px] uppercase mb-6 inline-flex justify-center items-center gap-3"
        >
          <span className="block w-[30px] h-[1px] bg-green opacity-50" />
          Security Engineer
          <span className="block w-[30px] h-[1px] bg-green opacity-50" />
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-[clamp(3rem,8vw,6.5rem)] font-bold leading-[1] mb-6"
        >
          Alex{" "}
          <span className="text-green relative inline-block" style={{ textShadow: "0 0 8px rgba(0,255,136,.55), 0 0 22px rgba(0,255,136,.22)" }}>
            Mercer
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-[1.15rem] text-text-dim max-w-[650px] mx-auto mb-8 min-h-[3.2em] leading-[1.7]"
        >
          {displayText}
          {!isComplete && (
            <span
              className="inline-block w-[2px] h-[1.1em] bg-green ml-[3px] align-text-bottom"
              style={{
                animation: "blink 1s step-end infinite",
                boxShadow: "0 0 8px var(--color-green-glow)",
              }}
            />
          )}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="font-[var(--font-mono)] text-[0.85rem] text-green-dim tracking-[2px] mb-10 flex items-center justify-center gap-2 flex-wrap"
        >
          <span>OSCP</span>
          <span className="text-border-light">|</span>
          <span>CEH</span>
          <span className="text-border-light">|</span>
          <span>Security+</span>
          <span className="text-border-light">|</span>
          <span>AWS Security</span>
          <span className="text-border-light">|</span>
          <span>8 Years</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <motion.button
            whileHover={{ y: -2, boxShadow: "0 10px 30px -5px rgba(0,255,136,0.35), 0 0 20px var(--color-green-glow)" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleNavClick("#projects")}
            className="inline-flex items-center gap-2 font-[var(--font-mono)] text-[0.8rem] tracking-[2px] uppercase px-8 py-4 bg-green text-dark font-bold rounded-sm cursor-pointer relative overflow-hidden"
          >
            View Projects
          </motion.button>
          <motion.button
            whileHover={{ y: -2, boxShadow: "0 0 20px var(--color-green-glow)" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleNavClick("#contact")}
            className="inline-flex items-center gap-2 font-[var(--font-mono)] text-[0.8rem] tracking-[2px] uppercase px-8 py-4 bg-transparent text-text border-[1.5px] border-border-light rounded-sm cursor-pointer hover:border-green hover:text-green transition-colors"
          >
            Get In Touch
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
