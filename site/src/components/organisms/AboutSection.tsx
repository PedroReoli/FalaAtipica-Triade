"use client"

import type React from "react"
import { useState } from "react"
import { Container } from "../atoms/Container"
import { Heading } from "../atoms/Heading"
import { Text } from "../atoms/Text"
import { ChevronLeft, ChevronRight, Award, Star, Trophy, Lightbulb, Target } from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

export const AboutSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 0,
      type: "intro",
      icon: <Lightbulb className="w-16 h-16" />,
      title: "Quando inovação encontra propósito",
      subtitle: "A história por trás do FalaAtípica",
      content:
        "Idealizado por Pedro Lucas Reis, o FalaAtípica nasceu como um Trabalho de Conclusão de Curso em Sistemas de Informação pelo UniFOA, conquistando nota máxima e elogios da banca por integrar tecnologia assistiva, design empático e impacto social real.",
      highlight: "De um TCC à transformação de vidas",
    },
    {
      id: 1,
      type: "image",
      image: "/images/content/TCC-img2.png",
      alt: "Apresentação TCC",
      caption: "Apresentação do projeto na banca do UniFOA",
    },
    {
      id: 2,
      type: "quote",
      icon: <Award className="w-12 h-12" />,
      quote:
        "Uma proposta inovadora e emocionalmente poderosa que demonstra como a tecnologia pode ser uma ferramenta de inclusão e desenvolvimento.",
      author: "Banca Avaliadora UniFOA",
      stats: [
        { label: "Nota", value: "10.0" },
        { label: "Aprovação", value: "Excelência" },
      ],
    },
    {
      id: 3,
      type: "impact",
      icon: <Target className="w-16 h-16" />,
      title: "Reconhecimento e Impacto",
      achievements: [
        { icon: <Star className="w-6 h-6" />, text: "Aprovado com excelência na banca do UniFOA" },
        {
          icon: <Trophy className="w-6 h-6" />,
          text: "Reconhecido pela inovação social no campo da tecnologia assistiva",
        },
        { icon: <Award className="w-6 h-6" />, text: "Apresentado como case de inclusão no ambiente acadêmico" },
      ],
    },
    {
      id: 4,
      type: "vision",
      icon: <Star className="w-16 h-16" />,
      title: "Visão de Futuro",
      content:
        "O FalaAtípica está em negociação com parceiros estratégicos — clínicas e escolas de Volta Redonda e região — com expansão planejada para todo o território nacional em 2026.",
      cta: "Junte-se a nós nessa jornada de transformação",
    },
  ]

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  return (
    <section
      id="sobre"
      className="min-h-screen bg-gradient-to-br from-[#054776] via-[#1e88e5] to-[#054776] relative overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [90, 0, 90],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"
      />

      <div className="relative z-10 min-h-screen flex items-center py-20">
        <Container maxWidth="xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="min-h-[600px] flex items-center"
            >
              {/* Intro Slide */}
              {slides[currentSlide].type === "intro" && (
                <div className="text-center space-y-8 max-w-4xl mx-auto">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="inline-flex items-center justify-center w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full border-2 border-white/30 text-[#fbc02d]"
                  >
                    {slides[currentSlide].icon}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Heading level={2} color="white" className="mb-4">
                      {slides[currentSlide].title}
                    </Heading>
                    <Text size="xl" color="white" className="opacity-90">
                      {slides[currentSlide].subtitle}
                    </Text>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Text size="lg" color="white" weight="light" className="leading-relaxed">
                      {slides[currentSlide].content}
                    </Text>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                    className="inline-block bg-[#fbc02d] text-[#054776] px-6 py-3 rounded-full font-bold text-lg"
                  >
                    {slides[currentSlide].highlight}
                  </motion.div>
                </div>
              )}

              {/* Image Slide */}
              {slides[currentSlide].type === "image" && (
                <div className="w-full max-w-5xl mx-auto">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="relative rounded-3xl overflow-hidden shadow-2xl"
                  >
                    <Image
                      src={slides[currentSlide].image! || "/placeholder.svg"}
                      alt={slides[currentSlide].alt ?? ""}
                      width={2000}
                      height={1200}
                      className="w-full h-auto"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    {slides[currentSlide].caption && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="absolute bottom-8 left-8 right-8"
                      >
                        <Text size="xl" color="white" weight="semibold" className="text-center">
                          {slides[currentSlide].caption}
                        </Text>
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              )}

              {/* Quote Slide */}
              {slides[currentSlide].type === "quote" && (
                <div className="text-center space-y-8 max-w-4xl mx-auto">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="inline-flex items-center justify-center w-20 h-20 bg-[#fbc02d] rounded-full text-[#054776]"
                  >
                    {slides[currentSlide].icon}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border-2 border-white/20"
                  >
                    <Text size="2xl" color="white" weight="medium" className="italic leading-relaxed mb-6">
                      "{slides[currentSlide].quote}"
                    </Text>
                    <Text size="lg" color="white" className="opacity-90">
                      — {slides[currentSlide].author}
                    </Text>
                  </motion.div>

                  {slides[currentSlide].stats && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="flex justify-center gap-8"
                    >
                      {slides[currentSlide].stats.map((stat, idx) => (
                        <div
                          key={idx}
                          className="bg-white/10 backdrop-blur-sm rounded-xl px-8 py-4 border border-white/20"
                        >
                          <div className="text-4xl font-bold text-[#fbc02d]">{stat.value}</div>
                          <div className="text-white opacity-90">{stat.label}</div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </div>
              )}

              {/* Impact Slide */}
              {slides[currentSlide].type === "impact" && (
                <div className="text-center space-y-12 max-w-5xl mx-auto">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="inline-flex items-center justify-center w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full border-2 border-white/30 text-[#fbc02d]"
                  >
                    {slides[currentSlide].icon}
                  </motion.div>

                  <Heading level={2} color="white">
                    {slides[currentSlide].title}
                  </Heading>

                  <div className="grid md:grid-cols-3 gap-6">
                    {slides[currentSlide].achievements?.map((achievement, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + idx * 0.1 }}
                        whileHover={{ scale: 1.05, y: -10 }}
                        className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border-2 border-white/20 hover:border-[#fbc02d]/50 transition-all duration-300"
                      >
                        <div className="w-12 h-12 bg-[#fbc02d] rounded-full flex items-center justify-center mx-auto mb-4 text-[#054776]">
                          {achievement.icon}
                        </div>
                        <Text size="base" color="white" weight="medium" className="leading-relaxed">
                          {achievement.text}
                        </Text>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Vision Slide */}
              {slides[currentSlide].type === "vision" && (
                <div className="text-center space-y-8 max-w-4xl mx-auto">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-[#fbc02d] to-[#f9a825] rounded-full text-[#054776]"
                  >
                    {slides[currentSlide].icon}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Heading level={2} color="white" className="mb-6">
                      {slides[currentSlide].title}
                    </Heading>
                    <Text size="xl" color="white" weight="light" className="leading-relaxed">
                      {slides[currentSlide].content}
                    </Text>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border-2 border-[#fbc02d]"
                  >
                    <Text size="lg" color="white" weight="semibold">
                      {slides[currentSlide].cta}
                    </Text>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex items-center space-x-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSlide}
              className="p-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            <div className="flex space-x-3">
              {slides.map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => setCurrentSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    currentSlide === index ? "w-12 h-3 bg-[#fbc02d]" : "w-3 h-3 bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
              className="p-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </Container>
      </div>
    </section>
  )
}
