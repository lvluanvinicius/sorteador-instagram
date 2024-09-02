import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import nookies from "nookies";
import { post } from "@/services/app";
import { useRouter } from "next/router";

interface SessionContextProps {
  isAuthenticated: boolean;
  user: UserInterface | null;
  signIn: (
    username: string,
    password: string
  ) => Promise<PrismaActionResponse<[]>>;
  checkSession: () => Promise<boolean | undefined>;
}

export const SessionContext = createContext({} as SessionContextProps);

interface SessionProvider {
  children: ReactNode;
}

export function SessionProvider({ children }: SessionProvider) {
  const router = useRouter();
  const [user, setUser] = useState<UserInterface | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Recupera o token do navegador.
  const webToken = useCallback(async () => {
    const response = await fetch("/api/web-token");
    const responseJson = (await response.json()) as { session_token?: string };

    if (window !== undefined) {
      if (responseJson && responseJson.session_token) {
        nookies.set(null, "_sort_app.webtoken", responseJson.session_token, {
          maxAge: 60 * 60 * 60,
        });
      }
    }
  }, []);

  // Efetua o carregamento dos dados de usuários.
  const userLoading = useCallback(async () => {
    const response = await fetch("/api/user", {
      headers: {
        Accept: "application/json",
      },
    });
    const data = (await response.json()) as PrismaActionResponse<null>;

    if (data.data) {
      setUser(data.data);
      setIsAuthenticated(!!data.data);
      return;
    }

    setUser(null);
  }, [setUser, setIsAuthenticated]);

  const signIn = useCallback(async (username: string, password: string) => {
    const response = await post("/api/sign-in", {
      password,
      username,
    });

    return response;
  }, []);

  // Encaminha o usuário para a conta se já estiver logado.
  const checkSession = useCallback(async () => {
    if (isAuthenticated) {
      return router.replace("/account");
    }
  }, [router, isAuthenticated]);

  useEffect(() => {
    webToken();
  }, [webToken]);

  useEffect(() => {
    userLoading();
  }, [userLoading]);

  return (
    <SessionContext.Provider
      value={{ isAuthenticated, user, signIn, checkSession }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => {
  return useContext(SessionContext);
};
