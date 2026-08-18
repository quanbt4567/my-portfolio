"use client";

import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Home, User, Code2, Briefcase, Mail } from "lucide-react";
import { useTranslations } from "next-intl";

interface DockItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  mouseX: MotionValue<number>;
}

function DockItem({ href, icon, label, mouseX }: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className="aspect-square rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center relative group"
    >
      <Link href={href} className="w-full h-full flex items-center justify-center">
        <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-transform px-2 py-1 bg-black text-white text-xs rounded-md shadow-lg pointer-events-none whitespace-nowrap z-50">
          {label}
        </span>
        <div className="w-1/2 h-1/2 text-zinc-600 dark:text-zinc-300 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
          {icon}
        </div>
      </Link>
    </motion.div>
  );
}

export function MacDock({ locale }: { locale: string }) {
  const t = useTranslations("Navigation");
  const mouseX = useMotionValue(Infinity);

  const navItems = [
    { href: `/${locale}`, label: t("home"), icon: <Home /> },
    { href: `/${locale}#about`, label: t("about"), icon: <User /> },
    { href: `/${locale}#skills`, label: t("skills"), icon: <Code2 /> },
    { href: `/${locale}#projects`, label: t("projects"), icon: <Briefcase /> },
    { href: `/${locale}#contact`, label: t("contact"), icon: <Mail /> },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 hidden md:flex">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="flex items-end gap-4 rounded-2xl bg-white/50 dark:bg-black/50 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 p-4 pb-3 shadow-2xl"
      >
        {navItems.map((item) => (
          <DockItem
            key={item.label}
            href={item.href}
            icon={item.icon}
            label={item.label}
            mouseX={mouseX}
          />
        ))}
      </motion.div>
    </div>
  );
}
