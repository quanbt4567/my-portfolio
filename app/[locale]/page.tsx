"use client";

import { useTranslations } from "next-intl";
import { useRef, useEffect, useState } from "react";
import ProjectCard from "../../components/ProjectCard";
import AboutSection from "../../components/AboutSection";
import SkillsSection from "../../components/SkillsSection";
import ContactSection from "../../components/ContactSection";
import FadeInUp from "../../components/animations/FadeInUp";
import { StaggerContainer, StaggerItem } from "../../components/animations/StaggerContainer";

import { TextReveal } from "../../components/animations/TextReveal";
import { HeroScrollParallax } from "../../components/animations/HeroScrollParallax";

type Project = {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
};

const projectsData: Project[] = [
  {
    title: "GiveAID - Charity Web App",
    description: "A charity web application connecting donors with non-governmental organizations (NGOs), charity programs, and fundraising activities. It features campaign exploration, donations, contribution history, and notifications.",
    technologies: ["ASP.NET Core", "C#", "SQL Server", "Tailwind CSS", "AWS S3"],
    githubUrl: "https://github.com/quanbt4567/GiveAID---CharityWebApp",
  },
  {
    title: "EventSphere",
    description: "A modern platform built to facilitate the management and tracking of events conveniently and intuitively. It helps users discover, create, manage, and participate in events tailored to their needs.",
    technologies: ["TypeScript", "CSS", "Docker"],
    githubUrl: "https://github.com/quanbt4567/EventSphere",
  },
  {
    title: "Semiconductor Inventory Management",
    description: "A Jakarta EE-based web application for semiconductor inventory management. Supports component management, suppliers, import/export transactions, reporting, and low-stock tracking alerts.",
    technologies: ["Java", "Jakarta EE", "EJB", "JSF", "SQL Server"],
    githubUrl: "https://github.com/quanbt4567/ASM-EJB",
  }
];

export default function Home() {
  const tHero = useTranslations("Hero");
  const tProjects = useTranslations("Projects");
  
  const footerRef = useRef<HTMLDivElement>(null);
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    if (footerRef.current) {
      setFooterHeight(footerRef.current.offsetHeight);
      
      const observer = new ResizeObserver((entries) => {
        for (let entry of entries) {
          // Add a small buffer just in case of sub-pixel rendering issues
          setFooterHeight(entry.contentRect.height);
        }
      });
      observer.observe(footerRef.current);
      return () => observer.disconnect();
    }
  }, []);

  return (
    <div className="flex flex-col w-full relative">
      <main 
        className="relative z-10 bg-white dark:bg-black rounded-b-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-[margin-bottom] duration-300"
        style={{ marginBottom: footerHeight ? `${footerHeight}px` : '100vh' }}
      >
        {/* Hero Section */}
        <section className="relative flex flex-col items-start justify-center min-h-[90vh] px-6 w-full pt-16 bg-grid-pattern overflow-hidden">
          {/* Radial gradient mask for the grid background */}
          <div className="absolute inset-0 bg-white dark:bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none" />
          
          <div className="relative z-10 max-w-6xl mx-auto w-full">
            <HeroScrollParallax>
              <FadeInUp delay={0.1}>
                <p className="text-blue-600 dark:text-blue-400 font-bold tracking-widest uppercase mb-6 text-sm">
                  {tHero("greeting")}
                </p>
              </FadeInUp>
              
              <h1 className="text-6xl sm:text-8xl font-extrabold tracking-tight mb-8">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-[length:200%_auto] animate-gradient">
                  <TextReveal text="Minh Quân." delay={0.2} />
                </span>
                <span className="block text-zinc-400 dark:text-zinc-500 mt-2">
                  <TextReveal text={`${tHero("role")}.`} delay={0.8} />
                </span>
              </h1>
              
              <FadeInUp delay={1.2}>
                <p className="max-w-2xl text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                  {tHero("description")}
                </p>
              </FadeInUp>
            </HeroScrollParallax>
          </div>
        </section>

        <AboutSection />
        
        <SkillsSection />

        {/* Projects Section */}
        <section className="px-6 max-w-7xl mx-auto w-full pt-32 pb-32 scroll-mt-16" id="projects">
          <div className="flex items-center gap-6 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black dark:text-white">
              {tProjects("title")}
            </h2>
            <div className="h-[1px] flex-1 bg-zinc-200 dark:bg-zinc-800" />
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.map((project, index) => (
              <StaggerItem key={index}>
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  technologies={project.technologies}
                  githubUrl={project.githubUrl}
                  liveUrl={project.liveUrl}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      </main>

      {/* Sticky Reveal Footer */}
      <div 
        ref={footerRef}
        className="fixed bottom-0 left-0 w-full max-h-[100dvh] overflow-y-auto z-0 bg-zinc-950 text-white"
      >
        <ContactSection />
      </div>
    </div>
  );
}
