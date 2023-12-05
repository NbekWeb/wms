export enum EMPLOYEE_POSITION_ENUM {
    WH_WORKER = 'WH_WORKER'
}

export interface EmployeeModel {
    storeId: string;
    warehouseId: string;
    position: EMPLOYEE_POSITION_ENUM;
    firstname: string;
    lastname: string;
    mobile: string;
    username: string;
    password: string;
}