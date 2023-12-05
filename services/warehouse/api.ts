import { axiosInstance } from '~/services/network'
import { type WarehouseModel } from './index'


export async function createWarehouse_API(payload: WarehouseModel): Promise<[Error, null] | [null, WarehouseModel]> {
    try {
        const response = <WarehouseModel> await axiosInstance.post('auths/login', {
            ...payload
        })
                
        return [null, response]
    } catch (error) {
        return [error as Error, null]
    }
} 