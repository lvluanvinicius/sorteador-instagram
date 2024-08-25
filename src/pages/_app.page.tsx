import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";

import "../styles/globals.css";

export default function App({
  pageProps: { session, ...pageProps },
  Component,
}: AppProps) {
  return (
    <ChakraProvider>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ChakraProvider>
  );
}
