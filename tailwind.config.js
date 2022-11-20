/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-rubik)']
      },
      animation: {
        load: 'load 1.5s cubic-bezier(0.230, 1.000, 0.320, 1.000) both',
        text: 'text 2s ease-in-out infinite'
      },
      keyframes: {
        load: {
          '0%': {
            'transform': 'translateY(-1000px) scaleY(2.5) scaleX(0.2)',
            'transform-origin': '50% 0%',
            'filter': 'blur(40px)',
          },
          '100%': {
            'transform': 'translateY(0) scaleY(1) scaleX(1)',
            'transform-origin': '50% 50%',
            'filter': 'blur(0)',
            'opacity': '1',
          },
        },
        text: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        }
      },
    },
    plugins: [],
  }
}