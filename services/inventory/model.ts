export interface InventoryModel {
   productId: string
   productName: string
   amount: number
   basePrice: number
   sellingPrice: number
   partCount: number
}
export interface InventoryAddModel {
   productId: string,
   amount: number,
   basePrice: number,
   sellingPrice: number,
   debt: boolean,
   warehouseId: string
}
export interface InventoryProductPartModel {
   productId: string,
   amount: number,
   basePrice: number,
   sellingPrice: number,
   debt: boolean,
   warehouseId: string
   id: string,
   productName: string,
   unit: string,
   storeId: null,
   createdDate: string
}
export interface InventorySentModel {
   storeId: string,
   inventories: [
      {
         sellingPrice: number
         amount: number
      }
   ]
}
export enum ORDER_TYPE {
   LOAN = "LOAN",
   CASH = "CASH",
   TERMINAL = "TERMINAL"
}
export interface InventoryOrderModel {
   workShiftId: number
   type: ORDER_TYPE,
   regularCustomerId: string
   productList: [
      {
         productId: string
         amount: number
         price: number
      }
   ]
}
export interface InventoryOrderReciveModel {
   warehouseId: string
   sellingPrices: [
      {
         sellingPrice: number
         id: number
      }
   ]
}
