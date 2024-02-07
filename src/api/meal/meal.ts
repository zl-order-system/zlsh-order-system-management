import { formatDate } from "../../util/util";
import { HttpMethods, sendRequest } from "../request";

export async function getDetailedMealData(req: GetMealDetailedRequest): Promise<GetMealDetailedResponse> {
  // await(t => new Promise(r => setTimeout(r, t)))(200);
  // return {
  //   options: [
  //     {
  //       name: "滷肉飯",
  //       schoolOnly: true,
  //     },
  //     {
  //       name: "雞肉飯",
  //       schoolOnly: false,
  //     },
  //   ]
  // }
  // TODO: search p
  const params = new URLSearchParams();
  params.append("date", formatDate(req.date));
  return sendRequest("/api/admin/meal/detailed", HttpMethods.GET)
}

export async function patchDetailedMealData(req: PatchMealDetailedRequest) {
  return sendRequest("/api/admin/meal/detailed", HttpMethods.PATCH, undefined, req);
}
