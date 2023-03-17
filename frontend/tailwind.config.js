
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms'),require("daisyui")],
  daisyui: {
    styled: true,
    themes: false,
    darkTheme: "",
  },
}
