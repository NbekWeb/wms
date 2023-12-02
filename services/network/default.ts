import { type BaseListResponse } from ".";

export function getBaseListResponse_DEFAULT(): BaseListResponse<any> { 
    const object: BaseListResponse<any> = {
        content: [],
        size: 10,
        page: 1,
        totalPages: 0,
        totalElements: 0,
        number: 0
    }

    return object;
}