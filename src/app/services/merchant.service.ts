import { RootStore, RootStoreType } from "../../domain";
import { HttpService, URL_BASE } from "../../services";
import { GetHaveUserListResponse, URL_GET_ALL_MERCHANT, URL_SEARCH_MERCHANT } from "../models/merchant.model";

export class MerchantService {
    private httpService: HttpService;

    constructor(private store: RootStoreType = RootStore) {
        this.httpService = new HttpService();
    }

    searchMerchant(username: string) {
        const urlRequest = URL_BASE + URL_SEARCH_MERCHANT;
        const searchParams = {
            username: username
        };
        return this.httpService.get<GetHaveUserListResponse>(urlRequest, { params: searchParams });
    }

    getAllMerchant() {
        const urlRequest = URL_BASE + URL_GET_ALL_MERCHANT;

        return this.httpService.get<GetHaveUserListResponse>(urlRequest);
    }
}