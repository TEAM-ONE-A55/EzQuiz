import twElementsPlugin from "tw-elements/plugin.cjs";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/js/**/*.js"
  ],
  theme: {
    extend: {
      
    },
  },
  plugins: [twElementsPlugin],
}

