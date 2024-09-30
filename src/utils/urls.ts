import { ParsedUrlQuery } from "querystring";

export function transformSearchParams(query: ParsedUrlQuery) {
  const urlParams = new URLSearchParams();

  Object.keys(query).map((key) => {
    const value = query[key];
    if (value) {
      if (Array.isArray(value)) {
        urlParams.append(key, value.join(","));
      } else {
        urlParams.append(key, value);
      }
    }
  });

  return urlParams.toString();
}

export function getDateDaysBefore(days: number, currentDate?: Date): Date {
  // Use a data atual se currentDate não for fornecido
  const date = currentDate || new Date();

  // Criar um novo objeto Date baseado na data fornecida ou na data atual
  const dateBefore = new Date(date);

  // Subtrair o número de dias especificado
  dateBefore.setDate(date.getDate() - days);

  return dateBefore;
}

export function dateToUnixTimestamp(date: Date): number {
  return Math.floor(date.getTime() / 1000);
}

export function unixTimestampToDate(timestamp: number): Date {
  return new Date(timestamp * 1000);
}

export function parseRequestCookies(
  cookieHeader: string
): Record<string, string> {
  const cookies: Record<string, string> = {};

  cookieHeader.split(";").forEach((cookie) => {
    const [name, ...rest] = cookie.split("=");
    const value = rest.join("=").trim();

    if (name && value) {
      // Usa o nome do cookie como chave e seu valor correspondente
      cookies[name.trim()] = decodeURIComponent(value);
    }
  });

  return cookies;
}
