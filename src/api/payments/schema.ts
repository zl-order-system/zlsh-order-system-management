export enum LunchBoxType {
  SCHOOL = "學校餐盒",
  PERSONAL = "自備餐盒",
}

export type GetPaymentDataRequest = {
  date: Date,
}

export type PaymentDataItem = {
  userID: number,
  name: string,
  seatNumber: number,
  lunchBoxType: LunchBoxType,
  mealName: string,
  paid: boolean,
}

export type GetPaymentDataResponse = {
  locked: boolean,
  data: PaymentDataItem[]
}



export type PatchPaymentApproveRequest = {
  date: Date,
  userID: number,
  paid: boolean
}
