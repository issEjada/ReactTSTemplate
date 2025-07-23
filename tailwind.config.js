module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      screens: {
        DEFAULT: "1440px",
        sm: "640px",
        md: "768px",
        lg: "1440px",
        xl: "1440px",
      },
    },
    extend: {
      colors: {
        gray: {
          50: "#FAFAFA",
          200: "#E9EAEB",
          300: "#D5D7DA",
          400: "#A4A7AE",
          500: "#717680",
          600: "#535862",
          700: "#414651",
          800: "#252B37",
          900: "#181D27",
          950: "#1C1C1C66",
        },
        blue: {
          700: "#1637C4",
        },
        red: {
          400: "#F97066",
          600: "#D92D20",
          700: "#B42318",
        },
        warning: {
          200: "#FEDF89",
          300: "#FEC84B",
          400: "#FDB022",
          500: "#F79009",
          600: "#DC6803",
        },
      },
      maxWidth: {
        1440: "1440px",
      },
    },
  },
  plugins: [],
};
