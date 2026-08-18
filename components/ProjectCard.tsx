"use client";

import { ExternalLink, Code } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  onClick?: () => void;
}

export default function ProjectCard({
  title,
  description,
  technologies,
  githubUrl,
  liveUrl,
  onClick,
}: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative flex flex-col justify-between p-8 bg-white dark:bg-zinc-900/50 rounded-3xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-500 hover:shadow-2xl h-full cursor-pointer"
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-transparent to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/10 transition-colors duration-500 ease-out rounded-3xl pointer-events-none"
        style={{ transform: "translateZ(10px)" }}
      />
      
      <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
        <h3 className="text-2xl font-bold mb-4 tracking-tight text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed mb-8">
          {description}
        </p>
      </div>

      <div className="relative z-10 mt-auto space-y-6" style={{ transform: "translateZ(40px)" }}>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 text-xs font-semibold tracking-wide bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full shadow-sm"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-5 pt-6 border-t border-zinc-100 dark:border-zinc-800/60">
          {githubUrl && (
            <Link
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-zinc-500 hover:text-black dark:hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <Code className="w-5 h-5" />
              Source
            </Link>
          )}
          {liveUrl && (
            <Link
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-zinc-500 hover:text-black dark:hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <ExternalLink className="w-5 h-5" />
              Live Demo
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}
