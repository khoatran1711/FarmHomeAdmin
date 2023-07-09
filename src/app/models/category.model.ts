import { Fruit } from "./farmer-detail.model";

export const URL_FILTER_CATEGORY = "fruit/filter-category";
export interface FilterCategoryResponse {
  contents: Fruit[] | [];
  totalPages: number;
  totalItems: number;
  sizeCurrentItems: number;
  numberOfCurrentPage: number;
  first: boolean;
  last: boolean;
}
