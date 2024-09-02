import { prisma } from "@/lib/prisma";
import { apiAuth } from "@/middlewares/api-auth";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
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
    const { type, sorted_value } = req.body;

    // Criando objeto com os dados necessários.
    const data = { type, sorted_value } as {
      type: string;
      sorted_value: string;
    };

    return res.status(200).json(data);

    // Salvando sorteio.
    // const sort = await prisma.raffles.create({
    //   data,
    // });
  } catch (error) {
    return res.status(400).json(error);
  } finally {
    await prisma.$disconnect();
  }
};

export default apiAuth(handler);
