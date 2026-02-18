"use client"

import { useTheme } from "@/contexts/theme-context"
import { motion } from "motion/react"
import { Briefcase, Calendar, MapPin } from "lucide-react"
import ScrollStack, { ScrollStackItem } from "@/components/scroll-stack"

const experiences = [
  {
    titlePT: "Jovem Aprendiz",
    titleEN: "Young Apprentice",
    company: "Sesc/Senac",
    locationPT: "Porto Alegre, RS",
    locationEN: "Porto Alegre, Brazil",
    period: "05/2023 - 03/2024",
    periodEN: "May 2023 - Mar 2024",
    descriptionPT: "Formacão profissional em assistente administrativo pelo Senac, onde criei sites para apresentações de ideias, realizei interfaces virtuais para atividades, criei automações para planilhas utilizando python e dei suporte em projetos internos.",
    descriptionEN: "Professional training as administrative assistant at Senac, where I created websites for idea presentations and built virtual interfaces for activities.",
    responsibilitiesPT: [
      "Criação de sites para apresentações",
      "Interfaces virtuais para atividades",
      "Formação em assistente administrativo",
      "Suporte em projetos internos",
      "Automação de planilhas com Python",
    ],
    responsibilitiesEN: [
      "Website creation for presentations",
      "Virtual interfaces for activities",
      "Administrative assistant training",
      "Internal project support",
    ],
    tags: ["HTML", "CSS", "JavaScript", "Office", "Python"],
    gradient: "from-slate-600 to-slate-800",
  },
  {
    titlePT: "Jovem Aprendiz",
    titleEN: "Young Apprentice",
    company: "Pão dos Pobres",
    locationPT: "Porto Alegre, RS",
    locationEN: "Porto Alegre, Brazil",
    period: "09/2024 - 03/2025",
    periodEN: "Sep 2024 - Mar 2025",
    descriptionPT: "Desenhos técnicos, projetos pedagógicos que automatizei e realizei apresentações de sites para outras turmas, realizei automatizações de chamadas e planilhas para organização de materiais.",
    descriptionEN: "Technical drawings, pedagogical projects that I automated and presented websites to other classes.",
    responsibilitiesPT: [
      "Desenhos técnicos",
      "Automação de projetos pedagógicos",
      "Apresentações e criações de sites",
      "Suporte técnico",
      "Automação de chamadas e planilhas",
    ],
    responsibilitiesEN: [
      "Technical drawings",
      "Pedagogical project automation",
      "Website presentations",
      "Technical support",
      "Automation of calls and spreadsheets",
    ],
    tags: ["AutoCAD", "Python", "TypeScript", "Tailwind CSS", "Figma"],
    gradient: "from-amber-600 to-orange-700",
  },
  {
    titlePT: "Freelancer Full-Stack",
    titleEN: "Full-Stack Freelancer",
    company: "Autônomo",
    locationPT: "Porto Alegre, RS",
    locationEN: "Porto Alegre, Brazil",
    period: "06/2025 - 08/2025",
    periodEN: "Jun 2025 - Aug 2025",
    descriptionPT: "Criação de sites, lojas, portfólios, bots para Discord, chatbots para WhatsApp, landing pages e scripts para outras empresas.",
    descriptionEN: "Creation of websites, stores, portfolios, Discord bots, WhatsApp chatbots, landing pages and scripts for other companies.",
    responsibilitiesPT: [
      "Discord Bots personalizados",
      "Chatbots para WhatsApp",
      "Landing Pages e Portfolios",
      "E-commerce e lojas virtuais",
    ],
    responsibilitiesEN: [
      "Custom Discord Bots",
      "WhatsApp Chatbots",
      "Landing Pages and Portfolios",
      "E-commerce and virtual stores",
    ],
    tags: ["React", "Node.js", "Discord.js", "Python"],
    gradient: "from-blue-600 to-indigo-700",
  },
  {
    titlePT: "Estagiário Front-End",
    titleEN: "Front-End Intern",
    company: "AgromAI",
    locationPT: "Porto Alegre, RS",
    locationEN: "Porto Alegre, Brazil",
    period: "09/2025 - 11/2025",
    periodEN: "Sep 2025 - Nov 2025",
    descriptionPT: "Desenvolvimento de interfaces interativas, funcionais e responsivas com base em designs, consumir endpoints e manusear dados no frontend da aplicacao (PWA).",
    descriptionEN: "Development of interactive, functional and responsive interfaces based on designs, consuming endpoints and handling data in the frontend application (PWA).",
    responsibilitiesPT: [
      "Interfaces responsivas e interativas",
      "Consumo de APIs REST",
      "Desenvolvimento PWA",
      "Integracao com designs Figma",
    ],
    responsibilitiesEN: [
      "Responsive and interactive interfaces",
      "REST API consumption",
      "PWA Development",
      "Figma design integration",
    ],
    tags: ["React", "TypeScript", "Tailwind CSS", "PWA"],
    gradient: "from-emerald-600 to-teal-700",
  },
  {
    titlePT: "Desenvolvedor Junior",
    titleEN: "Junior Developer",
    company: "AgromAI",
    locationPT: "Porto Alegre, RS",
    locationEN: "Porto Alegre, Brazil",
    period: "11/2025 - Atual",
    periodEN: "Nov 2025 - Present",
    descriptionPT: "Atuo no desenvolvimento front-end com React e TypeScript, e, BackEnd utilizando Python com Django e FastAPI, criando interfaces com foco em funcionalidades de geolocalização e visualização de dados. Trabalho também na integração de LLMs e chatbots nas aplicações.",
    descriptionEN: "I work on front-end development with React and TypeScript, creating interfaces focused on geolocation features and data visualization. I work on integrating LLMs and chatbots into applications.",
    responsibilitiesPT: [
      "Desenvolvimento React e TypeScript",
      "Geolocalização e visualização de dados",
      "Integração de LLMs e chatbots",
      "Arquitetura frontend e componentização",
    ],
    responsibilitiesEN: [
      "React and TypeScript development",
      "Geolocation and data visualization",
      "LLM and chatbot integration",
      "Frontend architecture and componentization",
    ],
    tags: ["React", "TypeScript", "LLM", "GCP", "Docker", "Python", "Django", "FastAPI"],
    gradient: "from-cyan-500 to-teal-600",
    current: true,
  },
]

