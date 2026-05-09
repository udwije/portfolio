"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const filters = [
  { key: "all", label: "All" },
  { key: "red", label: "Red Team" },
  { key: "cloud", label: "Cloud" },
  { key: "ir", label: "Incident Response" },
];

const projectsData = [
  {
    category: "red",
    tag: "Research",
    year: "2024",
    title: "Active Directory Attack Lab",
    desc: "Full AD attack simulation environment to research and document modern lateral movement techniques used by APT groups. Includes Kerberoasting, Golden Ticket, and DCShadow implementations.",
    links: ["View Details →", "GitHub →"],
  },
  {
    category: "red",
    tag: "Red Team",
    year: "2024",
    title: "Custom C2 Framework",
    desc: "Lightweight command and control framework for authorized red team engagements with evasion capabilities. Features domain fronting, jitter communication, and modular payload delivery.",
    links: ["View Details →"],
  },
  {
    category: "cloud",
    tag: "Cloud Security",
    year: "2024",
    title: "AWS Security Baseline",
    desc: "Open source Terraform module implementing a hardened AWS baseline with automated compliance checking. Enforces CIS benchmarks and generates continuous compliance reports.",
    links: ["View Details →", "GitHub →"],
  },
  {
    category: "ir",
    tag: "Incident Response",
    year: "2022",
    title: "Ransomware Response Playbook",
    desc: "Comprehensive playbook covering detection, containment, recovery, and lessons learned processes. Used by 3 Fortune 500 companies. Includes forensic artifact collection and IOC sharing protocols.",
    links: ["View Details →"],
  },
  {
    category: "ir",
    tag: "Threat Detection",
    year: "2023",
    title: "SIEM Detection Rules",
    desc: "Library of 80+ SIEM detection rules mapped to MITRE ATT&CK covering common attacker techniques. Compatible with Splunk, Elastic, and Sentinel. Community download count: 2,400+.",
    links: ["View Details →", "GitHub →"],
  },
  {
    category: "cloud",
    tag: "Architecture",
    year: "2023",
    title: "Zero Trust Network Design",
    desc: "Designed and implemented zero trust network architecture for a mid-size financial organization. Reduced lateral movement risk by 89% and achieved compliance with PCI-DSS 4.0 requirements.",
    links: ["View Details →"],
  },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? projectsData
      : projectsData.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-28 bg-dark2">
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
            Portfolio
          </p>
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] mb-4 font-bold">Selected Work</h2>
          <p className="text-text-dim max-w-[600px] text-[1.05rem] leading-[1.7]">
            Projects and research I have delivered.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9 }}
          className="flex gap-2 flex-wrap mb-10"
        >
          {filters.map((f) => (
            <motion.button
              key={f.key}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveFilter(f.key)}
              className={`font-[var(--font-mono)] text-[0.75rem] tracking-[1px] uppercase px-6 py-3 cursor-pointer rounded-sm relative overflow-hidden transition-all ${
                activeFilter === f.key
                  ? "border-green text-green bg-[rgba(0,255,136,0.05)]"
                  : "border-border text-text-dim bg-dark3 hover:border-green hover:text-green"
              }`}
            >
              {activeFilter === f.key && (
                <span className="absolute inset-0 bg-green opacity-[0.1]" />
              )}
              <span className="relative z-[1]">{f.label}</span>
            </motion.button>
          ))}
        </motion.div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, idx) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ y: -5 }}
                className="bg-dark border border-border p-7 rounded-sm relative overflow-hidden group transition-all hover:border-border-light hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.4),0_10px_10px_-5px_rgba(0,0,0,0.2),0_0_30px_rgba(0,255,136,0.05)]"
              >
                <div className="absolute top-0 left-0 w-full h-[2px] bg-green scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-400" style={{ boxShadow: "0 0 10px var(--color-green-glow)" }} />
                <div className="flex justify-between items-center mb-3">
                  <span className="font-[var(--font-mono)] text-[0.65rem] text-green tracking-[2px] uppercase bg-[rgba(0,255,136,0.08)] border border-[rgba(0,255,136,0.15)] px-[0.7rem] py-1 rounded-sm">
                    {project.tag}
                  </span>
                  <span className="font-[var(--font-mono)] text-[0.7rem] text-text-muted">{project.year}</span>
                </div>
                <h3 className="text-[1.15rem] font-bold text-white mb-2 transition-colors group-hover:text-green">
                  {project.title}
                </h3>
                <p className="text-[0.9rem] text-text-dim leading-[1.7]">{project.desc}</p>
                <div className="flex gap-5 mt-5">
                  {project.links.map((link) => (
                    <a
                      key={link}
                      href="#"
                      className="font-[var(--font-mono)] text-[0.7rem] text-text-muted tracking-[1px] uppercase relative transition-colors hover:text-green group/link"
                    >
                      {link}
                      <span className="absolute bottom-[-2px] left-0 w-0 h-[1px] bg-green transition-all duration-300 group-hover/link:w-full" />
                    </a>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
