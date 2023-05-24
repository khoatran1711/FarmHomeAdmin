import { RootStore, RootStoreType } from "../../domain";
import { HttpService, URL_BASE } from "../../services";
import {
  StatisticDateResponse,
  StatisticUserResponse,
  URL_STATISTIC_DATE,
  URL_STATISTIC_USER,
} from "../models/chart.model";

export class ChartService {
  private httpService: HttpService;

  constructor(private store: RootStoreType = RootStore) {
    this.httpService = new HttpService();
  }

  statisticUser() {
    const urlRequest = URL_BASE + URL_STATISTIC_USER;

    return this.httpService.get<StatisticUserResponse>(urlRequest);
  }

  statisticDate(day: number) {
    const urlRequest = URL_BASE + URL_STATISTIC_DATE + "/" + day.toString();

    return this.httpService.get<StatisticDateResponse>(urlRequest);
  }
}
