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
    // The name to display on the sign in form (e.g. "Sign in with...")
    name: "App Sort",
    // `credentials` is used to generate a form on the sign in page.
    // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.
    credentials: {
      username: { label: "Username", type: "text", placeholder: "jsmith" },
      password: { label: "Password", type: "password" },
    },
    type: "credentials",

    async authorize(
      credentials: Record<keyof CredentialsData, string> | undefined,
      req
    ): Promise<AuthorizeReturn> {
      if (!credentials) {
        throw new Error("Informe os dados corretamente.");
      }

      const { password, username } = credentials;

      // Busca o usuário no banco de dados pelo username fornecido
      const user = await prisma.user.findFirst({
        where: {
          username,
        },
      });

      if (!user) {
        // Se o usuário não for encontrado, retorna null para exibir um erro
        throw new Error("Usuário e/ou senha estão incorretos.");
      }

      // Verifica se a senha fornecida corresponde ao hash armazenado no banco de dados
      const isPasswordValid = await validatePassword(password, user.password);

      if (!isPasswordValid) {
        throw new Error("Usuário e/ou senha estão incorretos.");
      }

      // Se o usuário é encontrado e a senha é válida, retorna o objeto do usuário
      return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email || "",
        emailVerified: null,
      };
    },
  };
}
