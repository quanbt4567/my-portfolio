import { useTranslations } from "next-intl";
import ProjectCard from "../../components/ProjectCard";
import AboutSection from "../../components/AboutSection";
import SkillsSection from "../../components/SkillsSection";
import ContactSection from "../../components/ContactSection";
import FadeInUp from "../../components/animations/FadeInUp";
import { StaggerContainer, StaggerItem } from "../../components/animations/StaggerContainer";

import { TextReveal } from "../../components/animations/TextReveal";
import { HeroScrollParallax } from "../../components/animations/HeroScrollParallax";

const projectsData = [
  {
    title: "RollFilm Integrated Cinema Management System",
    description: "A comprehensive cinema management platform featuring seat reservations, ticketing, and administrative dashboards. Built with a scalable database architecture to handle high concurrent user traffic seamlessly.",
    technologies: ["Next.js", "Java", "Spring Boot", "PostgreSQL", "Tailwind CSS"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    title: "E-Commerce Analytics Dashboard",
    description: "Real-time analytics dashboard for e-commerce platforms with interactive data visualizations and reporting tools. Provides deep insights into user behavior and sales metrics.",
    technologies: ["React", "TypeScript", "Node.js", "GraphQL", "Recharts"],
    githubUrl: "https://github.com",
  },
  {
    title: "AI-Powered Content Generator",
    description: "SaaS application that leverages advanced machine learning models to generate high-quality marketing copy and blog posts on demand.",
    technologies: ["Next.js", "OpenAI API", "Prisma", "Stripe"],
    liveUrl: "https://example.com",
  }
];

export default function Home() {
  const tHero = useTranslations("Hero");
  const tProjects = useTranslations("Projects");

  return (
    <div className="flex flex-col w-full pb-10 relative">
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
              <span className="block text-black dark:text-white">
                <TextReveal text="John Doe." delay={0.2} />
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
      <section className="px-6 max-w-7xl mx-auto w-full pt-32 scroll-mt-16" id="projects">
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

      <ContactSection />
    </div>
  );
}
