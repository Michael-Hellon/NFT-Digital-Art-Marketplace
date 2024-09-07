/** @type {import('tailwindcss').Config} */
import flowbite from 'flowbite-react/tailwind'

export default {
  content: [
    "./index.html",
    "./src/**/*.{jsx,js,ts,tsx}",
    flowbite.content(),
  ],
  theme: {},
  plugins: [
    flowbite.plugin(),
],
};