import { EMPLOYEE_POSITION_ENUM } from "../employee";
import type { ProfileModel, RegisterModel } from "./model";

export function getProfile_DEFAULT(): ProfileModel {
    const object: ProfileModel = {
        expiresAt: new Date(),
        issuedAt: new Date(),
        token: '',
        userId: '',
        username: ''
    }

    return object;
}

export function getRegister_DEFAULT(): RegisterModel {
    const object: RegisterModel = {
        username: '',
        password: '',
        roles: [],
        companyName: '',
        companyType: '',
        name: '',
        surname: '',
        mobile: '',
        position: EMPLOYEE_POSITION_ENUM.STACKER,
        isActive: false,
    }

    return object;
}