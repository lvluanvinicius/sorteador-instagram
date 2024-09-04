import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface InstagramProviderProps {
  children: ReactNode;
}

export default function InstagramProvider({
  children,
}: InstagramProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
