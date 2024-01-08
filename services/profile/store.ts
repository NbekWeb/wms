import { useStorage } from "@vueuse/core"
export const _TOKEN = useStorage('token', () => '')
export const _username = useStorage('username', () => '')

export function LOGOUT() {
   _TOKEN.value = ''
    navigateTo('/auth/login')
}