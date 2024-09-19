import { FetchError, get } from "@/services/app";
import { Session } from "@prisma/client";
import { useRouter } from "next/router";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface InstagramContextProps {
  socialAccount: FacebookAccounts | null;
  auth: boolean;
}

const InstagramContext = createContext({} as InstagramContextProps);

interface InstagramProviderProps {
  session: Session | null;
  children: ReactNode;
}

export default function InstagramProvider({
  session,
  children,
}: InstagramProviderProps) {
  const router = useRouter();
  const [socialAccount, setSocialAccount] = useState<FacebookAccounts | null>(
    null
  );
  const [auth, setAuth] = useState<boolean>(false);

  const handlerGetAccount = useCallback(
    async function () {
      try {
        const response = await get<FacebookAccounts>("/api/instagram/account", {
          headers: {
            Accept: "application/json",
          },
        });

        if (response.status) {
          setSocialAccount(response.data);
          setAuth(true);
          return;
        } else {
          setAuth(false);
        }
      } catch (error) {
        if (error instanceof FetchError) {
          if (error.status === 401) {
            setAuth(false);
            return router.push("/raffle-maker/instagram");
          }
          return;
        }

        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    },
    [setSocialAccount, setAuth, router]
  );

  const handleGetTokenFacebook = useCallback(
    async (hash: string) => {
      const hashParams = new URLSearchParams(hash.substring(1)); // Remove o "#" do início
      const accessToken = hashParams.get("access_token") as string;
      const expiresIn = hashParams.get("expires_in") as string;
      const state = hashParams.get("state") as string;
      const dataAccessExpirationTime = hashParams.get(
        "data_access_expiration_time"
      ) as string;

      if (accessToken) {
        const response = await get("/api/auth/instagram-token", {
          queryParams: {
            access_token: accessToken,
            expires_in: expiresIn,
            state,
            data_access_expiration_time: dataAccessExpirationTime,
          },
          headers: {
            Accept: "application/json",
          },
        });
      }
    },
    [router]
  );

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      handleGetTokenFacebook(window.location.hash);
    }
  }, [handleGetTokenFacebook]);

  useEffect(() => {
    handlerGetAccount();
  }, [handlerGetAccount]);

  return (
    <InstagramContext.Provider value={{ socialAccount, auth }}>
      {children}
    </InstagramContext.Provider>
  );
}

export function useInstagram() {
  return useContext(InstagramContext);
}
