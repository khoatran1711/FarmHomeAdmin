import { RootStore, RootStoreType } from "../../domain";
import { HttpService, URL_BASE } from "../../services";
import { GetMerchantDetailResponse, URL_GET_MERCHANT_DETAIL } from "../models/merchant-detail.model";

export class MerchantDetailService {
    private httpService: HttpService;

    constructor(private store: RootStoreType = RootStore) {
        this.httpService = new HttpService();
    }

    getMerchantDetail(id: number) {
        const urlRequest = URL_BASE + URL_GET_MERCHANT_DETAIL + "/" + id;

        return this.httpService.get<GetMerchantDetailResponse>(urlRequest);
    }
}