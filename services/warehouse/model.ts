export interface WarehouseModel {
    title: string;
    address: string;
    id: string;
    countOfStores: number;
}
export interface WarehouseProductModel {
   id: string,
   name: string,
   picture: string,
   status: string
   rejectedMessage: string
   categoryId: string
}

