import { Agent } from "https";
import nodeFetch from "node-fetch";

export async function getCsrfToken() {
  // Recuperando token
  const response = await nodeFetch(
    `${process.env.NEXTAUTH_URL}/api/auth/csrf`,
    {
      agent: new Agent({ rejectUnauthorized: false }),
    }
  );

  const data: { csrfToken: string } = (await response.json()) as {
    csrfToken: string;
  };

  if (data && data.csrfToken) {
    return data.csrfToken;
  }

  return "";
}
