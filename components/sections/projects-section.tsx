"use client"

import { useState } from "react"
import { useTheme } from "@/contexts/theme-context"
import { motion, AnimatePresence } from "motion/react"
import { ExternalLink, Github, X } from "lucide-react"

interface Project {
  id: string
  titlePT: string
  titleEN: string
  descriptionPT: string
  descriptionEN: string
  fullDescriptionPT: string
  fullDescriptionEN: string
  tags: string[]
  link?: string
  github?: string
  featured?: boolean
}

const professionalProjects: Project[] = [
  {
    id: "llm-mpsc",
    titlePT: "LLM para MPSC",
    titleEN: "LLM for MPSC",
    descriptionPT: "Sistema de processamento de linguagem natural",
    descriptionEN: "Natural language processing system",
    fullDescriptionPT: "Desenvolvimento de um sistema de LLM customizado para o Ministério Público de Santa Catarina, utilizando técnicas avançadas de NLP para análise de documentos jurídicos.",
    fullDescriptionEN: "Development of a custom LLM system for the Public Ministry of Santa Catarina, using advanced NLP techniques for legal document analysis.",
    tags: ["Python", "LangChain", "OpenAI", "FastAPI"],
    featured: true,
  },
  {
    id: "agromai",
    titlePT: "Plataforma Agromai",
    titleEN: "Agromai Platform",
    descriptionPT: "Plataforma de agricultura inteligente",
    descriptionEN: "Smart agriculture platform",
    fullDescriptionPT: "Implementações e melhorias na plataforma Agromai, incluindo novos módulos de monitoramento e análise de dados agrícolas em tempo real.",
    fullDescriptionEN: "Implementations and improvements to the Agromai platform, including new monitoring modules and real-time agricultural data analysis.",
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL", "Docker", "Python", "Django", "FastAPI", "LaTeX", "Ollama", "LLM"],
    featured: true,
  },
  {
    id: "agromai-site",
    titlePT: "Site Agromai",
    titleEN: "Agromai Website",
    descriptionPT: "Site profissional da plataforma Agromai",
    descriptionEN: "Professional website for the Agromai platform",
    fullDescriptionPT: "Implementações e melhorias no site profissional da plataforma Agromai, incluindo novas features como a home, aba da empresa e otimizações de performance.",
    fullDescriptionEN: "Implementations and improvements to the professional website of the Agromai platform, including new features such as the home page, company tab, and performance optimizations.",
    tags: ["React", "TypeScript", "Node.js", "UX/UI"],
    featured: true,
  },
  {
    id: "grafana-dashboard",
    titlePT: "Dashboard Grafana",
    titleEN: "Grafana Dashboard",
    descriptionPT: "Monitoramento e visualização de dados",
    descriptionEN: "Data monitoring and visualization",
    fullDescriptionPT: "Criação de dashboards customizados no Grafana para monitoramento de métricas de sistemas e infraestrutura.",
    fullDescriptionEN: "Creation of custom Grafana dashboards for monitoring system and infrastructure metrics.",
    tags: ["Grafana", "Prometheus", "InfluxDB"],
  },
  {
    id: "discord-bot-agromai",
    titlePT: "Discord Bot Agromai",
    titleEN: "Agromai Discord Bot",
    descriptionPT: "Automação e notificações via Discord",
    descriptionEN: "Automation and notifications via Discord",
    fullDescriptionPT: "Bot para automação de tarefas e envio de notificações importantes para a equipe através do Discord.",
    fullDescriptionEN: "Bot for task automation and sending important notifications to the team through Discord.",
    tags: ["Node.js", "Discord.js", "TypeScript"],
  },
  {
    id: "discord-bot-dayz",
    titlePT: "Discord Bot DayZ (Freelance)",
    titleEN: "DayZ Discord Bot (Freelance)",
    descriptionPT: "Bot para servidor de jogos",
    descriptionEN: "Bot for gaming server",
    fullDescriptionPT: "Desenvolvimento de bot customizado para servidor DayZ com sistema de verificação, estatísticas e integração com APIs de jogos.",
    fullDescriptionEN: "Development of custom bot for DayZ server with verification system, statistics and game API integration.",
    tags: ["Node.js", "Discord.js", "MongoDB"],
  },
  {
    id: "landing-pages",
    titlePT: "Landing Pages (Freelance)",
    titleEN: "Landing Pages (Freelance)",
    descriptionPT: "Páginas de captura e vendas",
    descriptionEN: "Capture and sales pages",
    fullDescriptionPT: "Criação de diversas landing pages otimizadas para conversão, com design responsivo e integração com ferramentas de marketing.",
    fullDescriptionEN: "Creation of various conversion-optimized landing pages with responsive design and marketing tools integration.",
    tags: ["React", "Tailwind CSS", "Next.js"],
  },
]

