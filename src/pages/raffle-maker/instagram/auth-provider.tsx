import { get } from "@/services/app";
import { Session } from "@prisma/client";
import { createContext, ReactNode, useContext, useEffect } from "react";

interface InstagramContextProps {}

const InstagramContext = createContext({} as InstagramContextProps);

interface InstagramProviderProps {
  session: Session | null;
  children: ReactNode;
}

export default function InstagramProvider({
  session,
  children,
}: InstagramProviderProps) {
  useEffect(() => {
    if (window !== undefined) {
      // Recuperando parametros do Hash enviado pelo facebook.
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get("access_token") as string;
      const expiresIn = hashParams.get("expires_in") as string;
      const state = hashParams.get("state") as string;
      const dataAccessExpirationTime = hashParams.get(
        "data_access_expiration_time"
      ) as string;

      if (accessToken) {
        const response = get("/api/auth/instagram-token", {
          queryParams: {
            access_token: accessToken,
            expires_in: expiresIn,
            state,
            data_access_expiration_time: dataAccessExpirationTime,
          },
        });
      }
    }
  }, []);

  return (
    <InstagramContext.Provider value={{}}>{children}</InstagramContext.Provider>
  );
}

export function useInstagram() {
  return useContext(InstagramContext);
}
