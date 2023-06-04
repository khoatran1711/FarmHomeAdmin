import { RootStore, RootStoreType } from "../../domain";
import { HttpService, URL_BASE } from "../../services";
import { GetAllNewResponse, URL_GET_ALL_NEWS } from "../models/news.model";

export class NewsService {
  private httpService: HttpService;

  constructor(private store: RootStoreType = RootStore) {
    this.httpService = new HttpService();
  }

  getAllNews() {
    const urlRequest = URL_BASE + URL_GET_ALL_NEWS;

    return this.httpService.get<GetAllNewResponse>(urlRequest);
  }
}
