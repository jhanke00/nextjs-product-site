import { OrdersSummary } from '@/src/domain/order/OrdersSummary';
import { formatMoney } from '../money/formatMoney';
import { maybe } from '../../utils/maybe';

export const ordersSummaryFormatter = {
  orderCount: (count: OrdersSummary['orderCount'] | undefined) => count?.toString() ?? 'N/A',
  totalExpenditure: (totalExpenditureInCents: OrdersSummary['totalExpenditureInCents'] | undefined) =>
    maybe(totalExpenditureInCents, formatMoney)?.toString() ?? 'N/A',
};
