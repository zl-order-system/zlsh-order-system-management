import { ZodSchema, object, z } from 'zod';
export enum LunchBoxType {
  SCHOOL = "學校餐盒",
  PERSONAL = "自備餐盒",
}

export const zLunchBoxType: ZodSchema<LunchBoxType> = z.enum([
  LunchBoxType.SCHOOL,
  LunchBoxType.PERSONAL
])

export type PaymentDataItem = {
  userID: number,
  name: string,
  seatNumber: number,
  lunchBoxType: LunchBoxType,
  mealName: string,
  paid: boolean,
}

export const zPaymentDataItem: z.ZodSchema<PaymentDataItem> = z.object({
  userID: z.number(),
  name: z.string(),
  seatNumber: z.number(),
  lunchBoxType: zLunchBoxType,
  mealName: z.string(),
  paid: z.boolean()
})

export type GetPaymentDataRequest = {
  date: Date,
}

export type GetPaymentDataResponse = {
  locked: boolean,
  data: PaymentDataItem[]
}

export const zGetPaymentDataResponse: z.ZodSchema<GetPaymentDataResponse> = z.object({
  locked: z.boolean(),
  data: z.array(zPaymentDataItem)
})

export type PatchPaymentApproveRequest = {
  date: Date,
  userID: number,
  paid: boolean
}
