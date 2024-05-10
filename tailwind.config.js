/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    /* screens:{
      sm:'480px',
      md: '768px',
      lg: '1020px',
      xl: '1440px'
    }, */
    extend: {
      colors: {
        darkYellow: '#FFDE00',
       
      
       /* redSoft: 'hsl(0, 94%, 66%)',
        softRed: 'hsl(0, 94%, 66%)',
        grayishBlue: 'hsl(229, 8%, 60%)',
        VeryDarkBlue: 'hsl(229, 31%, 21%)'  */
      },
     /* fontFamily: {
          sans: ['Oswald','Inter', 'sans-serif'], 
     } */
    },
  },
  plugins: [],
}