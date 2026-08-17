"use client";
import { useTranslations } from "next-intl";
import FadeInUp from "./animations/FadeInUp";
import { ScrollRevealText } from "./animations/ScrollRevealText";

export default function AboutSection() {
  const t = useTranslations("About");

  return (
    <section id="about" className="px-6 max-w-7xl mx-auto w-full pt-32 scroll-mt-16">
      <FadeInUp>
        <div className="flex items-center gap-6 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black dark:text-white">
            {t("title")}
          </h2>
          <div className="h-[1px] flex-1 bg-zinc-200 dark:bg-zinc-800" />
        </div>
      </FadeInUp>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <ScrollRevealText 
            text={`${t("biography1")} ${t("biography2")} ${t("biography3")}`} 
            className="text-2xl md:text-3xl leading-relaxed font-medium text-zinc-600 dark:text-zinc-400" 
          />
        </div>
        <div className="relative group rounded-[2rem] overflow-hidden aspect-square lg:aspect-auto lg:h-full min-h-[400px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 transition-colors duration-500 group-hover:from-blue-500/20 group-hover:to-purple-500/20" />
          <div className="text-zinc-400 dark:text-zinc-600 font-mono text-sm tracking-widest uppercase relative z-10">
            [Profile Image / Avatar]
          </div>
        </div>
      </div>
    </section>
  );
}
