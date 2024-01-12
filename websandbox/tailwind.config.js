const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    screens: {
      xm: "485px",
      xxm: "400px",
      ...defaultTheme.screens,
    },
    extend: {
      fontSize: {
        xm: ".8125rem",
      },
      colors: {
        main: "rgb(134, 134, 134)",
      },
    },
  },
  plugins: [],
};