export function ExperienceSection() {
  const { t, theme, language } = useTheme()

  return (
    <section id="experience" className="relative min-h-screen">
      {/* Section Header */}
      <div className="sticky top-0 z-20 py-8 bg-gradient-to-b from-background via-background to-transparent">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-bold text-center"
        >
          {t("experience.title")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`text-center mt-4 ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {language === "pt-BR" 
            ? "Role para ver minha jornada profissional" 
            : "Scroll to see my professional journey"}
        </motion.p>
      </div>

      {/* ScrollStack Container */}
      <ScrollStack
        className={theme === "dark" ? "bg-transparent" : "bg-transparent"}
        itemDistance={60}
        itemScale={0.03}
        itemStackDistance={30}
        stackPosition="20%"
        scaleEndPosition="10%"
        baseScale={0.9}
        blurAmount={1.5}
        useWindowScroll={true}
      >
        {experiences.map((exp, index) => (
          <ScrollStackItem
            key={`${exp.company}-${exp.period}`}
            itemClassName={`${
              theme === "dark"
                ? "bg-gradient-to-br from-gray-900/95 to-gray-800/95 border border-gray-700/50"
                : "bg-gradient-to-br from-white to-gray-50 border border-gray-200"
            } backdrop-blur-sm !h-auto !min-h-[380px] !p-0`}
          >
            <div className="p-6 sm:p-8 h-full flex flex-col">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-xl bg-gradient-to-br ${exp.gradient}`}>
                      <Briefcase className="w-5 h-5 text-white" />
                    </div>
                    {exp.current && (
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        theme === "dark"
                          ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                          : "bg-cyan-100 text-cyan-700 border border-cyan-200"
                      }`}>
                        {language === "pt-BR" ? "Atual" : "Current"}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-1">
                    {language === "pt-BR" ? exp.titlePT : exp.titleEN}
                  </h3>
                  <p className={`text-lg font-medium ${
                    theme === "dark" ? "text-cyan-400" : "text-cyan-600"
                  }`}>
                    {exp.company}
                  </p>
                </div>
                
                <div className="flex flex-col gap-2 text-sm">
                  <span className={`flex items-center gap-2 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}>
                    <Calendar className="w-4 h-4" />
                    {language === "pt-BR" ? exp.period : exp.periodEN}
                  </span>
                  <span className={`flex items-center gap-2 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}>
                    <MapPin className="w-4 h-4" />
                    {language === "pt-BR" ? exp.locationPT : exp.locationEN}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className={`mb-4 text-sm sm:text-base ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}>
                {language === "pt-BR" ? exp.descriptionPT : exp.descriptionEN}
              </p>

              {/* Responsibilities */}
              <div className="flex-1">
                <h4 className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
                  theme === "dark" ? "text-gray-500" : "text-gray-400"
                }`}>
                  {language === "pt-BR" ? "Principais Atividades" : "Key Activities"}
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-4">
                  {(language === "pt-BR" ? exp.responsibilitiesPT : exp.responsibilitiesEN).map((resp, i) => (
                    <li
                      key={i}
                      className={`text-xs sm:text-sm flex items-start gap-2 ${
                        theme === "dark" ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                        theme === "dark" ? "bg-cyan-400" : "bg-cyan-500"
                      }`} />
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
                      theme === "dark"
                        ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Card number indicator */}
              <div className={`absolute top-4 right-4 sm:top-6 sm:right-6 text-5xl sm:text-6xl font-bold opacity-5 ${
                theme === "dark" ? "text-white" : "text-black"
              }`}>
                0{index + 1}
              </div>
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  )
}
