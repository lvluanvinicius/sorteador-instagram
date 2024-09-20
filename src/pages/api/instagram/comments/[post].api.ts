import { apiHandlerErros } from "@/exceptions/api_handler_erros";
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

    if (!req.provider_token) {
      throw new Error("Access token não configurado em sua conta.");
    }

    const { post } = req.query;

    // Recuperando posts.
    const response = await fetch(
      `https://graph.facebook.com/v20.0/${post}/comments?fields=id,username&access_token=${req.provider_token}&order=reverse_chronological&limit=9000`
    );

    if (response.ok) {
      // Recuperando dados em json.
      const data = (await response.json()) as InstagramReturnApi<[]>;

      return res.status(200).json({
        status: true,
        message: "Comentários recuperados com sucesso.",
        data: data,
      });
    }

    throw new Error("Houve um erro ao tentar recuperar os comentários.", {
      cause: "ERROR_FETCH_RETURN",
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
  }
};

export default apiAuth(handler);
