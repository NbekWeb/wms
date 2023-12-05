import { type EmployeeModel, EMPLOYEE_POSITION_ENUM } from "./model";

export function getEmployee_DEFAULT(): EmployeeModel {
    const object: EmployeeModel = {
        storeId: '',
        warehouseId: '',
        position: EMPLOYEE_POSITION_ENUM.WH_WORKER,
        firstname: '',
        lastname: '',
        mobile: '',
        username: '',
        password: '',
    }

    return object;
}