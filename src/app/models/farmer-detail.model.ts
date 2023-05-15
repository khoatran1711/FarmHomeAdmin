import { Value } from "./merchant-detail.model";
import { User } from "./merchant.model";

export const URL_GET_FARMER_DETAIL = "admin/user/getFarmerDetail";

export interface GetFarmerDetailResponse {
  user: User;
  historyList: Value[];
  orderList: Value[];
  fruitList: Fruit[];
};

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
  farmer: User;
  popular: boolean;
  season: string;
  suggestPrice: number;
  category: string;
}
