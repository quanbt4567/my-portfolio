"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Spotlight() {
  const cursorX = useMotionValue(-1000);
  const cursorY = useMotionValue(-1000);
  
  const springConfig = { damping: 50, stiffness: 200, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 hidden md:block overflow-hidden">
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full blur-[100px] opacity-40 dark:opacity-20 pointer-events-none mix-blend-screen"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.3) 0%, rgba(147,51,234,0) 70%)",
          left: -400,
          top: -400,
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      />
    </div>
  );
}
