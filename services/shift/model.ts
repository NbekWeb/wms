export interface ShiftModel {
   id: string
   employeeId: string
   createdDate: string
   closedDate: string
}
export interface OrderShiftModel {
   id: number
   createdDate: string
   totalPrice: number
   type: ORDER_TYPE
}
enum ORDER_TYPE {
   LOAN = "LOAN",
   TERMINAL = "TERMINAL",
   CASH = "CASH",
}

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