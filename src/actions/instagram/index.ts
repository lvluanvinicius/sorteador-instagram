import { toast } from "sonner";
import nookies from "nookies";

export const config = {
  auth_url: "https://www.facebook.com/dialog/oauth",
  client_id: process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID,
  redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/raffle-maker/instagram`,
  extras: JSON.stringify({ setup: { channel: "IG_API_ONBOARDING" } }),
  scope:
    "pages_show_list,business_management,instagram_basic,instagram_manage_comments,instagram_manage_insights,instagram_content_publish,pages_read_engagement,pages_manage_metadata,pages_read_user_content,pages_manage_posts,pages_manage_engagement",
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
    )}&client_id=${config.client_id}&response_type=token&display=page&scope=${
      config.scope
    }&state=${web_token["_sort_app.webtoken"]}`;

    return (window.location.href = authUrl);
  }
}

// "business_basic,business_manage_messages,business_manage_comments,business_content_publish", //"business_basic,business_manage_comments",
