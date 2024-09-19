import { apiAuth } from "@/middlewares/api-auth";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Recuperando parametros.
    const { access_token } = req.query;

    const config = {
      auth_url: "https://graph.facebook.com/v20.0/oauth/access_token",
      client_id: process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID,
      client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
      redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/raffle-maker/instagram`,
    };

    const authUri = `${config.auth_url}?grant_type=fb_exchange_token&client_id=${config.client_id}&client_secret=${config.client_secret}&fb_exchange_token=${access_token}`;

    const response = await fetch(authUri, {
      method: "POST",
      redirect: "follow",
    });

    const jsonResponse = (await response.json()) as {
      access_token: string;
      expires_in: number;
    };

    const dataUpdateAccount = {
      access_token: jsonResponse.access_token,
      providerAccountId: "",
      expires_at: jsonResponse.expires_in,
    } as {
      access_token: string;
      providerAccountId: string;
      expires_at: number;
    };

    // Validando access_token
    if (!dataUpdateAccount.access_token) {
      throw new Error("Erro ao tentar utilizar o access_token permanente.");
    }

    // Recuperar Dados da conta logada.
    const accountUri = `https://graph.facebook.com/v20.0/me/accounts?fields=instagram_business_account,access_token,category,category_list,name,id,tasks&access_token=${dataUpdateAccount.access_token}`;

    // Recupera os dados da conta.
    const accountApi = await fetch(accountUri, {
      method: "GET",
      redirect: "follow",
    });

    const jsonAccountData = (await accountApi.json()) as {
      data: FacebookAccounts[];
    };

    // Valida se alguma conta do face foi retornada.
    if (jsonAccountData.data.length <= 0) {
      throw new Error("Nenhuma conta foi encontrada.");
    }

    const accountInstagramId =
      jsonAccountData.data[0].instagram_business_account;

    // Valida se alguma conta do instagram foi retornada.
    if (!accountInstagramId.id) {
      throw new Error("Nenhuma conta de instagram foi encontrada.");
    }

    dataUpdateAccount.providerAccountId = accountInstagramId.id;

    if (!req.account_id) {
      const createAccount = await prisma.account.create({
        data: {
          provider: "facebook",
          type: "oauth",
          userId: req.user_id as string,
          access_token: dataUpdateAccount.access_token,
          expires_at: dataUpdateAccount.expires_at,
          providerAccountId: dataUpdateAccount.providerAccountId,
        },
      });

      return res.status(200).json({
        status: true,
        message: "",
        data: createAccount,
      });
    }

    const updateAccount = await prisma.account.update({
      data: {
        access_token: dataUpdateAccount.access_token,
        expires_at: dataUpdateAccount.expires_at,
        providerAccountId: dataUpdateAccount.providerAccountId,
      },
      where: {
        id: req.account_id as string,
      },
    });

    return res.status(200).json({
      status: true,
      message: "",
      data: updateAccount,
    });
  } catch (error) {
    // Captura erros de rede ou de solicitação
    return res.status(500).json({ error: "Erro ao processar a solicitação." });
  } finally {
    await prisma.$disconnect();
  }
};

export default apiAuth(handler);
