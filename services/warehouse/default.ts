import { type WarehouseModel } from "./model";

export function getWarehouse_DEFAULT(): WarehouseModel {
    const object: WarehouseModel = {
        title: '',
        address: '',
    }

    return object;
}