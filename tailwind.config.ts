
/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      "./components/**/*.{js,vue,ts}",
      "./layouts/**/*.vue",
      "./pages/**/*.vue",
      "./plugins/**/*.{js,ts}",
      "./nuxt.config.{js,ts}",
      "./app.vue",
   ],
   theme: {
      extend: {
         colors: {
            primary: '#141416',
            "primary-light": "#141416",
            text: "#64748B",
            danger: "#EB5757",
            "info-main": "#F5F5F5",
            "gray": "#F9F9F9",
            "info": "#F4F7FB"
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
};

