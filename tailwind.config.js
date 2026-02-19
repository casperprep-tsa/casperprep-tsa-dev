/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#1a4fa0",
          "blue-dark": "#0f2d5e",
          "blue-deep": "#0a1f42",
          "blue-light": "#e8eff8",
          orange: "#e8a825",
          "orange-dark": "#c48e1a",
          "orange-light": "#fef8e8",
          "orange-glow": "#f5c842",
        },
        ink: {
          DEFAULT: "#141b2d",
          soft: "#3a4260",
          muted: "#6b7394",
        },
        surface: {
          cream: "#fafaf7",
          border: "#e4e6ec",
          "border-light": "#f0f1f4",
        },
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        body: ["Outfit", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
