import { env } from "@/env";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import InstagramProvider from "next-auth/providers/instagram";

export function buildNextAuthOptions(): NextAuthOptions {
  return {
    providers: [
      InstagramProvider({
        clientId: env.INSTAGRAM_CLIENT_ID,
        clientSecret: env.INSTAGRAM_CLIENT_SECRET,
        id: "instagram",
        name: "Instagram",
        type: "oauth",
        authorization:
          "https://api.instagram.com/oauth/authorize?scope=user_profile",
        token: "https://api.instagram.com/oauth/access_token",
        userinfo:
          "https://graph.instagram.com/me?fields=id,username,account_type,name",
        client: {
          token_endpoint_auth_method: "client_secret_post",
        },
      }),
    ],
  };
}

// Correção: Passar req e res para NextAuth diretamente e não retornar nada
export default function handle(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, buildNextAuthOptions());
}
