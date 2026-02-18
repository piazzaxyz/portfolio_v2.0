"use client"

import { useState, useEffect } from "react"
import { useTheme } from "@/contexts/theme-context"
import { Sun, Moon, Menu, X, Linkedin, Github, Instagram } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"

const navItems = [
  { key: "nav.home", href: "#home" },
  { key: "nav.about", href: "#about" },
  { key: "nav.experience", href: "#experience" },
  { key: "nav.projects", href: "#projects" },
  { key: "nav.gallery", href: "#gallery" },
  { key: "nav.contact", href: "#contact" },
]

export function Header() {
  const { theme, toggleTheme, language, toggleLanguage, t } = useTheme()
  const cvPath = encodeURI("/Eduardo Piazza - Currículo 2026.pdf")
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? theme === "dark"
              ? "bg-black/80 backdrop-blur-xl shadow-lg"
              : "bg-white/80 backdrop-blur-xl shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#home"
              className="text-xl font-bold tracking-tight hover:text-purple-500 transition-colors"
            >
              Eduardo Piazza
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className="relative text-sm font-medium hover:text-purple-500 transition-colors group"
                >
                  {t(item.key)}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* CV Download, Theme & Language Toggle */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href={cvPath}
                download
                className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-800 transition-colors"
              >
                {language === "pt-BR" ? "Currículo" : "Resume"}
              </a>
              <button
                onClick={toggleLanguage}
                className="px-3 py-1.5 text-sm font-medium rounded-full border border-blue-400/30 hover:bg-blue-500/10 transition-colors"
              >
                {language === "pt-BR" ? "PT" : "EN"}
              </button>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-purple-500/10 transition-colors"
                aria-label="Toggle theme"
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: theme === "dark" ? 0 : 180 }}
                  transition={{ duration: 0.3 }}
                >
                  {theme === "dark" ? (
                    <Moon className="w-5 h-5" />
                  ) : (
                    <Sun className="w-5 h-5" />
                  )}
                </motion.div>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-full hover:bg-purple-500/10 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className={`fixed inset-0 z-[100] ${
              theme === "dark" ? "bg-[#060010]" : "bg-[#f5f5f5]"
            }`}
          >
            <div className="flex flex-col h-full p-8">
              <div className="flex justify-between items-center mb-12">
                <span className="text-xl font-bold">Eduardo Piazza</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-purple-500/10 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex-1">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.key}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 py-4 text-3xl font-medium hover:text-purple-500 transition-colors border-b border-purple-500/10"
                  >
                    <span className="text-purple-500 text-sm font-mono">
                      0{index + 1}
                    </span>
                    {t(item.key)}
                  </motion.a>
                ))}
              </nav>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <button
                    onClick={toggleLanguage}
                    className="flex-1 py-3 text-sm font-medium rounded-full border border-purple-500/30 hover:bg-purple-500/10 transition-colors"
                  >
                    {language === "pt-BR" ? "PT-BR" : "EN-US"}
                  </button>
                  <button
                    onClick={toggleTheme}
                    className="flex-1 py-3 flex items-center justify-center gap-2 rounded-full border border-purple-500/30 hover:bg-purple-500/10 transition-colors"
                  >
                    {theme === "dark" ? (
                      <>
                        <Moon className="w-4 h-4" /> Dark
                      </>
                    ) : (
                      <>
                        <Sun className="w-4 h-4" /> Light
                      </>
                    )}
                  </button>
                </div>

                <div className="flex justify-center gap-6">
                  <a
                    href="https://www.linkedin.com/in/eduardo-siqueira-de-melo-piazza"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-purple-500/10 hover:bg-purple-500/20 transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="https://github.com/piazzaxyz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-purple-500/10 hover:bg-purple-500/20 transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.instagram.com/piazzadev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-purple-500/10 hover:bg-purple-500/20 transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
                <div className="mt-6 flex justify-center">
                  <a
                    href={cvPath}
                    download
                    className="px-6 py-3 rounded-full bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors"
                  >
                    {language === "pt-BR" ? "Baixar Currículo" : "Download Resume"}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
