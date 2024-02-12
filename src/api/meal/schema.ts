type GetMealDetailedRequest = {
  date: Date
}
type GetMealDetailedResponse = {
  options: MealOption[]
};

type UpdateMealDetailedRequest = {
  date: Date,
  options: MealOption[]
};

type MealOption = {
  name: string,
  schoolOnly: boolean
}
