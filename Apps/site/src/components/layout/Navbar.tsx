"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Coffee, ChevronDown, Info, Rocket, Users, ClipboardCheck } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = () => {
      setOpenDropdown(null)
    }
    if (openDropdown) {
      document.addEventListener("click", handleClickOutside)
      return () => document.removeEventListener("click", handleClickOutside)
    }
  }, [openDropdown])

  const navGroups = [
    {
      label: "Institucional",
      icon: Info,
      links: [
        { href: "/sobre", label: "Sobre" },
        { href: "/timeline", label: "Timeline" },
      ],
    },
    {
      label: "Produtos",
      icon: Rocket,
      links: [{ href: "/aplicacoes", label: "Aplicações" }],
    },
    {
      label: "Participe",
      icon: Users,
      links: [
        { href: "/parcerias", label: "Parcerias" },
        { href: "/usabilidade", label: "Usabilidade", icon: ClipboardCheck },
        { href: "/usabilidade/analise", label: "Análise de Usabilidade", icon: ClipboardCheck },
      ],
    },
  ]

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b-2 border-[#1e88e5]"
          : "bg-white shadow-lg border-b-2 border-[#1e88e5]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div>
              <Image
                src="/images/logos/falaatipica-logo.png"
                alt="FalaAtípica"
                width={50}
                height={50}
                className="rounded-lg"
              />
            </div>
            <span className="text-2xl font-bold text-[#054776] group-hover:text-[#1e88e5] transition-colors duration-300">
              FalaAtípica
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 absolute left-1/2 transform -translate-x-1/2">
            {navGroups.map((group, groupIndex) => (
              <motion.div
                key={group.label}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: groupIndex * 0.1 + 0.3 }}
                className="relative"
              >
                {group.links.length === 1 ? (
                  // Link direto se tiver apenas 1 item
                  <Link href={group.links[0].href} className="text-lg font-medium text-[#1e88e5] relative group flex items-center">
                    {group.links[0].label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#054776] transition-all duration-300 group-hover:w-full" />
                  </Link>
                ) : (
                  // Dropdown se tiver múltiplos itens
                  <div className="relative">
                    <button
                      onClick={() => toggleDropdown(group.label)}
                      className="text-lg font-medium text-[#1e88e5] flex items-center space-x-1 relative group hover:text-[#054776] transition-colors"
                    >
                      <span>{group.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${openDropdown === group.label ? "rotate-180" : ""}`}
                      />
                    </button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {openDropdown === group.label && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border-2 border-[#1e88e5] py-2 z-50"
                        >
                          {group.links.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              className="flex items-center space-x-3 px-4 py-3 hover:bg-[#1e88e5]/10 transition-colors group/item"
                              onClick={() => setOpenDropdown(null)}
                            >
                              {link.icon && <link.icon className="w-4 h-4 text-[#1e88e5]" />}
                              <span className="text-[#054776] group-hover/item:text-[#1e88e5] transition-colors">{link.label}</span>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            className="hidden md:flex items-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <motion.a
              href="https://ko-fi.com/pedroreoli"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg border-2 bg-[#fbc02d] text-[#054776] border-[#fbc02d] hover:bg-[#f9a825] transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <Coffee className="w-5 h-5" />
              <span className="text-lg font-medium">Contribua para o projeto</span>
            </motion.a>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#054776]"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white border-t border-gray-200 shadow-lg overflow-hidden"
            >
              <div className="px-6 py-4 space-y-4">
                {navGroups.map((group, groupIndex) => (
                  <div key={group.label} className="space-y-2">
                    {group.links.length > 1 ? (
                      <>
                        <div className="flex items-center space-x-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                          <group.icon className="w-3 h-3" />
                          <span>{group.label}</span>
                        </div>
                        {group.links.map((link, linkIndex) => (
                          <motion.div
                            key={link.href}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: groupIndex * 0.1 + linkIndex * 0.05 }}
                          >
                            <Link
                              href={link.href}
                              className="flex items-center space-x-3 pl-5 text-[#1e88e5] text-base font-medium hover:text-[#054776] transition-colors duration-300"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {link.icon && <link.icon className="w-4 h-4" />}
                              {link.label}
                            </Link>
                          </motion.div>
                        ))}
                      </>
                    ) : (
                      <motion.div
                        key={group.links[0].href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: groupIndex * 0.1 }}
                      >
                        <Link
                          href={group.links[0].href}
                          className="flex items-center space-x-3 text-[#1e88e5] text-lg font-medium hover:text-[#054776] transition-colors duration-300"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <group.icon className="w-5 h-5" />
                          {group.links[0].label}
                        </Link>
                      </motion.div>
                    )}
                  </div>
                ))}
                <motion.div
                  className="pt-4 border-t border-gray-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <a
                    href="https://ko-fi.com/pedroreoli"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#fbc02d] text-[#054776] border-2 border-[#fbc02d] hover:bg-[#f9a825] transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Coffee className="w-5 h-5" />
                    <span className="text-lg font-medium">Contribua para o projeto</span>
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
