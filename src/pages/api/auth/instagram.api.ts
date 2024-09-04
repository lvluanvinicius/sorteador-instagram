import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { code } = req.query; // Captura o código de autorização do Instagram

    if (!code) {
      return res.status(400).json({ error: "Authorization code not found" });
    }

    const config = {
      auth_url: "https://api.instagram.com/oauth/access_token",
      client_id: process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID,
      client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
      redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/instagram`,
      grant_type: "authorization_code",
      code: code,
    };

    // Usando FormData para construir o corpo da solicitação POST
    const formData = new URLSearchParams();
    formData.append("client_id", config.client_id as string);
    formData.append("client_secret", config.client_secret as string);
    formData.append("grant_type", config.grant_type);
    formData.append("redirect_uri", config.redirect_uri);
    formData.append("code", config.code as string);

    // Criando URL de solicitação de troca de token.
    const postUri = `${config.auth_url}?redirect_uri=${encodeURIComponent(
      config.redirect_uri
    )}?client_id=${config.client_id}&${config.client_secret}&grant_type=${
      config.grant_type
    }&code=${config.code}`;

    // Efetuando a troca de do token.
    const response = await fetch(postUri, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    const data = await response.json(); // Lê a resposta JSON

    if (!response.ok) {
      // Lida com erros de resposta
      return res.status(response.status).json({
        error: data.error || "Failed to exchange code for access token",
      });
    }

    // Sucesso na troca do token
    return res.status(200).json(data); // Retorna o token de acesso e outros dados
  } catch (error) {
    // Captura erros de rede ou de solicitação
    console.error("Erro de rede:", error);
    return res.status(500).json({ error: "Erro ao processar a solicitação." });
  }
}
