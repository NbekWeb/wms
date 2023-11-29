/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      colors: {
        primary: '#141416',
        text: "#64748B",
        danger: "#EB5757"
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

