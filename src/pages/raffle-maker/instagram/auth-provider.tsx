import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface InstagramProviderProps {
  session: any;
  children: ReactNode;
}

export default function InstagramProvider({
  session,
  children,
}: InstagramProviderProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
