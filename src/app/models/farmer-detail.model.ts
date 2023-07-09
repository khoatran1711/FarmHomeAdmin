import { Value } from "./merchant-detail.model";
import { User } from "./merchant.model";

export const URL_GET_FARMER_DETAIL = "admin/user/getFarmerDetail";
export const URL_CHANGE_USER_STATUS = "admin/user/changeUserStatus";

export interface GetFarmerDetailResponse {
  user: User;
  historyList: Value[];
  orderList: Value[];
  fruitList: Fruit[];
}

export interface Fruit {
  id: number;
  name: string;
  weight: number;
  remainingWeight: number;
  unit: string;
  images: {
    url: string;
  }[];
  description: string;
  date: string;
  farmer?: User;
  popular: boolean;
  season: string;
  suggestPrice: number;
  category: string;
}

export interface ChangeUserStatusData {
  username: string;
  reason: string;
}

export interface ChangeUserStatusResponse {
  success: boolean;
  message: string;
}
