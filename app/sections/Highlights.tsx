"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const quotes = [
  {
    text: "Security is not a product. It is a process of continuous improvement.",
    author: "// On Security Strategy",
  },
  {
    text: "The best defense is understanding how attackers think. You cannot protect what you do not understand.",
    author: "// On Offensive Mindset",
  },
  {
    text: "Compliance is not security. A checkbox does not stop a determined attacker.",
    author: "// On Risk vs Compliance",
  },
  {
    text: "Every incident is a learning opportunity. Organizations that treat it that way get stronger every time.",
    author: "// On Incident Response",
  },
];

export default function Highlights() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current]
  );

  const move = useCallback(
    (dir: number) => {
      const newIndex = (current + dir + quotes.length) % quotes.length;
      goTo(newIndex);
    },
    [current, goTo]
  );

  useEffect(() => {
    const interval = setInterval(() => move(1), 6000);
    return () => clearInterval(interval);
  }, [move]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <section id="highlights" className="py-28">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9 }}
          className="mb-16"
        >
          <p className="font-[var(--font-mono)] text-[0.75rem] text-green tracking-[4px] uppercase mb-3 flex items-center gap-4">
            <span className="block w-[30px] h-[1px] bg-green" />
            Philosophy
          </p>
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] mb-4 font-bold">How I Think</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9 }}
          className="relative overflow-hidden"
        >
          <div className="relative min-h-[300px] flex items-center justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-12 text-center"
              >
                <p className="text-[clamp(1.2rem,3vw,1.7rem)] font-semibold text-white leading-[1.6] mb-6 relative">
                  <span className="absolute -top-6 -left-4 text-[4rem] text-green opacity-30 font-serif hidden md:block">"</span>
                  {quotes[current].text}
                </p>
                <p className="font-[var(--font-mono)] text-[0.8rem] text-green tracking-[2px]">
                  {quotes[current].author}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-between items-center mt-8 relative z-10">
            <motion.button
              whileHover={{ borderColor: "var(--color-green)", color: "var(--color-green)", boxShadow: "0 0 15px var(--color-green-glow)" }}
              onClick={() => move(-1)}
              className="bg-dark3 border border-border text-text w-11 h-11 flex items-center justify-center rounded-sm cursor-pointer transition-all"
              aria-label="Previous quote"
            >
              <ChevronLeft size={20} />
            </motion.button>
            <div className="flex gap-3">
              {quotes.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goTo(idx)}
                  className={`w-[10px] h-[10px] rounded-full transition-all ${
                    idx === current
                      ? "bg-green scale-[1.2]"
                      : "bg-border hover:bg-border-light"
                  }`}
                  style={idx === current ? { boxShadow: "0 0 10px var(--color-green-glow)" } : {}}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <motion.button
              whileHover={{ borderColor: "var(--color-green)", color: "var(--color-green)", boxShadow: "0 0 15px var(--color-green-glow)" }}
              onClick={() => move(1)}
              className="bg-dark3 border border-border text-text w-11 h-11 flex items-center justify-center rounded-sm cursor-pointer transition-all"
              aria-label="Next quote"
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
