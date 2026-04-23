/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        cream: {
          50: '#fdfaf5',
          100: '#faf4e8',
          200: '#f5e8d0',
          300: '#edd9b4',
        },
        blush: {
          50: '#fdf4f4',
          100: '#fce8e8',
          200: '#f8cfcf',
          300: '#f2a8a8',
          400: '#e87878',
          500: '#d95555',
        },
        sage: {
          50: '#f4f7f4',
          100: '#e7efe7',
          200: '#cfe0cf',
          300: '#a8c7a8',
          400: '#78a878',
          500: '#4d894d',
        },
        stone: {
          warm: '#8c7b6b',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'zoom-in': 'zoomIn 0.4s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        zoomIn: {
          '0%': { transform: 'scale(0.97)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
