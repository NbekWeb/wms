import { type ProductModel, PRODUCT_STATUS_ENUM } from "./model";

export function getProduct_DEFAULT(): ProductModel {
    const object: ProductModel = {
        id: '',
        name: '',
        picture: '',
        status: PRODUCT_STATUS_ENUM.ACCEPTED,
        rejectedMessage: '',
        type: ''
    }

    return object;
}