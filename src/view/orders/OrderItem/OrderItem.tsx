import { OrderItem as OrderItemType } from '@/src/domain/order/OrderItem';
import { makeDiv } from 'named-components';
import styles from './OrderItem.module.scss';

export type OrderItemProps = {
  orderItem: OrderItemType;
};

export const OrderItem = ({ orderItem }: OrderItemProps) => {
  return (
    <Container>
      <ProductName>{orderItem.name}</ProductName>

      <Count> x{orderItem.count}</Count>
    </Container>
  );
};

const Container = makeDiv(styles.container);

const ProductName = makeDiv();

const Count = makeDiv();
