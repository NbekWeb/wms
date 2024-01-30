import { type CustomerModel } from ".";

export function customer_DEFAULT(): CustomerModel {
   const obj: CustomerModel = {
      id: '',
      firstname: '',
      lastname: '',
      mobile: ''
   }
   return obj
}