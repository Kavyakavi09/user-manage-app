/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: ["./src/**/*.{html,ts,tsx}"],
  theme: {
    extend: {
         fontFamily: {
          sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [
    
  ]
}
