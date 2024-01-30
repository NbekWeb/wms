// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    '@vueuse/nuxt',
    '@element-plus/nuxt',
    'nuxt-vue3-google-signin'
  ],
  googleSignIn: {
    clientId: '964160393945-a5uegr7n7cf2fv6rmtte1q4fno9gvllr.apps.googleusercontent.com',
  },
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