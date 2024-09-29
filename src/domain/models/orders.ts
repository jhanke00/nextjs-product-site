export interface IOrderItem {
  id: string;
  name: string;
  price: number;
  count: number;
}

export interface IOrder {
  user: string;
  items: IOrderItem[];
  total: number;
  time: Date;
}