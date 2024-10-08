import { apiHandlerErros } from "@/exceptions/api_handler_erros";
import { prisma } from "@/lib/prisma";
import { apiAuth } from "@/middlewares/api-auth";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { history } = req.query;

    // Validando metodo.
    if (req.method !== "GET") {
      throw new Error("Method is not allowed.", {
        cause: "METHOD_NOT_ALLOWED",
      });
    }

    // Recuperando dados.
    const results = await prisma.raffles.findMany({
      where: {
        rafflesInstancesId: history as string,
      },
    });

    return res.status(200).json({
      status: true,
      message: "Resutado recuperados com sucess.",
      data: results,
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
