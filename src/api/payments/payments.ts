import { formatDate } from "../../util/util";
import { HttpMethods, sendRequest } from "../request";
import { GetPaymentDataRequest, GetPaymentDataResponse, LunchBoxType, PatchPaymentApproveRequest } from "./schema";

let approved = new Set<number>;

export async function getPaymentData(req: GetPaymentDataRequest): Promise<GetPaymentDataResponse> {
  // Fake data for development
  // await(t => new Promise(r => setTimeout(r, t)))(500);
  // const data = [
  //   {
  //     id: 11230201,
  //     name: "王大明",
  //     seatNumber: 1,
  //     lunchBox: LunchBoxType.SCHOOL,
  //     mealName: "滷肉飯",
  //     paid: approved.has(11230201)
  //   },
  //   {
  //     id: 11230202,
  //     name: "王小明",
  //     seatNumber: 2,
  //     lunchBox: LunchBoxType.PERSONAL,
  //     mealName: "雞肉飯",
  //     paid: approved.has(11230202)
  //   },
  //   {
  //     id: 11230203,
  //     name: "莊大楷",
  //     seatNumber: 3,
  //     lunchBox: LunchBoxType.SCHOOL,
  //     mealName: "鵝肉飯",
  //     paid: approved.has(11230203)
  //   }
  // ];
  // return data;
  const params = new URLSearchParams();
  params.append("date", formatDate(req.date))
  return sendRequest("/api/admin/payments", HttpMethods.GET, false, params);
}

export async function patchPaymentApprove(req: PatchPaymentApproveRequest) {
  // approved.add(reqData.userID);
  return sendRequest<undefined>("/api/admin/payments", HttpMethods.PATCH, true, undefined, {
    ...req,
    date: formatDate(req.date)
  });
}
