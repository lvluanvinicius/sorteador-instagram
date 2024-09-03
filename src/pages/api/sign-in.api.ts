import { errorInvalidContentBody } from "@/exceptions/invalid_content_body";
import { prisma } from "@/lib/prisma";
import { getCookieValueFromRequest } from "@/utils/browser";
import { getCurrentTimeInZone } from "@/utils/formatter";
import { validatePassword } from "@/utils/validate";
import { randomUUID } from "crypto";
import { NextApiRequest, NextApiResponse } from "next";

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
    // Validando metodo.
    if (req.method !== "POST") {
      throw new Error("Method is not allowed.", {
        cause: "METHOD_NOT_ALLOWED",
      });
    }

    // Recuperando dados.
    const { password, username } = req.body;

    // Criando novo objeto com os dados de login.
    const data = { username, password } as {
      password: string;
      username: string;
    };

    // Efetua a validação dos parametros do body.
    errorInvalidContentBody(data, [
      "username|Usuário não foi informado corretamente.",
      "password|Senha não foi informado corretamente.",
    ]);

    // Recuperando usuário.
    const user = await prisma.user.findUnique({
      where: {
        username: data.username,
      },
    });

    // Valida se existe o usuário.
    if (!user) {
      throw new Error("Usuário e/ou senha estão incorretos.", {
        cause: "ERROR_PASS_OR_USER_INCORRECTS",
      });
    }

    // Validando senha.
    const passValidate = await validatePassword(data.password, user.password);
    if (!passValidate) {
      throw new Error("Usuário e/ou senha estão incorretos.", {
        cause: "ERROR_PASS_OR_USER_INCORRECTS",
      });
    }

    // Recuperando token de navegador. _sort_app.webtoken
    let webToken = getCookieValueFromRequest(req, "_sort_app.webtoken");

    if (!webToken) {
      const data = {} as DataSession;

      const { cookies, headers } = req;

      // Valida e recupera o endereço remoto do usuário.
      if (headers["x-real-ip"]) {
        data.remote_ip = headers["x-real-ip"] as string;
      }

      // Recupera o user-agent do navegador.
      if (headers["user-agent"]) {
        data.user_agent = headers["user-agent"] as string;
      }

      data.sessionToken = btoa(`${randomUUID()}${randomUUID()}`);

      data.expires = getCurrentTimeInZone("number", "+3h") as number;

      const session = await prisma.session.create({
        data,
      });

      webToken = session.sessionToken;
    }

    // Recuperando token.
    const session = await prisma.session.findUnique({
      where: {
        sessionToken: webToken,
      },
    });

    // Valida se não existe um token criando nas linhas anterior ou diretamente com o token vindo da requisição.
    if (!session) {
      throw new Error(
        "Erro ao tentar criar um web-token de sessão. Por favor, limpe os cookies, atualize a página e tente novamente.",
        {
          cause: "ERROR_UPDATE_DATA",
        }
      );
    }

    // Recuperando nova data se expiração.
    const expires = getCurrentTimeInZone("number", "+3h") as number;

    // Adicionando o access_token na sessão.
    const access_token = btoa(`${randomUUID()}`);

    // Atualizando a session.
    const sessionUpdate = await prisma.session.update({
      where: {
        id: session.id,
      },
      data: {
        access_token,
        expires,
        userId: user.id,
      },
    });

    // Atualiza a sessão.
    if (!sessionUpdate) {
      throw new Error("Erro ao tentar atualizar a sessão.", {
        cause: "ERROR_UPDATE_DATA",
      });
    }

    return res.status(200).json({
      status: true,
      data: { access_token, session_token: session.sessionToken },
    });
  } catch (error) {
    if (error instanceof Error) {
      switch (error.cause) {
        case "ERROR_PASS_OR_USER_INCORRECTS":
          return res.status(401).json({
            status: false,
            message: error.message,
          });

        case "INVALID_CONTENT_BODY":
          return res.status(200).json({
            status: false,
            message: error.message,
          });
      }

      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }

    return res.status(400).json({
      message: "Houve um erro desconhecido.",
    });
  } finally {
    await prisma.$disconnect();
  }
}
