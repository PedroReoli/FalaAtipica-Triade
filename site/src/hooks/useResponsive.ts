"use client"

import { useState, useEffect } from "react"

interface ResponsiveSizes {
  // Fonte base calculada pelo viewport
  fontSize: {
    xs: string
    sm: string
    base: string
    lg: string
    xl: string
    "2xl": string
    "3xl": string
    "4xl": string
    "5xl": string
    "6xl": string
  }
  // Espaçamento calculado
  spacing: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
    "2xl": string
  }
  // Tamanhos de ícones
  icon: {
    sm: string
    md: string
    lg: string
    xl: string
  }
  // Breakpoints
  breakpoint: "mobile" | "tablet" | "notebook" | "desktop"
}

export const useResponsive = (): ResponsiveSizes => {
  const [sizes, setSizes] = useState<ResponsiveSizes>({
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "3.75rem",
    },
    spacing: {
      xs: "0.5rem",
      sm: "0.75rem",
      md: "1rem",
      lg: "1.5rem",
      xl: "2rem",
      "2xl": "3rem",
    },
    icon: {
      sm: "1rem",
      md: "1.5rem",
      lg: "2rem",
      xl: "2.5rem",
    },
    breakpoint: "mobile",
  })

  useEffect(() => {
    const calculateSizes = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      // Determinar breakpoint
      let breakpoint: "mobile" | "tablet" | "notebook" | "desktop"
      if (width < 768) {
        breakpoint = "mobile"
      } else if (width < 1024) {
        breakpoint = "tablet"
      } else if (width < 1440) {
        breakpoint = "notebook"
      } else {
        breakpoint = "desktop"
      }

      // Calcular fator de escala baseado na largura e altura
      // Usando largura como base principal
      const baseWidth = 1440 // Largura de referência
      const baseHeight = 900 // Altura de referência
      const widthScale = width / baseWidth
      const heightScale = height / baseHeight

      // Usar o menor scale para garantir que caiba
      const scale = Math.min(widthScale, heightScale, 1.2) // Limitar aumento máximo a 120%

      // Calcular tamanhos de fonte responsivos
      const fontSize = {
        xs: `${0.75 * scale}rem`,
        sm: `${0.875 * scale}rem`,
        base: `${1 * scale}rem`,
        lg: `${1.125 * scale}rem`,
        xl: `${1.25 * scale}rem`,
        "2xl": `${1.5 * scale}rem`,
        "3xl": `${1.875 * scale}rem`,
        "4xl": `${2.25 * scale}rem`,
        "5xl": `${3 * scale}rem`,
        "6xl": `${3.75 * scale}rem`,
      }

      // Calcular espaçamentos
      const spacing = {
        xs: `${0.5 * scale}rem`,
        sm: `${0.75 * scale}rem`,
        md: `${1 * scale}rem`,
        lg: `${1.5 * scale}rem`,
        xl: `${2 * scale}rem`,
        "2xl": `${3 * scale}rem`,
      }

      // Calcular tamanhos de ícones
      const icon = {
        sm: `${1 * scale}rem`,
        md: `${1.5 * scale}rem`,
        lg: `${2 * scale}rem`,
        xl: `${2.5 * scale}rem`,
      }

      setSizes({
        fontSize,
        spacing,
        icon,
        breakpoint,
      })
    }

    calculateSizes()
    window.addEventListener("resize", calculateSizes)

    return () => {
      window.removeEventListener("resize", calculateSizes)
    }
  }, [])

  return sizes
}
