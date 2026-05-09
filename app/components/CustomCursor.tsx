"use client";

import { useEffect, useRef } from "react";
import { useMousePosition } from "../hooks/useMousePosition";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const mouse = useMousePosition();
  const isTouch = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

  const springConfig = { damping: 25, stiffness: 300 };
  const outlineX = useSpring(0, springConfig);
  const outlineY = useSpring(0, springConfig);

  const outlineRef = useRef<HTMLDivElement>(null);
  const isHovering = useRef(false);

  useEffect(() => {
    if (isTouch) return;
    outlineX.set(mouse.x);
    outlineY.set(mouse.y);
  }, [mouse.x, mouse.y, outlineX, outlineY, isTouch]);

  useEffect(() => {
    if (isTouch) return;

    const handleMouseEnter = () => { isHovering.current = true; };
    const handleMouseLeave = () => { isHovering.current = false; };

    const elements = document.querySelectorAll(
      "a, button, .skill-tag, .project-card, .stat-card, .tool-item, .cert-card, .accordion-header, .filter-btn"
    );
    elements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      <div
        className="fixed top-0 left-0 w-[5px] h-[5px] rounded-full bg-green pointer-events-none z-[10000] mix-blend-screen"
        style={{
          transform: `translate(${mouse.x - 2.5}px, ${mouse.y - 2.5}px)`,
          boxShadow: "0 0 10px var(--color-green-glow)",
        }}
      />
      <motion.div
        ref={outlineRef}
        className="fixed top-0 left-0 w-9 h-9 rounded-full border-[1.5px] border-green pointer-events-none z-[10000] mix-blend-screen"
        style={{
          x: outlineX,
          y: outlineY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovering.current ? 52 : 36,
          height: isHovering.current ? 52 : 36,
          backgroundColor: isHovering.current
            ? "rgba(0,255,136,0.08)"
            : "transparent",
          borderColor: isHovering.current ? "var(--color-green-dim)" : "var(--color-green)",
          boxShadow: isHovering.current
            ? "0 0 20px var(--color-green-glow)"
            : "none",
        }}
        transition={{ duration: 0.25 }}
      />
    </>
  );
}
