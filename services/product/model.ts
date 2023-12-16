export enum PRODUCT_STATUS_ENUM {
    INITIALIZED = 'INITIALIZED',
    REJECTED = 'REJECTED',
    MODERATION = 'MODERATION',
    ACCEPTED = 'ACCEPTED'
}

export interface ProductModel {
    id: string;
    name: string;
    picture: string;
    status: PRODUCT_STATUS_ENUM;
    rejectedMessage: string;
    type: string;
}