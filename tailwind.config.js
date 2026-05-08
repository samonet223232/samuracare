/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"El Messiri"', 'Georgia', 'serif'],
        sans: ['"Cairo"', 'system-ui', 'sans-serif'],
      },
      colors: {
        cream: {
          50: '#fdfaf5',
          100: '#faf4e8',
          200: '#f5e8d0',
          300: '#edd9b4',
        },
        // Primary brand color: Muted Olive Green #4D5C4A
        olive: {
          50:  '#f4f5f3',   // near-white tint — safe for section backgrounds
          100: '#e6e9e5',   // very light olive — hover fills, subtle cards
          200: '#c9d0c7',   // soft — decorative borders, dividers
          300: '#a4b0a1',   // medium-light — labels on dark backgrounds
          400: '#718d6d',   // medium — secondary accents
          500: '#4D5C4A',   // PRIMARY BRAND COLOR
          600: '#3d4a39',   // slightly darker — hover on buttons
          700: '#2e3828',   // dark — strong text accents
        },
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
