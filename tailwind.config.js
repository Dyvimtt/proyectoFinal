/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'inicio': "url('assets/img-inicio.jpg')",
      })
    },
  },
  plugins: [],
}

