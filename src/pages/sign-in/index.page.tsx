import { getCsrfToken } from "next-auth/react";
import { Display } from "./display";
import { GetServerSideProps } from "next";

export default function handler({ csrfToken }: { csrfToken: string }) {
  return <Display csrfToken={csrfToken} />;
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const token = await getCsrfToken(context);

  return {
    props: {
      csrfToken: token || "",
    },
  };
};
