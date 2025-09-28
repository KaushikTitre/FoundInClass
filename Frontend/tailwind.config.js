// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}", // adjust if needed
    ],
    theme: {
      extend: {
        colors: {
          primary: "#1E40AF",
          secondary: "#F59E0B",
        },
        fontFamily: {
          sans: ["Inter", "sans-serif"],
        },
      },
    },
    plugins: [
      require("daisyui"),
    ],
    daisyui: {
      themes: ["light", "dark", "cupcake"], // you can add/remove themes
    },
  }
  