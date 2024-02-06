import { axiosInstance, type BaseListResponse } from '~/services/network'
import { type CustomerModel } from ".";

export async function getCustomers_API(
   page: number = 0,
   size: number = 20
): Promise<[CustomerModel[], null] | [null, Error]> {
   try {
      const response = <CustomerModel[]>await axiosInstance.get(
         `customers`,
         {
            params: {
               page,
               size
            }
         }
      )

      return [response, null]
   } catch (error) {
      return [null, error as Error]
   }
}
export async function getProductsAutocomplete_API(search: string): Promise<[CustomerModel[], null] | [null, Error]> {
   try {
      const response = <CustomerModel[]>await axiosInstance.get(
         `customers/autocomplete`,
         {
            params: {
               search
            }
         }
      )
      return [response, null]
   } catch (error) {
      return [null, error as Error]
   }
}
export async function addCustomer_API(data: CustomerModel): Promise<[BaseListResponse<CustomerModel>, null] | [null, Error]> {
   try {
      const response = <BaseListResponse<CustomerModel>>await axiosInstance.post(
         `customers`, data)

      return [response, null]
   } catch (error) {
      return [null, error as Error]
   }
}
export async function updateCustomer_API(data: CustomerModel): Promise<[BaseListResponse<CustomerModel>, null] | [null, Error]> {
   try {
      const response = <BaseListResponse<CustomerModel>>await axiosInstance.patch(
         `customers/${data.id}`, data)

      return [response, null]
   } catch (error) {
      return [null, error as Error]
   }
}
export async function deleteCustomer_API(id: string): Promise<[BaseListResponse<CustomerModel>, null] | [null, Error]> {
   try {
      const response = <BaseListResponse<CustomerModel>>await axiosInstance.delete(
         `customers/${id}`)

      return [response, null]
   } catch (error) {
      return [null, error as Error]
   }
}
export async function getLoanCustomer_API(): Promise<[number, null] | [null, Error]> {
   try {
      const response = <number>await axiosInstance.get(
         `customers/total-loan`)

      return [response, null]
   } catch (error) {
      return [null, error as Error]
   }
}
