/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"], // Replace 'Roboto' with your font
        // You can add more font families if needed:
      },
      colors: {
        customBlue: "rgb(67, 101, 163)",
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".custom-txt-xs": {
          "@apply text-xs sm:text-sm md:text-base": {},
        },
        ".custom-txt-sm": {
          "@apply sm:text-base md:text-lg": {},
        },
        ".custom-txt-md": {
          "@apply sm:text-lg md:text-xl": {},
        },
        ".custom-txt-lg": {
          "@apply sm:text-xl md:text-2xl": {},
        },
      });
    },
  ],
};
