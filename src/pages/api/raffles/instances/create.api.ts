import { apiHandlerErros } from "@/exceptions/api_handler_erros";
import { errorInvalidContentBody } from "@/exceptions/invalid_content_body";
import { prisma } from "@/lib/prisma";
import { apiAuth } from "@/middlewares/api-auth";
import { randomUUID } from "crypto";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Validando metodo.
    if (req.method !== "POST") {
      throw new Error("Method is not allowed.", {
        cause: "METHOD_NOT_ALLOWED",
      });
    }

    const { type, description } = req.body as {
      type: string;
      post?: string;
      description: string;
    };

    // Efetua a validação dos parametros do body.
    errorInvalidContentBody({ type, description }, [
      "type|Parâmetro type obrigatório não informado.",
      "description|Parâmetro description obrigatório não informado.",
    ]);

    if (!type) {
      throw new Error("", {
        cause: "INVALID_CONTENT_QUERY",
      });
    }

    if (!description) {
      throw new Error("", {
        cause: "INVALID_CONTENT_QUERY",
      });
    }

    let instanceCode = null;

    while (true) {
      instanceCode = btoa(`${randomUUID()}`);

      const instance = await prisma.rafflesInstances.findFirst({
        where: {
          code: instanceCode,
        },
      });

      if (!instance) {
        break;
      }
    }

    // Criando instancia de sorteio.
    const instance = await prisma.rafflesInstances.create({
      data: {
        code: instanceCode,
        description,
        user_id: req.user_id as string,
        type,
      },
    });

    // Valida se a instancia foi criada corretamente.
    if (!instance) {
      throw new Error("Erro ao tentar criar a instancia para o sorteio.", {
        cause: "ERROR_PRISMA_SAVE_DATA",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Instância criada com sucesso.",
      data: instance,
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
