import { ZodSchema, object, z } from 'zod';

export type MealOption = {
  name: string,
  schoolOnly: boolean
}

export const zMealOption = z.object({
  name: z.string(),
  schoolOnly: z.boolean()
})

export type GetMealDetailedRequest = {
  date: Date
}

export type GetMealDetailedResponse = {
  mutable: boolean,
  options: MealOption[]
};

export const zGetMealDetailedResponse: ZodSchema<GetMealDetailedResponse> = z.object({
  mutable: z.boolean(),
  options: z.array(zMealOption)
})

type UpdateMealDetailedRequest = {
  date: Date,
  options: MealOption[]
};
