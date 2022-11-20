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
        slideBlurred: 'slideBlurred 2s cubic-bezier(0.230, 1.000, 0.320, 1.000) both',
        colorChange: 'colorChange 3s linear infinite alternate both'
      },
      keyframes: {
        slideBlurred: {
          '0%': {
            transform: 'translateY(-1000px) scaleY(2.5) scaleX(0.2)',
            transformOrigin: '50% 0%',
            filter: 'blur(40px)',
          },
          '100%': {
            transform: 'translateY(0) scaleY(1) scaleX(1)',
            transformOrigin: '50% 50%',
            filter: 'blur(0)',
            opacity: '1',
          },
        },
        colorChange: {
          '0%': {
            background: '#19dcea'
          },
          '100%': {
            background: '#b22cff'
          },
        }
      },
    },
    plugins: [],
  }
}