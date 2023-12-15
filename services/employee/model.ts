export enum EMPLOYEE_POSITION_ENUM {
    SALESMAN = 'SALESMAN',
    STACKER = 'STACKER',
}

export const EMPLOYEE_POSITION = new Map<EMPLOYEE_POSITION_ENUM, string>()
EMPLOYEE_POSITION.set(EMPLOYEE_POSITION_ENUM.STACKER, 'STACKER')
EMPLOYEE_POSITION.set(EMPLOYEE_POSITION_ENUM.SALESMAN, 'SALESMAN')

export enum USER_ROLES_ENUM {
    ADMIN = 'ADMIN',
    USER = 'USER',
    CASHIER = 'CASHIER',
    EMPLOYEE = 'EMPLOYEE',
    MANAGER = 'MANAGER',
}

export interface EmployeeModel {
    id: string;
    position: EMPLOYEE_POSITION_ENUM;
    workId: string;
    firstname: string;
    lastname: string;
    mobile: string;
    username: string;
    password: string;
    assignedStoreName: string;
    assignedWarehouseName: string;
}