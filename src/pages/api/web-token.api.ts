import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { getCurrentTimeInZone } from "@/utils/formatter";
import { randomUUID } from "crypto";

interface DataSession {
  sessionToken: string;
  userId?: string;
  access_token?: string;
  remote_ip?: string;
  user_agent?: string;
  expires: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { cookies, headers } = req;

    const data = {} as DataSession;

    // Recuperando data se expiração.
    data.expires = getCurrentTimeInZone("number", "+3h") as number;

    // Valida e recupera o endereço remoto do usuário.
    if (headers["x-real-ip"]) {
      data.remote_ip = headers["x-real-ip"] as string;
    }

    // Recupera o user-agent do navegador.
    if (headers["user-agent"]) {
      data.user_agent = headers["user-agent"] as string;
    }

    // Recupera o token do navegador e valida se foi expirado.
    if (cookies["_sort_app.webtoken"]) {
      // Recuperando string.
      const token = cookies["_sort_app.webtoken"];

      // Recuperar token existente.
      const sess = await prisma.session.findUnique({
        where: {
          sessionToken: token,
        },
      });

      if (!sess) {
        data.sessionToken = btoa(`${randomUUID()}${randomUUID()}`);

        const session = await prisma.session.create({
          data,
        });

        return res.status(200).json({
          session_token: session.sessionToken,
        });
      } else {
        // Recuperando time atual.
        const currentTime = getCurrentTimeInZone("number") as number;

        // Validando se foi expirado.
        if (currentTime > sess.expires) {
          data.sessionToken = btoa(`${randomUUID()}${randomUUID()}`);

          const session = await prisma.session.create({
            data,
          });

          return res.status(200).json({
            session_token: session.sessionToken,
          });
        }

        return res.status(200).json({
          session_token: sess.sessionToken,
        });
      }
    }

    // Gerando token.
    data.sessionToken = btoa(`${randomUUID()}${randomUUID()}`);

    // Salvando sessão.
    const session = await prisma.session.create({
      data,
    });

    return res.status(200).json({
      session_token: session.sessionToken,
    });
  } catch (error) {
    return res.status(400).json({
      message:
        "Houve um erro ao tentar validar/gerar um token para o navegador.",
    });
  } finally {
    await prisma.$disconnect();
  }
}
