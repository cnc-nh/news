module.exports = {
  content: ['./pages/**/*.{js,jsx,tsx,ts}', './components/**/*.{js,jsx,tsx,ts}'],
  theme: {
    extend: {
      colors: {
        "cncRed": "#a00000",
        "cncGold": "#ffc133",
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
