type GetMealDetailedRequest = {
  date: Date
}
type GetMealDetailedResponse = {
  options: MealOption[]
};

type PatchMealDetailedRequest = {
  date: Date,
  options: MealOption[]
};

type MealOption = {
  name: string,
  schoolOnly: boolean
}
