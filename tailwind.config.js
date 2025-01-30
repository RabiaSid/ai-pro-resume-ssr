/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Lexend: ["Lexend", "serif"],
      },
      boxShadow: {
        "custom-shadow": "0px 6px 18px 0px rgba(0, 0, 0, 0.06)",
        "custom-shadow-2": "0px 0px 7px 0px rgba(0, 0, 0, 0.25)",
      },
      colors: {
        "primary-blue": "#0072b1",
        "secondary-blue": "#27AAE1",
        "primary-green": "#01b2ac",
        "secondary-green": "#01b2ac90",
        "primary-black": "#231F20",
        "primary-gray": "#a3a3a3",
      },
      backgroundImage: {
        WavePattren: "url('./assets/images/pattrens/wave-svg.svg')",
      },
    },
  },
  plugins: [],
};
