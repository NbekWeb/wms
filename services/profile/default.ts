import { EMPLOYEE_POSITION_ENUM, USER_ROLES_ENUM } from "../employee";
import type { ProfileModel, RegisterModel, LoginModel } from "./model";

export function getLogin_DEFAULT(): LoginModel {
    const object: LoginModel = { 
        password: '',
        username: ''
    }

    return object;
}

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
        confirmPassword: '',
        roles: [USER_ROLES_ENUM.ADMIN],
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