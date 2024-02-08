export enum LunchBoxType {
  SCHOOL = "學校餐盒",
  PERSONAL = "自備餐盒",
}

export type GetPaymentDataRequest = {
  date: Date,
}

export type GetPaymentDataResponse = {
  userID: number,
  name: string,
  seatNumber: number,
  lunchBoxType: LunchBoxType,
  mealName: string,
  paid: boolean,
}[]

export type PatchPaymentApproveRequest = {
  date: Date,
  userID: number,
  paid: boolean
}
