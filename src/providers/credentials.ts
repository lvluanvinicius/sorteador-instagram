import { prisma } from "@/lib/prisma";
import { validatePassword } from "@/utils/validate";
import { AdapterUser } from "next-auth/adapters";
import { CredentialsConfig } from "next-auth/providers/credentials";

interface CredentialsData {
  username: string;
  password: string;
}

type AuthorizeReturn = AdapterUser | null;

export function AuthCredentialsProvider(): CredentialsConfig {
  return {
    id: "app-sort-instagram",
    name: "App Sort",
    credentials: {
      username: { label: "Username", type: "text" },
      password: { label: "Password", type: "password" },
    },
    type: "credentials",
    async authorize(
      credentials: Record<keyof CredentialsData, string> | undefined,
      req
    ): Promise<AuthorizeReturn> {
      if (!credentials) {
        // Retorna null se as credenciais não forem fornecidas
        return null;
      }

      const { username, password } = credentials;

      // Busca o usuário no banco de dados pelo username fornecido
      const user = await prisma.user.findFirst({
        where: {
          username,
        },
      });

      if (!user) {
        // Se o usuário não for encontrado, retorna null para exibir um erro de autenticação
        return null;
      }

      // Verifica se a senha fornecida corresponde ao hash armazenado no banco de dados
      const isPasswordValid = await validatePassword(password, user.password);

      if (!isPasswordValid) {
        // Retorna null se a senha estiver incorreta
        return null;
      }

      // Retorna um objeto que é compatível com o AdapterUser
      return {
        id: user.id,
        name: user.name,
        email: user.email || "",
        emailVerified: null,
        username: user.username,
      } as AdapterUser;
    },
  };
}
