"use client";

import { useState, useEffect, useCallback } from "react";

interface UseTypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
}

export function useTypewriter({ text, speed = 35, delay = 800 }: UseTypewriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  const type = useCallback(() => {
    let i = 0;
    setDisplayText("");
    setIsComplete(false);

    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setIsComplete(true);
      }
    }, speed + Math.random() * 20);

    return () => clearInterval(interval);
  }, [text, speed]);

  useEffect(() => {
    const timer = setTimeout(() => {
      type();
    }, delay);
    return () => clearTimeout(timer);
  }, [type, delay]);

  return { displayText, isComplete };
}
