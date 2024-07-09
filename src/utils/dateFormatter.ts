export default function dateFormatter(date: Date) {
  const newDate = new Date(date);
  const formattedOrderDate = newDate.toLocaleString();
  return formattedOrderDate;
}
