import { RootStore, RootStoreType } from "../../domain";
import { HttpService, URL_BASE } from "../../services";
import { GetFarmerDetailResponse, URL_GET_FARMER_DETAIL } from "../models/farmer-detail.model";

export class FarmerDetailService {
    private httpService: HttpService;

    constructor(private store: RootStoreType = RootStore) {
        this.httpService = new HttpService();
    }

    getFarmerDetail(id: number) {
        const urlRequest = URL_BASE + URL_GET_FARMER_DETAIL + "/" + id;

        return this.httpService.get<GetFarmerDetailResponse>(urlRequest);
    }
}