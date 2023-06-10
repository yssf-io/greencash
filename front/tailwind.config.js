/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        drkGreen: "#0F4C5C",
        ltGreen: "#0F8B8D",
        vltGreen: "#B3DFDF",
        vvltGreen: "#EEF7F7",
        ltBrown: "#E5E4E2"
      },
    },
  },
  plugins: [require("daisyui")],
};
