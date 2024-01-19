import { axiosInstance, type BaseListResponse } from '~/services/network'
import { type ExpenseModel } from './index'

export async function createExpense_API(payload: ExpenseModel): Promise<[Error, null] | [null, ExpenseModel]> {
    try {
        const response = <ExpenseModel> await axiosInstance.post('expenses', {
            ...payload
        })
                
        return [null, response]
    } catch (error) {
        return [error as Error, null]
    }
} 

export async function getExpensesByStoreId_API(storeId: string): Promise<[Error, null] | [null, BaseListResponse<ExpenseModel>]> {
    try {
        const response = <BaseListResponse<ExpenseModel>> await axiosInstance.get(`expenses/work-shift/${storeId}`)
                
        return [null, response]
    } catch (error) {
        return [error as Error, null]
    }
} 