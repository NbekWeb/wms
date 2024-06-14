import { type AnalyticProductModel, type AnalyticWarehouseResponseModel, type AnalyticStoreResponseModel } from '.'

export function analyticProduct_DEFAULT(): AnalyticProductModel {
   let obj: AnalyticProductModel = {
      storeId: '',
      start: null,
      end: null,
      bestselling: null,
      profitable: null
   }
   return obj
}
export function analyticWarehouse_DEFAULT(): AnalyticWarehouseResponseModel {
   let obj: AnalyticWarehouseResponseModel = {
      warehouseId: '',
      start: null,
      end: null,
   }
   return obj
}
export function analyticStore_DEFAULT(): AnalyticStoreResponseModel {
   let obj: AnalyticStoreResponseModel = {
      storeId: '',
      start: null,
      end: null
   }
   return obj
}