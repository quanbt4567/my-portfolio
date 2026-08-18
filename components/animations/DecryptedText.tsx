"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

export const DecryptedText = ({
  text,
  speed = 40,
  className = "",
}: {
  text: string;
  speed?: number;
  className?: string;
}) => {
  const [displayedText, setDisplayedText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    let iteration = 0;

    const animate = () => {
      if (interval) clearInterval(interval);
      iteration = 0;
      
      interval = setInterval(() => {
        setDisplayedText(
          text
            .split("")
            .map((char, index) => {
              if (index < iteration) {
                return text[index];
              }
              if (char === " ") return " ";
              return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          if (interval) clearInterval(interval);
          setDisplayedText(text);
        } else {
          // Increment proportionally to text length so it always finishes in ~1.5s
          iteration += Math.max(1, text.length / (1500 / speed));
        }
      }, speed);
    };

    if (isFirstRender.current) {
      isFirstRender.current = false;
      animate();
    } else if (isHovering) {
      animate();
    } else {
      setDisplayedText(text);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [text, speed, isHovering]);

  return (
    <motion.span
      className={`inline-block ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {displayedText}
    </motion.span>
  );
};
