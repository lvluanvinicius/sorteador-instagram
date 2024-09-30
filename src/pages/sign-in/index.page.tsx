import { GetServerSideProps } from "next";
import { Display } from "./display";
import { FetchError, get } from "@/services/app";

export default function SignIn() {
  return <Display />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const cookiesString = context.req.headers.cookie;

    const response = await get(`${process.env.NEXT_PUBLIC_APP_URL}/api/user`, {
      headers: {
        Accept: "application/json",
        cookie: cookiesString as string,
      },
    });

    if (response.status) {
      return {
        redirect: {
          destination: "/account",
          permanent: false,
        },
      };
    }

    return {
      props: {},
    };
  } catch (error) {
    if (error instanceof FetchError) {
      if (error.status === 401) {
        return {
          props: {},
        };
      }
    }

    return {
      redirect: {
        destination: "/error",
        permanent: false,
      },
    };
  }
};
