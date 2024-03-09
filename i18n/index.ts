// import { createI18n } from 'vue-i18n'
import { useStorage } from '@vueuse/core'

import uz from './uz/index.json'
import ru from './ru/index.json'
import crill from './crill/index.json'

export const _lang = useStorage<('ru' | 'uz' | 'kr')>('locale', () => 'uz')

export default defineI18nConfig(() => ({
   legacy: false,
   locale: _lang.value,
   messages: {
      uz,
      ru,
      crill
   }
}))

