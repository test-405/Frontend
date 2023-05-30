/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

