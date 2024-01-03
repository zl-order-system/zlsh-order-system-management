export enum LunchBoxType {
  SCHOOL = "學校餐盒",
  PERSONAL = "自備餐盒",
}

export type GetPaymentDataRequest = {
  date: Date,
}

export type GetPaymentDataResponse = {
  id: number,
  name: string,
  seatNumber: number,
  lunchBox: LunchBoxType,
  mealName: string,
  paid: boolean,
}[]

export type PutPaymentApproveRequest = {
  date: Date,
  id: number
}
