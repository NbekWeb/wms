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
    firstname: string;
    lastname: string;
    orgName: string;
    tin: number;
    mobile: string;
    username: string;
    password: string;
    confirmPassword: string;
}