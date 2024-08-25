import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";

export default function App({
  pageProps: { session, ...pageProps },
  Component,
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
