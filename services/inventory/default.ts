import { type InventoryModel, type InventoryOrderModel, ORDER_TYPE, type InventoryAddModel, type InventorySentModel, type InventoryProductPartModel } from "./model";

export function getInventory_DEFAULT(): InventoryModel {
   const object: InventoryModel = {
      productId: '',
      productName: '',
      amount: 0,
      basePrice: 0,
      sellingPrice: 0,
      partCount: 0,
   }

   return object;
}
export function getInventoryAdd_DEFAULT(): InventoryAddModel {
   const object: InventoryAddModel = {
      productId: '',
      amount: 0,
      basePrice: 0,
      sellingPrice: 0,
      debt: true,
      warehouseId: ''
   }

   return object;
}
export function getInventorySent_DEFAULT(): InventorySentModel {
   const object: InventorySentModel = {
      storeId: '',
      inventories: []
   }

   return object;
}
export function getInventoryOrder_DEFAULT(): InventoryOrderModel {
   const object: InventoryOrderModel = {
      workShiftId: 0,
      type: ORDER_TYPE.LOAN,
      productList: []
   }

   return object;
}