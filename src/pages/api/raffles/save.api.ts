import { apiHandlerErros } from "@/exceptions/api_handler_erros";
import { prisma } from "@/lib/prisma";
import { apiAuth } from "@/middlewares/api-auth";
import { getCookieValueFromRequest } from "@/utils/browser";
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

    // Recuperando o token nos cookies.
    const { access_token } = req;

    // Recuperando usuário.
    const session = await prisma.session.findFirst({
      where: {
        access_token,
      },
    });

    if (!session) {
      throw new Error("Sua sessão é inválida.", {
        cause: "ERROR_UNAUTHORIZED",
      });
    }

    // Recuperando valores no body.
    const { type, sorted_value, code } = req.body;

    // Criando objeto com os dados necessários.
    const data = { type, sorted_value, code } as {
      type: string;
      sorted_value: string;
      user_id: string;
      sort_date: Date;
      code: string;
      rafflesInstancesId: string;
    };

    // Recuperando id de instancia.
    data.rafflesInstancesId = getCookieValueFromRequest(
      req,
      "instance_id"
    ) as string;

    // Recuperando data do sorteio.
    data.sort_date = getCurrentTimeInZone("date") as Date;

    // Inserindo ID de usuário.
    data.user_id = session.userId as string;

    // Salvando sorteio.
    const sort = await prisma.raffles.create({
      data,
    });

    // Valida se foi salvo corretamente.
    if (!sort) {
      throw new Error("Houve um erro ao tentar salvar o resultado.", {
        cause: "ERROR_PRISMA_SAVE_DATA",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Resutado salvo com sucess.",
      data: sort,
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
