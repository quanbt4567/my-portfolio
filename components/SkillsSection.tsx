"use client";
import { useTranslations } from "next-intl";
import { Database, Server, Code2, Layers, Layout, Blocks } from "lucide-react";

export default function SkillsSection() {
  const t = useTranslations("Skills");

  const skills = [
    { name: "Java", icon: <Server className="w-8 h-8" />, color: "hover:border-red-500 hover:text-red-500" },
    { name: "Spring Boot", icon: <Blocks className="w-8 h-8" />, color: "hover:border-green-500 hover:text-green-500" },
    { name: "React", icon: <Layout className="w-8 h-8" />, color: "hover:border-blue-400 hover:text-blue-400" },
    { name: "Next.js", icon: <Layers className="w-8 h-8" />, color: "hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white" },
    { name: "MySQL", icon: <Database className="w-8 h-8" />, color: "hover:border-blue-600 hover:text-blue-600" },
    { name: "MongoDB", icon: <Database className="w-8 h-8" />, color: "hover:border-green-600 hover:text-green-600" },
  ];

  return (
    <section id="skills" className="px-6 max-w-7xl mx-auto w-full pt-32 scroll-mt-16">
      <div className="flex items-center gap-6 mb-12">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black dark:text-white">
          {t("title")}
        </h2>
        <div className="h-[1px] flex-1 bg-zinc-200 dark:bg-zinc-800" />
      </div>

      <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] py-8">
        <div className="flex w-max min-w-full animate-marquee hover:animate-marquee-paused gap-6 pr-6">
          {[...skills, ...skills, ...skills].map((skill, index) => (
            <div
              key={index}
              className={`group flex flex-col items-center justify-center p-8 w-48 bg-white dark:bg-zinc-900/50 rounded-3xl border border-zinc-200 dark:border-zinc-800 transition-all duration-300 text-zinc-500 dark:text-zinc-400 ${skill.color} hover:-translate-y-1 hover:shadow-xl`}
            >
              <div className="mb-4 transition-transform duration-300 group-hover:scale-110">
                {skill.icon}
              </div>
              <span className="font-semibold tracking-tight">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
