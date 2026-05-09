"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const expertiseItems = [
  {
    icon: "🔍",
    title: "Penetration Testing",
    content:
      "Simulating real-world attacks to uncover vulnerabilities across web applications, networks, and internal systems. I manually test what automated tools miss, following PTES and OWASP standards while adapting to each client's unique risk profile. Recent engagements include black-box testing of fintech APIs and internal network assessments for healthcare providers.",
  },
  {
    icon: "🛡️",
    title: "Threat Intelligence",
    content:
      "Gathering and analyzing threat actor behavior from open source, commercial, and dark web sources. I produce actionable intelligence reports that help security teams prioritize their efforts based on real and current threats rather than generic advisories. Built custom TIP integrations for automated IOC ingestion and correlation.",
  },
  {
    icon: "🚨",
    title: "Incident Response",
    content:
      "Swift containment and investigation of security incidents. I have handled ransomware, business email compromise, insider threats, and APT intrusions across Windows, Linux, and cloud environments. I build playbooks so the same attack does not happen twice. Average incident containment time: under 4 hours.",
  },
  {
    icon: "☁️",
    title: "Cloud Security",
    content:
      "Hardening cloud environments across AWS, Azure, and GCP using modern DevSecOps practices. I implement security through infrastructure as code so every deployment is hardened by default, with automated compliance and continuous monitoring built in. Specialized in container security and Kubernetes hardening.",
  },
];

export default function Expertise() {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  return (
    <section id="expertise" className="py-28">
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
            Services
          </p>
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] mb-4 font-bold">What I Do</h2>
          <p className="text-text-dim max-w-[600px] text-[1.05rem] leading-[1.7]">
            Core areas of expertise.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9 }}
        >
          {expertiseItems.map((item, idx) => {
            const isActive = activeIndex === idx;
            return (
              <div
                key={item.title}
                className={`border rounded-sm mb-3 overflow-hidden transition-all duration-300 ${
                  isActive
                    ? "border-green shadow-[0_0_20px_var(--color-green-pulse)]"
                    : "border-border hover:border-border-light"
                }`}
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  aria-expanded={isActive}
                  className="bg-dark3 w-full px-5 py-5 flex justify-between items-center text-white text-[1.05rem] font-semibold text-left cursor-pointer transition-colors hover:text-green"
                >
                  <span>
                    {item.icon} {item.title}
                  </span>
                  <motion.span
                    animate={{ rotate: isActive ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-green text-[1.2rem] w-6 h-6 flex items-center justify-center"
                  >
                    <Plus size={20} />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 py-5 bg-[rgba(0,255,136,0.02)]">
                        <p className="text-text-dim leading-[1.8]">{item.content}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
