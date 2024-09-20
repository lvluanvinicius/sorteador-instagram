import { apiHandlerErros } from "@/exceptions/api_handler_erros";
import { prisma } from "@/lib/prisma";
import { apiAuth } from "@/middlewares/api-auth";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Validando metodo.
    if (req.method !== "GET") {
      throw new Error("Method is not allowed.", {
        cause: "METHOD_NOT_ALLOWED",
      });
    }

    const { paginate, page } = req.query;

    const perPage = parseInt(paginate as string) || 10;
    const setPage = parseInt(page as string) || 1;

    // Recuperando
    const raffles = await prisma.rafflesInstances.findMany({
      where: {
        user_id: req.user_id,
      },
      skip: (setPage - 1) * perPage,
      take: perPage,
    });

    const total = await prisma.rafflesInstances.count({
      where: {
        user_id: req.user_id,
      },
    });

    const pages = Math.ceil(total / perPage);

    return res.status(200).json({
      status: true,
      message: "Instâncias recuperadas com sucesso.",
      data: {
        total,
        pages,
        current_page: setPage,
        per_page: perPage,
        total_page: raffles.length,
        data: raffles,
      },
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
