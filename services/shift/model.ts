import { type EmployeeModel } from "../employee"
export interface ShiftModel {
   id: string
   employeeId: string
   createdDate: string
   closedDate: string
}
export interface OrderReportModel {
   employee: EmployeeModel,
   totalInput: number,
   totalOutput: number,
   profit: number,
   pureProfit: number
}

export interface OrderShiftModel {
   id: number
   createdDate: string
   totalPrice: number
   type: ORDER_TYPE
   loanStatus: LOAN_STATUS_ENUM
}
export enum ORDER_TYPE {
   LOAN = "LOAN",
   TERMINAL = "TERMINAL",
   CASH = "CASH",
}
export enum LOAN_STATUS_ENUM {
   LOAN_UNPAID = "LOAN_UNPAID",
   LOAN_PAID = "LOAN_PAID",
}

export const LOAN_STATUS_TR = new Map<LOAN_STATUS_ENUM>();
LOAN_STATUS_TR.set(LOAN_STATUS_ENUM.LOAN_PAID, 'Долг выплачен')
LOAN_STATUS_TR.set(LOAN_STATUS_ENUM.LOAN_UNPAID, 'Долг не оплачен')

export const ORDER_TYPE_TR = new Map<ORDER_TYPE>();
ORDER_TYPE_TR.set(ORDER_TYPE.LOAN, 'Заем')
ORDER_TYPE_TR.set(ORDER_TYPE.TERMINAL, 'Терминал')
ORDER_TYPE_TR.set(ORDER_TYPE.CASH, 'Наличные')

export interface OrdersModel {
   productList: [
      {
         productId: string,
         amount: number,
         price: number
      }
   ],
   workShiftId: string,
   type: ORDER_TYPE
}