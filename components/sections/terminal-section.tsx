"use client"

import React from "react"

import { useState, useRef, useEffect } from "react"
import { useTheme } from "@/contexts/theme-context"
import { motion } from "motion/react"

interface TerminalLine {
  type: "command" | "output" | "error" | "ascii"
  content: string
}

const asciiArt = `
  ______    _                       _       
 |  ____|  | |                     | |      
 | |__   __| |_   _  __ _ _ __ ___| |_   _ 
 |  __| / _\` | | | |/ _\` | '__/ _ \\ | | | |
 | |___| (_| | |_| | (_| | | |  __/ | |_| |
 |______\\__,_|\\__,_|\\__,_|_|  \\___|_|\\__, |
                                      __/ |
                                     |___/ 
`

export function TerminalSection() {
  const { t, theme } = useTheme()
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: "output", content: "Welcome to Eduardo's Terminal v1.0.0" },
    { type: "output", content: "Type 'help' to see available commands." },
    { type: "output", content: "" },
  ])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [history])

  const executeCommand = (cmd: string) => {
    const command = cmd.toLowerCase().trim()

    setHistory((prev) => [...prev, { type: "command", content: `→ ${cmd}` }])
    setCommandHistory((prev) => [...prev, cmd])
    setHistoryIndex(-1)

    switch (command) {
      case "help":
        setHistory((prev) => [
          ...prev,
          { type: "output", content: t("terminal.help") },
        ])
        break
      case "about":
        setHistory((prev) => [
          ...prev,
          { type: "output", content: t("terminal.about.response") },
        ])
        break
      case "contact":
        setHistory((prev) => [
          ...prev,
          { type: "output", content: t("terminal.contact.response") },
        ])
        break
      case "experience":
        setHistory((prev) => [
          ...prev,
          { type: "output", content: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" },
          { type: "output", content: "2025 - Present | Full Stack Developer @ Agromai" },
          { type: "output", content: "2024 - Present    | Freelance Developer" },
          { type: "output", content: "2024 - 2025    | Trainee Pão dos Pobres" },
          { type: "output", content: "2023 - 2024    | Trainee Sesc/Senac" },
          { type: "output", content: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" },
        ])
        break
      case "education":
        setHistory((prev) => [
          ...prev,
          { type: "output", content: t("terminal.education.response") },
        ])
        break
      case "skills":
        setHistory((prev) => [
          ...prev,
          { type: "output", content: t("terminal.skills.response") },
        ])
        break
      case "clear":
        setHistory([])
        break
      case "easteregg":
        setHistory((prev) => [
          ...prev,
          { type: "ascii", content: asciiArt },
          { type: "output", content: "" },
          { type: "output", content: `${t("terminal.easteregg")}` },
        ])
        break
      case "":
        break
      default:
        setHistory((prev) => [
          ...prev,
          { type: "error", content: t("terminal.notfound") },
        ])
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      executeCommand(input)
      setInput("")
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setInput(commandHistory[newIndex])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1)
          setInput("")
        } else {
          setHistoryIndex(newIndex)
          setInput(commandHistory[newIndex])
        }
      }
    }
  }

  return (
    <section id="terminal" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-bold mb-12 text-center"
        >
          {t("terminal.title")}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`rounded-2xl overflow-hidden shadow-2xl border ${
            theme === "dark"
              ? "bg-gray-900 border-gray-700"
              : "bg-gray-900 border-gray-600"
          }`}
          onClick={() => inputRef.current?.focus()}
        >
          {/* Terminal Header */}
          <div className="bg-gray-800 px-4 py-3 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-4 text-sm text-gray-400 font-mono">
              eduardo@portfolio:~$
            </span>
          </div>

          {/* Terminal Body */}
          <div
            ref={outputRef}
            className="p-6 font-mono text-sm h-96 overflow-y-auto"
            style={{ scrollbarWidth: "thin" }}
          >
            {/* Output History */}
            <div className="space-y-1">
              {history.map((line, i) => (
                <div
                  key={i}
                  className={`${
                    line.type === "command"
                      ? "text-purple-400"
                      : line.type === "error"
                      ? "text-red-400"
                      : line.type === "ascii"
                      ? "text-green-400 whitespace-pre"
                      : "text-gray-300"
                  }`}
                >
                  {line.content}
                </div>
              ))}
            </div>

            {/* Input Line */}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-purple-400">→</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none text-white font-mono"
                placeholder={t("terminal.placeholder")}
                spellCheck={false}
                autoComplete="off"
              />
              <span className="animate-pulse text-white">|</span>
            </div>
          </div>
        </motion.div>

        {/* Command Hints */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`mt-4 text-center text-sm ${
            theme === "dark" ? "text-gray-500" : "text-gray-400"
          }`}
        >
          Try: help, about, contact, experience, education, skills, easteregg, clear
        </motion.div>
      </div>
    </section>
  )
}
