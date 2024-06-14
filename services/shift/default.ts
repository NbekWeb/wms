import { type OrderReportModel } from '.'
import { getEmployee_DEFAULT } from '../employee'

export function getOrderReport_DEFAULT(): OrderReportModel {
   let obj: OrderReportModel = {
      employee: getEmployee_DEFAULT(),
      totalInput: 0,
      totalOutput: 0,
      profit: 0,
      pureProfit: 0
   }
   return obj
}