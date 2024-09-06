import { prisma } from "@/lib/prisma";
import { post } from "@/services/app";
import { getCookieValueFromRequest } from "@/utils/browser";
import { GetServerSideProps } from "next";

export default function handler() {
  return (
    <div className="">
      <div>teste</div>
    </div>
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

    // Recuperando id de instancia.
    const instance_id = getCookieValueFromRequest(
      context.req,
      "instance_id"
    ) as string;

    // Valida se a instancia_id existe.
    if (!instance_id) {
      throw new Error("ID de instrancia para o sorteio não foi encontrado.");
    }

    console.log(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/instagram/comments/${context.query.post}`
    );

    // Recuperar comentários do instagram.
    const response = await post(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/instagram/comments/${context.query.post}`,
      null,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    console.log(response);
  } catch (error) {
    console.log(error);

    // return { props: {} };
    if (error instanceof Error) {
      return {
        redirect: {
          destination: `/raffle-maker?error=${error.message}`,
          permanent: false,
        },
      };
    }

    return {
      redirect: {
        destination: `/raffle-maker?error=${"Houve um erro desconhecido."}`,
        permanent: false,
      },
    };
  } finally {
    await prisma.$disconnect();
  }

  return {
    props: {},
  };
};
