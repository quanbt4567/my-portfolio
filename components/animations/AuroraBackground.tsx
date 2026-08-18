"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AuroraBackgroundProps {
  children: ReactNode;
  className?: string;
}

export const AuroraBackground = ({ children, className = "" }: AuroraBackgroundProps) => {
  return (
    <div className={`relative flex flex-col h-full w-full bg-zinc-50 dark:bg-zinc-900 transition-bg overflow-hidden ${className}`}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-50 dark:opacity-40">
          <motion.div
            initial={{ "--x": "0%", "--y": "0%" }}
            animate={{ "--x": "100%", "--y": "100%" }}
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
              duration: 20,
              ease: "linear",
            }}
            className="absolute inset-0 bg-gradient-to-tr from-blue-300 via-purple-300 to-emerald-300 dark:from-blue-800 dark:via-purple-800 dark:to-emerald-800 blur-[100px] opacity-50 transform-gpu mix-blend-multiply dark:mix-blend-color-dodge"
            style={{
              transform: "translate(var(--x), var(--y)) scale(1.5)",
            }}
          />
        </div>
      </div>
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
};
