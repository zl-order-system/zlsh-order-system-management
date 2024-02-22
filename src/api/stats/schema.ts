import { z } from "zod";

export type GetStatDataRequest = {
  date: Date,
}

export type GetStatDataResponse = {
  id: number,
  name: string,
  personalBoxCount: number,
  schoolBoxCount: number,
}[]

export const zGetStatDataResponse: z.Schema<GetStatDataResponse> = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    personalBoxCount: z.number(),
    schoolBoxCount: z.number()
  })
);

export type GetStatDetailedDataRequest = {
  date: Date,
  mealID: number,
}

export type GetStatDetailedDataResponse = {
  personalLunchBox: number[],
  schoolLunchBox: number[],
}

export const zGetStatDetailedDataResponse: z.Schema<GetStatDetailedDataResponse> = z.object({
  personalLunchBox: z.array(z.number()),
  schoolLunchBox: z.array(z.number())
});
