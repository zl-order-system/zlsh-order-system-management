import { range } from "../../util/fp";

export const formatDatePretty = (date: Date) => `${date.getMonth() + 1}月${date.getDate()}日`;

export function getDatesInMonthAfterDate(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth();

  // Calculate days in the month by getting the 0th day of the next month which will fallback to the last day of the month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Generate range of days and map to Date objects
  return range(date.getDate(), daysInMonth).map(day => new Date(year, month, day));
}
