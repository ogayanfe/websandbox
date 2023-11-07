/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
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
