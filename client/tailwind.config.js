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
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in-out',
        'fade-in-delay': 'fadeIn 1s ease-in-out 0.3s forwards',
        'fade-in-delay-2': 'fadeIn 1s ease-in-out 0.6s forwards',
        'bounce-slow': 'bounce 3s infinite',
        'slide-up': 'slideUp 0.8s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      },
    },
  },
  plugins: [],
}