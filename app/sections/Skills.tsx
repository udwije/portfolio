"use client";

import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Offensive Security",
    skills: ["Penetration Testing", "Red Teaming", "Social Engineering", "Wireless Attacks", "Web App Exploitation", "API Security"],
  },
  {
    title: "Defensive Security",
    skills: ["Incident Response", "Threat Hunting", "Digital Forensics", "SIEM Engineering", "Malware Analysis", "EDR Management"],
  },
  {
    title: "Cloud & Architecture",
    skills: ["AWS Security", "Azure Security", "GCP Security", "Kubernetes", "Terraform", "Zero Trust"],
  },
  {
    title: "Development",
    skills: ["Python", "Bash", "PowerShell", "Go", "Rust", "C / C++"],
  },
];

const tools = [
  { icon: "💻", name: "Kali Linux" },
  { icon: "🔧", name: "Metasploit" },
  { icon: "🔑", name: "Burp Suite" },
  { icon: "📜", name: "Wireshark" },
  { icon: "🔎", name: "Nmap" },
  { icon: "🔨", name: "Splunk" },
  { icon: "🔒", name: "Hashcat" },
  { icon: "📈", name: "BloodHound" },
  { icon: "📡", name: "Cobalt Strike" },
  { icon: "🔓", name: "Velociraptor" },
  { icon: "📊", name: "Elastic" },
  { icon: "💾", name: "Volatility" },
];

export default function Skills() {
  return (
    <section id="skills" className="py-28 bg-dark2">
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
            Capabilities
          </p>
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] mb-4 font-bold">Technical Proficiency</h2>
          <p className="text-text-dim max-w-[600px] text-[1.05rem] leading-[1.7]">
            Skills and technologies I use to secure systems.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8"
        >
          {skillCategories.map((cat, catIdx) => (
            <div key={cat.title}>
              <h3 className="font-[var(--font-mono)] text-[0.85rem] text-green mb-4 tracking-[2px] uppercase flex items-center gap-2">
                <span className="text-green-dim text-[0.7rem]">&gt;</span>
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    whileHover={{ y: -3, borderColor: "rgba(0,255,136,0.45)", color: "#fff" }}
                    className="bg-dark3 border border-border px-4 py-2 font-[var(--font-mono)] text-[0.8rem] text-text rounded-sm cursor-default relative overflow-hidden transition-all hover:shadow-[0_0_18px_rgba(0,255,136,0.12),0_0_35px_rgba(0,255,136,0.06)]"
                  >
                    <span className="absolute inset-0 bg-green opacity-0 hover:opacity-[0.15] transition-opacity" />
                    <span className="relative z-[2]">{skill}</span>
                  </motion.span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="grid grid-cols-[repeat(auto-fill,minmax(110px,1fr))] gap-4"
        >
          {tools.map((tool) => (
            <motion.div
              key={tool.name}
              whileHover={{ y: -3, borderColor: "var(--color-green)" }}
              className="bg-dark3 border border-border p-5 text-center rounded-sm relative overflow-hidden group transition-all hover:shadow-[0_10px_20px_rgba(0,0,0,0.3)]"
            >
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-green scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              <div className="text-[1.5rem] text-green mb-2 transition-transform group-hover:scale-110">
                {tool.icon}
              </div>
              <div className="font-[var(--font-mono)] text-[0.75rem] text-text-dim">{tool.name}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
