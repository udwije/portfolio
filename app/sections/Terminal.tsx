"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { motion } from "framer-motion";

interface TerminalLine {
  type: "prompt" | "output";
  content: string;
  outputType?: "success" | "error" | "info" | "warning";
}

// SECURITY: All command outputs are hardcoded strings. No user input is ever executed.
// This prevents command injection, XSS via output, and code execution.
const commands: Record<string, () => string> = {
  help: () =>
    `Available commands:
  help — Show this message
  whoami — About Alex
  skills — Technical skills
  experience — Work history
  contact — Contact info
  projects — Recent projects
  certs — Certifications
  status — System status
  clear — Clear terminal`,
  whoami: () =>
    `Alex Mercer — Senior Security Engineer
8+ years in offensive & defensive security.
OSCP | CEH | Security+ | AWS Security

Location: United States
Status: Available for consulting`,
  skills: () =>
    `Offensive: Penetration Testing, Red Teaming, Web App Exploitation
Defensive: Incident Response, Threat Hunting, SIEM
Cloud: AWS, Azure, GCP, Terraform, Kubernetes
Code: Python, Go, Rust, Bash, PowerShell`,
  experience: () =>
    `2022-Present: Senior Security Engineer @ Fortress Cyber
2019-2022: Security Consultant @ RedShield
2016-2019: SOC Analyst @ Global Defense Networks`,
  contact: () =>
    `Email: alex@mercersecurity.com
LinkedIn: linkedin.com/in/alexmercer
GitHub: github.com/alexmercer

Response time: Usually within 24 hours`,
  projects: () =>
    `Active Directory Attack Lab (2024)
Custom C2 Framework (2024)
AWS Security Baseline (2024)
SIEM Detection Rules (2023)
Zero Trust Network Design (2023)`,
  certs: () =>
    `OSCP — Offensive Security Certified Professional
CEH — Certified Ethical Hacker
Security+ — CompTIA
AWS Security — Specialty
eJPT — Junior Penetration Tester
CC — ISC2 Certified in Cybersecurity`,
  status: () => {
    const now = new Date().toLocaleString();
    return `System: Operational
Threat Level: Low
Last Scan: ${now}
Uptime: 99.97%
Security Posture: Hardened`;
  },
};

// SECURITY: Sanitize any user input before display to prevent XSS
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export default function Terminal() {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "output", content: "Welcome to MercerSec Terminal v2.0.0" },
    { type: "output", content: "Type 'help' to see available commands." },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [lines]);

  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "t" || e.key === "T") {
        e.preventDefault();
        document.getElementById("terminal")?.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => inputRef.current?.focus(), 600);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const rawCmd = input.trim();
      // SECURITY: Sanitize the command before displaying it
      const cmd = rawCmd.toLowerCase();

      if (cmd) {
        setHistory((prev) => [...prev, rawCmd]);
        setHistoryIndex(-1);

        // Display the command (escaped)
        setLines((prev) => [...prev, { type: "prompt", content: escapeHtml(rawCmd) }]);

        if (cmd === "clear") {
          setLines([]);
        } else if (commands[cmd]) {
          // SECURITY: Output is from hardcoded map, safe to display
          setLines((prev) => [
            ...prev,
            { type: "output", content: commands[cmd](), outputType: "success" },
          ]);
        } else {
          setLines((prev) => [
            ...prev,
            {
              type: "output",
              content: `Command not found: ${escapeHtml(rawCmd)}. Type 'help' for available commands.`,
              outputType: "error",
            },
          ]);
        }
      }
      setInput("");
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      } else if (historyIndex === -1 && history.length > 0) {
        setHistoryIndex(history.length - 1);
        setInput(history[history.length - 1]);
      }
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex >= 0 && historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  const getOutputClass = (type?: string) => {
    switch (type) {
      case "error":
        return "text-danger";
      case "success":
        return "text-green";
      case "warning":
        return "text-warning";
      default:
        return "text-text";
    }
  };

  return (
    <section id="terminal" className="py-28 bg-dark2">
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
            Interactive
          </p>
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] mb-4 font-bold">Try The Terminal</h2>
          <p className="text-text-dim max-w-[600px] text-[1.05rem] leading-[1.7]">
            Type a command. Try <span className="text-green">help</span>,{" "}
            <span className="text-green">whoami</span>,{" "}
            <span className="text-green">skills</span>,{" "}
            <span className="text-green">contact</span>, or{" "}
            <span className="text-green">clear</span>.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9 }}
        >
          <div className="bg-dark3 border border-border p-6 font-[var(--font-mono)] text-[0.9rem] rounded-sm shadow-[0_20px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)]">
            <div className="flex gap-2 mb-4 items-center">
              <div className="w-3 h-3 rounded-full bg-danger" style={{ boxShadow: "0 0 8px var(--color-danger-glow)" }} />
              <div className="w-3 h-3 rounded-full bg-warning" />
              <div className="w-3 h-3 rounded-full bg-green" style={{ boxShadow: "0 0 8px var(--color-green-glow)" }} />
              <span className="text-[0.75rem] text-text-muted ml-2">guest@mercer-sec:~</span>
            </div>

            <div
              ref={bodyRef}
              className="text-text-dim min-h-[220px] max-h-[320px] overflow-y-auto pr-2 whitespace-pre-wrap"
            >
              {lines.map((line, idx) => (
                <div key={idx} className="mb-2 leading-[1.6]">
                  {line.type === "prompt" ? (
                    <span>
                      <span className="text-green" style={{ textShadow: "0 0 8px var(--color-green-glow)" }}>
                        $
                      </span>{" "}
                      {line.content}
                    </span>
                  ) : (
                    <span className={getOutputClass(line.outputType)}>
                      {/* SECURITY: Output is from hardcoded map or escaped user input */}
                      {line.content.split("\n").map((part, i) => (
                        <span key={i}>
                          {part}
                          {i < line.content.split("\n").length - 1 && <br />}
                        </span>
                      ))}
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 mt-2">
              <span className="text-green" style={{ textShadow: "0 0 8px var(--color-green-glow)" }}>
                $
              </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter command..."
                autoComplete="off"
                spellCheck={false}
                aria-label="Terminal input"
                className="bg-transparent border-none text-text font-[var(--font-mono)] text-[0.9rem] outline-none flex-1 caret-green"
                maxLength={200}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
