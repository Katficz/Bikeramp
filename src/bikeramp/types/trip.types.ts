export interface ITripAttributes {
  id?: string;
  distance?: number;
  date?: Date;
  start_address?: string;
  destination_address?: string;
  price?: number;
}

export interface IWeeklyStatsResponseBody {
  total_distance: string;
  total_price: string;
}
export interface IMonthlyStatsResponseBodyCell {
  day: string;
  total_distance: string;
  avg_ride: string;
  avg_price: string;
}
