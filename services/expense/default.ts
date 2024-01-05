import { type ExpenseModel } from "./model";

export function getExpense_DEFAULT(): ExpenseModel {
    const object: ExpenseModel = {
        storeId: '',
        comment: '',
        amount: 0
    }

    return object;
}