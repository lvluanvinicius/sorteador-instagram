import { env } from "@/env";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import InstagramProvider from "next-auth/providers/instagram";

interface AccountInstagram {
  account: {
    provider: string;
    type: string;
    providerAccountId: string;
    access_token: string;
    user_id: number;
    permissions: Object[];
  };
}

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
    callbacks: {
      // Callback JWT para incluir o access_token
      async jwt(sess) {
        console.log(sess.account);
        console.log(sess.user);
        console.log(sess.token);

        return sess;
      },
      // Callback de sessão para incluir o access_token na sessão
      async session({ session, token }: { session: any; token: any }) {
        console.log(session, token);

        // Adiciona o access_token à sessão
        session.accessToken = token.accessToken;
        console.log(session);

        return session;
      },
    },
  };
}

// Correção: Passar req e res para NextAuth diretamente e não retornar nada
export default function handle(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, buildNextAuthOptions());
}
