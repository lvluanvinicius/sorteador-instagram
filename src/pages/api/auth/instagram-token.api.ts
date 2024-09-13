import { apiAuth } from "@/middlewares/api-auth";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Recuperando parametros.
    const { access_token, expires_in, state, data_access_expiration_time } =
      req.query;

    const config = {
      auth_url: "https://graph.facebook.com/v20.0/oauth/access_token",
      client_id: process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID,
      client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
      redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/raffle-maker/instagram`,
    };

    const authUri = `${config.auth_url}?grant_type=fb_exchange_token&client_id=${config.client_id}&client_secret=${config.client_secret}&fb_exchange_token=${access_token}`;

    return res.status(200).json({
      access_token,
      expires_in,
      state,
      data_access_expiration_time,
      ...config,
      authUri: authUri,
    });
  } catch (error) {
    // Captura erros de rede ou de solicitação
    return res.status(500).json({ error: "Erro ao processar a solicitação." });
  }
};

export default apiAuth(handler);
