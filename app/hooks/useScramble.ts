"use client";

import { useCallback, useRef } from "react";

const CHARS = "!<>-_\/[]{}—=+*^?#________";

interface QueueItem {
  from: string;
  to: string;
  start: number;
  end: number;
  char?: string;
}

export function useScramble() {
  const frameRef = useRef<number>(0);
  const queueRef = useRef<QueueItem[]>([]);
  const frameCountRef = useRef(0);
  const resolveRef = useRef<(() => void) | null>(null);

  const scramble = useCallback(
    (
      element: HTMLElement,
      newText: string,
      onUpdate: (html: string) => void
    ): Promise<void> => {
      const oldText = element.innerText;
      const length = Math.max(oldText.length, newText.length);

      queueRef.current = [];
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || "";
        const to = newText[i] || "";
        const start = Math.floor(Math.random() * 20);
        const end = start + Math.floor(Math.random() * 20);
        queueRef.current.push({ from, to, start, end });
      }

      cancelAnimationFrame(frameRef.current);
      frameCountRef.current = 0;

      return new Promise<void>((resolve) => {
        resolveRef.current = resolve;

        const update = () => {
          let output = "";
          let complete = 0;

          for (let i = 0; i < queueRef.current.length; i++) {
            const item = queueRef.current[i];
            if (frameCountRef.current >= item.end) {
              complete++;
              output += item.to;
            } else if (frameCountRef.current >= item.start) {
              if (!item.char || Math.random() < 0.28) {
                item.char = CHARS[Math.floor(Math.random() * CHARS.length)];
              }
              output += `<span style="color:var(--color-green); text-shadow:0 0 8px var(--color-green-glow)">${item.char}</span>`;
            } else {
              output += item.from;
            }
          }

          onUpdate(output);

          if (complete === queueRef.current.length) {
            resolveRef.current?.();
          } else {
            frameCountRef.current++;
            frameRef.current = requestAnimationFrame(update);
          }
        };

        frameRef.current = requestAnimationFrame(update);
      });
    },
    []
  );

  return scramble;
}
