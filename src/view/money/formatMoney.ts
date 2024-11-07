export const formatMoney = (amountInCents: number) => {
  const formatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return formatter.format(amountInCents / 100);
};
