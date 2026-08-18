"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const ImageParallax = ({ 
  src, 
  alt, 
  className = "",
  containerClassName = ""
}: { 
  src: string; 
  alt: string; 
  className?: string;
  containerClassName?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className={`overflow-hidden relative ${containerClassName}`}>
      <motion.img 
        src={src} 
        alt={alt} 
        style={{ y, scale: 1.15 }}
        className={`w-full h-full object-cover ${className}`}
      />
    </div>
  );
};
