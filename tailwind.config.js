/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F5F6FA',
        card: '#FFFFFF',
        ink: '#22284D',
        inksoft: '#5A6080',
        amber: '#E8A33D',
        amberdeep: '#B8761A',
        ambertint: '#FDF3E2',
        line: '#E3E5EE',
        whatsapp: '#25D366',
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
