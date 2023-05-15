import { RootStore, RootStoreType } from "../../domain";
import { HttpService, URL_BASE } from "../../services";
import { URL_GET_ALL_FARMER, URL_SEARCH_FARMER } from "../models/farmer.model";
import { GetHaveUserListResponse } from "../models/merchant.model";

export class FarmerService {
    private httpService: HttpService;

    constructor(private store: RootStoreType = RootStore) {
        this.httpService = new HttpService();
    }

    searchFarmer(username: string) {
        const urlRequest = URL_BASE + URL_SEARCH_FARMER;
        const searchParams = {
            username: username
        };
        return this.httpService.get<GetHaveUserListResponse>(urlRequest, { params: searchParams });
    }

    getAllFarmer() {
        const urlRequest = URL_BASE + URL_GET_ALL_FARMER;

        return this.httpService.get<GetHaveUserListResponse>(urlRequest);
    }
}