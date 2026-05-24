/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          navy:  '#1e3a5f',
          blue:  '#2d6bb5',
          amber: '#f5a623',
          sky:   '#0ea5e9',
          bg:    '#f0f7ff',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
