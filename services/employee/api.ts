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
export async function patchEmployee_API(payload: EmployeeModel): Promise<[Error, null] | [null, EmployeeModel]> {
   try {
       const response = <EmployeeModel> await axiosInstance.patch(`employees/${payload.id}`, {
           ...payload
       })
               
       return [null, response]
   } catch (error) {
       return [error as Error, null]
   }
} 


export async function assignEmployee_API(payload: EmployeeModel): Promise<[Error, null] | [null, EmployeeModel]> {
    try {
        const response = <EmployeeModel> await axiosInstance.put(`employees/${payload.id}`, payload.works)
                
        return [null, response]
    } catch (error) {
        return [error as Error, null]
    }
} 

export async function removeEmployee_API(id: string): Promise<[Error, null] | [null, EmployeeModel]> {
    try {
        const response = <EmployeeModel> await axiosInstance.delete(`employees/${id}`)
                
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