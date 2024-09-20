import { apiHandlerErros } from "@/exceptions/api_handler_erros";
import { prisma } from "@/lib/prisma";
import { apiAuth } from "@/middlewares/api-auth";
import { getCurrentTimeInZone } from "@/utils/formatter";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Validando metodo.
    if (req.method !== "POST") {
      throw new Error("Method is not allowed.", {
        cause: "METHOD_NOT_ALLOWED",
      });
    }

    // Recuperando -1h para invalidar o token com a data de expiração..
    const expires = getCurrentTimeInZone("number", "-1h") as number;

    await prisma.session.update({
      where: {
        id: req.session_id as string,
      },
      data: {
        expires,
      },
    });

    return res.status(200).json({
      status: true,
      message: "Sessão encerrada com sucesso.",
      data: null,
    });
  } catch (error) {
    if (error instanceof Error) {
      return apiHandlerErros(error, res);
    }

    return res.status(400).json({
      status: false,
      message: "Erro desconhecido.",
      data: null,
    });
  } finally {
    await prisma.$disconnect();
  }
};

export default apiAuth(handler);
