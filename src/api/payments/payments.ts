import { GetPaymentDataRequest, GetPaymentDataResponse, LunchBoxType } from "./schema";

export async function getPaymentData(_reqData: GetPaymentDataRequest): Promise<GetPaymentDataResponse> {
  // Fake data for development
  await(t => new Promise(r => setTimeout(r, t)))(500);
  return [
    {
      id: 11230201,
      name: "王大明",
      seatNumber: 1,
      lunchBox: LunchBoxType.SCHOOL,
      mealName: "滷肉飯",
      paid: false
    },
    {
      id: 11230202,
      name: "王小明",
      seatNumber: 2,
      lunchBox: LunchBoxType.PERSONAL,
      mealName: "雞肉飯",
      paid: true
    },
    {
      id: 11230203,
      name: "莊大楷",
      seatNumber: 3,
      lunchBox: LunchBoxType.SCHOOL,
      mealName: "鵝肉飯",
      paid: false
    }
  ];
}