const personalProjects: Project[] = [
  {
    id: "pwa-books",
    titlePT: "PWA Public Books",
    titleEN: "PWA Public Books",
    descriptionPT: "Biblioteca digital progressiva",
    descriptionEN: "Progressive digital library",
    fullDescriptionPT: "Aplicativo PWA para leitura de livros públicos com modo offline, sincronização e interface intuitiva.",
    fullDescriptionEN: "PWA application for reading public books with offline mode, synchronization and intuitive interface.",
    tags: ["React", "PWA", "PostgreSQL", "Node.js"],
    featured: true,
  },
  {
    id: "demo-trade",
    titlePT: "Demo Trade",
    titleEN: "Demo Trade",
    descriptionPT: "Simulador de trading",
    descriptionEN: "Trading simulator",
    fullDescriptionPT: "Plataforma de simulação de trading com dados em tempo real, gráficos interativos e sistema de portfólio virtual.",
    fullDescriptionEN: "Trading simulation platform with real-time data, interactive charts and virtual portfolio system.",
    tags: ["React", "WebSocket", "Chart.js"],
    featured: true,
  },
  {
    id: "loja-tenis",
    titlePT: "Landing Page Loja Tênis",
    titleEN: "Sneaker Store Landing Page",
    descriptionPT: "E-commerce de calçados",
    descriptionEN: "Footwear e-commerce",
    fullDescriptionPT: "Landing page moderna para loja de tênis com animações suaves e design focado em conversão.",
    fullDescriptionEN: "Modern landing page for sneaker store with smooth animations and conversion-focused design.",
    tags: ["Next.js", "Framer Motion", "Tailwind"],
  },
  {
    id: "loja-virtual",
    titlePT: "Demo Loja Virtual",
    titleEN: "Virtual Store Demo",
    descriptionPT: "E-commerce completo",
    descriptionEN: "Complete e-commerce",
    fullDescriptionPT: "Demonstração de e-commerce completo com carrinho, checkout, integração de pagamentos e painel admin.",
    fullDescriptionEN: "Complete e-commerce demonstration with cart, checkout, payment integration and admin panel.",
    tags: ["Next.js", "Stripe", "React", "MongoDB"],
  },
  {
    id: "agendamento-medico",
    titlePT: "Demo Agendamento Médico",
    titleEN: "Medical Scheduling Demo",
    descriptionPT: "Sistema de agendamento",
    descriptionEN: "Scheduling system",
    fullDescriptionPT: "Sistema de agendamento médico com calendário interativo, notificações e gestão de pacientes.",
    fullDescriptionEN: "Medical scheduling system with interactive calendar, notifications and patient management.",
    tags: ["React", "FastAPI", "MongoDB"],
  },
  {
    id: "demo-apostas",
    titlePT: "Demo Site de Apostas",
    titleEN: "Betting Site Demo",
    descriptionPT: "Demonstração de site de apostas",
    descriptionEN: "Betting site demonstration",
    fullDescriptionPT: "Criação de uma demonstração de site de apostas com interface interativa e funcionalidades básicas.",
    fullDescriptionEN: "Creation of a betting site demo with interactive interface and basic functionalities.",
    tags: ["React", "Next.js", "Tailwind CSS"],
  },
  {
    id: "pwa-rh",
    titlePT: "PWA para RH",
    titleEN: "HR PWA",
    descriptionPT: "Aplicativo PWA para gestão de RH",
    descriptionEN: "PWA app for HR management",
    fullDescriptionPT: "Desenvolvimento de um Progressive Web App para gestão de recursos humanos, incluindo organização de pagamentos, colaboradores, página de cursos realizados, metrificação do colaborador, etc. (em andamento).",
    fullDescriptionEN: "Development of a Progressive Web App for human resources management, including payment organization, employees, completed courses page, employee metrics, etc. (in progress).",
    tags: ["PWA", "React", "FastAPI", "PSQlite", "Docker"],
  },
]

