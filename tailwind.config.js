/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0f172a',
        navy: '#123f73',
        sand: '#f7f1e6',
        paper: '#fffdf8',
        alert: '#c82626',
      },
      boxShadow: {
        soft: '0 14px 32px rgba(18, 63, 115, 0.12)',
        button: '0 10px 24px rgba(18, 63, 115, 0.18)',
      },
      fontFamily: {
        sans: ['Segoe UI', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
