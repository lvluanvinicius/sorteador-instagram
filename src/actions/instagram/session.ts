// utils/validateInstagramSession.ts
export async function validateInstagramSession(accessToken: string) {
  if (!accessToken) {
    throw new Error(
      "Token de acesso para instagram não informado em validação.",
      {
        cause: "ERROR_INSTAGRAM_UNAUTHENTICATED",
      }
    );
  }

  try {
    // Fazendo a requisição para verificar o token de acesso
    const response = await fetch(
      `https://graph.instagram.com/me?fields=id,username&access_token=${accessToken}`
    );
    const data = await response.json();

    if (response.ok) {
      return data; // Retorna os dados do usuário se o token for válido
    } else {
      throw new Error(
        "Sessão com instagram inválida, por favor, efetue login novamente.",
        {
          cause: "ERROR_INSTAGRAM_UNAUTHENTICATED",
        }
      ); // Token inválido ou expirado
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message, {
        cause: "ERROR_INSTAGRAM_UNAUTHENTICATED",
      });
    }

    throw new Error(
      "Houve um erro ao tentar validar a sessão com o instagram.",
      {
        cause: "ERROR_INSTAGRAM_UNAUTHENTICATED",
      }
    ); // Erro ao fazer a requisição
  }
}
