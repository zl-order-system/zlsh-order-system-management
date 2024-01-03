
export async function getDetailedMealData(_req: GetMealDetailedRequest): Promise<GetMealDetailedResponse> {
  await(t => new Promise(r => setTimeout(r, t)))(200);
  return {
    options: [
      {
        name: "滷肉飯",
        schoolOnly: true,
      },
      {
        name: "雞肉飯",
        schoolOnly: false,
      },
    ]
  }
}
