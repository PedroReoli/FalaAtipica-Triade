/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue': '#1e88e5',
        'green': '#43a047',
        'red': '#e53935',
        'yellow': '#fbc02d',
        'background-blue': '#054776',
        'background-white': '#f4f6ff',
        'text-black': '#3c3c3c',
        'text-white': '#ffffff',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
