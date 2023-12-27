import { GetUpcommingDatesResponse } from "./schema";

export async function getUpcommingDates(): Promise<GetUpcommingDatesResponse> {
  // Fake data for development
  await(t => new Promise(r => setTimeout(r, t)))(500);
  return {
    dates: [new Date("2023-08-29"), new Date("2023-08-31"), new Date("2023-09-1"), new Date("2023-09-2"), new Date("2023-09-4")]
  }
}
