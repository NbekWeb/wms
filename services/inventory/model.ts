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
   debt: boolean,
   warehouseId: string
}