import { axiosInstance } from '~/services/network'
import { getProfile_DEFAULT, type ProfileModel } from './index'


export async function login_API(username: string, password: string): Promise<[Error, null] | [null, ProfileModel]> {
    try {
        const response = <ProfileModel> await axiosInstance.post('auths/login', {
            username, password
        })
                
        return [null, response]
    } catch (error) {
        return [error, null]
    }
} 