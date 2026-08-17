"use client";
import { useTranslations } from "next-intl";
import { Send } from "lucide-react";
import FadeInUp from "./animations/FadeInUp";
import Magnetic from "./animations/Magnetic";

export default function ContactSection() {
  const t = useTranslations("Contact");

  return (
    <section id="contact" className="px-6 max-w-3xl mx-auto w-full pt-32 pb-32 text-center scroll-mt-16">
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black dark:text-white mb-6">
        {t("title")}
      </h2>
      <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-12 font-medium">
        {t("description")}
      </p>

      <form 
        action="https://formsubmit.co/26640261.quan@student.iuh.edu.vn" 
        method="POST" 
        className="flex flex-col gap-6 text-left"
      >
        <input type="hidden" name="_captcha" value="false" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 ml-1">
              {t("nameLabel")}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder={t("namePlaceholder")}
              className="p-4 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder-zinc-400"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 ml-1">
              {t("emailLabel")}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder={t("emailPlaceholder")}
              className="p-4 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder-zinc-400"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 ml-1">
            {t("messageLabel")}
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder={t("messagePlaceholder")}
            className="p-4 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none placeholder-zinc-400"
          />
        </div>
        <Magnetic>
          <button
            type="submit"
            className="group flex items-center justify-center gap-2 mt-4 px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-bold rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all w-full sm:w-auto sm:self-center"
          >
            {t("submitButton")}
            <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </Magnetic>
      </form>
    </section>
  );
}
