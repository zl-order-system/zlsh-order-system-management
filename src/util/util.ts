import { LunchBoxType } from "../api/payments/schema";
import appConstants from "./appConstants";

export function getPrice(lunchBox: LunchBoxType) {
  switch (lunchBox) {
    case LunchBoxType.PERSONAL:
      return 65;
    case LunchBoxType.SCHOOL:
      return 70;
  }
}

export const getToken = () => localStorage.getItem('token');

export const formatDate = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

export const redirectToMainApp = (win: Window) => win.location = appConstants.mainAppURL

export const redirectToLoginPage = (win: Window) => win.location = `${appConstants.mainAppURL}#/login`
