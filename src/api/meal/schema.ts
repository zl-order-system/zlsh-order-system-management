type GetMealDetailedRequest = {
  date: Date
}
type GetMealDetailedResponse = {
  mutable: boolean,
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
