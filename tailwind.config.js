/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      container: { center: true, padding: '1rem', screens: { '2xl': '1200px' } },
      colors: { brand: { DEFAULT: '#6E56CF', foreground: '#FFFFFF' } },
      borderRadius: { xl: '1rem', '2xl': '1.25rem' }
    }
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')], require("tailwindcss-animate")
};
