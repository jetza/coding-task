/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,html}", "./public/**/*.html"],
  theme: {
    extend: {
      fontFamily: {
        lato: ["Lato", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  safelist: ["peer-checked:opacity-100"],
  plugins: [],
};
