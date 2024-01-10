import { axiosInstance, type BaseListResponse } from '~/services/network'
import { type StoreModel } from './index'


export async function createStore_API(payload: StoreModel): Promise<[Error, null] | [null, StoreModel]> {
    try {
        const response = <StoreModel> await axiosInstance.post('stores', {
            ...payload
        })
                
        return [null, response]
    } catch (error) {
        return [error as Error, null]
    }
} 

export async function removeStore_API(id: string): Promise<[Error, null] | [null, StoreModel]> {
    try {
        const response = <StoreModel> await axiosInstance.delete(`stores/${id}`)
                
        return [null, response]
    } catch (error) {
        return [error as Error, null]
    }
} 

export async function updateStore_API(payload: StoreModel): Promise<[Error, null] | [null, StoreModel]> {
    try {
        const response = <StoreModel> await axiosInstance.put(`stores/${payload.id}`, {
            ...payload
        })
                
        return [null, response]
    } catch (error) {
        return [error as Error, null]
    }
} 

export async function getStores_API(): Promise<[Error, null] | [null,StoreModel[]]> {
    try {
        const response = <StoreModel[]> await axiosInstance.get('stores')
                
        return [null, response]
    } catch (error) {
        return [error as Error, null]
    }
} 