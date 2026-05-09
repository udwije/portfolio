"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [success, setSuccess] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const draft = localStorage.getItem("contact_draft");
    if (draft) {
      const d = JSON.parse(draft);
      setName(d.name || "");
      setEmail(d.email || "");
      setMessage(d.message || "");
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (name || email || message) {
        localStorage.setItem(
          "contact_draft",
          JSON.stringify({ name, email, message, timestamp: new Date().toISOString() })
        );
        setSaved(true);
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [name, email, message]);

  const validate = () => {
    const newErrors: Record<string, boolean> = {};
    if (!name.trim()) newErrors.name = true;
    if (!email.trim() || !email.includes("@")) newErrors.email = true;
    if (!message.trim()) newErrors.message = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSuccess(true);
      localStorage.removeItem("contact_draft");
      setName("");
      setEmail("");
      setMessage("");
      setTimeout(() => setSuccess(false), 5000);
    }
  };

  const inputClass = (field: string) =>
    `w-full bg-dark3 border-[1.5px] ${
      errors[field] ? "border-danger" : "border-border"
    } text-text font-[var(--font-sans)] text-base p-4 outline-none transition-all duration-300 rounded-sm focus:border-green focus:shadow-[0_0_0_3px_rgba(0,255,136,0.1),0_0_15px_var(--color-green-pulse)]`;

  return (
    <section id="contact" className="py-28 bg-dark2">
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
            Contact
          </p>
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] mb-4 font-bold">Get In Touch</h2>
          <p className="text-text-dim max-w-[600px] text-[1.05rem] leading-[1.7]">
            Have a security challenge or want to collaborate?
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9 }}
          className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12"
        >
          <div>
            <h3 className="text-[1.4rem] mb-4 font-bold">Let&apos;s talk security.</h3>
            <p className="text-text-dim mb-8 leading-[1.7]">
              I typically respond within 24 hours. Whether you need an assessment, consultation, or
              just want to discuss the latest CVEs.
            </p>

            <a
              href="mailto:alex@mercersecurity.com"
              className="flex items-center gap-4 text-text-dim mb-4 font-[var(--font-mono)] text-[0.85rem] transition-all p-2 rounded-sm hover:text-green hover:bg-[rgba(0,255,136,0.05)]"
            >
              <span className="w-11 h-11 bg-dark3 border border-border flex items-center justify-center text-green rounded-sm transition-all hover:border-green hover:shadow-[0_0_10px_var(--color-green-glow)]">
                <Mail size={18} />
              </span>
              alex@mercersecurity.com
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-text-dim mb-4 font-[var(--font-mono)] text-[0.85rem] transition-all p-2 rounded-sm hover:text-green hover:bg-[rgba(0,255,136,0.05)]"
            >
              <span className="w-11 h-11 bg-dark3 border border-border flex items-center justify-center text-green rounded-sm transition-all hover:border-green hover:shadow-[0_0_10px_var(--color-green-glow)]">
                <Linkedin size={18} />
              </span>
              linkedin.com/in/alexmercer
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-text-dim mb-4 font-[var(--font-mono)] text-[0.85rem] transition-all p-2 rounded-sm hover:text-green hover:bg-[rgba(0,255,136,0.05)]"
            >
              <span className="w-11 h-11 bg-dark3 border border-border flex items-center justify-center text-green rounded-sm transition-all hover:border-green hover:shadow-[0_0_10px_var(--color-green-glow)]">
                <Github size={18} />
              </span>
              github.com/alexmercer
            </a>
          </div>

          <div className="bg-dark3 border border-border p-8 rounded-sm">
            <p className="font-[var(--font-mono)] text-[0.75rem] text-green tracking-[3px] mb-6">
              // QUICK MESSAGE
            </p>

            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[rgba(0,255,136,0.1)] border border-green p-4 text-green font-[var(--font-mono)] text-[0.9rem] mb-4 rounded-sm"
              >
                Message transmitted successfully. I will be in touch.
              </motion.div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="relative mb-6">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: false }));
                  }}
                  placeholder=" "
                  className={inputClass("name")}
                  aria-label="Your name"
                />
                <label className="absolute left-4 top-4 text-text-muted pointer-events-none transition-all duration-300 text-[0.95rem]">
                  Your Name
                </label>
                {errors.name && (
                  <span className="text-danger text-[0.8rem] mt-1 font-[var(--font-mono)]">
                    Name is required
                  </span>
                )}
              </div>

              <div className="relative mb-6">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: false }));
                  }}
                  placeholder=" "
                  className={inputClass("email")}
                  aria-label="Your email"
                />
                <label className="absolute left-4 top-4 text-text-muted pointer-events-none transition-all duration-300 text-[0.95rem]">
                  Your Email
                </label>
                {errors.email && (
                  <span className="text-danger text-[0.8rem] mt-1 font-[var(--font-mono)]">
                    Valid email is required
                  </span>
                )}
              </div>

              <div className="relative mb-6">
                <textarea
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) setErrors((prev) => ({ ...prev, message: false }));
                  }}
                  placeholder=" "
                  className={`${inputClass("message")} min-h-[140px] resize-y`}
                  aria-label="Your message"
                />
                <label className="absolute left-4 top-4 text-text-muted pointer-events-none transition-all duration-300 text-[0.95rem]">
                  Your Message
                </label>
                {errors.message && (
                  <span className="text-danger text-[0.8rem] mt-1 font-[var(--font-mono)]">
                    Message is required
                  </span>
                )}
              </div>

              <p
                className={`font-[var(--font-mono)] text-[0.7rem] text-text-muted mb-4 transition-opacity ${
                  saved ? "opacity-100" : "opacity-0"
                }`}
              >
                Draft auto-saved locally
              </p>

              <motion.button
                whileHover={{ y: -2, boxShadow: "0 10px 30px -5px rgba(0,255,136,0.35)" }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full font-[var(--font-mono)] text-[0.8rem] tracking-[2px] uppercase px-8 py-4 bg-green text-dark font-bold rounded-sm cursor-pointer relative overflow-hidden"
              >
                Send Message
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
