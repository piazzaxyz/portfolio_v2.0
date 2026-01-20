"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

type Theme = "dark" | "light"
type Language = "pt-BR" | "en-US"

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  language: Language
  toggleLanguage: () => void
  t: (key: string) => string
}

const translations = {
  "pt-BR": {
    // Navigation
    "nav.home": "Início",
    "nav.about": "Sobre",
    "nav.experience": "Experiência",
    "nav.projects": "Projetos",
    "nav.gallery": "Galeria",
    "nav.contact": "Contato",
    
    // Hero
    "hero.subtitle": "Full Stack",
    "hero.cta.projects": "Ver Projetos",
    "hero.cta.contact": "Entre em Contato",
    
    // About
    "about.title": "Sobre Mim",
    "about.bio": "Desenvolvedor Full Stack apaixonado por criar soluções digitais inovadoras. Com experiência em desenvolvimento web moderno, busco sempre entregar código limpo, performático e escalável. Atualmente focado em React, TypeScript e Node.js.",
    "about.studying": "Cursando:",
    "about.course": "Ciência da Computação",
    
    // Experience
    "experience.title": "Experiência Profissional",
    "experience.present": "Presente",
    
    // Projects
    "projects.title": "Projetos em Destaque",
    "projects.subtitle": "Trabalhos Profissionais e Pessoais",
    "projects.professional": "Profissional",
    "projects.personal": "Pessoal",
    
    // Gallery
    "gallery.title": "Galeria Dev Life",
    "gallery.subtitle": "Momentos dos bastidores",
    
    // Terminal
    "terminal.title": "Terminal Interativo",
    "terminal.placeholder": "Digite 'help' para começar...",
    
    // Contact
    "contact.title": "Entre em Contato",
    "contact.subtitle": "Vamos trabalhar juntos!",
    "contact.name": "Qual é o seu nome?",
    "contact.email": "Seu endereço de email",
    "contact.reason": "O que te traz aqui?",
    "contact.message": "Me conte mais",
    "contact.success": "Mensagem Enviada!",
    "contact.success.sub": "Entrarei em contato em breve.",
    "contact.reason.hire": "Quero te contratar",
    "contact.reason.collaborate": "Vamos colaborar",
    "contact.reason.question": "Tenho uma pergunta",
    "contact.reason.other": "Outro",
    "contact.back": "Voltar",
    "contact.next": "Próximo",
    "contact.send": "Enviar",
    
    // Footer
    "footer.quicklinks": "Links Rápidos",
    "footer.contact": "Contato",
    "footer.rights": "Todos os direitos reservados.",
    
    // Terminal commands
    "terminal.help": "Comandos disponíveis: help, about, contact, experience, education, skills, clear, easteregg",
    "terminal.about.response": "PZ - Desenvolvedor Front-End focado em TypeScript, React, Next.js e Tailwind CSS, com experiência em LLMs e chatbots.",
    "terminal.contact.response": "Email: piazza.vsc@gmail.com | Tel: (51) 9 9369-3721 | Porto Alegre/RS",
    "terminal.education.response": "Engenharia da Computação - UERGS (Em andamento) | Geração Caldeira (Java) 2025 | 20+ Certificações",
    "terminal.skills.response": "TypeScript, React, Next.js, Tailwind CSS, Python, Django, FastAPI, Docker, GCP, Git, LLMs",
    "terminal.easteregg": "O sucesso é a soma de pequenos esforços repetidos dia após dia. Continue codando!",
    "terminal.notfound": "Comando não encontrado. Digite 'help' para ver os comandos disponíveis.",
  },
  "en-US": {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.projects": "Projects",
    "nav.gallery": "Gallery",
    "nav.contact": "Contact",
    
    // Hero
    "hero.subtitle": "Full Stack",
    "hero.cta.projects": "View Projects",
    "hero.cta.contact": "Contact Me",
    
    // About
    "about.title": "About Me",
    "about.bio": "Full Stack Developer passionate about creating innovative digital solutions. With experience in modern web development, I always strive to deliver clean, performant, and scalable code. Currently focused on React, TypeScript, and Node.js.",
    "about.studying": "Studying:",
    "about.course": "Computer Science",
    
    // Experience
    "experience.title": "Professional Experience",
    "experience.present": "Present",
    
    // Projects
    "projects.title": "Featured Projects",
    "projects.subtitle": "Professional & Personal Work",
    "projects.professional": "Professional",
    "projects.personal": "Personal",
    
    // Gallery
    "gallery.title": "Dev Life Gallery",
    "gallery.subtitle": "Behind the scenes moments",
    
    // Terminal
    "terminal.title": "Interactive Terminal",
    "terminal.placeholder": "Type 'help' to get started...",
    
    // Contact
    "contact.title": "Get In Touch",
    "contact.subtitle": "Let's work together!",
    "contact.name": "What's your name?",
    "contact.email": "Your email address",
    "contact.reason": "What brings you here?",
    "contact.message": "Tell me more",
    "contact.success": "Message Sent!",
    "contact.success.sub": "I'll get back to you soon.",
    "contact.reason.hire": "I want to hire you",
    "contact.reason.collaborate": "Let's collaborate",
    "contact.reason.question": "I have a question",
    "contact.reason.other": "Other",
    "contact.back": "Back",
    "contact.next": "Next",
    "contact.send": "Send",
    
    // Footer
    "footer.quicklinks": "Quick Links",
    "footer.contact": "Contact",
    "footer.rights": "All rights reserved.",
    
    // Terminal commands
    "terminal.help": "Available commands: help, about, contact, experience, education, skills, clear, easteregg",
    "terminal.about.response": "PZ - Front-End Developer focused on TypeScript, React, Next.js and Tailwind CSS, with experience in LLMs and chatbots.",
    "terminal.contact.response": "Email: piazza.vsc@gmail.com | Tel: +55 51 9 9369-3721 | Porto Alegre/RS, Brazil",
    "terminal.education.response": "Computer Engineering - UERGS (In progress) | Caldeira Generation (Java) 2025 | 20+ Certifications",
    "terminal.skills.response": "TypeScript, React, Next.js, Tailwind CSS, Python, Django, FastAPI, Docker, GCP, Git, LLMs",
    "terminal.easteregg": "Success is the sum of small efforts repeated day after day. Keep coding!",
    "terminal.notfound": "Command not found. Type 'help' to see available commands.",
  },
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark")
  const [language, setLanguage] = useState<Language>("pt-BR")

  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme") as Theme
    const savedLanguage = localStorage.getItem("portfolio-language") as Language
    
    if (savedTheme) setTheme(savedTheme)
    if (savedLanguage) setLanguage(savedLanguage)
  }, [])

  useEffect(() => {
    localStorage.setItem("portfolio-theme", theme)
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  useEffect(() => {
    localStorage.setItem("portfolio-language", language)
  }, [language])

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"))
  }

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "pt-BR" ? "en-US" : "pt-BR"))
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)["pt-BR"]] || key
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, language, toggleLanguage, t }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
