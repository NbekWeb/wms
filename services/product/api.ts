import { axiosInstance, type BaseListResponse } from '~/services/network'
import { PRODUCT_STATUS_ENUM, type ProductModel } from './index'

export async function createProduct_API(payload: ProductModel): Promise<[Error, null] | [null, ProductModel]> {
    try {
        const response = <ProductModel> await axiosInstance.post('products', {
            ...payload
        })
                
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

export async function getProductsByStatus_API(status: PRODUCT_STATUS_ENUM): Promise<[Error, null] | [null, BaseListResponse<ProductModel>]> {
    try {
        const response = <BaseListResponse<ProductModel>> await axiosInstance.get('products/status/' + status, {
            params: {
                page: 0,
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