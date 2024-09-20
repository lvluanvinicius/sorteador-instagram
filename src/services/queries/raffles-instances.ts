import { ParsedUrlQuery } from "querystring";
import { get } from "../app";

export async function getRafflesInstances({
  query,
}: {
  query: ParsedUrlQuery;
}) {
  const response = await get<ApiResponse<RafflesInstancesInterface[]>>(
    `/api/raffles/instances`,
    {
      headers: {
        Accept: "application/json",
      },
      queryParams: { page: query.page as string },
    }
  );

  return response;
}
