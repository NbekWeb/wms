import { type InventoryModel, type InventoryAddModel, type InventorySentModel } from "./model";

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