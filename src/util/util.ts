import { LunchBoxType } from "../api/payments/schema";

export function getPrice(lunchBox: LunchBoxType) {
  switch (lunchBox) {
    case LunchBoxType.PERSONAL:
      return 65;
    case LunchBoxType.SCHOOL:
      return 70;
  }
}

export const getToken = () => localStorage.getItem('token');

export const formatDate = (date: Date) => date.toISOString().slice(0, 10);
