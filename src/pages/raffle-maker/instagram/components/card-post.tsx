import { Card, CardBody, CardHeader } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

export function CardPost({ post }: { post: InstagramPosts }) {
  return (
    <Link href={`/raffle-maker/instagram/game/${post.id}`} key={post.id}>
      <Card className="max:w-[25rem] h-[22.5rem] relative">
        <div className="absolute h-full w-full flex flex-col justify-center items-center hover:bg-black/50">
          <p className="text-center text-xs px-6 truncate-3-lines">
            {post.caption}
          </p>
          <span className="flex justify-center items-center gap-1">
            <MessageCircle />
            {post.comments_count}
          </span>
        </div>
        <CardBody className="w-full h-full">
          {post.media_type === "VIDEO" ? (
            <div className="w-full h-full">
              <video controls={false} className="w-full h-full object-cover">
                <source src={post.media_url} type="video/mp4" />
                Seu navegador não suporta o elemento de vídeo.
              </video>
            </div>
          ) : (
            <Image
              src={post.media_url}
              width={1080}
              height={1080}
              alt=""
              className="w-full h-full object-cover"
            />
          )}
        </CardBody>
      </Card>
    </Link>
  );
}
