/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        myThemeDark: {
          primary: "#151515",
          secondary: "#909090",
          accent: "#81a1c1",
          neutral: "#4c566a",
          "base-100": "#101010",
          info: "#5e81ac",
          success: "#a3be8c",
          warning: "#ebcb8b",
          error: "#bf616a",
        },
      },
    ],
  },
};
