export interface BaseResponse {
    
}

export interface BaseListResponse<T> {
    content: T[];
    size: number;
    page: number;
    currentPage: number;
    totalPages: number;
    totalElements: number;
    number: number;
}

export interface BaseError {
    code: 1,
    message: ''
}