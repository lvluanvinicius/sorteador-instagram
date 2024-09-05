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
      throw new Error("Sua sessão não é válida.", {
        cause: "ERROR_UNAUTHORIZED",
      });
    }

    // Recuperando conta.
    const account = await prisma.account.findFirst({
      where: {
        userId: session.userId as string,
      },
    });

    if (!account) {
      throw new Error("Sua sessão não é válida.", {
        cause: "ERROR_UNAUTHORIZED",
      });
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

    const data = (await response.json()) as {
      access_token: string;
      user_id: string;
      permissions: string[];
    }; // Lê a resposta JSON

    if (!response.ok) {
      // Lida com erros de resposta
      return {
        props: { account: null },
      };
    }

    // Valida se a conta existe e cria se não existir.
    if (!account) {
      // Cria uma nova conta se não existir.
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
      // Atualiza a conta existente se houver.
      await prisma.account.update({
        data: {
          providerAccountId: data.user_id.toString(),
          access_token: data.access_token,
        },
        where: {
          id: account.id,
        },
      });
    }

    return {
      props: { account },
    };
  } catch (error) {
    return {
      props: { account: null },
    };
  } finally {
    await prisma.$disconnect();
  }
};
