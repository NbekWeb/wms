import { useStorage } from "@vueuse/core"
import { getInventorySent_DEFAULT, type InventorySentModel } from '.'
export const _sendProduct = useStorage<InventorySentModel>('send-store', () => getInventorySent_DEFAULT())