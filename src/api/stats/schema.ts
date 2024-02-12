export type GetStatDataRequest = {
  date: Date,
}

export type GetStatDataResponse = {
  id: number,
  name: string,
  personalBoxCount: number,
  schoolBoxCount: number,
}[]

export type GetStatDetailedDataRequest = {
  date: Date,
  mealID: number,
}

export type GetStatDetailedDataResponse = {
  personalLunchBox: number[],
  schoolLunchBox: number[],
}

