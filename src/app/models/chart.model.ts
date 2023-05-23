export const URL_STATISTIC_USER = "admin/statistic/user"

export interface StatisticUserResponse {
  farmer: UserStatistic[];
  merchant: UserStatistic[];
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
  color: string;
}

export interface LineChartData {
  id: string;
  color: string;
  data: {
    x: string;
    y: number;
  }[];
}