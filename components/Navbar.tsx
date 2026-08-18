"use client";

import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Menu, X, Moon, Sun, Languages } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Magnetic from "./animations/Magnetic";

export default function Navbar({ locale }: { locale: string }) {
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const toggleLanguage = () => {
    const nextLocale = locale === "en" ? "vi" : "en";
    let newPath = pathname;
    
    if (pathname.startsWith(`/${locale}`)) {
      newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
    } else {
      newPath = `/${nextLocale}${pathname === '/' ? '' : pathname}`;
    }
    
    router.push(newPath);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const navLinks = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}#about`, label: t("about") },
    { href: `/${locale}#skills`, label: t("skills") },
    { href: `/${locale}#projects`, label: t("projects") },
    { href: `/${locale}#contact`, label: t("contact") },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/70 dark:bg-black/70 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href={`/${locale}`} className="text-xl font-bold tracking-tighter">
              Portfolio
            </Link>
          </div>

          {/* Desktop Navigation (Moved to MacDock) */}

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Magnetic>
              <button
                onClick={toggleLanguage}
                className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center gap-2"
                aria-label="Toggle Language"
              >
                <Languages className="w-5 h-5" />
                <span className="text-xs font-bold uppercase">{locale}</span>
              </button>
            </Magnetic>
            <Magnetic>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                aria-label="Toggle Theme"
              >
                {mounted && theme === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            </Magnetic>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-black/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-zinc-600 hover:text-black hover:bg-zinc-50 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-900 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-4 px-3 py-2 mt-4 border-t border-zinc-200 dark:border-zinc-800 pt-4">
              <button
                onClick={toggleLanguage}
                className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors flex items-center gap-2 flex-1 justify-center"
              >
                <Languages className="w-5 h-5" />
                <span className="text-sm font-bold uppercase">{locale}</span>
              </button>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors flex-1 justify-center flex items-center"
              >
                {mounted && theme === "dark" ? (
                  <>
                    <Sun className="w-5 h-5 mr-2" />
                    <span className="text-sm font-bold">Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-5 h-5 mr-2" />
                    <span className="text-sm font-bold">Dark Mode</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
