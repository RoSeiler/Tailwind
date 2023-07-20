/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html}"], /*le indicamos donde encuentra nuesto CSS */
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
}
