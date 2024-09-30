import { GetServerSideProps } from "next";
import { getCookieValueFromRequest } from "@/utils/browser";
import { prisma } from "@/lib/prisma";
import { RaffleMakerLayout } from "@/components/layouts/raffle-maker";
import InstagramProvider from "./auth-provider";
import { Session } from "@prisma/client";
import { Posts } from "./posts";

interface InstagramPage {
  session: Session | null;
}

export default function handler({ session }: InstagramPage) {
  if (!session) return null;

  return (
    <RaffleMakerLayout>
      <div className="flex flex-col justify-start items-center">
        <InstagramProvider>
          <Posts session={session} />
        </InstagramProvider>
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

    return {
      props: { session },
    };
  } catch (error) {
    return {
      props: { account: null },
    };
  } finally {
    await prisma.$disconnect();
  }
};
