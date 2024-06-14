import { type EmployeeModel, EMPLOYEE_POSITION_ENUM } from "./model";

export function getEmployee_DEFAULT(): EmployeeModel {
    const object: EmployeeModel = {
       firstname: '',
       lastname: '',
       username: '',
       password: '',
       id: '',
       works: [],
    }

    return object;
}