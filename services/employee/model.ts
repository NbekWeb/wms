export enum EMPLOYEE_POSITION_ENUM {
    WH_WORKER = 'WH_WORKER',
    STACKER = 'STACKER',
}

export enum USER_ROLES_ENUM {
    ADMIN = 'ADMIN',
}

export interface EmployeeModel {
    id: string;
    storeId: string;
    warehouseId: string;
    position: EMPLOYEE_POSITION_ENUM;
    firstname: string;
    lastname: string;
    mobile: string;
    username: string;
    password: string;
}