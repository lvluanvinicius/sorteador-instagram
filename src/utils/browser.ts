import { parseCookies } from "nookies";
import { IncomingMessage } from "http";
import { NextApiRequest } from "next";

/**
 * Recupera o valor de um cookie específico pelo nome.
 *
 * @param ctx - Contexto, pode ser o objeto `GetServerSidePropsContext`, `GetStaticPropsContext` ou `NextPageContext`.
 * @param cookieName - O nome do cookie a ser recuperado.
 * @returns O valor do cookie se encontrado, ou `undefined` se não encontrado.
 */
export function getCookieValue(
  ctx: { req?: IncomingMessage } | null,
  cookieName: string
): string | undefined {
  // Usa parseCookies para obter todos os cookies no contexto fornecido
  const cookies = parseCookies(ctx);

  // Retorna o valor do cookie específico ou `undefined` se não existir
  return cookies[cookieName];
}

/**
 * Recupera o valor de um cookie específico pelo nome.
 *
 * @param req - Objeto de requisição do Next.js API Route.
 * @param cookieName - O nome do cookie a ser recuperado.
 * @returns O valor do cookie se encontrado, ou `undefined` se não encontrado.
 */
export function getCookieValueFromRequest(
  req: NextApiRequest | IncomingMessage,
  cookieName: string
): string | undefined {
  // Usa parseCookies para obter todos os cookies do objeto de requisição
  const cookies = parseCookies({ req });

  // Retorna o valor do cookie específico ou `undefined` se não existir
  return cookies[cookieName];
}
