"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"

interface RotatingTextProps {
  texts: string[]
  mainClassName?: string
  staggerFrom?: "first" | "last" | "center"
  staggerDuration?: number
  rotationInterval?: number
  transition?: {
    type?: string
    damping?: number
    stiffness?: number
  }
}

export function RotatingText({
  texts,
  mainClassName = "",
  staggerFrom = "last",
  staggerDuration = 0.025,
  rotationInterval = 2000,
  transition = { type: "spring", damping: 30, stiffness: 400 },
}: RotatingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const rotate = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % texts.length)
  }, [texts.length])

  useEffect(() => {
    const interval = setInterval(rotate, rotationInterval)
    return () => clearInterval(interval)
  }, [rotate, rotationInterval])

  const getStaggerDelay = (index: number, total: number) => {
    switch (staggerFrom) {
      case "first":
        return index * staggerDuration
      case "last":
        return (total - 1 - index) * staggerDuration
      case "center":
        const center = Math.floor(total / 2)
        return Math.abs(index - center) * staggerDuration
      default:
        return 0
    }
  }

  const currentText = texts[currentIndex]
  const letters = currentText.split("")

  return (
    <span className={`inline-flex overflow-hidden ${mainClassName}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          className="inline-flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {letters.map((letter, index) => (
            <motion.span
              key={`${currentIndex}-${index}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{
                ...transition,
                delay: getStaggerDelay(index, letters.length),
              }}
              style={{ display: "inline-block" }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
