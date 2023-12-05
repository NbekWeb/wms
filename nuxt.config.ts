// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    '@vueuse/nuxt',
  ],
  build: {
    transpile: ['vue-remix-icons'],
  },
  vue: {
    defineModel: true
  }
})