import { formatDate } from "../../util/util";
import { HttpMethods, sendRequest } from "../request";
import { GetStatDataRequest, GetStatDataResponse, GetStatDetailedDataRequest, GetStatDetailedDataResponse } from "./schema";

// eslint-disable-next-line no-unused-vars
export async function getStatData(req: GetStatDataRequest): Promise<GetStatDataResponse> {
  // await(t => new Promise(r => setTimeout(r, t)))(500);
  // // Fake data for development
  // if (reqData.date.toDateString() === new Date("2023-08-31").toDateString()) {
  //   return [
  //     {
  //       name: "芭樂",
  //       schoolBoxCount: 0,
  //       personalBoxCount: 2,
  //     },
  //     {
  //       name: "香蕉",
  //       schoolBoxCount: 1,
  //       personalBoxCount: 0,
  //     },
  //   ]
  // }
  // if (reqData.date.toDateString() === new Date("2023-09-1").toDateString()) {
  //   return [
  //     {
  //       name: "西瓜",
  //       schoolBoxCount: 0,
  //       personalBoxCount: 2,
  //     },
  //     {
  //       name: "南瓜",
  //       schoolBoxCount: 1,
  //       personalBoxCount: 0,
  //     },
  //   ]
  // }
  // return [
  //   {
  //     name: "周奕宇的隔夜飯",
  //     schoolBoxCount: 5,
  //     personalBoxCount: 4,
  //   },
  //   {
  //     name: "雞肉飯",
  //     schoolBoxCount: 0,
  //     personalBoxCount: 4,
  //   },
  //   {
  //     name: "拉麵",
  //     schoolBoxCount: 1,
  //     personalBoxCount: 0,
  //   },
  //   {
  //     name: "水餃",
  //     schoolBoxCount: 0,
  //     personalBoxCount: 1,
  //   },
  // ]
  const params = new URLSearchParams();
  params.append("date", formatDate(req.date));
  return sendRequest("/api/admin/stats", HttpMethods.GET, false, params);
}

// eslint-disable-next-line no-unused-vars
export async function getDetailedStatData(req: GetStatDetailedDataRequest): Promise<GetStatDetailedDataResponse> {
  // Fake data for development
  // await(t => new Promise(r => setTimeout(r, t)))(500);
  // return {
  //   schoolLunchBox: [3, 6, 7, 12],
  //   personalLunchBox: [1, 5, 30]
  // }
  const params = new URLSearchParams();
  params.append("date", formatDate(req.date));
  params.append("mealID", req.mealID.toString());
  return sendRequest("/api/admin/stats/detailed", HttpMethods.GET, false, params);
}
