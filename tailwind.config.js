/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},  
  },
  width: {
    '55%': '55%',
  },
  colors: {
    LightGrayishBlue: 'hsl(239, 57%, 85%)',
  },
  plugins: [],
}

