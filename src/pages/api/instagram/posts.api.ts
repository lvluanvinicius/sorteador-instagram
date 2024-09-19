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

    // Recuperando posts. ?fields=id,caption,media_type,media_url,timestamp
    const response = await fetch(
      `https://graph.facebook.com/v20.0/${req.provider_account_id}/media?limit=100&fields=comments_count,id,media_type,media_url,caption,permalink,timestamp&access_token=${req.provider_token}`,
      {
        method: "GET",
      }
    );

    if (response.ok) {
      // Recuperando dados em json.
      const data = (await response.json()) as InstagramReturnApi<
        InstagramPosts[]
      >;

      return res.status(200).json({
        status: true,
        message: "Posts recuperados com sucesso.",
        data: data.data,
      });
    }

    throw new Error("Erro na resposta ao tentar recuperar os posts.", {
      cause: "ERROR_FETCH_RETURN",
    });
  } catch (error) {
    console.log(error);

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
