/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#299764',
        green: {
          50: '#fbfefc',
          100: '#f2fcf5',
          200: '#e9f9ee',
          300: '#ddf3e4',
          400: '#ccebd7',
          500: '#b4dfc4',
          600: '#92ceac',
          700: '#5bb98c',
          800: '#30a46c',
          900: '#299764',
          1000: '#18794e',
          1100: '#153226',
        },
        slate: {
          50: '#fbfcfd',
          100: '#f8f9fa',
          200: '#f1f3f5',
          300: '#eceef0',
          400: '#e6e8eb',
          500: '#dfe3e6',
          600: '#d7dbdf',
          700: '#c1c8cd',
          800: '#889096',
          900: '#7e868c',
          1000: '#687076',
          1100: '#11181c',
        },
      },
    },
  },
  plugins: [],
};
