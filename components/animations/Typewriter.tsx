"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const Typewriter = ({ 
  text, 
  delay = 0, 
  className = "",
  cursorClassName = ""
}: { 
  text: string; 
  delay?: number; 
  className?: string;
  cursorClassName?: string;
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let currentText = "";
    let currentIndex = 0;

    const startTyping = () => {
      setIsTyping(true);
      const typeChar = () => {
        if (currentIndex < text.length) {
          currentText += text[currentIndex];
          setDisplayedText(currentText);
          currentIndex++;
          timeout = setTimeout(typeChar, 50 + Math.random() * 50); // Random delay for realistic typing
        } else {
          setIsTyping(false);
        }
      };
      typeChar();
    };

    timeout = setTimeout(startTyping, delay * 1000);

    return () => clearTimeout(timeout);
  }, [text, delay]);

  return (
    <span className={`inline-block ${className}`}>
      {displayedText}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
        className={`inline-block w-[2px] h-[1em] bg-current ml-1 align-middle ${cursorClassName}`}
        style={{ display: isTyping || displayedText.length === text.length ? 'inline-block' : 'none' }}
      />
    </span>
  );
};
