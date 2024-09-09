import { GetServerSideProps } from "next";
import { Posts } from "./posts";
import { getCookieValueFromRequest } from "@/utils/browser";
import { prisma } from "@/lib/prisma";
import { validateInstagramSession } from "@/actions/instagram/session";
import { Button } from "@chakra-ui/react";
import { signIn } from "@/actions/instagram";
import { Account } from "next-auth";
import { RaffleMakerLayout } from "@/components/layouts/raffle-maker";

interface InstagramPage {
  account: Account | null;
}

export default function handler({ account }: InstagramPage) {
  if (!account) {
    return <Button onClick={signIn}>Entrar</Button>;
  }

  return (
    <RaffleMakerLayout>
      <div className="flex flex-col justify-start items-center">
        <div className="w-[90vw]">
          <Posts account={account} />
        </div>
      </div>
    </RaffleMakerLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    // Recuperando token de navegador. _sort_app.webtoken
    const webToken = getCookieValueFromRequest(
      context.req,
      "_sort_app.webtoken"
    );

    if (!webToken) {
      return {
        props: {},
      };
    }

    // Recuperando usuário pelo token de sessão.
    const session = await prisma.session.findFirst({
      where: {
        sessionToken: webToken,
        userId: { not: null },
      },
    });

    // Validando se sessão foi localizada.
    if (!session) {
      return {
        redirect: {
          destination: "/sign-in",
          permanent: false,
        },
      };
    }

    // Recuperando conta.
    const account = await prisma.account.findFirst({
      where: {
        userId: session.userId as string,
      },
    });

    if (!account) {
      return {
        redirect: {
          destination: "/sign-in",
          permanent: false,
        },
      };
    }

    // Validando sessão com o instagram se houver um token.
    if (account && account.access_token) {
      const instagramSession = await validateInstagramSession(
        account.access_token
      );

      if (instagramSession) {
        return {
          props: {
            account,
          },
        };
      }
    }

    const { code } = context.query; // Captura o código de autorização do Instagram

    if (!code) {
      return {
        props: {},
      };
    }

    const config = {
      auth_url: "https://api.instagram.com/oauth/access_token",
      client_id: process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID,
      client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
      redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/raffle-maker/instagram`,
      grant_type: "authorization_code",
      code: code as string,
    };

    console.log(config);

    // Usando FormData para construir o corpo da solicitação POST
    const formData = new URLSearchParams();
    formData.append("client_id", config.client_id as string);
    formData.append("client_secret", config.client_secret as string);
    formData.append("grant_type", config.grant_type);
    formData.append("redirect_uri", config.redirect_uri);
    formData.append("code", config.code);

    // Efetuando a troca do token.
    const response = await fetch(config.auth_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      console.log("Erro ao trocar o token: ", await response.json());

      // Lida com erros de resposta
      return {
        props: { account: null },
      };
    }

    const data = (await response.json()) as {
      access_token: string;
      user_id: string;
      permissions: string[];
    }; // Lê a resposta JSON

    console.log(data);

    // Valida se a conta existe e cria se não existir.
    if (!account) {
      await prisma.account.create({
        data: {
          provider: "instagram",
          type: "oauth",
          providerAccountId: data.user_id.toString(),
          userId: session.userId as string,
          access_token: data.access_token,
        },
      });
    } else {
      account.access_token = data.access_token;
      account.providerAccountId = data.user_id.toString();

      // Atualiza a conta existente.
      await prisma.account.update({
        data: account,
        where: {
          id: account.id,
        },
      });

      console.log("Conta atualizada com sucesso.");
    }

    return {
      props: { account },
    };
  } catch (error) {
    console.log("Erro:", error);

    return {
      props: { account: null },
    };
  } finally {
    await prisma.$disconnect();
  }
};
