import { RootStore, RootStoreType } from "../../domain";
import { HttpService, URL_BASE } from "../../services";
import {
  FilterCategoryResponse,
  URL_FILTER_CATEGORY,
} from "../models/category.model";

export class CategoryService {
  private httpService: HttpService;

  constructor(private store: RootStoreType = RootStore) {
    this.httpService = new HttpService();
  }

  filterCategory(fruit: string) {
    const urlRequest = URL_BASE + URL_FILTER_CATEGORY;
    const params = {
      category: fruit,
    };
    return this.httpService.get<FilterCategoryResponse>(urlRequest, {
      params: params,
    });
  }
}
