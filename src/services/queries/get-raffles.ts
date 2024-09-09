import { get } from "../app";

export async function getRaffles({ instance }: { instance: string }) {
  const response = await get<RafflesInterface[]>(
    `/api/raffles/instances/${instance}`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );

  return response;
}
