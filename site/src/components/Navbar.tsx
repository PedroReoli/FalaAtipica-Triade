'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { href: '/', label: 'Home' },
    { href: '#sobre', label: 'Sobre' },
    { href: '#apps', label: 'Apps' },
    { href: '/apresentacao', label: 'Apresentação' },
  ]

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/images/falaatipica-logo.png"
              alt="FalaAtípica Logo"
              width={50}
              height={50}
              className="w-12 h-12"
            />
            <span className="text-2xl font-bold text-[#054776]">
              FalaAtípica
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-gray-700 hover:text-[#1e88e5] transition-colors duration-200 ${
                  item.href === '/apresentacao' 
                    ? 'bg-[#1e88e5] text-white px-4 py-2 rounded-lg hover:bg-[#054776]' 
                    : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-[#1e88e5] focus:outline-none focus:text-[#1e88e5]"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#1e88e5] transition-colors duration-200 ${
                    item.href === '/apresentacao' 
                      ? 'bg-[#1e88e5] text-white rounded-lg hover:bg-[#054776]' 
                      : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
