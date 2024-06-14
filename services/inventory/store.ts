import { useStorage } from "@vueuse/core"
import { getInventorySent_DEFAULT, getInventoryOrderRecive_DEFAULT, type InventoryOrderReciveModel, getInventoryOrder_DEFAULT, type InventoryOrderModel, type InventorySentModel } from '.'

export const _sendProduct = useStorage<InventorySentModel>('send-store', () => getInventorySent_DEFAULT())
export const _orderProduct = useStorage<InventoryOrderModel>('order-store', () => getInventoryOrder_DEFAULT())
export const _distributionProduct = useStorage<InventoryOrderReciveModel>('distribution-store', () => getInventoryOrderRecive_DEFAULT())