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
        blueLight:{
          50: "#F0F9FF",
          100:"#E0F2FE",
        },
        blueGray:{
          50: "#F8F9FC",
          100: "#EAECF5",
          200: "#D5D9EB",
          300: "#AFB5D9",
          600: "#535862",
          700: "#363F72",
        },
        gray: {
          50: "#FAFAFA",
          100: "#F5F5F5",
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
          500: "#2E90FA",
          700: "#1637C4",
        },
        purple:{
          700: "#5925DC",
        },
        red: {
          50: "#FEF3F2",
          400: "#F97066",
          600: "#D92D20",
          700: "#B42318",
          800: "#D92D20",
        },
        warning: {
          50: "#FFFAEB",
          200: "#FEDF89",
          300: "#FEC84B",
          400: "#FDB022",
          500: "#F79009",
          600: "#DC6803",
          700: "#B54708",
        },
      },
      maxWidth: {
        1440: "1440px",
      },
      boxShadow: {
        "logout-inner": "0px 8px 8px -4px rgba(10, 13, 18, 0.03)",
        "logout-outer": "0px 20px 24px -4px rgba(10, 13, 18, 0.08)",
        // Use your original hex alphas as RGBA
      },
    },
  },
  plugins: [],
};
