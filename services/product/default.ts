import { type ProductModel, PRODUCT_STATUS_ENUM, MEASUREMENT_UNITS_ENUM } from "./model";

export function getProduct_DEFAULT(): ProductModel {
    const object: ProductModel = {
        id: '',
        name: '',
        picture: '',
        status: PRODUCT_STATUS_ENUM.ACCEPTED,
        rejectedMessage: '',
        unit: MEASUREMENT_UNITS_ENUM.block
    }

    return object;
}