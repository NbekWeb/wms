import { useStorage } from "@vueuse/core"
export const _TOKEN = useStorage('token', () => '')
export const _username = useStorage('username', () => '')