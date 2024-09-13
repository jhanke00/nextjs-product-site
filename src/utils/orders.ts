import orders from '@/src/mock/small/orders.json';
import { Order } from '@/src/type/orders';

export class OrderUtils {
  private orders: Order[];

  constructor() {
    this.orders = orders as Order[];
  }

  public fetchUserOrders(userId: string): Order[] {
    return this.orders.filter((order) => order.user === userId);
  }

  public calculateTotalSpent(userId: string): number {
    const userOrders = this.fetchUserOrders(userId);
    return userOrders.reduce((acc, order) => acc + order.total, 0);
  }
}
