import { axiosInstance, type BaseListResponse } from '~/services/network'
import { type InventoryModel, type InventoryAddModel } from './index'

export async function createInventory_API(payload: InventoryAddModel): Promise<[Error, null] | [null, InventoryAddModel]> {
    try {
        const response = <InventoryAddModel> await axiosInstance.post('inventories', {
            ...payload
        })
                
        return [null, response]
    } catch (error) {
        return [error as Error, null]
    }
} 

export async function getInventoriesByWarehouseId_API(warehouseId: string): Promise<[Error, null] | [null, BaseListResponse<InventoryModel>]> {
    try {
        const response = <BaseListResponse<InventoryModel>> await axiosInstance.get(`inventories/warehouse/${warehouseId}`)
                
        return [null, response]
    } catch (error) {
        return [error as Error, null]
    }
}

export async function getInventoryById_API(warehouseId: string): Promise<[Error, null] | [null, InventoryModel]> {
    try {
        const response = <InventoryModel> await axiosInstance.get(`inventories/warehouse/${warehouseId}`)
                
        return [null, response]
    } catch (error) {
        return [error as Error, null]
    }
} 