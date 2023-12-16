import { EMPLOYEE_POSITION_ENUM, USER_ROLES_ENUM } from "@/services/employee"

export interface ProfileModel {
    expiresAt: Date;
    issuedAt: Date;
    token: string;
    userId: string;
    username: string;
}

export interface LoginModel {
    username: string;
    password: string;
}

export interface RegisterModel {
    username: string;
    password: string;
    confirmPassword: string;
    roles: USER_ROLES_ENUM[];
    companyName: string;
    companyType: string;
    name: string;
    surname: string;
    mobile: string;
    position: EMPLOYEE_POSITION_ENUM;
    isActive: boolean;
}