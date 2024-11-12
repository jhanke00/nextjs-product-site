import ordersSmallData from '../mock/small/orders.json';
import fs from 'fs';

const orders = [...ordersSmallData, getLargeData()].flat();

export function getOrdersByUserId(userId: string, limit = 10, offset = 0) {
  return orders.filter((order) => order.user === userId).slice(offset, offset + limit);
}

export function getLargeData() {
  const data = fs.readFileSync('src/mock/large/orders.json', 'utf-8');
  const dataArray = JSON.parse(data);
  return dataArray;
}

export function calculateTotalSpent(orders: any[]) {
  let total = 0;
  orders.forEach((order) => {
    total += order.total;
  });
  return total;
}
