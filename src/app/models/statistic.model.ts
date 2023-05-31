export const URL_PIE_CHART = "admin/statistic/pie-chart";
export const URL_LINE_CHART = "admin/statistic/bar-chart";
export const URL_STATS = "admin/statistic/stats";

export interface PieChartRequest {
  startDate: string;
  endDate: string;
}

export interface PieChartResponse {
  data: StatisticData[];
  summary: number;
}

export interface LineChartResponse {
  data: StatisticData[];
  summary: number;
}

export interface StatisticData {
  name?: string;
  total?: number;
  percent?: number;
  date?: string;
}

export interface StatsData {
  totalUser: number;
  totalMerchant: number;
  totalFarmer: number;
  newThisMonth: number;
}