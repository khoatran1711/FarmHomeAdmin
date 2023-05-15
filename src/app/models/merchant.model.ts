export const URL_GET_ALL_MERCHANT = "admin/user/getAllMerchant"
export const URL_SEARCH_MERCHANT = "admin/user/searchMerchant"

export interface GetHaveUserListResponse {
    contents: User[] | [];
    totalPages: number;
    totalItems: number;
    sizeCurrentItems: number;
    numberOfCurrentPage: number;
    first: boolean;
    last: boolean;
}

export interface User {
    id: number;
    username: string;
    avatar: string;
    firstName: string;
    lastName: string;
    birthDay: string;
    email: string;
    phone: string;
    description?: string | null;
    location: Location;
    createDate: string;
    status: {
        id: number;
        name: string;
    }
}

export interface Location {
    id: number;
    address: string;
    ward: Ward;
}

export interface Ward {
    id: number;
    name: string;
    district: District;
}

export interface District {
    id: number;
    name: string;
    province: Province;
}

export interface Province {
    id: number;
    name: string;
}