"use client"

import { useRef, useState, useEffect } from "react"
import { useTheme } from "@/contexts/theme-context"
import { motion, useMotionValue, useTransform, animate, type PanInfo } from "motion/react"
import Image from "next/image"

const galleryItems = [
  {
    id: 1,
    textPT: "Setup de Trabalho",
    textEN: "Work Setup",
    image: "/images/gallery-1.jpeg",
  },
  {
    id: 2,
    textPT: "Codando no Escritório",
    textEN: "Office Coding",
    image: "/images/gallery-2.jpeg",
  },
  {
    id: 3,
    textPT: "Vista do Trabalho",
    textEN: "Work View",
    image: "/images/gallery-3.jpeg",
  },
  {
    id: 4,
    textPT: "Comunidade Caldeira",
    textEN: "Caldeira Community",
    image: "/images/gallery-4.jpeg",
  },
  {
    id: 5,
    textPT: "Evento Caldeira",
    textEN: "Caldeira Event",
    image: "/images/gallery-5.jpeg",
  },
  {
    id: 6,
    textPT: "Estudos, código e entretenimento",
    textEN: "Studies, code and entertainment",
    image: "/images/gallery-6.jpeg",
  },
  {
    id: 7,
    textPT: "Curso Java Alura",
    textEN: "Alura Java Course",
    image: "/images/gallery-7.jpeg",
  },
]

const CARD_WIDTH = 300
const CARD_GAP = 20

export function GallerySection() {
  const { t, theme, language } = useTheme()
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  
  const x = useMotionValue(0)
  
  const totalWidth = galleryItems.length * (CARD_WIDTH + CARD_GAP) - CARD_GAP
  const maxDrag = Math.max(0, totalWidth - containerWidth + 48)

  // Progress calculation based on x position
  const progress = useTransform(x, [0, -maxDrag], [0, 100])
  const [progressValue, setProgressValue] = useState(0)

  useEffect(() => {
    const updateContainerWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
    }
    updateContainerWidth()
    window.addEventListener("resize", updateContainerWidth)
    return () => window.removeEventListener("resize", updateContainerWidth)
  }, [])

  useEffect(() => {
    const unsubscribe = progress.on("change", (latest) => {
      setProgressValue(Math.min(100, Math.max(0, latest)))
    })
    return () => unsubscribe()
  }, [progress])

  const handleDragStart = () => {
    setIsDragging(true)
  }

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false)
    
    const currentX = x.get()
    const velocity = info.velocity.x
    let newX = currentX + velocity * 0.15

    // Clamp within bounds
    newX = Math.max(-maxDrag, Math.min(0, newX))
    
    animate(x, newX, {
      type: "spring",
      stiffness: 300,
      damping: 30,
    })
  }

  return (
    <section
      id="gallery"
      className={`py-20 overflow-hidden ${
        theme === "dark"
          ? "bg-gradient-to-b from-transparent via-cyan-900/5 to-transparent"
          : "bg-gradient-to-b from-transparent via-cyan-50/50 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-bold mb-4 text-center"
        >
          {t("gallery.title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`text-center mb-4 ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {t("gallery.subtitle")}
        </motion.p>

        {/* Drag hint */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`text-center text-sm mb-8 ${
            theme === "dark" ? "text-gray-500" : "text-gray-400"
          }`}
        >
          {language === "pt-BR" ? "Arraste para explorar" : "Drag to explore"}
        </motion.p>

        {/* Draggable Gallery Container */}
        <div 
          ref={containerRef}
          className="relative overflow-hidden cursor-grab active:cursor-grabbing"
        >
          <motion.div
            className="flex"
            style={{ x, gap: CARD_GAP }}
            drag="x"
            dragConstraints={{ left: -maxDrag, right: 0 }}
            dragElastic={0.05}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            {galleryItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex-shrink-0 select-none"
                style={{ width: CARD_WIDTH }}
              >
                <div
                  className={`relative h-[400px] rounded-2xl overflow-hidden group ${
                    theme === "dark" ? "shadow-2xl shadow-cyan-500/10" : "shadow-xl"
                  }`}
                >
                  {/* Image */}
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={language === "pt-BR" ? item.textPT : item.textEN}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
                    sizes="300px"
                    draggable={false}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                  {/* Content */}
                  <div className="absolute inset-0 flex items-end p-5 pointer-events-none">
                    <div className="w-full">
                      <div className="text-white">
                        <span className="text-sm font-mono opacity-70">
                          0{index + 1}
                        </span>
                        <h3 className="text-xl font-bold mt-1">
                          {language === "pt-BR" ? item.textPT : item.textEN}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Fade edges */}
          <div 
            className={`absolute left-0 top-0 bottom-0 w-12 pointer-events-none ${
              theme === "dark" 
                ? "bg-gradient-to-r from-background to-transparent" 
                : "bg-gradient-to-r from-background to-transparent"
            }`}
          />
          <div 
            className={`absolute right-0 top-0 bottom-0 w-12 pointer-events-none ${
              theme === "dark" 
                ? "bg-gradient-to-l from-background to-transparent" 
                : "bg-gradient-to-l from-background to-transparent"
            }`}
          />
        </div>

        {/* Progress bar */}
        <div className="flex justify-center mt-8">
          <div 
            className={`w-48 h-1.5 rounded-full overflow-hidden ${
              theme === "dark" ? "bg-gray-800" : "bg-gray-200"
            }`}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
              style={{ width: `${Math.max(10, progressValue)}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
