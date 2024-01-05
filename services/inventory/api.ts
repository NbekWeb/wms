import { axiosInstance, type BaseListResponse } from '~/services/network'
import { type InventoryModel } from './index'

export async function createInventory_API(payload: InventoryModel): Promise<[Error, null] | [null, InventoryModel]> {
    try {
        const response = <InventoryModel> await axiosInstance.post('inventories', {
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