export const URL_GET_ALL_NEWS = "admin/news/";

export interface GetAllNewResponse {
  contents: News[] | [];
  totalPages: number;
  totalItems: number;
  sizeCurrentItems: number;
  numberOfCurrentPage: number;
  first: boolean;
  last: boolean;
}

export interface News {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  imageBanner: string;
  imageContent: string;
}
