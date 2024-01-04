import { GetUpcomingDatesResponse } from "./schema";

export async function getUpcomingDates(): Promise<GetUpcomingDatesResponse> {
  // Fake data for development
  await(t => new Promise(r => setTimeout(r, t)))(500);
  return {
    dates: [new Date("2023-08-29"), new Date("2023-08-31"), new Date("2023-09-1"), new Date("2023-09-2"), new Date("2023-09-4")]
  }
}