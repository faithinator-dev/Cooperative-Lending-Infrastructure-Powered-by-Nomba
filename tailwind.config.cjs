/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
    theme: {
  extend: {
    colors: {
      primary: '#6200EE', // Replace with the exact Nomba Purple hex
      accent: {
        green: '#10B981',
        blue: '#3B82F6',
        orange: '#F59E0B'
      }
    }
}
  },
  plugins: [],
}
