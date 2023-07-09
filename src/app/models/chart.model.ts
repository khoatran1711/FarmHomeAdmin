import { StatisticData } from "./statistic.model";

export const URL_STATISTIC_USER = "admin/statistic/user";
export const URL_STATISTIC_DATE = "admin/statistic/date";

export interface StatisticUsersResponse {
  farmer: UserStatistic[];
  merchant: UserStatistic[];
  summary: number;
}

export interface StatisticUserResponse {
  data: UserStatistic[];
  summary: number;
}

interface UserStatistic {
  firstName: string;
  lastName: string;
  total: number;
}

export interface PieChartData {
  id: string;
  value: number;
}

export interface LineChartData {
  id: string;
  data: {
    x: string | number;
    y: number;
  }[];
}

export interface StatisticDateResponse {
  data: DateStatistic[];
  summary: number;
}

interface DateStatistic {
  date: string;
  total: number;
}
