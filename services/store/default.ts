import { type StoreModel } from "./model";

export function getStore_DEFAULT(): StoreModel {
    const object: StoreModel = {
        warehouseId: '',
        title: '',
        address: '',
        id: '',
        countOfEmployees: 0
    }

    return object;
}