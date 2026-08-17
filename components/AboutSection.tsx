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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
        {/* Bio Card */}
        <div className="md:col-span-2 md:row-span-2 bg-zinc-50 dark:bg-zinc-900 rounded-[2rem] p-8 md:p-12 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-center relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 to-purple-500/5 pointer-events-none transition-opacity opacity-0 group-hover:opacity-100 duration-500" />
          <ScrollRevealText 
            text={`${t("biography1")} ${t("biography2")} ${t("biography3")}`} 
            className="text-xl md:text-2xl leading-relaxed font-medium text-zinc-600 dark:text-zinc-400 relative z-10" 
          />
        </div>

        {/* Location Card */}
        <div className="bg-zinc-50 dark:bg-zinc-900 rounded-[2rem] p-8 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between relative overflow-hidden group">
          <div className="relative z-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500 dark:text-blue-400 mb-6">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm font-semibold uppercase tracking-wider mb-2">Based in</p>
            <p className="text-2xl font-bold text-black dark:text-white tracking-tight">Ho Chi Minh City<br/>Vietnam</p>
          </div>
          {/* Abstract background glow */}
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/20 dark:group-hover:bg-blue-500/30 transition-colors duration-500" />
        </div>

        {/* Availability Card */}
        <div className="bg-zinc-50 dark:bg-zinc-900 rounded-[2rem] p-8 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-center items-center relative overflow-hidden group">
          <div className="relative flex items-center justify-center mb-8 mt-4">
            <div className="w-20 h-20 bg-emerald-500/20 rounded-full absolute animate-ping" />
            <div className="w-10 h-10 bg-emerald-500 rounded-full relative z-10 border-4 border-zinc-50 dark:border-zinc-900" />
          </div>
          <p className="text-xl font-bold text-black dark:text-white text-center tracking-tight">Available for<br/>new opportunities</p>
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-transparent to-emerald-500/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </div>
    </section>
  );
}
