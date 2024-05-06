/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require("flowbite/plugin"),
    // eslint-disable-next-line no-undef
    require('tailwind-scrollbar'),
    // eslint-disable-next-line no-undef
    require('@tailwindcss/line-clamp'),
  ],
}

