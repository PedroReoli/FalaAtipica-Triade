/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['var(--font-poppins)', 'sans-serif'],
        'inter': ['var(--font-inter)', 'sans-serif'],
      },
      colors: {
        primary: '[cor-primaria]',
        secondary: '[cor-secundaria]',
        success: '[cor-sucesso]',
        warning: '[cor-aviso]',
        error: '[cor-erro]',
      },
    },
  },
  plugins: [],
}

