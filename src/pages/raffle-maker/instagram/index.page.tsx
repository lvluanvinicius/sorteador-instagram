import { useSession } from "@/contexts/session";
import InstagramProvider from "./auth-provider";
import { Posts } from "./posts";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function handler({ session }: any) {
  const router = useRouter();
  const { isAuthenticated } = useSession();

  return (
    <InstagramProvider session={session}>
      <Posts />
    </InstagramProvider>
  );
}
