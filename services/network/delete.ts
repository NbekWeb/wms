import { axiosInstance } from "./axios"

export async function deleteItem(url: string): Promise<[any, any]> {
    try {
        console.log(url)
        const response = await axiosInstance.delete(url)
        return [null, response]
    } catch (error) {
        return [error, null]
    }
}