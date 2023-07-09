import { RootStore, RootStoreType } from "../../domain";
import { HttpService, URL_BASE } from "../../services";
import {
  DeleteReportResponse,
  GetAllReportResponse,
  URL_DELETE_REPORT,
  URL_GET_ALL_REPORT,
} from "../models/report.model";

export class ReportService {
  private httpService: HttpService;

  constructor(private store: RootStoreType = RootStore) {
    this.httpService = new HttpService();
  }

  getAllReport() {
    const urlRequest = URL_BASE + URL_GET_ALL_REPORT;

    return this.httpService.get<GetAllReportResponse>(urlRequest);
  }

  deleteReport(id: number) {
    const urlRequest = URL_BASE + URL_DELETE_REPORT + "/" + id;

    return this.httpService.delete<DeleteReportResponse>(urlRequest);
  }
}
