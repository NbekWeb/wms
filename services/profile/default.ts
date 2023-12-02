import type { ProfileModel } from "./model";

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