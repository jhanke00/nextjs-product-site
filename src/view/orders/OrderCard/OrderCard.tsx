import { Order } from '@/src/domain/order/Order';
import { makeDiv, makeLi, makeUl } from 'named-components';
import styles from './OrderCard.module.scss';
import { orderCardTestIds } from './orderCardTestIds';
import { orderFormatter } from '../orderFormatter';
import { OrderItem } from '../OrderItem/OrderItem';

export type OrderCardProps = {
  order: Order;
};

export const OrderCard = ({ order }: OrderCardProps) => {
  return (
    <Container data-testid={orderCardTestIds.containerId(order)}>
      <PlacedAt>{orderFormatter.placedAt(order.placedAt)}</PlacedAt>

      <OrderItemsSection>
        <OrderItemsList>
          {order.items.map((item) => (
            <OrderItemsListItem key={item.id}>
              <OrderItem orderItem={item} />
            </OrderItemsListItem>
          ))}
        </OrderItemsList>
      </OrderItemsSection>

      <Total>Total: {orderFormatter.total(order.totalInCents)}</Total>
    </Container>
  );
};

const Container = makeDiv(styles.container);

const PlacedAt = makeDiv(styles.placedAt);

const OrderItemsSection = makeDiv(styles.orderItemsSection);

const OrderItemsList = makeUl(styles.orderItemsList);

const OrderItemsListItem = makeLi(styles.orderItemsListItem);

const Total = makeDiv(styles.total);
