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
        firstname: '',
        lastname: '',
        orgName: '',
        tin: 0,
        mobile: '',
        username: '',
        password: '',
        confirmPassword: '',
    }

    return object;
}