export function ProjectsSection() {
  const { t, theme, language } = useTheme()
  const [activeTab, setActiveTab] = useState<"professional" | "personal">("professional")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const projects = activeTab === "professional" ? professionalProjects : personalProjects

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-bold mb-4 text-center"
        >
          {t("projects.title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`text-center mb-12 ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {t("projects.subtitle")}
        </motion.p>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-4 mb-12"
        >
          <button
            onClick={() => setActiveTab("professional")}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              activeTab === "professional"
                ? "bg-purple-600 text-white"
                : theme === "dark"
                ? "bg-purple-900/30 text-gray-300 hover:bg-purple-900/50"
                : "bg-purple-100 text-gray-700 hover:bg-purple-200"
            }`}
          >
            {t("projects.professional")}
          </button>
          <button
            onClick={() => setActiveTab("personal")}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              activeTab === "personal"
                ? "bg-purple-600 text-white"
                : theme === "dark"
                ? "bg-purple-900/30 text-gray-300 hover:bg-purple-900/50"
                : "bg-purple-100 text-gray-700 hover:bg-purple-200"
            }`}
          >
            {t("projects.personal")}
          </button>
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                onClick={() => setSelectedProject(project)}
                className={`group relative p-6 rounded-2xl border cursor-pointer transition-all overflow-hidden ${
                  theme === "dark"
                    ? "bg-gradient-to-br from-purple-900/20 to-pink-900/10 border-purple-500/20 hover:border-purple-500/50"
                    : "bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 hover:border-purple-400"
                } ${project.featured ? "sm:col-span-2 lg:col-span-1" : ""}`}
              >
                {/* Spotlight effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10" />
                </div>

                {project.featured && (
                  <span className="absolute top-4 right-4 px-2 py-1 text-xs rounded-full bg-purple-600 text-white">
                    Featured
                  </span>
                )}

                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-2">
                    {language === "pt-BR" ? project.titlePT : project.titleEN}
                  </h3>
                  <p
                    className={`text-sm mb-4 line-clamp-2 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {language === "pt-BR" ? project.descriptionPT : project.descriptionEN}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className={`px-2 py-1 text-xs rounded-full ${
                          theme === "dark"
                            ? "bg-purple-600/30 text-purple-300"
                            : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          theme === "dark"
                            ? "bg-gray-700 text-gray-400"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className={`relative max-w-lg w-full p-8 rounded-3xl ${
                  theme === "dark"
                    ? "bg-gray-900 border border-purple-500/30"
                    : "bg-white border border-purple-200"
                }`}
              >
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-purple-500/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <h3 className="text-2xl font-bold mb-4">
                  {language === "pt-BR" ? selectedProject.titlePT : selectedProject.titleEN}
                </h3>

                <p
                  className={`mb-6 leading-relaxed ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {language === "pt-BR"
                    ? selectedProject.fullDescriptionPT
                    : selectedProject.fullDescriptionEN}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-3 py-1 text-sm rounded-full ${
                        theme === "dark"
                          ? "bg-purple-600/30 text-purple-300"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  {selectedProject.link && (
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Visit
                    </a>
                  )}
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
                        theme === "dark"
                          ? "border-purple-500/30 hover:bg-purple-500/10 text-white"
                          : "border-purple-300 hover:bg-purple-50 text-purple-600"
                      }`}
                    >
                      <Github className="w-4 h-4" />
                      GitHub
                    </a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
