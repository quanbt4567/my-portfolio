"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function HeroScrollParallax({ children }: { children: React.ReactNode }) {
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 500], [1, 0.8]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <motion.div style={{ scale, opacity }} className="w-full">
      {children}
    </motion.div>
  );
}
