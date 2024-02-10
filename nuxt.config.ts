// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    '@vueuse/nuxt',
    '@element-plus/nuxt',
  ],
  build: {
    transpile: ['vue-remix-icons'],
  },
  vue: {
    defineModel: true
  },
  css: ['~/assets/css/custom.css', 'element-plus/theme-chalk/src/notification.scss', 'remixicon/fonts/remixicon.css'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/css/element.scss" as element;`,
        },
      },
    },
  },
  elementPlus: {
    icon: 'ElIcon',
    importStyle: 'scss'
  },
})