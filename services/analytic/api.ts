import { axiosInstance, type BaseListResponse } from '~/services/network'
import { type AnalyticProductModel, type AnalyticProductResponseModel, type AnalyticReportResponseModel, type AnalyticWarehouseResponseModel, type AnalyticStoreResponseModel } from ".";

export async function postAnalyticProduct_API(data: AnalyticProductModel, page: number): Promise<[BaseListResponse<AnalyticProductResponseModel>, null] | [null, Error]> {
   try {
      const response = <BaseListResponse<AnalyticProductResponseModel>>
         await axiosInstance.post(`analytics/product`, data, {
            params: {
               page: page > 0 ? page : 0,
               size: 10
            }
         })

      return [response, null]
   } catch (error) {
      return [null, error as Error]
   }
}
export async function postAnalyticStore_API(data: AnalyticStoreResponseModel, page: number): Promise<[BaseListResponse<AnalyticProductResponseModel>, null] | [null, Error]> {
   try {
      const response = <BaseListResponse<AnalyticProductResponseModel>>
         await axiosInstance.post(`analytics/store`, data, {
            params: {
               page: page > 0 ? page : 0,
               size: 10
            }
         })

      return [response, null]
   } catch (error) {
      return [null, error as Error]
   }
}
export async function postAnalyticWarehouse_API(data: AnalyticWarehouseResponseModel, page: number): Promise<[BaseListResponse<AnalyticProductResponseModel>, null] | [null, Error]> {
   try {
      const response = <BaseListResponse<AnalyticProductResponseModel>>
         await axiosInstance.post(`analytics/warehouse`, data, {
            params: {
               page: page > 0 ? page : 0,
               size: 10
            }
         })

      return [response, null]
   } catch (error) {
      return [null, error as Error]
   }
}
export async function postAnalyticReport_API(type: string, page: number): Promise<[AnalyticReportResponseModel[], null] | [null, Error]> {
   try {
      const response = <AnalyticReportResponseModel[]>
         await axiosInstance.post(`analytics/sales`, { type }, {
            params: {
               page: page > 0 ? page : 0,
               size: 10
            }
         })

      return [response, null]
   } catch (error) {
      return [null, error as Error]
   }
}