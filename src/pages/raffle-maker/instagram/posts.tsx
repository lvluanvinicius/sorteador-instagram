import { getPosts } from "@/services/instagram/posts";
import { useQuery } from "@tanstack/react-query";
import { Session } from "next-auth";
import { CardPost } from "./components/card-post";

interface InstagramPage {
  session: Session;
}

export function Posts({ session }: InstagramPage) {
  // const { data: posts } = useQuery({
  //   queryKey: ["instagram_posts"],
  //   queryFn: () => getPosts({ access_token: session.access_token as string }),
  // });

  // if (!posts) {
  //   return null;
  // }

  return (
    <div className="grid md:grid-cols-5 xl:col-span-5 gap-4">
      {/* {posts.data.map((post) => {
        return <CardPost key={post.id} post={post} />;
      })} */}
    </div>
  );
}
