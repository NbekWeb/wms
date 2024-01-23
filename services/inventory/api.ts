import { axiosInstance, type BaseListResponse } from '~/services/network'
import { type InventoryModel, type InventoryAddModel, type InventoryProductPartModel } from './index'

export async function createInventory_API(payload: InventoryAddModel): Promise<[Error, null] | [null, InventoryAddModel]> {
   try {
      const response = <InventoryAddModel>await axiosInstance.post('inventories', {
         ...payload
      })

      return [null, response]
   } catch (error) {
      return [error as Error, null]
   }
}

export async function getInventoriesByWarehouseId_API(warehouseId: string): Promise<[Error, null] | [null, BaseListResponse<InventoryModel>]> {
   try {
      const response = <BaseListResponse<InventoryModel>>await axiosInstance.get(`inventories/warehouse/${warehouseId}`)

      return [null, response]
   } catch (error) {
      return [error as Error, null]
   }
}
export async function getInventoriesStoreId_API(storeId: string): Promise<[Error, null] | [null, BaseListResponse<InventoryModel>]> {
   try {
      const response = <BaseListResponse<InventoryModel>>await axiosInstance.get(`/inventories/store/${storeId}`)

      return [null, response]
   } catch (error) {
      return [error as Error, null]
   }
}

export async function getInventoryById_API(warehouseId: string): Promise<[Error, null] | [null, InventoryModel]> {
   try {
      const response = <InventoryModel>await axiosInstance.get(`inventories/warehouse/${warehouseId}`)

      return [null, response]
   } catch (error) {
      return [error as Error, null]
   }
}

export async function getInventoryProductPart_API(warehouseId: string, productId: string): Promise<[Error, null] | [null, InventoryProductPartModel[]]> {
   try {
      const response = <InventoryProductPartModel[]>await axiosInstance.get(`inventories/product-part`, {
         params: {
            warehouseId,
            productId
         }
      })

      return [null, response]
   } catch (error) {
      return [error as Error, null]
   }
}
export async function sentInventory_API(data: any): Promise<[Error, null] | [null, InventoryModel]> {
   console.log(data);

   const arr = data.inventories.map((item) => {
      return {
         id: item.id,
         amount: item.amount
      }
   })
   try {
      const response = <InventoryModel>await axiosInstance.post(`/inventories/sent`, {
         storeId: data.storeId,
         inventories: arr
      })

      return [null, response]
   } catch (error) {
      return [error as Error, null]
   }
}
export async function getInventoryAccept_API(id: string): Promise<[Error, null] | [null, InventoryModel]> {
   try {
      const response = <InventoryModel>await axiosInstance.post(`inventories/${id}/accept`)

      return [null, response]
   } catch (error) {
      return [error as Error, null]
   }
}
export async function postOrder_API(data: any): Promise<[Error, null] | [null, InventoryModel]> {
   try {
      let item = data.productList.map((el) => {
         return {
            amount: el.amount,
            productId: el.productId,
            price: el.sellingPrice
         }
      })
      console.log('item', item);

      const response = <InventoryModel>await axiosInstance.post(`orders`, {
         ...data,
         productList: item,
      })

      return [null, response]
   } catch (error) {
      return [error as Error, null]
   }
}
export async function getOrderFetch_API(): Promise<[Error, null] | [null, any]> {
   try {

      const response = <any>await axiosInstance.get(`inventories/d-order/fetch`)

      return [null, response]
   } catch (error) {
      return [error as Error, null]
   }
}
export async function postOrderReceive_API(id: number, data: any): Promise<[Error, null] | [null, any]> {
   try {

      const response = <any>await axiosInstance.post(`/inventories/d-order/receive/${id}`, data)

      return [null, response]
   } catch (error) {
      return [error as Error, null]
   }
} 