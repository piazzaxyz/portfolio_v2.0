"use client"

import React from "react"

import { useState } from "react"
import { useTheme } from "@/contexts/theme-context"
import { motion, AnimatePresence } from "motion/react"
import { Check, ChevronLeft, ChevronRight, Linkedin, Github, Instagram, Send } from "lucide-react"

interface FormData {
  name: string
  email: string
  reason: string
  message: string
}

export function ContactSection() {
  const { t, theme } = useTheme()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    reason: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const steps = [
    {
      key: "name",
      title: t("contact.name"),
      type: "text",
      placeholder: "John Doe",
    },
    {
      key: "email",
      title: t("contact.email"),
      type: "email",
      placeholder: "john@example.com",
    },
    {
      key: "reason",
      title: t("contact.reason"),
      type: "select",
      options: [
        { value: "hire", label: t("contact.reason.hire") },
        { value: "collaborate", label: t("contact.reason.collaborate") },
        { value: "question", label: t("contact.reason.question") },
        { value: "other", label: t("contact.reason.other") },
      ],
    },
    {
      key: "message",
      title: t("contact.message"),
      type: "textarea",
      placeholder: "Your message...",
    },
  ]

  const canProceed = () => {
    const step = steps[currentStep]
    const value = formData[step.key as keyof FormData]
    return value.trim().length > 0
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleSubmit = () => {
    console.log("Form submitted:", formData)
    setIsSubmitted(true)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && canProceed()) {
      e.preventDefault()
      handleNext()
    }
  }

  return (
    <section
      id="contact"
      className={`py-20 px-4 ${
        theme === "dark"
          ? "bg-gradient-to-b from-purple-900/10 to-transparent"
          : "bg-gradient-to-b from-purple-50 to-transparent"
      }`}
    >
      <div className="max-w-2xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-bold mb-4 text-center"
        >
          {t("contact.title")}
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
          {t("contact.subtitle")}
        </motion.p>

        {/* Stepper Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`p-8 rounded-3xl border ${
            theme === "dark"
              ? "bg-gray-900/50 border-purple-500/20"
              : "bg-white border-purple-200"
          }`}
        >
          {/* Progress Bar */}
          {!isSubmitted && (
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                      index <= currentStep
                        ? "bg-purple-600 text-white"
                        : theme === "dark"
                        ? "bg-gray-700 text-gray-400"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {index < currentStep ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                ))}
              </div>
              <div
                className={`h-1 rounded-full ${
                  theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                }`}
              >
                <div
                  className="h-full bg-purple-600 rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentStep + 1) / steps.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          )}

          {/* Form Content */}
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 mx-auto mb-6 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{t("contact.success")}</h3>
                <p
                  className={theme === "dark" ? "text-gray-400" : "text-gray-600"}
                >
                  {t("contact.success.sub")}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-semibold mb-6">
                  {steps[currentStep].title}
                </h3>

                {steps[currentStep].type === "text" && (
                  <input
                    type="text"
                    value={formData[steps[currentStep].key as keyof FormData]}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [steps[currentStep].key]: e.target.value,
                      })
                    }
                    onKeyDown={handleKeyDown}
                    placeholder={steps[currentStep].placeholder}
                    className={`w-full px-4 py-4 rounded-xl border outline-none transition-all focus:border-purple-500 ${
                      theme === "dark"
                        ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                        : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400"
                    }`}
                    autoFocus
                  />
                )}

                {steps[currentStep].type === "email" && (
                  <input
                    type="email"
                    value={formData[steps[currentStep].key as keyof FormData]}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [steps[currentStep].key]: e.target.value,
                      })
                    }
                    onKeyDown={handleKeyDown}
                    placeholder={steps[currentStep].placeholder}
                    className={`w-full px-4 py-4 rounded-xl border outline-none transition-all focus:border-purple-500 ${
                      theme === "dark"
                        ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                        : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400"
                    }`}
                    autoFocus
                  />
                )}

                {steps[currentStep].type === "select" && (
                  <div className="grid gap-3">
                    {steps[currentStep].options?.map((option) => (
                      <button
                        key={option.value}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            [steps[currentStep].key]: option.value,
                          })
                        }
                        className={`w-full px-4 py-4 rounded-xl border text-left transition-all ${
                          formData[steps[currentStep].key as keyof FormData] ===
                          option.value
                            ? "border-purple-500 bg-purple-500/10"
                            : theme === "dark"
                            ? "border-gray-700 hover:border-gray-600 bg-gray-800"
                            : "border-gray-200 hover:border-gray-300 bg-gray-50"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}

                {steps[currentStep].type === "textarea" && (
                  <textarea
                    rows={6}
                    value={formData[steps[currentStep].key as keyof FormData]}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [steps[currentStep].key]: e.target.value,
                      })
                    }
                    placeholder={steps[currentStep].placeholder}
                    className={`w-full px-4 py-4 rounded-xl border outline-none transition-all resize-none focus:border-purple-500 ${
                      theme === "dark"
                        ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                        : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400"
                    }`}
                    autoFocus
                  />
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  <button
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
                      currentStep === 0
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-purple-500/10"
                    } ${
                      theme === "dark"
                        ? "text-gray-300"
                        : "text-gray-600"
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    {t("contact.back")}
                  </button>

                  <button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
                      canProceed()
                        ? "bg-purple-600 hover:bg-purple-700 text-white"
                        : "bg-gray-600 cursor-not-allowed text-gray-400"
                    }`}
                  >
                    {currentStep === steps.length - 1 ? (
                      <>
                        {t("contact.send")}
                        <Send className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        {t("contact.next")}
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex justify-center gap-6"
        >
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-4 rounded-full transition-all hover:scale-110 ${
              theme === "dark"
                ? "bg-purple-900/30 hover:bg-purple-900/50 text-purple-300"
                : "bg-purple-100 hover:bg-purple-200 text-purple-600"
            }`}
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-4 rounded-full transition-all hover:scale-110 ${
              theme === "dark"
                ? "bg-purple-900/30 hover:bg-purple-900/50 text-purple-300"
                : "bg-purple-100 hover:bg-purple-200 text-purple-600"
            }`}
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-4 rounded-full transition-all hover:scale-110 ${
              theme === "dark"
                ? "bg-purple-900/30 hover:bg-purple-900/50 text-purple-300"
                : "bg-purple-100 hover:bg-purple-200 text-purple-600"
            }`}
          >
            <Instagram className="w-6 h-6" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
