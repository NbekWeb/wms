/** @type {import('tailwindcss').Config} */
export default {
   content: [
      "./components/**/*.{js,vue,ts}",
      "./layouts/**/*.vue",
      "./pages/**/*.vue",
      "./plugins/**/*.{js,ts}",
      "./nuxt.config.{js,ts}",
      "./app.vue",
   ],
   theme: {
      container: {
         center: true,
         screens: {
            sm: "600px",
            md: "728px",
            lg: "984px",
            xl: "1100px",
            "2xl": "1300px",
         },
      },
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
            "commissioner-500": ["commissioner-500"],
            "commissioner-600": ["commissioner-600"],
            "commissioner-700": ["commissioner-700"]
         },
      },
   },
   plugins: [
      require('@tailwindcss/forms'),
   ],
}