/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '55%': '55%',
      },
      colors: {
        LightGrayishBlue: 'hsl(239, 57%, 85%)',
        Darkblue: 'hsl(212, 24%, 26%)',
        GrayishBlue: 'hsl(211, 10%, 45%)',
        Lightgray: 'hsl(223, 19%, 93%)',
        Verylightgray: 'hsl(228, 33%, 97%)',
        White: 'hsl(0, 0%, 100%)',
        
      },
    },  
  },
 
 
  plugins: [],
}

