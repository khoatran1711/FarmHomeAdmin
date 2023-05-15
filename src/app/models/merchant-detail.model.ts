import { User } from "./merchant.model";

export const URL_GET_MERCHANT_DETAIL = "admin/user/getMerchantDetail";

export interface GetMerchantDetailResponse {
    user: User;
    historyList: Value[];
    orderList: Value[];
}

export interface Value {
    id: number;
    fruit: {
        name: String;
    }
    price: number;
    amount: number;
    date: String;
    farmer: {
        firstName: String;
        lastName: String;
    }
    merchant: {
        firstName: String;
        lastName: String;
    }
}
