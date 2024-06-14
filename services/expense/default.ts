import { type ExpenseModel } from "./model";

export function getExpense_DEFAULT(): ExpenseModel {
    const object: ExpenseModel = {
        workShiftId: 0,
        comment: '',
        amount: 0
    }

    return object;
}