type GetMealDetailedRequest = {
  date: Date
}
type GetMealDetailedResponse = MealData;

type PatchMealDetailedRequest = MealData;

type MealData = {
  options: MealOption[]
}

type MealOption = {
  name: string,
  schoolOnly: boolean
}
