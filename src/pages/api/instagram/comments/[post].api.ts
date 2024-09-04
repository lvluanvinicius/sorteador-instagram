import { apiHandlerErros } from "@/exceptions/api_handler_erros";
import { apiAuth } from "@/middlewares/api-auth";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { access_token } = req.query;
    const { post } = req.query;

    // Valida se o access_token foi informado.
    if (!access_token) {
      throw new Error("Parametro access_token não informado.", {
        cause: "INVALID_CONTENT_QUERY",
      });
    }

    // Recuperando posts.
    const response = await fetch(
      `https://graph.instagram.com/${post}/comments?fields=id,text,username&access_token=${access_token}`
    );

    console.log(await response.json());

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

export default handler;
