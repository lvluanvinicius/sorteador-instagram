import { getPosts } from "@/services/instagram/posts";
import { useQuery } from "@tanstack/react-query";
import { Session } from "@prisma/client";
import { CardPost } from "./components/card-post";
import { useInstagram } from "./auth-provider";
import { Button } from "@chakra-ui/react";
import { signIn } from "@/actions/instagram";

interface InstagramPage {
  session: Session;
}

export function Posts({ session }: InstagramPage) {
  const { auth } = useInstagram();

  const { data: posts } = useQuery({
    queryKey: ["instagram_posts"],
    queryFn: () => getPosts(),
  });

  if (!auth) {
    return <Button onClick={signIn}>Entrar</Button>;
  }

  if (!posts) {
    return null;
  }

  return (
    <div className="w-full max-w-[95vw] md:max-w-[90vw] py-4">
      <div className="grid md:grid-cols-5 xl:col-span-5 gap-4">
        {posts.data.map((post) => {
          return <CardPost key={post.id} post={post} />;
        })}
      </div>
    </div>
  );
}
