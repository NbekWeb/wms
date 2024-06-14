import { axiosInstance } from '~/services/network'
import { type LoginModel, type ProfileModel, type RegisterModel } from './index'

export async function login_API(payload: LoginModel): Promise<[Error, null] | [null, ProfileModel]> {
    try {
        const response = <ProfileModel> await axiosInstance.post('auths/login', {
            ...payload
        })
                
        return [null, response]
    } catch (error) {
        return [error as Error, null]
    }
} 

export async function register_API(payload: RegisterModel): Promise<[Error, null] | [null, ProfileModel]> {
    try {
        const response = <ProfileModel> await axiosInstance.post('auths/register', {
            ...payload,
        })
                
        return [null, response]
    } catch (error) {
        return [error as Error, null]
    }
}
