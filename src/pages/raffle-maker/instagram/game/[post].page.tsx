import { prisma } from "@/lib/prisma";
import { getCookieValueFromRequest } from "@/utils/browser";
import { Session } from "@prisma/client";
import { GetServerSideProps } from "next";
import { Page } from "./page";
import { RaffleMakerLayout } from "@/components/layouts/raffle-maker";

interface InstagramGamePage {
  session: Session | null;
}

export default function handler({ session }: InstagramGamePage) {
  if (!session) return null;

  return (
    <RaffleMakerLayout>
      <Page session={session} />
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

    if (!context.query.post) {
      throw new Error("Id de post não encontrado.");
    }

    return {
      props: { session },
    };
  } catch (error) {
    console.log(error);

    return {
      props: { account: null },
    };
  } finally {
    await prisma.$disconnect();
  }
};
