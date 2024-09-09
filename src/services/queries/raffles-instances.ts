import { get } from "../app";

export async function getRafflesInstances() {
  const response = await get<RafflesInstancesInterface[]>(
    `/api/raffles/instances`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );

  return response;
}
