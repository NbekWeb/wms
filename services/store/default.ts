import { type StoreModel } from "./model";

export function getStore_DEFAULT(): StoreModel {
    const object: StoreModel = {
        warehouseId: '',
        title: '',
        address: '',
        id: ''
    }

    return object;
}