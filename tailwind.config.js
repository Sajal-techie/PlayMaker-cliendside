/** @type {import('tailwindcss').Config} */
export default {
  content: [
          "./index.html",
          "./src/**/*.{js,ts,jsx,tsx}"
        ],
  theme: {
    extend: {
      colors: {
      'gblue': {
        100: '#a5cff4',
        200: '#61abec',
        300: '#4a9fea',
        400: '#3493e7',
        500: '#1e88e5',
        600: '#1b7ace',
        700: '#186cb7',
        800: '#155fa0',
        900: '#0c365b',
      },
    },
    fontFamily: {
      kanit: ["Kanit", "sans-serif"],
      acme: ["Acme", "sans-serif"],
    },
  },
  },
  plugins: [],
}

