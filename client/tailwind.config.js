/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0891B2", // Cyan-600
        secondary: "#0E7490", // Cyan-700
        accent: "#06B6D4", // Cyan-500
        background: "#ECFEFF", // Cyan-50
        text: "#0C4A6E", // Cyan-900
        blue: {
          100: '#f0f8ff',
          300: '#a6d4fa',
          600: '#1e90ff',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      }
    },
  },
  plugins: [],
}