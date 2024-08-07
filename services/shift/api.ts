import { axiosInstance, type BaseListResponse } from '~/services/network'
import { type ShiftModel, type OrderShiftModel, type OrderReportModel } from './index'

export async function createShift_API(storeId: string): Promise<[Error, null] | [null, ShiftModel]> {
   try {
      const response = <ShiftModel>await axiosInstance.post(`work-shifts`, {
         storeId
      })

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
export async function getOrderCustomer_API(id: string): Promise<[Error, null] | [null, ShiftModel]> {
   try {
      const response = <ShiftModel>await axiosInstance.get('orders/customer/' + id)

      return [null, response]
   } catch (error) {
      return [error as Error, null]
   }
}
export async function orderIdPaid_API(id: string): Promise<[Error, null] | [null, ShiftModel]> {
   try {
      const response = <ShiftModel>await axiosInstance.put(`/orders/${id}/paid`)

      return [null, response]
   } catch (error) {
      return [error as Error, null]
   }
}

export async function closeShift_API(id: string): Promise<[Error, null] | [null, ShiftModel]> {
   try {
      const response = <ShiftModel>await axiosInstance.put(`/work-shifts/${id}/close`)

      return [null, response]
   } catch (error) {
      return [error as Error, null]
   }
}

export async function getShift_API(storeId: string, page: number): Promise<[Error, null] | [null, BaseListResponse<ShiftModel>]> {
   try {
      const response = <BaseListResponse<ShiftModel>>await axiosInstance.get(`/work-shifts`, {
         params: {
            storeId,
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
export async function getOrderReport_API(id: string): Promise<[Error, null] | [null, OrderReportModel]> {
   try {
      const response = <OrderReportModel>await axiosInstance.get(`/work-shifts/${id}/report`)

      return [null, response]
   } catch (error) {
      return [error as Error, null]
   }
} 