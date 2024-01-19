import { axiosInstance, type BaseListResponse } from '~/services/network'
import { type ShiftModel, type OrderShiftModel } from './index'

export async function createShift_API(storeId: string): Promise<[Error, null] | [null, ShiftModel]> {
   try {
      const response = <ShiftModel>await axiosInstance.post(`work-shifts/store/${storeId}`)

      return [null, response]
   } catch (error) {
      return [error as Error, null]
   }
}

export async function createOrders_API(employeeId: string): Promise<[Error, null] | [null, ShiftModel]> {
   try {
      const response = <ShiftModel>await axiosInstance.post('orders', {
         employeeId
      })

      return [null, response]
   } catch (error) {
      return [error as Error, null]
   }
}
export async function getOrderById_API(id: string): Promise<[Error, null] | [null, ShiftModel]> {
   try {
      const response = <ShiftModel>await axiosInstance.get('orders/' + id)

      return [null, response]
   } catch (error) {
      return [error as Error, null]
   }
}

export async function closeShift_API(id: string): Promise<[Error, null] | [null, ShiftModel]> {
   try {
      const response = <ShiftModel>await axiosInstance.put(`/work-shifts/${id}`)

      return [null, response]
   } catch (error) {
      return [error as Error, null]
   }
}

export async function getShift_API(storeId: string, page: number): Promise<[Error, null] | [null, BaseListResponse<ShiftModel>]> {
   try {
      const response = <BaseListResponse<ShiftModel>>await axiosInstance.get(`/work-shifts/store/${storeId}/me`, {
         params: {
            page: page > 0 ? page : 0,
            size: 10
         }
      })

      return [null, response]
   } catch (error) {
      return [error as Error, null]
   }
}
export async function getOrderWorkShift_API(workShiftId: string, page: number): Promise<[Error, null] | [null, BaseListResponse<OrderShiftModel>]> {
   try {
      const response = <BaseListResponse<OrderShiftModel>>await axiosInstance.get(`/orders/work-shift/${workShiftId}`, {
         params: {
            page: page > 0 ? page : 0,
            size: 10
         }
      })

      return [null, response]
   } catch (error) {
      return [error as Error, null]
   }
} 