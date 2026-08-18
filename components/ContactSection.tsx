"use client";
import { useTranslations } from "next-intl";
import { Send } from "lucide-react";
import Magnetic from "./animations/Magnetic";

export default function ContactSection() {
  const t = useTranslations("Contact");

  return (
    <section id="contact" className="px-6 max-w-3xl mx-auto w-full pt-24 pb-24 text-center scroll-mt-16 relative z-10">
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black dark:text-white mb-6">
        {t("title")}
      </h2>
      <p className="text-lg text-zinc-400 mb-8 font-medium">
        {t("description")}
      </p>

      <div className="flex items-center justify-center gap-6 mb-12">
        <Magnetic>
          <a href="https://www.facebook.com/minhquan.nguyentran.2709/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-zinc-900/50 hover:bg-blue-600/20 text-zinc-400 hover:text-blue-500 transition-colors inline-block">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
        </Magnetic>
        <Magnetic>
          <a href="https://github.com/quanbt4567" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-zinc-900/50 hover:bg-white/20 text-zinc-400 hover:text-white transition-colors inline-block">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          </a>
        </Magnetic>
      </div>

      <form 
        action="https://formsubmit.co/26640261.quan@student.iuh.edu.vn" 
        method="POST" 
        className="flex flex-col gap-6 text-left"
      >
        <input type="hidden" name="_captcha" value="false" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-semibold text-zinc-300 ml-1">
              {t("nameLabel")}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder={t("namePlaceholder")}
              className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder-zinc-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-semibold text-zinc-300 ml-1">
              {t("emailLabel")}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder={t("emailPlaceholder")}
              className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder-zinc-500"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-sm font-semibold text-zinc-300 ml-1">
            {t("messageLabel")}
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            placeholder={t("messagePlaceholder")}
            className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none placeholder-zinc-500"
          />
        </div>
        <Magnetic>
          <button
            type="submit"
            className="group flex items-center justify-center gap-2 mt-4 px-8 py-4 bg-white text-black font-bold rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all w-full sm:w-auto sm:self-center"
          >
            {t("submitButton")}
            <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </Magnetic>
      </form>
    </section>
  );
}
