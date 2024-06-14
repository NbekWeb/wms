export enum PRODUCT_STATUS_ENUM {
    INITIALIZED = 'INITIALIZED',
    REJECTED = 'REJECTED',
    MODERATION = 'MODERATION',
    ACCEPTED = 'ACCEPTED'
}

export enum MEASUREMENT_UNITS_ENUM {
    piece = 'piece',
    gram = 'gram',
    kilogram = 'kilogram',
    liter = 'liter',
    milliliter = 'milliliter',
    centimetre = 'centimetre',
    metre = 'metre',
    roll = 'roll',
    box = 'box',
    block = 'block'
}

export const MEASUREMENT_UNITS = new Map<MEASUREMENT_UNITS_ENUM, string>()
MEASUREMENT_UNITS.set(MEASUREMENT_UNITS_ENUM.piece, 'Штук (шт.)')
MEASUREMENT_UNITS.set(MEASUREMENT_UNITS_ENUM.block, 'Блок')
MEASUREMENT_UNITS.set(MEASUREMENT_UNITS_ENUM.gram, 'Грамм (гр)')
MEASUREMENT_UNITS.set(MEASUREMENT_UNITS_ENUM.kilogram, 'Килограмм (кг)')
MEASUREMENT_UNITS.set(MEASUREMENT_UNITS_ENUM.liter, 'Литр (л)')
MEASUREMENT_UNITS.set(MEASUREMENT_UNITS_ENUM.milliliter, 'Миллилитр (мл)')
MEASUREMENT_UNITS.set(MEASUREMENT_UNITS_ENUM.centimetre, 'Сантиметр (см)')
MEASUREMENT_UNITS.set(MEASUREMENT_UNITS_ENUM.metre, 'Метр (м)')
MEASUREMENT_UNITS.set(MEASUREMENT_UNITS_ENUM.roll, 'Рулон')
MEASUREMENT_UNITS.set(MEASUREMENT_UNITS_ENUM.box, 'Коробка')

export interface ProductModel {
    id: string;
    name: string;
    picture: string;
    status: PRODUCT_STATUS_ENUM;
    rejectedMessage: string;
    unit: MEASUREMENT_UNITS_ENUM;
}
export interface ProductRequestModel {
   id?: string;
   name: string;
   picture: string;
   unit: MEASUREMENT_UNITS_ENUM;
   categoryId: string;
}