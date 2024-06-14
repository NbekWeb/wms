import { axiosInstance, type BaseListResponse } from '~/services/network'
import { type WarehouseModel } from './index'


export async function createWarehouse_API(payload: WarehouseModel): Promise<[Error, null] | [null, WarehouseModel]> {
    try {
        const response = <WarehouseModel> await axiosInstance.post('warehouses', {
            ...payload
        })
                
        return [null, response]
    } catch (error) {
        return [error as Error, null]
    }
} 

export async function updateWarehouse_API(payload: WarehouseModel): Promise<[Error, null] | [null, WarehouseModel]> {
    try {
        const response = <WarehouseModel> await axiosInstance.put(`warehouses/${payload.id}`, {
            ...payload
        })
                
        return [null, response]
    } catch (error) {
        return [error as Error, null]
    }
} 

export async function deleteWarehouse_API(id: string): Promise<[Error, null] | [null, WarehouseModel]> {
    try {
        const response = <WarehouseModel> await axiosInstance.put(`warehouses/${id}`)
                
        return [null, response]
    } catch (error) {
        return [error as Error, null]
    }
} 

export async function getWarehouses_API(): Promise<[Error, null] | [null, WarehouseModel[]]> {
    try {
        const response = <WarehouseModel[]> await axiosInstance.get('warehouses')
                
        return [null, response]
    } catch (error) {
        return [error as Error, null]
    }
}
