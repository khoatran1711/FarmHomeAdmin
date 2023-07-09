import { User } from "./merchant.model";

export const URL_GET_ALL_REPORT = "admin/report/";
export const URL_DELETE_REPORT = "admin/report/delete";

export interface GetAllReportResponse {
  contents: Report[] | [];
  totalPages: number;
  totalItems: number;
  sizeCurrentItems: number;
  numberOfCurrentPage: number;
  first: boolean;
  last: boolean;
}

export interface DeleteReportResponse {
  message: string;
  success: string;
}

export interface Report {
  id: number;
  farmer: User;
  merchant: User;
  content: string;
  date: string;
  title: string;
}
