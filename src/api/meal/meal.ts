import { formatDate, getToken } from "../../util/util";
import { HttpMethods, handleResponseCode, parseResponseJsonOrThrow, sendRequest } from "../request";
import getAppConstants from "../../util/AppConstants"

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

  const params = new URLSearchParams();
  params.append("date", formatDate(req.date));
  const headers = {
    "Authorization": `Bearer ${getToken()}`,
    "Content-Type": "application/json"
  };

  const response = await fetch(`${getAppConstants().backendHost}/api/admin/meal/detailed?${params.toString()}`, {method: HttpMethods.GET, headers});

  if (response.status == 404)
    return {options: []}

  handleResponseCode(response);

  return await parseResponseJsonOrThrow(response);
}

export async function updateDetailedMealData(req: UpdateMealDetailedRequest) {
  sendRequest("/api/admin/meal/detailed", HttpMethods.PUT, undefined, {
    ...req,
    date: formatDate(req.date)
  });
}
