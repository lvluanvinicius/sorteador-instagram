"use client";

import { AuthCredentialsProvider } from "@/providers/credentials";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";

export function buildNextAuthOptions(
  req: NextApiRequest,
  res: NextApiResponse
): NextAuthOptions {
  return {
    providers: [AuthCredentialsProvider()],
    pages: {
      signIn: "/sign-in",
    },
    callbacks: {
      // Callback JWT para incluir o access_token
      async jwt({ token, user, account }) {
        // Se a autenticação foi bem sucedida
        if (account && user) {
          token.accessToken = account.access_token;
        }
        return token;
      },

      // Callback de sessão para incluir o access_token na sessão
      async session({ session, token }: { session: any; token: any }) {
        // Adiciona o access_token à sessão
        session.accessToken = token.accessToken;

        return session;
      },
    },
    debug: process.env.NODE_ENV === "development",
  };
}

// Correção: Certifique-se de passar o req e res para NextAuth diretamente e não retornar nada
export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, buildNextAuthOptions(req, res));
}
