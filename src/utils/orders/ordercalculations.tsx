const DELIVERY_CHARGE = process.env.NEXT_PUBLIC_DELIVERY_CHARGE;
const TAXES = process.env.NEXT_PUBLIC_TAXES;
import { Item } from '../../type/orders';

export const getProductCost = (data: Item[]) => {
  return data?.reduce((sum: number, item: Item) => {
    const price = Number(item.price);
    const count = item.quantity;
    const itemTotal = price * count;
    return sum + itemTotal;
  }, 0);
};

export const getSubTotal = (total: number) => {
  return Number(`${total + Number(DELIVERY_CHARGE) + Number(TAXES)}`);
};
