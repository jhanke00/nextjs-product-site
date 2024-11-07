import { formatMoney } from '../money/formatMoney';

export const orderFormatter = {
  placedAt: (placedAt: string) => new Date(placedAt).toLocaleDateString(),
  total: (totalInCents: number) => formatMoney(totalInCents),
};
