import { env } from "@/env";

export function decodeErrorMessage(message: string) {
  try {
    // Tenta decodificar como UTF-8 usando TextDecoder, que é mais robusto para diferentes encodings
    const decoder = new TextDecoder("utf-8");
    const encodedText = new Uint8Array(
      message.split("").map((char) => char.charCodeAt(0))
    );
    return decoder.decode(encodedText);
  } catch (err) {
    console.error("Erro ao decodificar a mensagem de erro:", err);
    return "Ocorreu um erro inesperado.";
  }
}

export function dateToUnixTimestamp(date: Date): number {
  return Math.floor(date.getTime() / 1000);
}

export function unixTimestampToDate(timestamp: number): Date {
  return new Date(timestamp * 1000);
}

type ReturnType = "date" | "string" | "number";

export function getCurrentTimeInZone(
  returnType: ReturnType,
  offset?: string
): Date | string | number {
  // Cria uma instância de Date com a hora atual
  let date: Date = new Date();

  // Ajusta a data com base no offset, se fornecido
  if (offset) {
    const match = offset.match(/^([-+]?\d+)([hd])$/);
    if (match) {
      const value = parseInt(match[1], 10); // Converte o valor para número inteiro
      const unit = match[2]; // 'h' para horas, 'd' para dias

      if (unit === "h") {
        date.setHours(date.getHours() + value); // Ajusta horas
      } else if (unit === "d") {
        date.setDate(date.getDate() + value); // Ajusta dias
      }
    } else {
      throw new Error('Offset inválido. Use o formato "+1h", "-1d", etc.');
    }
  }

  // Obter a data ajustada para o fuso horário "America/Sao_Paulo" diretamente
  const saoPauloDate = new Date(
    date.toLocaleString("en-US", { timeZone: env.TIMEZONE })
  );

  switch (returnType) {
    case "date":
      // Retorna o objeto Date ajustado para o fuso horário setado em env.TIMEZONE
      return saoPauloDate;
    case "string":
      // Formata e retorna a data como string no fuso horário setado em env.TIMEZONE
      return saoPauloDate.toLocaleString("pt-BR", {
        timeZone: env.TIMEZONE,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
    case "number":
      // Retorna o timestamp UNIX em segundos, ajustado para o fuso horário "America/Sao_Paulo"
      return Math.floor(saoPauloDate.getTime() / 1000); // Converte o timestamp para segundos
    default:
      throw new Error(
        'Tipo de retorno inválido. Use "date", "string" ou "number".'
      );
  }
}
