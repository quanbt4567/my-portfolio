"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function ScrollRevealText({ text, className = "" }: { text: string; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "start 25%"],
  });

  const words = text.split(" ");

  return (
    <p ref={containerRef} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const y = useTransform(scrollYProgress, [start, end], [10, 0]);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const filter = useTransform(scrollYProgress, [start, end], ["blur(4px)", "blur(0px)"]);

        return (
          <span key={i} className="mr-1.5 mb-1 relative">
            <span className="absolute opacity-10 text-zinc-500">{word}</span>
            <motion.span style={{ opacity, y, filter }} className="inline-block text-black dark:text-white">
              {word}
            </motion.span>
          </span>
        );
      })}
    </p>
  );
}
