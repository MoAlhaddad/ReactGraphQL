/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
      extend: { colors: {
        neon: '#00FF9F',
      },},
  },
  plugins: [],
};