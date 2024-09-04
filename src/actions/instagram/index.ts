import { toast } from "sonner";
import nookies from "nookies";

export const config = {
  auth_url: "https://api.instagram.com/oauth/authorize",
  client_id: process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID,
  redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/raffle-maker/instagram`,
  scope: "user_profile,user_media",
};

export function signIn() {
  if (window !== undefined) {
    const web_token = nookies.get(null);

    // Valida se o token de acesso web existe
    if (!web_token["_sort_app.webtoken"]) {
      toast.error(
        "Erro ao buscar o webToken do navegador. Por favor, atualize a página e tente novamente."
      );
      return;
    }

    // Criando URL de login do instagram.
    const authUrl = `${config.auth_url}?redirect_uri=${encodeURIComponent(
      config.redirect_uri
    )}&client_id=${config.client_id}&response_type=code&scope=${
      config.scope
    }&state=${web_token["_sort_app.webtoken"]}`;

    return (window.location.href = authUrl);
  }
}

export function exchangeTheCode() {}
