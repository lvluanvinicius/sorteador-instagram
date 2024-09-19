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

    const accountUri = `https://graph.facebook.com/v20.0/me/accounts?fields=access_token,category,category_list,id,name,tasks,instagram_business_account&access_token=${req.provider_token}`;

    const response = await fetch(accountUri, {
      method: "GET",
    });

    const responseJson = (await response.json()) as InstagramReturnApi<
      FacebookAccounts[]
    >;

    if (responseJson.error) {
      throw new Error(responseJson.error.message, {
        cause: "UNAUTHORIZED",
      });
    }

    if (responseJson.data.length <= 0) {
      throw new Error("Nenhuma conta foi encontrada para esse token.");
    }

    const account = responseJson.data[0];

    return res.status(200).json({
      status: true,
      message: "",
      data: account,
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
