import { RootStore, RootStoreType } from "../../domain";
import { HttpService, URL_BASE } from "../../services";
import {
  LineChartResponse,
  PieChartRequest,
  PieChartResponse,
  StatsData,
  URL_LINE_CHART,
  URL_PIE_CHART,
  URL_STATS,
} from "../models/statistic.model";
import { DateToStringAPI } from "../utilities/format.utilities";

export class StatisticService {
  private httpService: HttpService;

  constructor(private store: RootStoreType = RootStore) {
    this.httpService = new HttpService();
  }

  getPieChart(startDate: Date, endDate: Date) {
    const urlRequest = URL_BASE + URL_PIE_CHART;
    return this.httpService.get<PieChartResponse>(urlRequest, {
      params: {
        startDate: DateToStringAPI(startDate),
        endDate: DateToStringAPI(endDate),
      },
    });
  }

  getLineChart(startDate: Date, endDate: Date) {
    const urlRequest = URL_BASE + URL_LINE_CHART;
    return this.httpService.get<LineChartResponse>(urlRequest, {
      params: {
        startDate: DateToStringAPI(startDate),
        endDate: DateToStringAPI(endDate),
      },
    });
  }

  getStats() {
    const urlRequest = URL_BASE + URL_STATS;
    return this.httpService.get<StatsData>(urlRequest);
  }
}
