/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      colors: {
        primary: '#141416',
        "primary-light": "#141416",
        text: "#64748B",
        danger: "#EB5757",
        "info-main": "#F5F5F5"
      },
      fontFamily: {
        "commissioner": ["commissioner-400"],
        "commissioner-400": ["commissioner-400"],
        "commissioner-600": ["commissioner-600"],
        "commissioner-700": ["commissioner-700"]
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

