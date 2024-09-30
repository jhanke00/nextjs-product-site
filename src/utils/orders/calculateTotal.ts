export function calculateTotal(items: any) {
  const totalCalculated = items.reduce((total: number, item: any) => total + item.price * item.count, 0);
  return totalCalculated;
}
