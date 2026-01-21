"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "@/contexts/theme-context"
import { RotatingText } from "@/components/rotating-text"
import { ChevronDown } from "lucide-react"
import { motion } from "motion/react"

export function HeroSection() {
  const { t, theme } = useTheme()
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Gradient Background */}
      <div
        className={`absolute inset-0 z-0 ${
          theme === "dark"
            ? "bg-gradient-to-b from-cyan-900/20 via-transparent to-transparent"
            : "bg-gradient-to-b from-cyan-100/50 via-transparent to-transparent"
        }`}
      />

      {/* Animated Glow Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 pb-24">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl sm:text-7xl md:text-9xl font-bold mb-6 text-balance"
        >
          Piazza
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-2xl sm:text-3xl md:text-5xl flex flex-wrap justify-center items-center gap-3"
        >
          <span className="text-foreground/80">{t("hero.subtitle")}</span>
          <RotatingText
            texts={["Developer", "Coder", "Frontend", "Backend"]}
            mainClassName="px-4 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg"
            staggerFrom="last"
            staggerDuration={0.025}
            rotationInterval={2000}
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
          />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#projects"
            className="px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-full transition-all hover:scale-105 font-medium"
          >
            {t("hero.cta.projects")}
          </a>
          <a
            href="#contact"
            className={`px-8 py-3 border-2 border-cyan-600 hover:bg-cyan-600/10 rounded-full transition-all hover:scale-105 font-medium ${
              theme === "dark" ? "text-white" : "text-cyan-600"
            }`}
          >
            {t("hero.cta.contact")}
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator - Fixed at bottom of screen */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.a
          href="#about"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="block"
        >
          <ChevronDown className="w-8 h-8 text-cyan-500" />
        </motion.a>
      </motion.div>
    </section>
  )
}
