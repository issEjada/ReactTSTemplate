module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      screens: {
        DEFAULT: '1440px',
        sm: '640px',
        md: '768px',
        lg: '1440px',
        xl: '1440px',
      }
    },
    extend: {
      colors: {
        gray: {
          300: '#D5D7DA',
          500: '#717680',
          600: '#535862',
          700: '#414651',
          800: '#252B37',
          900: '#181D27'
        },
        blue: {
          700: '#175CD3'
        }
      },
      maxWidth: {
        '1440': '1440px',
      }
    },
  },
  plugins: [],
};
