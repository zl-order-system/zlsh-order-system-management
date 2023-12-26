import { GetStatDataRequest, GetStatDataResponse, GetStatDetailedDataRequest, GetStatDetailedDataResponse } from "./schema";

// eslint-disable-next-line no-unused-vars
export async function getStatData(_reqData: GetStatDataRequest): Promise<GetStatDataResponse> {
  // Fake data for development
  await(t => new Promise(r => setTimeout(r, t)))(500);
  return [
    {
      name: "周奕宇的隔夜飯",
      schoolBoxCount: 5,
      personalBoxCount: 4,
    },
    {
      name: "雞肉飯",
      schoolBoxCount: 0,
      personalBoxCount: 4,
    },
    {
      name: "拉麵",
      schoolBoxCount: 1,
      personalBoxCount: 0,
    },
    {
      name: "水餃",
      schoolBoxCount: 0,
      personalBoxCount: 1,
    },
  ]
}

// eslint-disable-next-line no-unused-vars
export async function getDetailedStatData(_reqData: GetStatDetailedDataRequest): Promise<GetStatDetailedDataResponse> {
  // Fake data for development
  await(t => new Promise(r => setTimeout(r, t)))(500);
  return {
    schoolLunchBox: [3, 6, 7, 12],
    personalLunchBox: [1, 5, 30]
  }
}
