/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,css}'],
  theme: {
    extend: {
      backgroundImage: {
        'hero-image': "url('/banner.png')",
      },
      fontFamily: {
        MONT: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
