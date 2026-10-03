/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: 'rgb(var(--paper) / <alpha-value>)',
        card: 'rgb(var(--card) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        inksoft: 'rgb(var(--inksoft) / <alpha-value>)',
        amber: 'rgb(var(--amber) / <alpha-value>)',
        amberdeep: 'rgb(var(--amberdeep) / <alpha-value>)',
        ambertint: 'rgb(var(--ambertint) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        whatsapp: 'rgb(var(--whatsapp) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Mukta', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '14px',
      },
    },
  },
  plugins: [],
}
