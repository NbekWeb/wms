// https://nuxt.com/docs/api/configuration/nuxt-config
import { i18n } from '@/i18n';
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    '@element-plus/nuxt',
   ],
   i18n: {
      vueI18n: '~/i18n/index.ts' 
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