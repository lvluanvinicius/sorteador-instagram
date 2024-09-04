import { get } from "../app";

interface GetPosts {
  access_token: string;
}

export async function getPosts({ access_token }: GetPosts) {
  const posts = await get<InstagramPosts[]>(
    `/api/instagram/posts?access_token=${access_token}`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );

  return posts;
}
