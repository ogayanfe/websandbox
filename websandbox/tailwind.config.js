/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx,jsx}"],
  theme: {
    extend: {
      fontSize: {
        xm: ".8125rem",
      },
      colors: {
        main: "RGB(134, 134, 134)",
      },
    },
  },
  plugins: [],
};
