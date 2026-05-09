"use client";

import { motion } from "framer-motion";
import { Shield } from "lucide-react";

const certifications = [
  { code: "OSCP", name: "Offensive Security Certified Professional" },
  { code: "CEH", name: "Certified Ethical Hacker" },
  { code: "Security+", name: "CompTIA Security+" },
  { code: "AWS Security", name: "AWS Certified Security - Specialty" },
  { code: "eJPT", name: "eLearnSecurity Junior Penetration Tester" },
  { code: "CC", name: "Certified in Cybersecurity - ISC2" },
];

export default function Certs() {
  return (
    <section id="certs" className="py-28">
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
            Credentials
          </p>
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] mb-4 font-bold">Certifications</h2>
          <p className="text-text-dim max-w-[600px] text-[1.05rem] leading-[1.7]">
            Professional certifications and credentials.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {certifications.map((cert, idx) => (
            <motion.div
              key={cert.code}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ x: 5, borderColor: "var(--color-green)", boxShadow: "0 5px 20px rgba(0,255,136,0.1)" }}
              className="bg-dark3 border border-border p-5 flex items-center gap-4 rounded-sm relative overflow-hidden group transition-all"
            >
              <div className="absolute top-0 left-0 w-[3px] h-full bg-green opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-11 h-11 bg-[rgba(0,255,136,0.1)] border border-[rgba(0,255,136,0.2)] flex items-center justify-center flex-shrink-0 rounded-sm transition-all group-hover:bg-[rgba(0,255,136,0.15)] group-hover:border-green group-hover:scale-105">
                <Shield size={22} className="text-green" />
              </div>
              <div>
                <h4 className="text-[0.95rem] mb-1 font-semibold">{cert.code}</h4>
                <p className="font-[var(--font-mono)] text-[0.7rem] text-text-muted">{cert.name}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
