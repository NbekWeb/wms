import { useStorage } from "@vueuse/core"
export const _TOKEN = useStorage('token', () => '')