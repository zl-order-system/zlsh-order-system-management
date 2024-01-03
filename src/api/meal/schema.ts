type GetMealDetailedRequest = {
  date: Date
}
type GetMealDetailedResponse = {
  options: {
    name: string,
    schoolOnly: boolean
  }[]
}
