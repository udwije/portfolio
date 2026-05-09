"use client";

import { motion } from "framer-motion";

const timelineItems = [
  {
    date: "2022 — Present",
    role: "Senior Security Engineer",
    company: "Fortress Cyber Solutions",
    desc: "Lead red team operations and threat intelligence programs. Architect zero-trust implementations and mentor junior analysts. Reduced client breach exposure by 73% through proactive threat hunting.",
  },
  {
    date: "2019 — 2022",
    role: "Security Consultant",
    company: "RedShield Security",
    desc: "Delivered penetration testing and incident response services for Fortune 500 clients across finance and healthcare. Discovered 15 CVEs including critical remote code execution vulnerabilities.",
  },
  {
    date: "2016 — 2019",
    role: "SOC Analyst",
    company: "Global Defense Networks",
    desc: "Monitored enterprise security operations, investigated alerts, and developed detection rules for SIEM platforms. Automated 40% of tier-1 response workflows, reducing MTTR by 60%.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-28">
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
            Career
          </p>
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] mb-4 font-bold">Experience</h2>
          <p className="text-text-dim max-w-[600px] text-[1.05rem] leading-[1.7]">
            My professional journey through cybersecurity.
          </p>
        </motion.div>

        <div className="relative pl-8">
          <div
            className="absolute left-0 top-0 bottom-0 w-[1px]"
            style={{
              background: "linear-gradient(to bottom, var(--color-green), var(--color-border))",
            }}
          />

          {timelineItems.map((item, idx) => (
            <motion.div
              key={item.date}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="relative pb-10 group"
            >
              <div
                className="absolute left-[-2rem] top-2 w-[9px] h-[9px] rounded-full bg-dark border-2 border-green transition-all duration-300 group-hover:bg-green group-hover:scale-[1.2]"
                style={{
                  transform: "translateX(-4px)",
                  boxShadow: "0 0 10px var(--color-green-glow)",
                }}
              />
              <div className="font-[var(--font-mono)] text-[0.75rem] text-green mb-1 tracking-[1px]">
                {item.date}
              </div>
              <div className="text-[1.15rem] font-semibold text-white mb-1">{item.role}</div>
              <div className="text-[0.9rem] text-text-dim mb-2">{item.company}</div>
              <div className="text-[0.95rem] text-text-muted leading-[1.7]">{item.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
