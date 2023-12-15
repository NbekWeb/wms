import { type EmployeeModel, EMPLOYEE_POSITION_ENUM } from "./model";

export function getEmployee_DEFAULT(): EmployeeModel {
    const object: EmployeeModel = {
        workId: '',
        position: EMPLOYEE_POSITION_ENUM.SALESMAN,
        firstname: '',
        lastname: '',
        mobile: '',
        username: '',
        password: '',
        id: '',
        assignedStoreName: '',
        assignedWarehouseName: '',
    }

    return object;
}