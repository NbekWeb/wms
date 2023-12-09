import { axiosInstance, type BaseListResponse } from '~/services/network'
import { type EmployeeModel } from './index'

export async function createEmployee_API(payload: EmployeeModel): Promise<[Error, null] | [null, EmployeeModel]> {
    try {
        const response = <EmployeeModel> await axiosInstance.post('employees', {
            ...payload
        })
                
        return [null, response]
    } catch (error) {
        return [error as Error, null]
    }
} 

export async function updateEmployee_API(payload: EmployeeModel): Promise<[Error, null] | [null, EmployeeModel]> {
    try {
        const response = <EmployeeModel> await axiosInstance.put(`employees/${payload.id}`, {
            ...payload
        })
                
        return [null, response]
    } catch (error) {
        return [error as Error, null]
    }
} 

export async function removeEmployee_API(id: string): Promise<[Error, null] | [null, EmployeeModel]> {
    try {
        const response = <EmployeeModel> await axiosInstance.delete(`employees/97c0220c-45fd-4f9d-9363-c4dddac0b1af`)
                
        return [null, response]
    } catch (error) {
        return [error as Error, null]
    }
} 

export async function getEmployees_API(): Promise<[Error, null] | [null, BaseListResponse<EmployeeModel>]> {
    try {
        const response = <BaseListResponse<EmployeeModel>> await axiosInstance.get('employees')
                
        return [null, response]
    } catch (error) {
        return [error as Error, null]
    }
} 