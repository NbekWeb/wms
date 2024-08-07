import { axiosInstance } from '~/services/network'

export async function acceptProduct_API(id: string): Promise<[Error, null] | [null, null]> {
    try {
        const response = await axiosInstance.post(`moderators/accept/${id}`)
                
        return [null, null]
    } catch (error) {
        return [error as Error, null]
    }
} 

export async function rejectProduct_API(id: string, rejectedMessage: string): Promise<[Error, null] | [null, null]> {
    try {
        const response = await axiosInstance.post(`moderators/reject/${id}`, {
            rejectedMessage
        })
                
        return [null, null]
    } catch (error) {
        return [error as Error, null]
    }
} 
