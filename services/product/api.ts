import { axiosInstance, type BaseListResponse } from '~/services/network'
import { PRODUCT_STATUS_ENUM, type ProductModel } from './index'

export async function createProduct_API(payload: ProductModel): Promise<[Error, null] | [null, string]> {
    try {
        const response = <string> await axiosInstance.post('products', {
            ...payload
        })
                
        return [null, response]
    } catch (error) {
        return [error as Error, null]
    }
} 

export async function sendProductToModeration_API(id: string): Promise<[Error, null] | [null, ProductModel]> {
    try {
        const response = <ProductModel> await axiosInstance.post(`products/send-to-moderation/${id}`)
                
        return [null, response]
    } catch (error) {
        return [error as Error, null]
    }
} 

export async function getProducts_API(): Promise<[Error, null] | [null, BaseListResponse<ProductModel>]> {
    try {
        const response = <BaseListResponse<ProductModel>> await axiosInstance.get('employees')
                
        return [null, response]
    } catch (error) {
        return [error as Error, null]
    }
} 

export async function getProductsByStatus_API(status: PRODUCT_STATUS_ENUM, page: number): Promise<[Error, null] | [null, BaseListResponse<ProductModel>]> {
    try {
        const response = <BaseListResponse<ProductModel>> await axiosInstance.get('products/status/' + status, {
            params: {
                page: page > 0 ? page : 0,
                size: 10
            }
        })
                
        return [null, response]
    } catch (error) {
        return [error as Error, null]
    }
} 

export async function getProductsAutocomplete_API(name: string): Promise<[Error, null] | [null, BaseListResponse<ProductModel>]> {
    try {
        const response = <BaseListResponse<ProductModel>> await axiosInstance.get('products/autocomplete', {
            params: {
                name
            }
        })
                
        return [null, response]
    } catch (error) {
        return [error as Error, null]
    }
} 