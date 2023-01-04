/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/Components/**/*.{js,jsx,tx,tsx}",
  ],

  theme: {
    extend: {
      height: {
        fitinthis: "90%",
      },
      colors: {
        "light-white": "rgba(255,255,255,0.17)",
      },
    },
  },
  plugins: [],
};
