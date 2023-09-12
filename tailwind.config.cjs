/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        secondary: "#72757e",
        background: "#2d2d31",
        cardBackground: "#16161a",
        cardBackgroundPassive: "#737376",
        cardBackgroundSemiPassive: "#454548",
        main: "#fffffe",
        subText: "#94a1b2",
      },
    },
  },
  important: true,
  plugins: [require("@headlessui/tailwindcss")],
};
