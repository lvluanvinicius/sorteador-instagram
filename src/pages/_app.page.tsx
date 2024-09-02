import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";

import "../styles/globals.css";
import { Toaster } from "sonner";
import { SessionProvider } from "@/contexts/session";
import customTheme from "@/styles/themes";

export default function App({
  pageProps: { session, ...pageProps },
  Component,
}: AppProps) {
  return (
    <ChakraProvider theme={customTheme}>
      <Toaster richColors closeButton />
      <SessionProvider>
        <Component {...pageProps} />
      </SessionProvider>
    </ChakraProvider>
  );
}
