export enum lunchBoxType {
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
  lunchBox: lunchBoxType,
  paid: boolean,
}[]

export type PostPaymentDataRequest = {
  date: Date,
  id: number
}
