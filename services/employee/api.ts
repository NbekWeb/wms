import { axiosInstance } from '~/services/network'
import { type EmployeeModel } from './index'

export async function createEmployee_API(payload: EmployeeModel): Promise<[Error, null] | [null, EmployeeModel]> {
    try {
        const response = <EmployeeModel> await axiosInstance.post('auths/login', {
            ...payload
        })
                
        return [null, response]
    } catch (error) {
        return [error as Error, null]
    }
} 