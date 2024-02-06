export interface AnalyticProductModel {
   storeId: string,
   start: null | string,
   end: null | string,
   bestselling: null | boolean,
   profitable: null | boolean
}
export interface AnalyticProductResponseModel {
   id: string,
   name: string,
   unit: string,
   picture: string,
   amount: number,
   profit: number
}
export interface AnalyticStoreResponseModel {
   storeId: string
   start: null | string
   end: null | string
}
export interface AnalyticWarehouseResponseModel {
   warehouseId: string
   start: null | string
   end: null | string
}
export enum DATE_EMUN  {
   DAY = "DAY",
   MONTH = "MONTH",
   YEAR = "YEAR",
}
export interface AnalyticReportResponseModel {
   warehouseId: string
   start: null | string
   end: null | string
   day: number,
   month: number,
   year: number,
   totalInput: number,
   totalOutput: number,
   profit: number,
   pureProfit: number
}