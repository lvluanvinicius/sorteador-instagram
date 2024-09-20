import { apiHandlerErros } from "@/exceptions/api_handler_erros";
import { errorInvalidContentBody } from "@/exceptions/invalid_content_body";
import { prisma } from "@/lib/prisma";
import { apiAuth } from "@/middlewares/api-auth";
import { hashMake } from "@/utils/hash";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Validando metodo.
    if (req.method !== "GET" && req.method !== "POST") {
      throw new Error("Method is not allowed.", {
        cause: "METHOD_NOT_ALLOWED",
      });
    }

    const { name, username, password, email } = req.body;

    // Efetua a validação dos parametros do body.
    errorInvalidContentBody({ name, username, password, email }, [
      "username|Usuário não foi informado corretamente.",
      "name|Nome não foi informado corretamente.",
      "email|E-mail não foi informado corretamente.",
    ]);

    // Novos dados.
    let updateData = { name, username, email } as {
      name: string;
      username: string;
      password?: string;
      email: string;
    };

    if (password) {
      // Convertendo password para bcrypt.
      updateData.password = await hashMake(req.body.password);
    }

    // Validando se já existe um user com o email informado.
    const findUserEmail = await prisma.user.count({
      where: {
        id: { not: req.user_id as string },
        email: { equals: email },
      },
    });

    if (findUserEmail >= 1) {
      throw new Error(
        "Endereço de e-mail já está sendo utilizado por outro usuário."
      );
    }

    // Validando se já existe um user com o username informado.
    const findUserUsername = await prisma.user.count({
      where: {
        id: { not: req.user_id as string },
        username: { equals: username },
      },
    });

    if (findUserUsername >= 1) {
      throw new Error("Usuário já está sendo utilizado.");
    }

    // Atualizando dados.
    const user = await prisma.user.update({
      data: updateData,
      where: {
        id: req.user_id as string,
      },
      select: {
        username: true,
        name: true,
        email: true,
      },
    });

    return res.status(200).json({
      status: true,
      message: "Perfil atualizado com sucesso.",
      data: user,
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
