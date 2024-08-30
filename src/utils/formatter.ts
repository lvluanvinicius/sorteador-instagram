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
