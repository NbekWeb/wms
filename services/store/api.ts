import { axiosInstance } from '~/services/network'
import { type StoreModel } from './index'


export async function createStore_API(payload: StoreModel): Promise<[Error, null] | [null, StoreModel]> {
    try {
        const response = <StoreModel> await axiosInstance.post('auths/login', {
            ...payload
        })
                
        return [null, response]
    } catch (error) {
        return [error as Error, null]
    }
} 