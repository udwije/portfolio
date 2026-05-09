"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { count: 8, label: "Years Experience", suffix: "" },
  { count: 120, label: "Assessments Done", suffix: "+" },
  { count: 15, label: "CVEs Discovered", suffix: "" },
  { count: 6, label: "Certifications", suffix: "" },
];

function StatCard({ count, label, suffix, index }: { count: number; label: string; suffix: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const increment = count / (duration / 16);
    let value = 0;
    const timer = setInterval(() => {
      value += increment;
      if (value >= count) {
        setCurrent(count);
        clearInterval(timer);
      } else {
        setCurrent(Math.floor(value));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, count]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-dark3 border border-border p-7 relative overflow-hidden rounded-sm transition-all duration-300 hover:border-border-light hover:-translate-y-[3px] hover:shadow-[0_0_30px_rgba(0,255,136,0.05)] group"
    >
      <div
        className="absolute top-0 left-0 w-[3px] h-full bg-green"
        style={{ boxShadow: "0 0 10px var(--color-green-glow)" }}
      />
      <div className="absolute top-0 right-0 w-[100px] h-[100px] bg-[radial-gradient(circle,var(--color-green-pulse)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity" />
      <div
        className="font-[var(--font-mono)] text-[2.5rem] text-green leading-none mb-2"
        style={{ textShadow: "0 0 20px var(--color-green-glow)" }}
      >
        {current}
        {suffix}
      </div>
      <div className="text-[0.8rem] text-text-dim uppercase tracking-[1px]">{label}</div>
    </motion.div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section id="about" className="py-28 bg-dark2">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            ref={sectionRef}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9 }}
          >
            <p className="font-[var(--font-mono)] text-[0.75rem] text-green tracking-[4px] uppercase mb-3 flex items-center gap-4">
              <span className="block w-[30px] h-[1px] bg-green" />
              About Me
            </p>
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] mb-4 font-bold">
              Think like an attacker.
              <br />
              Build like a defender.
            </h2>
            <p className="text-text-dim mb-4 leading-[1.8]">
              I am a Senior Security Engineer with 8 years of experience in offensive security and
              incident response. I help organizations find and fix vulnerabilities before attackers
              can exploit them.
            </p>
            <p className="text-text-dim mb-6 leading-[1.8]">
              My approach combines real-world attack simulation with practical defense strategies.
              Every system can be compromised. The question is whether you are ready when it happens.
            </p>
            <div className="flex gap-4 flex-wrap">
              <motion.button
                whileHover={{ y: -2 }}
                className="inline-flex items-center gap-2 font-[var(--font-mono)] text-[0.7rem] tracking-[2px] uppercase px-6 py-3 bg-transparent text-text border-[1.5px] border-border-light rounded-sm cursor-pointer hover:border-green hover:text-green transition-colors"
              >
                Download Resume
              </motion.button>
              <span className="inline-flex items-center gap-[0.3rem] font-[var(--font-mono)] text-[0.65rem] px-2 py-1 rounded-sm bg-[rgba(0,255,136,0.1)] border border-[rgba(0,255,136,0.2)] text-green">
                <span className="w-[4px] h-[4px] rounded-full bg-green" />
                Available for consulting
              </span>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, idx) => (
              <StatCard key={stat.label} {...stat} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
