import { Knex } from 'knex';
import smallOrderData from '../../src/mock/small/orders.json';
import largeOrderData from '../../src/mock/large/orders.json';
import userIdMap from './user_id_map.json';
import productIdMap from './products_id_map.json';
import { UlidMonotonic } from 'id128';

type Items = Array<{
  id: string;
  count: number;
}>;

const createOrderMap = (productOrders: Items) => {
  const productMap: Record<string, number> = {};
  for (const item of productOrders) {
    if (productMap[(productIdMap as any)[item.id]]) {
      productMap[(productIdMap as any)[item.id]] += item.count;
    } else {
      productMap[(productIdMap as any)[item.id]] = item.count;
    }
  }

  return productMap;
};

export async function seed(knex: Knex): Promise<void> {
  await knex('order_products').del();
  await knex('orders').del();

  const orderData = [...(largeOrderData as typeof smallOrderData), ...smallOrderData];

  const orders = [];
  const orderProducts = [];
  for (const order of orderData) {
    const orderId = UlidMonotonic.generate().toCanonical();
    orders.push({
      orderId: orderId,
      userId: (userIdMap as any)[order.user],
      total: order.total,
      time: new Date(order.time),
    });

    const products = createOrderMap(order.items);
    orderProducts.push(
      ...Object.entries(products).map(([productId, count]) => ({
        orderId: orderId,
        productId: productId,
        count,
      }))
    );
  }

  await knex.batchInsert('orders', orders);
  await knex.batchInsert('order_products', orderProducts);
}
