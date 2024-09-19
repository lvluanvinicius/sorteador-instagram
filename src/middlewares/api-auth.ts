import { prisma } from "@/lib/prisma";
import { getCookieValueFromRequest } from "@/utils/browser";
import { getCurrentTimeInZone } from "@/utils/formatter";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export function apiAuth(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const headers = req.headers;

      // Validando Accept. missing headers
      if (!Object.keys(headers).includes("accept")) {
        throw new Error("O  'Accept' é requerido nos headers.", {
          cause: "ERROR_MISSING_HEADERS",
        });
      }

      // Valida o valor de Accept.
      if (headers.accept !== "application/json") {
        throw new Error(
          "O  'Accept' deve ser informado como 'application/json'.",
          {
            cause: "ERROR_INCORRECT_VALUES_HEADERS",
          }
        );
      }

      // Recuperando data atual.
      const currentTime = getCurrentTimeInZone("number") as number;

      // Valida se o usuário está usando o authorization para ter acesso a api. .
      if (headers.authorization) {
        // Recuperando token.
        const [bearer, token] = headers.authorization.split(" ");

        // Valida se a string do token authorization foi informado corretamente.
        if (bearer !== "Bearer") {
          throw new Error(
            "O  'Authorization' deve ser informado como 'Bearer token-string'.",
            {
              cause: "ERROR_INCORRECT_VALUES_HEADERS",
            }
          );
        }

        // Recuperando token de acesso na sessão.
        const session = await prisma.session.findFirst({
          where: {
            access_token: token,
          },
        });

        // Valida se o token foi encontrado.
        if (!session) {
          throw new Error("Sua sessão não é válida.", {
            cause: "ERROR_UNAUTHORIZED",
          });
        }

        // Valida se a sessão foi expirada.
        if (session.expires < currentTime) {
          throw new Error("Sua sessão não é válida.", {
            cause: "ERROR_UNAUTHORIZED",
          });
        }

        const account = await prisma.account.findFirst({
          where: {
            userId: session.userId as string,
          },
        });

        req.access_token = session.access_token as string;
        req.user_id = session.userId as string;
        req.session_id = session.id as string;
        req.account_id = account?.id;
        req.provider_account_id = account?.providerAccountId;
        req.provider_token = account?.access_token as string;

        return handler(req, res);
      }

      // Recuperando token de navegador. _sort_app.webtoken
      const token = getCookieValueFromRequest(req, "_sort_app.webtoken");

      // Validando se o token existe na requisição.
      if (!token) {
        throw new Error("Sua sessão não é válida.", {
          cause: "ERROR_UNAUTHORIZED",
        });
      }

      // Recuperando token.
      const session = await prisma.session.findUnique({
        where: {
          sessionToken: token,
        },
      });

      // Valida se o usuário está tentando acesso por meio do token de sessão.
      if (!session) {
        throw new Error("Sua sessão não é válida.", {
          cause: "ERROR_UNAUTHORIZED",
        });
      }

      // Valida se possui um access token na sessão.
      if (!session.access_token) {
        throw new Error("Sua sessão não é válida.", {
          cause: "ERROR_UNAUTHORIZED",
        });
      }

      // Valida se a sessão está expirada.
      if (session.expires < currentTime) {
        throw new Error("Sua sessão não é válida.", {
          cause: "ERROR_UNAUTHORIZED",
        });
      }

      // Valida se possui um usuário associado a sessão.
      if (!session.userId) {
        throw new Error("Sua sessão não é válida.", {
          cause: "ERROR_UNAUTHORIZED",
        });
      }

      const account = await prisma.account.findFirst({
        where: {
          userId: session.userId as string,
        },
      });

      req.access_token = session.access_token as string;
      req.user_id = session.userId as string;
      req.session_id = session.id as string;
      req.account_id = account?.id;
      req.provider_account_id = account?.providerAccountId;
      req.provider_token = account?.access_token as string;

      return handler(req, res);
    } catch (error) {
      if (error instanceof Error) {
        if (error.cause === "ERROR_UNAUTHORIZED") {
          return res.status(401).json({
            status: false,
            message: error.message,
            data: null,
          });
        }

        return res.status(400).json({
          status: false,
          message: error.message,
          data: null,
        });
      }

      return res.status(405).json({
        status: false,
        message: "Houve um erro desconhecido.",
        data: null,
      });
    }
  };
}
