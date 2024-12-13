/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"], // Replace 'Roboto' with your font
        // You can add more font families if needed:
      },
    },
  },
  plugins: [],
};
