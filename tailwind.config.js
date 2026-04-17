/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0f",
        card: "#141420",
        accent: "#00ff88",
        warning: "#ff6b35",
        text: "#ffffff"
      }
    },
  },
  plugins: [],
}
