/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    appearance: true,
  },
  content: ['index-Ari-Erni.html'],
  theme: {
    container: {
      center: true,
      padding: '16px',
    },
    extend: {
      colors: {
      primary: '#14b8a6',
      secondary:'#64748b',
      dark: '#0f172a',
      },
      screens: {
        '2xl' : '1320px',
      },
    },
  },
  plugins: [],
}