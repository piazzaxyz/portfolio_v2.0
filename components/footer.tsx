"use client"

import { useTheme } from "@/contexts/theme-context"
import { Linkedin, Github, Instagram, Mail } from "lucide-react"

export function Footer() {
  const { t, theme } = useTheme()

  return (
    <footer
      className={`border-t py-12 px-4 ${
        theme === "dark" ? "border-gray-800" : "border-gray-200"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Branding */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Eduardo Piazza</h3>
            <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
              Full Stack Developer
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{t("footer.quicklinks")}</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#about"
                  className={`transition-colors hover:text-purple-500 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {t("nav.about")}
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className={`transition-colors hover:text-purple-500 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {t("nav.projects")}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className={`transition-colors hover:text-purple-500 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {t("nav.contact")}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">{t("footer.contact")}</h4>
            <a
              href="mailto:eduardo@example.com"
              className={`flex items-center gap-2 transition-colors hover:text-purple-500 ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              <Mail className="w-4 h-4" />
              eduardo@example.com
            </a>
            <div className="flex gap-4 mt-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-full transition-colors hover:bg-purple-500/10 hover:text-purple-500 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-full transition-colors hover:bg-purple-500/10 hover:text-purple-500 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-full transition-colors hover:bg-purple-500/10 hover:text-purple-500 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div
          className={`text-center text-sm pt-8 border-t ${
            theme === "dark"
              ? "text-gray-500 border-gray-800"
              : "text-gray-500 border-gray-200"
          }`}
        >
          © {new Date().getFullYear()} Eduardo Piazza. {t("footer.rights")}
          <br />
          <span className="text-xs mt-1 block">
            Built with React + TypeScript + Tailwind CSS
          </span>
        </div>
      </div>
    </footer>
  )
}
