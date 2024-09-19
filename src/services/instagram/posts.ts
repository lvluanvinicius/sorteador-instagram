import { get } from "../app";

export async function getPosts() {
  const posts = await get<InstagramPosts[]>(`/api/instagram/posts`, {
    headers: {
      Accept: "application/json",
    },
  });

  return posts;
}
