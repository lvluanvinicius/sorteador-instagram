import { UseLayout } from "@/components/layouts/_useLayout";
import { Page } from "./page";
import { GetServerSideProps } from "next";
import { prisma } from "@/lib/prisma";

interface HistoryProps {
  instance: RafflesInstancesInterface | null;
}

export default function handler({ instance }: HistoryProps) {
  if (!instance) {
    return null;
  }

  return (
    <UseLayout>
      <Page instance={instance} />
    </UseLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { history } = context.query;

    if (!history) {
      throw new Error("Id de sorteio não informado corretamente. ");
    }

    // Recuperando instancia de sorteio.
    const instance = await prisma.rafflesInstances.findUnique({
      where: {
        id: history as string,
      },
    });

    return {
      props: {
        instance,
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        redirect: {
          destination: `/raffle-maker/histories?error=${error.message}`,
          permanent: false,
        },
      };
    }

    return {
      redirect: {
        destination: `/raffle-maker/histories?error=Houve um erro ao tentar recuperar o sorteio selecionado.`,
        permanent: false,
      },
    };
  } finally {
    await prisma.$disconnect();
  }
};
