import { RootStore, RootStoreType } from "../../domain";
import { HttpService, URL_BASE } from "../../services";
import {
  StatisticDateResponse,
  StatisticUserResponse,
  StatisticUsersResponse,
  URL_STATISTIC_DATE,
  URL_STATISTIC_USER,
} from "../models/chart.model";
import {
  URL_FARMER_BY_DATE,
  URL_MERCHANT_BY_DATE,
  URL_PRODUCT_BY_DATE,
} from "../models/statistic.model";

export class ChartService {
  private httpService: HttpService;

  constructor(private store: RootStoreType = RootStore) {
    this.httpService = new HttpService();
  }

  statisticUser() {
    const urlRequest = URL_BASE + URL_STATISTIC_USER;

    return this.httpService.get<StatisticUsersResponse>(urlRequest);
  }

  statisticDate(day: number) {
    const urlRequest = URL_BASE + URL_STATISTIC_DATE + "/" + day.toString();

    return this.httpService.get<StatisticDateResponse>(urlRequest);
  }

  statisticProductByDateRange(startDate: string, endDate: string) {
    const urlRequest = URL_BASE + URL_PRODUCT_BY_DATE;
    const params = {
      startDate: startDate,
      endDate: endDate,
    };
    return this.httpService.get<StatisticDateResponse>(urlRequest, {
      params: params,
    });
  }

  statisticFarmerByDate(startDate: string, endDate: string) {
    const urlRequest = URL_BASE + URL_FARMER_BY_DATE;
    const params = {
      startDate: startDate,
      endDate: endDate,
    };
    return this.httpService.get<StatisticUserResponse>(urlRequest, {
      params: params,
    });
  }

  statisticMerchantByDate(startDate: string, endDate: string) {
    const urlRequest = URL_BASE + URL_MERCHANT_BY_DATE;
    const params = {
      startDate: startDate,
      endDate: endDate,
    };
    return this.httpService.get<StatisticUserResponse>(urlRequest, {
      params: params,
    });
  }
}
