"use client"

import { useTheme } from "@/contexts/theme-context"
import { motion } from "motion/react"
import { Code2, Database, Globe, Server, Zap, Bot, Cloud, GitBranch } from "lucide-react"

const skills = [
  { name: "TypeScript", icon: Code2 },
  { name: "React", icon: Code2 },
  { name: "Next.js", icon: Globe },
  { name: "Tailwind CSS", icon: Code2 },
  { name: "Python", icon: Code2 },
  { name: "Django/FastAPI", icon: Server },
  { name: "Docker", icon: Cloud },
  { name: "Git/GitHub", icon: GitBranch },
  { name: "LLMs", icon: Bot },
]

export function AboutSection() {
  const { t, theme, language } = useTheme()

  const bioText = language === "pt-BR" 
    ? "Desenvolvedor com foco principal em Front-End, atuando com TypeScript, React, Next.js, Vite, Tailwind CSS e arquitetura de interfaces modernas, com experiencia em componentizacao, performance, acessibilidade e organizacao de projetos baseados em features. Possuo vivencia na refatoracao e modernizacao de codigo legado, aplicacao de boas praticas de UI/UX e construcao de aplicacoes escalaveis e manuteniveis. Tambem tenho conhecimento em backend com Python (Django e FastAPI), desenvolvimento de APIs, integracao entre servicos, treinamento de LLMs, estrutura de intents, criacao de discord bots e chatbots para whatsapp, uso de Docker, Git e Banco de Dados."
    : "Developer focused on Front-End, working with TypeScript, React, Next.js, Vite, Tailwind CSS and modern interface architecture, with experience in componentization, performance, accessibility and feature-based project organization. I have experience in refactoring and modernizing legacy code, applying UI/UX best practices and building scalable and maintainable applications. I also have backend knowledge with Python (Django and FastAPI), API development, service integration, LLM training, intent structure, discord bots and whatsapp chatbots creation, Docker, Git and Databases."

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-bold mb-12 text-center"
        >
          {t("about.title")}
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative group"
          >
            <div
              className={`relative rounded-3xl overflow-hidden shadow-2xl ${
                theme === "dark" ? "bg-cyan-900/20" : "bg-cyan-100"
              }`}
            >
              <div className="aspect-square flex items-center justify-center">
                <div className="text-9xl font-bold text-cyan-500/30">PZ</div>
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-cyan-600/20 to-transparent" />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-cyan-500/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl" />
          </motion.div>

          {/* Bio & Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <p
              className={`text-base leading-relaxed ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {bioText}
            </p>

            {/* Skills Grid */}
            <div className="grid grid-cols-3 gap-3 mt-8">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className={`p-3 rounded-xl border transition-all cursor-default ${
                    theme === "dark"
                      ? "bg-cyan-900/20 border-cyan-500/20 hover:border-cyan-500/50"
                      : "bg-cyan-50 border-cyan-200 hover:border-cyan-400"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <skill.icon className="w-4 h-4 text-cyan-500" />
                    <span className="text-sm font-medium">{skill.name}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Education Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className={`mt-8 p-6 rounded-2xl border ${
                theme === "dark"
                  ? "bg-cyan-900/20 border-cyan-500/20"
                  : "bg-cyan-50 border-cyan-200"
              }`}
            >
              <h3 className="font-semibold mb-2 text-cyan-500">
                {language === "pt-BR" ? "Formacao" : "Education"}
              </h3>
              <p className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>
                {language === "pt-BR" 
                  ? "Engenharia da Computacao - UERGS (Em andamento)" 
                  : "Computer Engineering - UERGS (In progress)"}
              </p>
              <p className={`text-sm mt-2 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                {language === "pt-BR" 
                  ? "Geracao Caldeira (Java) 2025 - Fase Final | 20+ Certificacoes Alura, IBM e Udemy" 
                  : "Caldeira Generation (Java) 2025 - Final Phase | 20+ Alura, IBM and Udemy Certifications"}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
