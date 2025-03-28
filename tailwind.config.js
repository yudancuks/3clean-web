/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.{html,js,pug}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
      },
      colors: {
        // primary: '#0A36B5', // Blue
      },
    },
  },
  plugins: [require("daisyui")],
}

