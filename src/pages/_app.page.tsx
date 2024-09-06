import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { SessionProvider } from "@/contexts/session";
import customTheme from "@/styles/themes";
import { queryClient } from "@/services/queryClient";

import "../styles/globals.css";

export default function App({ pageProps, Component }: AppProps) {
  return (
    <ChakraProvider theme={customTheme}>
      <Toaster richColors closeButton />
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <Component {...pageProps} />
        </SessionProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
